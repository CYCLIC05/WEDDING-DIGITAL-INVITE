import type { Request, Response } from "express";
import { setCors } from "./_lib.js";

export default function handler(req: Request, res: Response) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  return res.json({ status: "ok", environment: process.env.NODE_ENV || "production" });
}