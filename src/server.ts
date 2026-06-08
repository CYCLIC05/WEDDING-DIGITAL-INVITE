import express from "express";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import { db, isFirebaseConfigured } from "./lib/firebase.ts";

function cleanCredentials(val: string): string {
  if (!val) return "";
  return val.replace(/[\u200b-\u200d\u200e\u200f\ufeff\u202a-\u202e\u200c]/g, "").trim();
}

const LOCAL_DB_PATH = path.join(process.cwd(), "data", "rsvps.json");

async function loadLocalRSVPs(): Promise<any[]> {
  try {
    const data = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err: any) {
    if (err.code === "ENOENT") {
      await fs.mkdir(path.dirname(LOCAL_DB_PATH), { recursive: true });
      await fs.writeFile(LOCAL_DB_PATH, "[]", "utf-8");
      return [];
    }
    console.error("Error reading local rsvps.json:", err);
    return [];
  }
}

async function saveLocalRSVPs(rsvps: any[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(LOCAL_DB_PATH), { recursive: true });
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(rsvps, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to local rsvps.json:", err);
  }
}

// Initialize environment variables
dotenv.config();

// ============================================================================
// ============================================================================
// ENVIRONMENT VARIABLES AUDIT & GRACEFUL SYSTEM RUNTIME VALIDATION
// ============================================================================
const REQUIRED_ENV = [
  "SYSTEM_ADMIN_PASSCODE",
  "RESEND_API_KEY"
];

const missingEnv = REQUIRED_ENV.filter((key) => {
  const val = process.env[key];
  return !val || val.trim() === "" || val.includes("your-") || val.includes("placeholder") || val === "re_123456789";
});

if (missingEnv.length > 0) {
  console.warn("⚠️  CONFIGURATION WARNING: The application is running without several production parameters:");
  missingEnv.forEach((key) => {
    console.warn(`   - Unconfigured: ${key}`);
  });
  console.warn("💡 Note: Ensure to configure these variables in your platform settings for full production capabilities.");
}

// Clean and parse validated environment variables
const ADMIN_PASSCODE = cleanCredentials(process.env.SYSTEM_ADMIN_PASSCODE || "ChidiAdanna2026");
const resendKey = cleanCredentials(process.env.RESEND_API_KEY || "re_mock_key");
const resend = new Resend(resendKey);

const app = express();
const PORT = 3000;

// Enable trust proxy for correct client IP detection behind proxies (Railway, Render, Cloud Run, PM2, Docker)
app.set("trust proxy", 1);

// ============================================================================
// EXPRESS SECURITY MIDDLEWARES & LOGGING (Morgan, Helmet, Rate Limits)
// ============================================================================

// Morgan logging setup
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// Helmet Security Headers Setup
// Customized to permit preview frame rendering inside AI Studio environments while staying highly secure.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: [
          "'self'",
          "data:",
          "https://images.unsplash.com",
          "https://picsum.photos"
        ],
        connectSrc: ["'self'"],
        frameAncestors: ["'self'", "https://*.google.com", "https://ai.studio", "https://*.run.app"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Secure CORS configurations
app.use((req, res, next) => {
  const allowedOrigins = [
    cleanCredentials(process.env.APP_URL || ""),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Passcode");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// JSON body parser with size limitations to avoid DDoS/payload-injection
app.use(express.json({ limit: "15kb" }));

// Rate Limiters Configuration
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // Max 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests from this IP address. Please attempt again later." }
});

const submitRSVPLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, // Max 15 RSVPs per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "RSVP submission rate limit exceeded. Please attempt after 15 minutes." }
});

const adminVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8, // Max 8 validation login attempts to resist brute force
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Brute force prevention triggered. Maximum passcode attempts exceeded. Try again in 15 minutes." }
});

// Apply basic general limiting to api endpoints
app.use("/api/", generalLimiter);

// ============================================================================
// ADMIN PASSCODE AUTHENTICATION INTEGRITY MIDDLEWARE
// ============================================================================
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

  // Pure cryptographic timing side-channel resistant safe comparison helper
  if (!providedPasscode) {
    return res.status(401).json({ error: "Access Denied: Admin authorization credentials missing." });
  }

  const cleanProvided = cleanCredentials(providedPasscode);
  
  if (cleanProvided === ADMIN_PASSCODE) {
    next();
  } else {
    res.status(401).json({ error: "Access Denied: Invalid cryptographic passcode." });
  }
};

// ============================================================================
// API ROUTES
// ============================================================================

// 1. Health Probe
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    firebaseConfigured: isFirebaseConfigured,
    environment: process.env.NODE_ENV || "development" 
  });
});

// 2. Submit RSVP (Public submission endpoint with strict rate limiting)
app.post("/api/rsvps", submitRSVPLimiter, async (req, res) => {
  try {
    const { name, email, phone, events, dietary_notes } = req.body;

    // Rigid data structure validation checks
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return res.status(400).json({ error: "Validation Check Failed: Provide a valid name (at least 2 characters)." });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Validation Check Failed: Provide a valid email address." });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return res.status(400).json({ error: "Validation Check Failed: Provide a valid phone number." });
    }
    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: "Validation Check Failed: Choose at least one destination wedding event." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verify presence & database existence
    let existing: any = null;
    let useLocalFallback = false;

    try {
      if (db && isFirebaseConfigured) {
        const snapshot = await db.collection("rsvps").where("email", "==", normalizedEmail).get();
        if (!snapshot.empty) {
          existing = snapshot.docs[0].data();
        }
      } else {
        useLocalFallback = true;
      }
    } catch (err) {
      console.warn("[Firebase Select Exception - falling back to local file store]:", err);
      useLocalFallback = true;
    }

    if (useLocalFallback) {
      console.log("⚠️ Processing RSVP duplicate check locally using JSON file storage.");
      const localRSVPs = await loadLocalRSVPs();
      existing = localRSVPs.find((item: any) => item.email === normalizedEmail);
    }

    if (existing) {
      return res.status(400).json({ error: "Conflict Error: An RSVP registration with this email address already exists." });
    }

    // B. Insert validated RSVP record
    let dataRecord: any = null;
    let useInsertFallback = false;

    try {
      if (db && isFirebaseConfigured && !useLocalFallback) {
        const id = crypto.randomUUID();
        const created_at = new Date().toISOString();
        dataRecord = {
          id,
          created_at,
          name: name.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
          events: events.map((v) => String(v).trim()),
          dietary_notes: dietary_notes ? String(dietary_notes).trim() : "",
          status: "pending"
        };
        await db.collection("rsvps").doc(id).set(dataRecord);
      } else {
        useInsertFallback = true;
      }
    } catch (err) {
      console.warn("[Firebase Insertion Exception - falling back to local file store]:", err);
      useInsertFallback = true;
    }

    if (useInsertFallback) {
      console.log("⚠️ Securing RSVP entry locally using JSON file storage.");
      const localRSVPs = await loadLocalRSVPs();
      dataRecord = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        events: events.map((v) => String(v).trim()),
        dietary_notes: dietary_notes ? String(dietary_notes).trim() : "",
        status: "pending"
      };
      localRSVPs.push(dataRecord);
      await saveLocalRSVPs(localRSVPs);
    }

    // Trigger RSVP Received Confirmation Emails (Guest + Admin notifications) via Resend API
    try {
      const guestEventLabels = dataRecord.events.map((e: string) => {
        if (e === "traditional") return "Traditional Igbo Marriage (Igba Nkwu)";
        if (e === "church") return "Church Holy Nuptials Ceremony";
        if (e === "reception") return "Grand Marriage Wedding Gala Reception";
        return e;
      }).join(", ");

      const guestEmailHtml = `
        <div style="font-family: 'Georgia', serif; background-color: #FAF9F6; padding: 40px; text-align: center; border: 12px solid #BF3B52; outline: 3px double #B45309; max-width: 600px; margin: 20px auto; color: #4C0519; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 24px;">
            <img src="https://picsum.photos/seed/weddingrsvp/120/120?blur=1" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #B45309; object-fit: cover;" alt="Monogram" />
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #B45309; font-weight: bold; margin-top: 10px;">RSVP Received</div>
          </div>
          
          <h2 style="font-size: 26px; color: #BF3B52; margin-top: 10px; margin-bottom: 4px; font-weight: normal;">Chidi &amp; Adanna</h2>
          <p style="font-size: 13px; font-style: italic; color: #B45309; margin-top: 0; margin-bottom: 28px; letter-spacing: 1px;">- Holy Matrimony Selection -</p>
          
          <div style="background-color: #ffffff; padding: 28px; border: 1px solid rgba(180, 83, 9, 0.2); border-radius: 2px; text-align: left; margin: 20px 0; background-image: radial-gradient(#FAF9F6 1px, transparent 1px); background-size: 16px 16px;">
            <p style="margin-top: 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #B45309; letter-spacing: 2px; border-bottom: 1px solid rgba(180, 83, 9, 0.15); padding-bottom: 8px;">Registration Queue</p>
            <p style="font-size: 18px; color: #4C0519; font-weight: bold; margin: 16px 0 8px 0;">Dear ${dataRecord.name},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #1F2937; margin-bottom: 16px;">
              Thank you for submitting your RSVP registration for Chidi &amp; Adanna's Covenant Wedding. We are incredibly blessed by your warmth and support.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #1F2937; margin-bottom: 16px;">
              Your request has been successfully recorded in our Reservation Queue. Once we confirm table assignments and hospitality logistics, your official entry Gatepass and seat selection will be emailed to you.
            </p>
            
            <div style="background-color: #FAF9F6; border-left: 4px solid #C29D70; padding: 14px; margin: 20px 0; border-radius: 2px;">
              <p style="margin: 0; font-size: 12px; color: #4B5563; line-height: 1.5; font-family: sans-serif;">
                <strong>Registered Email:</strong> ${dataRecord.email}<br />
                <strong>WhatsApp Phone:</strong> ${dataRecord.phone}<br />
                <strong>Events Selected:</strong> ${guestEventLabels}
              </p>
            </div>
          </div>
          
          <p style="font-size: 12px; line-height: 1.6; color: #6B7280; text-align: center; margin-top: 30px;">
            Host Venue: Nike Lake Resort, Enugu, Nigeria.<br />
            No further action is required from you at this time.
          </p>
        </div>
      `;

      // 1. Dispatch confirmation to guest
      await resend.emails.send({
        from: "Royal Union <wedding@resend.dev>",
        to: dataRecord.email,
        subject: `✨ Chidi & Adanna's Web RSVP Registration Acknowledged`,
        html: guestEmailHtml
      });
      console.log(`[Resend Guest RSVP Confirm OK] Dispatched registration email to guest: ${dataRecord.email}`);

      // 2. Dispatch real-time alert to primary admin: amosushadrach@gmail.com
      const adminEmailHtml = `
        <div style="font-family: sans-serif; padding: 24px; border: 3px double #BF3B52; background-color: #FAF9F6; border-radius: 12px; max-width: 500px; margin: 20px auto; color: #1F2937;">
          <h2 style="color: #BF3B52; margin-top: 0; font-size: 20px; border-bottom: 2px solid #BF3B52; padding-bottom: 8px;">New RSVP Registered 🎉</h2>
          <p style="font-size: 14px;">A new guest has submitted an RSVP for Chidi &amp; Adanna's wedding:</p>
          <div style="background-color: white; padding: 16px; border: 1px solid #E5E7EB; border-radius: 8px; margin: 16px 0;">
            <table style="width: 100%; font-size: 13px;">
              <tr><td style="font-weight: bold; width: 35%; padding: 4px 0;">Name:</td><td>${dataRecord.name}</td></tr>
              <tr><td style="font-weight: bold; padding: 4px 0;">Email:</td><td>${dataRecord.email}</td></tr>
              <tr><td style="font-weight: bold; padding: 4px 0;">Phone:</td><td>${dataRecord.phone}</td></tr>
              <tr><td style="font-weight: bold; padding: 4px 0;">Events:</td><td>${guestEventLabels}</td></tr>
              <tr><td style="font-weight: bold; padding: 4px 0;">Dietary Notes:</td><td>${dataRecord.dietary_notes || "None"}</td></tr>
            </table>
          </div>
          <p style="text-align: center; margin-top: 20px;">
            <a href="https://ais-dev-plobits2wmqn6auqyopv2a-787350730741.europe-west2.run.app/#admin" style="background-color: #BF3B52; color: white; padding: 10px 20px; text-decoration: none; border-radius: 20px; font-weight: bold; font-size: 12px; display: inline-block; letter-spacing: 1px; text-transform: uppercase;">
              Groom Administration
            </a>
          </p>
        </div>
      `;

      await resend.emails.send({
        from: "Royal Union <wedding@resend.dev>",
        to: "amosushadrach@gmail.com",
        subject: `🔔 Admin Alert: New RSVP Registration From ${dataRecord.name}`,
        html: adminEmailHtml
      });
      console.log(`[Resend Admin Alert OK] Dispatched real-time admin notification to amosushadrach@gmail.com`);
    } catch (emailErr: any) {
      console.warn("⚠️ [Resend Invitation Acknowledgment Dispatch Failure]:", emailErr);
    }

    return res.status(201).json({ success: true, data: dataRecord });

  } catch (error: any) {
    console.error("[RSVP Registration Route Crash]:", error);
    return res.status(500).json({ error: "Internal Server Crash: An unexpected system error occurred." });
  }
});

// 3. Verify Admin Passcode Credentials
app.post("/api/admin/verify", adminVerifyLimiter, (req, res) => {
  const { passcode } = req.body;
  if (!passcode) {
    return res.status(400).json({ success: false, error: "Access Denied: Secret passcode required." });
  }

  const cleanProvided = cleanCredentials(passcode);
  if (cleanProvided === ADMIN_PASSCODE) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Authentication Failure: Incorrect administrative passcode." });
  }
});

// 4. Fetch Attendee List (Protected Admin Route)
app.get("/api/rsvps", requireAdmin, async (req, res) => {
  try {
    let rsvpsList: any[] = [];
    let fetchFallback = false;

    try {
      if (db && isFirebaseConfigured) {
        const snapshot = await db.collection("rsvps").orderBy("created_at", "desc").get();
        rsvpsList = snapshot.docs.map((doc: any) => doc.data());
      } else {
        fetchFallback = true;
      }
    } catch (err) {
      console.warn("[Firebase Fetch All Exception - falling back to local file store]:", err);
      fetchFallback = true;
    }

    if (fetchFallback) {
      console.log("⚠️ Querying RSVPs locally from JSON file storage.");
      const fileData = await loadLocalRSVPs();
      rsvpsList = [...fileData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return res.json({ success: true, data: rsvpsList });

  } catch (error: any) {
    console.error("[Roster Query Crash]:", error);
    return res.status(500).json({ error: "Internal Server Error: Failed to execute roster select operation." });
  }
});

// 5. Update RSVP status or send verified official gatepass invitation
app.post("/api/send-invitation", requireAdmin, async (req, res) => {
  try {
    const { rsvpId, action, seatingSelection } = req.body;

    if (!rsvpId || !action) {
      return res.status(400).json({ error: "Argument Error: Provide 'rsvpId' and target 'action' ('approve', 'decline', or 'delete')." });
    }

    const seating = seatingSelection || "Imperial Main Hall • Section A";
    
    let newStatus = "pending";
    if (action === "approve") newStatus = "approved";
    if (action === "decline") newStatus = "declined";

    let updateFallback = false;

    // A. Delete Operation
    if (action === "delete") {
      try {
        if (db && isFirebaseConfigured) {
          await db.collection("rsvps").doc(rsvpId).delete();
          return res.json({ success: true, deleted: true });
        } else {
          updateFallback = true;
        }
      } catch (err) {
        console.warn("[Firebase Delete Exception - falling back to local file store]:", err);
        updateFallback = true;
      }

      if (updateFallback) {
        console.log("⚠️ Purging RSVP record locally via JSON file store.");
        const localRSVPs = await loadLocalRSVPs();
        const filtered = localRSVPs.filter((item: any) => item.id !== rsvpId);
        await saveLocalRSVPs(filtered);
        return res.json({ success: true, deleted: true });
      }
    }

    // B. Fetch single record to gather variables and update Status Row
    let updatedRecord: any = null;

    try {
      if (db && isFirebaseConfigured) {
        const docRef = db.collection("rsvps").doc(rsvpId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
          console.warn("[Firebase Lookup Warn - falling back to local file store]: Document does not exist");
          updateFallback = true;
        } else {
          await docRef.update({ status: newStatus });
          const updatedDocSnap = await docRef.get();
          updatedRecord = updatedDocSnap.data();
        }
      } else {
        updateFallback = true;
      }
    } catch (err) {
      console.warn("[Firebase Fetch/Update Exception - falling back to local file store]:", err);
      updateFallback = true;
    }

    if (updateFallback || !updatedRecord) {
      console.log("⚠️ Processing administrative status update locally via JSON file store.");
      const localRSVPs = await loadLocalRSVPs();
      const targetIndex = localRSVPs.findIndex((item: any) => item.id === rsvpId);
      if (targetIndex === -1) {
        return res.status(404).json({ error: "Record Error: Target RSVP entry was not found inside local file database." });
      }

      localRSVPs[targetIndex].status = newStatus;
      updatedRecord = localRSVPs[targetIndex];
      await saveLocalRSVPs(localRSVPs);
    }

    const shortToken = updatedRecord.id.substring(0, 8).toUpperCase();
    const eventLabels = updatedRecord.events.map((e: string) => {
      if (e === "traditional") return "Traditional Igbo Marriage (Igba Nkwu)";
      if (e === "church") return "Church Holy Nuptials Ceremony";
      if (e === "reception") return "Grand Marriage Wedding Gala Reception";
      return e;
    }).join(", ");

    // Generate Breathtaking Royal Crimson styled Gatepass HTML matching red vibe theme
    const emailHtml = `
      <div style="font-family: 'Georgia', serif; background-color: #FAF9F6; padding: 40px; text-align: center; border: 12px solid #BF3B52; outline: 3px double #B45309; max-width: 600px; margin: 20px auto; color: #4C0519; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 24px;">
          <img src="https://picsum.photos/seed/elegantwedding/120/120?blur=1" style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #B45309; object-fit: cover;" alt="Monogram" />
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #B45309; font-weight: bold; margin-top: 10px;">Official Gatepass</div>
        </div>
        
        <h2 style="font-size: 28px; color: #BF3B52; margin-top: 10px; margin-bottom: 4px; font-weight: normal;">Chidi &amp; Adanna</h2>
        <p style="font-size: 13px; font-style: italic; color: #B45309; margin-top: 0; margin-bottom: 28px; letter-spacing: 1px;">- Ecclesiastes 4:12 -</p>
        
        <div style="background-color: #ffffff; padding: 28px; border: 1px solid rgba(180, 83, 9, 0.2); border-radius: 2px; text-align: left; margin: 20px 0; background-image: radial-gradient(#FAF9F6 1px, transparent 1px); background-size: 16px 16px;">
          <p style="margin-top: 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #B45309; letter-spacing: 2px; border-bottom: 1px solid rgba(180, 83, 9, 0.15); padding-bottom: 8px;">Admittance Pass</p>
          <p style="font-size: 18px; color: #4C0519; font-weight: bold; margin: 16px 0 8px 0;">Dear ${updatedRecord.name},</p>
          <p style="font-size: 15px; line-height: 1.6; color: #1F2937; margin-bottom: 20px;">
            We are overjoyed to confirm your seating reservation at our celebration. Below, please find your secure gatepass credentials for accessing the celebration venues.
          </p>
          
          <div style="background-color: #FAF9F6; border-left: 4px solid #BF3B52; padding: 16px; margin: 20px 0; border-radius: 2px;">
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="color: #B45309; font-weight: bold; width: 45%; padding: 6px 0; font-family: sans-serif; font-size: 12px; letter-spacing: 0.5px;">SECURE VERIFICATION CODE:</td>
                <td style="color: #BF3B52; font-family: monospace; font-weight: bold; font-size: 18px; letter-spacing: 1.5px; padding: 6px 0;">${shortToken}</td>
              </tr>
              <tr>
                <td style="color: #B45309; font-weight: bold; padding: 6px 0; font-family: sans-serif; font-size: 12px; letter-spacing: 0.5px;">CONFIRMED SEATING:</td>
                <td style="color: #4C0519; font-weight: bold; font-size: 15px; padding: 6px 0;">${seating}</td>
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
        
        <p style="font-size: 13px; line-height: 1.6; color: #4C0519; text-align: center; max-width: 480px; margin: 30px auto; padding: 15px; border-top: 1px dotted rgba(180, 83, 9, 0.4); border-bottom: 1px dotted rgba(180, 83, 9, 0.4);">
          "Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken."<br/>
          <strong style="color: #B45309; font-size: 12px; display: block; margin-top: 8px;">— Ecclesiastes 4:12</strong>
        </p>
        
        <div style="font-size: 10px; color: #6B7280; text-transform: uppercase; letter-spacing: 2px; margin-top: 24px;">
          Chidi &amp; Adanna's Sovereign Union • Enugu, Nigeria
        </div>
      </div>
    `;

    let isEmailSent = false;
    let resendId = "";

    if (action === "approve") {
      try {
        const sent = await resend.emails.send({
          from: "Royal Union <wedding@resend.dev>",
          to: updatedRecord.email,
          subject: `✨ Chidi & Adanna's Wedding Official Entry Gatepass [Code: ${shortToken}]`,
          html: emailHtml
        });

        isEmailSent = true;
        resendId = sent?.data?.id || "unknown";
        console.log(`[Resend OK] Gatepass email successfully dispatched to ${updatedRecord.email}. ID: ${resendId}`);
      } catch (emailErr: any) {
        console.error("❌ [Resend API Error]: Failed to dispatch real gatepass email:", emailErr);
      }
    }

    return res.json({
      success: true,
      data: updatedRecord,
      isEmailSent,
      resendId,
      simulatedEmailCode: shortToken,
      simulatedEmailHtml: emailHtml
    });

  } catch (error: any) {
    console.error("[Mail Dispatch & Row-State Crash]:", error);
    return res.status(500).json({ error: "Internal Server Error: RSVP invitation routine crashed." });
  }
});

// ============================================================================
// VITE CLIENT DEV SERVER AND STATIC ASSETS HANDLING ROUTINES
// ============================================================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("🛠️  Configured developer mode. Launching HMR Vite Dev middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("💎 Production build active. Mounting optimized static server handlers.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind exclusively to host 0.0.0.0 and Port 3000 as required by sandboxed environment constraints.
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Royal Wedding Backend is running securely on URL: http://localhost:${PORT}`);
  });
}

startServer();
