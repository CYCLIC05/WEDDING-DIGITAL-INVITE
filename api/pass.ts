import type { Request, Response } from "express";
import { getSupabase, setCors } from "./_lib.js";

export default async function handler(req: Request, res: Response) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const supabase = getSupabase();
  if (!supabase) {
    return res.status(503).json({ error: "Database not configured. Supabase credentials missing." });
  }

  try {
    const { email, code } = req.body || {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Please provide the email address you registered with." });
    }

    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: "No RSVP registration was found for this email. Please check and try again." });
    }

    // Optional extra verification: the 8-character code printed on the pass
    if (code && typeof code === "string") {
      const expected = data.id.substring(0, 8).toUpperCase();
      if (code.trim().toUpperCase() !== expected) {
        return res.status(403).json({ error: "The verification code provided does not match this registration." });
      }
    }

    return res.json({ success: true, data });
  } catch (err: any) {
    console.error("[POST /api/pass error]:", err);
    return res.status(500).json({ error: `Pass lookup failed: ${err.message || err}` });
  }
}
