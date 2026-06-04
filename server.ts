import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import { supabase, isSupabaseConfigured, cleanCredentials } from "./src/lib/supabase.ts";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Setup Resend
const resendKey = cleanCredentials(process.env.RESEND_API_KEY || "");
const resend = resendKey ? new Resend(resendKey) : null;

// Ensure admin passcode
const ADMIN_PASSCODE = cleanCredentials(process.env.SYSTEM_ADMIN_PASSCODE || "ChidiAdanna2026");

// Local file DB setup
const LOCAL_DB_PATH = path.join(process.cwd(), "data", "rsvps.json");

// Helper function to read from local file
const readLocalRSVPs = (): any[] => {
  try {
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      // Create empty file with empty array if it doesn't exist
      fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify([], null, 2), "utf8");
      return [];
    }
    const data = fs.readFileSync(LOCAL_DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading rsvps.json:", err);
    return [];
  }
};

// Helper function to write to local file
const writeLocalRSVPs = (data: any[]) => {
  try {
    fs.mkdirSync(path.dirname(LOCAL_DB_PATH), { recursive: true });
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing rsvps.json:", err);
  }
};

// Enable JSON body parsing
app.use(express.json());

// API: Health probe
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", supabaseConfigured: isSupabaseConfigured });
});

// Middleware: Verify Admin Access Code
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization || "";
  const queryPasscode = req.query.passcode as string;
  const headerPasscode = req.headers["x-admin-passcode"] as string;

  let providedPasscode = "";
  if (authHeader.startsWith("Bearer ")) {
    providedPasscode = authHeader.substring(7);
  } else if (headerPasscode) {
    providedPasscode = headerPasscode;
  } else if (queryPasscode) {
    providedPasscode = queryPasscode;
  }

  if (providedPasscode === ADMIN_PASSCODE) {
    next();
  } else {
    res.status(401).json({ error: "Access Denied: Invalid admin passcode string." });
  }
};

// API: Submit RSVP (Public)
app.post("/api/rsvps", async (req, res) => {
  try {
    const { name, email, phone, events, dietary_notes } = req.body;

    if (!name || !email || !phone || !events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: "Missing required fields. Provide name, email, phone, and at least one chosen event." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Check for uniqueness and insert
    if (isSupabaseConfigured && supabase) {
      // Check if email already registered in Supabase
      const { data: existing, error: fetchErr } = await supabase
        .from("rsvps")
        .select("id")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (fetchErr) {
        console.error("Supabase select error:", fetchErr);
        throw fetchErr;
      }

      if (existing) {
        return res.status(400).json({ error: "An RSVP with this email has already been submitted." });
      }

      // Insert into Supabase
      const { data, error: insertErr } = await supabase
        .from("rsvps")
        .insert({
          name: name.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
          events,
          dietary_notes: dietary_notes ? dietary_notes.trim() : "",
          status: "pending"
        })
        .select()
        .single();

      if (insertErr) {
        console.error("Supabase insert error:", insertErr);
        throw insertErr;
      }

      return res.status(201).json({ success: true, data });
    } else {
      // LOCAL FALLBACK MODE
      const localRSVPs = readLocalRSVPs();
      const existing = localRSVPs.find((item: any) => item.email.toLowerCase() === normalizedEmail);
      if (existing) {
        return res.status(400).json({ error: "An RSVP with this email has already been submitted." });
      }

      const newRSVPsEntry = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        events,
        dietary_notes: dietary_notes ? dietary_notes.trim() : "",
        status: "pending"
      };

      localRSVPs.push(newRSVPsEntry);
      writeLocalRSVPs(localRSVPs);

      return res.status(201).json({ success: true, data: newRSVPsEntry });
    }
  } catch (error: any) {
    console.error("RSVP Submission Error:", error);
    res.status(500).json({ error: error.message || "An error occurred while compiling your RSVP." });
  }
});

// API: Get Admin Passcode (Checks if submitted code matches current setup env value)
app.post("/api/admin/verify", (req, res) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSCODE) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Incorrect admin passcode." });
  }
});

// API: Fetch RSVPs roster (Admin Protected)
app.get("/api/rsvps", requireAdmin, async (req, res) => {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        throw error;
      }
      return res.json({ success: true, data });
    } else {
      const localRSVPs = readLocalRSVPs();
      // Sort in descending order of created_at
      const sorted = [...localRSVPs].sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      return res.json({ success: true, data: sorted });
    }
  } catch (error: any) {
    console.error("Roster Fetch Error:", error);
    res.status(500).json({ error: error.message || "An error occurred while fetching RSVPs." });
  }
});

// API: Action endpoint to change status (approve/decline) or issue gatepass
app.post("/api/send-invitation", requireAdmin, async (req, res) => {
  try {
    const { rsvpId, action, seatingSelection } = req.body;

    if (!rsvpId || !action) {
      return res.status(400).json({ error: "Missing required arguments: rsvpId and action ('approve', 'decline' or 'delete')." });
    }

    const seating = seatingSelection || "Imperial Main Hall • Section A";
    let targetRow: any = null;

    // Determine target status
    let newStatus = "pending";
    if (action === "approve") newStatus = "approved";
    if (action === "decline") newStatus = "declined";

    if (isSupabaseConfigured && supabase) {
      if (action === "delete") {
        const { error } = await supabase.from("rsvps").delete().eq("id", rsvpId);
        if (error) throw error;
        return res.json({ success: true, deleted: true });
      }

      // Fetch row first for email template placeholder filling
      const { data: row, error: fetchError } = await supabase
        .from("rsvps")
        .select("*")
        .eq("id", rsvpId)
        .single();

      if (fetchError || !row) {
        return res.status(404).json({ error: "RSVP record not found in Supabase." });
      }

      // Update in Supabase
      const { data: updated, error: updateError } = await supabase
        .from("rsvps")
        .update({ status: newStatus })
        .eq("id", rsvpId)
        .select()
        .single();

      if (updateError) throw updateError;
      targetRow = updated;
    } else {
      // Local file engine
      const localRSVPs = readLocalRSVPs();
      const index = localRSVPs.findIndex((item: any) => item.id === rsvpId);
      if (index === -1) {
        return res.status(404).json({ error: "RSVP record not found in local store." });
      }

      if (action === "delete") {
        localRSVPs.splice(index, 1);
        writeLocalRSVPs(localRSVPs);
        return res.json({ success: true, deleted: true });
      }

      localRSVPs[index].status = newStatus;
      writeLocalRSVPs(localRSVPs);
      targetRow = localRSVPs[index];
    }

    // Trigger Gatepass Email on Approval
    let isEmailSent = false;
    let resendId = "";
    let emailHtml = "";

    // Generate Verification Token/Code from ID
    const shortToken = targetRow.id.substring(0, 8).toUpperCase();
    const eventLabels = targetRow.events.map((e: string) => {
      if (e === "traditional") return "Traditional (Igba Nkwu)";
      if (e === "church") return "Church Holy Matrimony";
      if (e === "reception") return "White Wedding Reception";
      return e;
    }).join(", ");

    // Emerald and gold framed HTML template
    emailHtml = `
      <div style="font-family: 'Georgia', serif; background-color: #FAF9F6; padding: 40px; text-align: center; border: 12px solid #064E3B; outline: 3px double #B45309; max-width: 600px; margin: 20px auto; color: #042F1A; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://picsum.photos/seed/elegantwedding/120/120?blur=1" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #B45309; object-fit: cover;" alt="Monogram" referrerPolicy="no-referrer" />
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #B45309; font-weight: bold; margin-top: 10px;">Official Gatepass</div>
        </div>
        
        <h2 style="font-size: 28px; color: #064E3B; margin-top: 10px; margin-bottom: 4px; font-weight: normal;">Chidi &amp; Adanna</h2>
        <p style="font-size: 13px; font-style: italic; color: #B45309; margin-top: 0; margin-bottom: 28px; letter-spacing: 1px;">- Ecclesiastes 4:12 -</p>
        
        <div style="background-color: #ffffff; padding: 28px; border: 1px solid rgba(180, 83, 9, 0.2); border-radius: 2px; text-align: left; margin: 20px 0; background-image: radial-gradient(#FAF9F6 1px, transparent 1px); background-size: 16px 16px;">
          <p style="margin-top: 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #B45309; letter-spacing: 2px; border-bottom: 1px solid rgba(180, 83, 9, 0.15); padding-bottom: 8px;">Admittance Pass</p>
          <p style="font-size: 18px; color: #042F1A; font-weight: bold; margin: 16px 0 8px 0;">Dear ${targetRow.name},</p>
          <p style="font-size: 15px; line-height: 1.6; color: #1F2937; margin-bottom: 20px;">
            We are overjoyed to confirm your seating reservation at our celebration. Below, please find your secure gatepass credentials for accessing the venues.
          </p>
          
          <div style="background-color: #FAF9F6; border-left: 4px solid #064E3B; padding: 16px; margin: 20px 0; border-radius: 2px;">
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="color: #B45309; font-weight: bold; width: 45%; padding: 6px 0; font-family: sans-serif; font-size: 12px; letter-spacing: 0.5px;">SECURE VERIFICATION CODE:</td>
                <td style="color: #064E3B; font-family: monospace; font-weight: bold; font-size: 18px; letter-spacing: 1.5px; padding: 6px 0;">${shortToken}</td>
              </tr>
              <tr>
                <td style="color: #B45309; font-weight: bold; padding: 6px 0; font-family: sans-serif; font-size: 12px; letter-spacing: 0.5px;">CONFIRMED SEATING:</td>
                <td style="color: #042F1A; font-weight: bold; font-size: 15px; padding: 6px 0;">${seating}</td>
              </tr>
              <tr>
                <td style="color: #B45309; font-weight: bold; padding: 6px 0; font-family: sans-serif; font-size: 12px; letter-spacing: 0.5px;">SECURED ACCESS EVENTS:</td>
                <td style="color: #1F2937; font-size: 13px; line-height: 1.4; padding: 6px 0;">${eventLabels}</td>
              </tr>
            </table>
          </div>
          
          <p style="font-size: 13px; line-height: 1.5; color: #4B5563; margin-top: 15px; font-style: italic;">
            * Kindly present a digital or printed copy of this pass at security check stations.
          </p>
        </div>
        
        <p style="font-size: 13px; line-height: 1.6; color: #042F1A; text-align: center; max-width: 480px; margin: 30px auto; padding: 15px; border-top: 1px dotted rgba(180, 83, 9, 0.4); border-bottom: 1px dotted rgba(180, 83, 9, 0.4);">
          "Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken."<br/>
          <strong style="color: #B45309; font-size: 12px; display: block; margin-top: 8px;">— Ecclesiastes 4:12</strong>
        </p>
        
        <div style="font-size: 10px; color: #6B7280; text-transform: uppercase; letter-spacing: 2px; margin-top: 24px;">
          Chidi &amp; Adanna's Sovereign Union • Lagos, Nigeria
        </div>
      </div>
    `;

    if (action === "approve" && resend) {
      try {
        const sent = await resend.emails.send({
          from: "Lover's Knot <wedding@resend.dev>", // Or verified sender domain
          to: targetRow.email,
          subject: `✨ Chidi & Adanna's Wedding Official Entry Gatepass [Verified: ${shortToken}]`,
          html: emailHtml
        });
        isEmailSent = true;
        resendId = sent?.data?.id || "unknown";
        console.log(`[Resend] Successfully delivered email to ${targetRow.email}! ID: ${resendId}`);
      } catch (emailErr: any) {
        console.error("Failed to send real email via Resend:", emailErr);
      }
    }

    res.json({
      success: true,
      data: targetRow,
      isEmailSent,
      resendId,
      simulatedEmailCode: shortToken,
      simulatedEmailHtml: emailHtml // Send back to the front-end to render in a beautiful interactive envelope simulator!
    });

  } catch (error: any) {
    console.error("Action/Invitation Error:", error);
    res.status(500).json({ error: error.message || "An error occurred while running the invitation action." });
  }
});

// START EXPRESS/VITE ENGINE
async function startServer() {
  // Vite developer middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite builder...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode. Serving prebuilt static site.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Royal Wedding Portal server running on port ${PORT}`);
  });
}

startServer();
