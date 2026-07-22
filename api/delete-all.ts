import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabase, checkAdminAuth, setCors } from "./_lib.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: "Unauthorized: invalid passcode." });
  }

  try {
    const supabase = getSupabase();
    if (!supabase) return res.status(503).json({ error: "Database not configured. Supabase credentials missing." });

    const { error: deleteError } = await supabase
      .from("rsvps")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all rows

    if (deleteError) throw deleteError;

    return res.json({ success: true, message: "All registrations have been deleted." });
  } catch (err: any) {
    console.error("[POST /api/delete-all error]:", err);
    return res.status(500).json({ error: `Failed to delete registrations: ${err.message || err}` });
  }
}
