import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";
import { getDb, checkAdminAuth, setCors, isSmtpConfigured } from "./_lib";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  const db = getDb();
  if (!db) {
    return res.status(503).json({ error: "Database not configured. Firestore credentials missing." });
  }

  // ============================================================================
  // GET: Fetch RSVP attendee list (Admin-protected)
  // ============================================================================
  if (req.method === "GET") {
    if (!checkAdminAuth(req)) {
      return res.status(401).json({ error: "Unauthorized: invalid passcode." });
    }

    try {
      const snapshot = await db.collection("rsvps").orderBy("created_at", "desc").get();
      const rsvpsList = snapshot.docs.map((doc: any) => doc.data());
      return res.json({
        success: true,
        data: rsvpsList,
        smtpConfigured: isSmtpConfigured()
      });
    } catch (err: any) {
      console.error("[GET /api/rsvps error]:", err);
      return res.status(500).json({ error: `Firestore fetch error: ${err.message || err}` });
    }
  }

  // ============================================================================
  // POST: Public submit RSVP
  // ============================================================================
  if (req.method === "POST") {
    try {
      const { name, email, phone, events, dietary_notes } = req.body || {};

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
        return res.status(400).json({ error: "Validation Check Failed: Choose at least one wedding event." });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check if duplicate RSVP exists in Firestore
      const duplicateSnap = await db.collection("rsvps").where("email", "==", normalizedEmail).get();
      if (!duplicateSnap.empty) {
        return res.status(400).json({ error: "Conflict Error: An RSVP registration with this email address already exists." });
      }

      const id = crypto.randomUUID();
      const created_at = new Date().toISOString();
      const dataRecord = {
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

      return res.json({
        success: true,
        message: "Your RSVP has been registered successfully!",
        data: dataRecord
      });

    } catch (err: any) {
      console.error("[POST /api/rsvps error]:", err);
      return res.status(500).json({ error: `RSVP Submission failed: ${err.message || err}` });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
