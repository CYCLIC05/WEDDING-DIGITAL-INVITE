import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminPasscode, setCors } from "../_lib.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { passcode } = req.body || {};

  if (!passcode) {
    return res.status(400).json({ success: false, error: "Passcode required." });
  }

  if (passcode.trim() === getAdminPasscode()) {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false, error: "Incorrect passcode." });
}