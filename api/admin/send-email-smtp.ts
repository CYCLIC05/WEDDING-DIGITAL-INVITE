import type { VercelRequest, VercelResponse } from "@vercel/node";
import { checkAdminAuth, setCors, isSmtpConfigured, sendSmtpEmail } from "../_lib.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: "Unauthorized: invalid passcode." });
  }

  try {
    const { recipients, subject, htmlBody } = req.body || {};

    if (!recipients || !subject || !htmlBody) {
      return res.status(400).json({ error: "Missing required parameters: 'recipients', 'subject', or 'htmlBody'." });
    }

    const emailList = Array.isArray(recipients) ? recipients : [recipients];

    if (emailList.length === 0) {
      return res.status(400).json({ error: "Recipients list is empty." });
    }

    if (!isSmtpConfigured()) {
      return res.status(400).json({
        error: "Gmail SMTP is not configured on the backend. Please declare GMAIL_USER and GMAIL_PASS environment variables."
      });
    }

    const results = {
      successCount: 0,
      errorCount: 0,
      details: [] as any[]
    };

    for (const email of emailList) {
      try {
        const info = await sendSmtpEmail(email.trim(), subject, htmlBody);
        results.successCount++;
        results.details.push({ email, success: true, messageId: info.messageId });
      } catch (err: any) {
        results.errorCount++;
        results.details.push({ email, success: false, error: err.message || err });
      }
    }

    return res.json({
      success: true,
      summary: `Dispatched ${results.successCount} email(s) successfully, ${results.errorCount} failed.`,
      ...results
    });

  } catch (error: any) {
    console.error("[SMTP Bulk Mailer Serverless Error]:", error);
    return res.status(500).json({ error: `Internal Server Error: ${error.message || error}` });
  }
}
