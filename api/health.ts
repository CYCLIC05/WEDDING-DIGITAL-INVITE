import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setCors } from "./_lib.js";

export default function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  return res.json({ status: "ok", environment: process.env.NODE_ENV || "production" });
}