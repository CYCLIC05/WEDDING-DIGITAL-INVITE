import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

/**
 * Lazy initialization helper for the Nodemailer SMTP transporter.
 * Fails gracefully on first use with descriptive error messages if credentials are missing.
 */
function getTransporter(): nodemailer.Transporter {
  if (transporter) {
    return transporter;
  }

  // Support GMAIL_USER / GMAIL_PASS or SMTP_USER / SMTP_PASS
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_PASS || process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      "Gmail SMTP Credentials missing. Please configure GMAIL_USER (or SMTP_USER) and GMAIL_PASS (or SMTP_PASS) in the environment settings."
    );
  }

  // Create transporter specifically configured for Gmail SMTP
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
  });

  return transporter;
}

/**
 * Sends an email using Gmail SMTP via Nodemailer
 * @param to Recipient's email address
 * @param subject Subject of the email
 * @param htmlBody HTML body content of the email
 * @param attachments Optional array of nodemailer attachments
 */
export async function sendSmtpEmail(
  to: string,
  subject: string,
  htmlBody: string,
  attachments?: any[]
): Promise<{ messageId: string }> {
  const activeTransporter = getTransporter();
  const fromUser = process.env.GMAIL_USER || process.env.SMTP_USER || "";

  const mailOptions: any = {
    from: `"Tobi & Ayomide's Royal Wedding" <${fromUser}>`,
    to: to,
    subject: subject,
    html: htmlBody,
  };

  if (attachments) {
    mailOptions.attachments = attachments;
  }

  try {
    const info = await activeTransporter.sendMail(mailOptions);
    console.log(`[SMTP Success] Email sent to ${to}. MessageId: ${info.messageId}`);
    return { messageId: info.messageId };
  } catch (error: any) {
    console.error(`[SMTP Error] Failed to send email to ${to}:`, error);
    throw new Error(`SMTP Mailer failed: ${error.message || error}`);
  }
}

/**
 * Checks if Gmail SMTP is configured in the environment variables
 */
export function isSmtpConfigured(): boolean {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_PASS || process.env.SMTP_PASS;
  return !!(user && pass && user.trim() !== "" && pass.trim() !== "");
}
