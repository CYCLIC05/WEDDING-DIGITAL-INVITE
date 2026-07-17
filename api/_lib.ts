import { Resend } from "resend";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

let supabaseClient: SupabaseClient | null = null;
let transporter: nodemailer.Transporter | null = null;

function getSupabase(): SupabaseClient | null {
  if (supabaseClient) return supabaseClient;
  try {
    const url = process.env.SUPABASE_URL || "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";
    if (url && key) {
      supabaseClient = createClient(url, key, {
        auth: { persistSession: false },
      });
    }
  } catch (err) {
    console.error("Supabase init error:", err);
  }
  return supabaseClient;
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}

function getAdminPasscode() {
  return (process.env.SYSTEM_ADMIN_PASSCODE || "TobiAyomide2026").trim();
}

function checkAdminAuth(req: any): boolean {
  const authHeader = (req.headers["authorization"] as string) || "";
  const headerPasscode = (req.headers["x-admin-passcode"] as string) || "";
  const queryPasscode = (req.query?.passcode as string) || "";
  let provided = "";
  if (authHeader.startsWith("Bearer ")) provided = authHeader.slice(7);
  else if (headerPasscode) provided = headerPasscode;
  else if (queryPasscode) provided = queryPasscode;
  return provided.trim() === getAdminPasscode();
}

function setCors(res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Admin-Passcode");
}

function eventLabel(e: string) {
  if (e === "traditional") return "Traditional Marriage (J.A. – Journey Aligned)";
  if (e === "church") return "Church Wedding Ceremony";
  if (e === "reception") return "Thanksgiving & Fellowship Reception";
  return e;
}

function isSmtpConfigured(): boolean {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_PASS || process.env.SMTP_PASS;
  return !!(user && pass && user.trim() !== "" && pass.trim() !== "");
}

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_PASS || process.env.SMTP_PASS;
  if (!user || !pass) {
    throw new Error("Gmail SMTP Credentials missing.");
  }
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
  });
  return transporter;
}

async function sendSmtpEmail(
  to: string,
  subject: string,
  htmlBody: string
): Promise<{ messageId: string }> {
  const activeTransporter = getTransporter();
  const fromUser = process.env.GMAIL_USER || process.env.SMTP_USER || "";
  const mailOptions = {
    from: `"Tobi & Ayomide's Royal Wedding" <${fromUser}>`,
    to: to,
    subject: subject,
    html: htmlBody,
  };
  const info = await activeTransporter.sendMail(mailOptions);
  return { messageId: info.messageId };
}

export { getSupabase, getResend, getAdminPasscode, checkAdminAuth, setCors, eventLabel, isSmtpConfigured, sendSmtpEmail };