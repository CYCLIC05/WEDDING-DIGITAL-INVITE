import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabase, getResend, checkAdminAuth, setCors, eventLabel, isSmtpConfigured, sendSmtpEmail } from "./_lib.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!checkAdminAuth(req)) {
    return res.status(401).json({ error: "Unauthorized: invalid passcode." });
  }

  try {
    const { rsvpId, action, seatingSelection } = req.body || {};

    if (!rsvpId || !action) {
      return res.status(400).json({ error: "Provide rsvpId and action (approve/decline/delete)." });
    }

    const supabase = getSupabase();
    if (!supabase) return res.status(503).json({ error: "Database not configured. Supabase credentials missing." });

    const seating = seatingSelection || "Imperial Main Hall • Section A";

    if (action === "delete") {
      const { error: deleteError } = await supabase
        .from("rsvps")
        .delete()
        .eq("id", rsvpId);

      if (deleteError) throw deleteError;
      return res.json({ success: true, deleted: true });
    }

    const newStatus = action === "approve" ? "approved" : action === "decline" ? "declined" : "pending";

    const { data: record, error: updateError } = await supabase
      .from("rsvps")
      .update({ status: newStatus })
      .eq("id", rsvpId)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({ error: `Database update error: ${updateError.message}` });
    }
    if (!record) {
      return res.status(404).json({ error: "RSVP record not found." });
    }

    const shortToken = record.id.substring(0, 8).toUpperCase();
    const eventLabels = record.events.map(eventLabel).join(", ");
    const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    let isEmailSent = false;
    let resendId = "";
    let smtpMessageId = "";
    let emailMethod = "none";
    let smtpError = "";

    const gatepassHtml = `
      <div style="font-family:'Georgia',serif;background:#FAF9F6;padding:40px;border:12px solid #580F6E;outline:3px double #580F6E;max-width:600px;margin:20px auto;color:#111827;border-radius:4px;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:3px;color:#580F6E;font-weight:bold;">Official Gatepass</div>
        </div>
        <h2 style="font-size:28px;color:#580F6E;text-align:center;font-weight:normal;margin-bottom:4px;">Tobi &amp; Ayomide</h2>
        <p style="font-size:13px;font-style:italic;color:#580F6E;text-align:center;margin-top:0;margin-bottom:28px;letter-spacing:1px;">— Proverbs 18:22 —</p>
        <div style="background:#fff;padding:28px;border:1px solid rgba(88,15,110,0.2);border-radius:2px;text-align:left;margin:20px 0;">
          <p style="font-size:18px;color:#111827;font-weight:bold;margin:0 0 12px;">Dear ${record.name},</p>
          <p style="font-size:15px;line-height:1.6;color:#1F2937;margin-bottom:20px;">
            We are overjoyed to confirm your seating reservation. Please find your secure gatepass credentials below.
          </p>
          <div style="background:#FAF9F6;border-left:4px solid #580F6E;padding:16px;margin:20px 0;border-radius:2px;">
            <table style="width:100%;font-size:14px;border-collapse:collapse;">
               <tr>
                <td style="color:#580F6E;font-weight:bold;width:45%;padding:6px 0;font-family:sans-serif;font-size:12px;">VERIFICATION CODE:</td>
                <td style="color:#580F6E;font-family:monospace;font-weight:bold;font-size:18px;letter-spacing:1.5px;padding:6px 0;">${shortToken}</td>
              </tr>
              <tr>
                <td style="color:#580F6E;font-weight:bold;padding:6px 0;font-family:sans-serif;font-size:12px;">CONFIRMED SEATING:</td>
                <td style="color:#111827;font-weight:bold;font-size:15px;padding:6px 0;">${seating}</td>
              </tr>
              <tr>
                <td style="color:#580F6E;font-weight:bold;padding:6px 0;font-family:sans-serif;font-size:12px;">EVENTS:</td>
                <td style="color:#1F2937;font-size:13px;line-height:1.4;padding:6px 0;">${eventLabels}</td>
               </tr>
            </table>
          </div>
          <p style="font-size:13px;line-height:1.5;color:#4B5563;margin-top:15px;font-style:italic;">
            * Kindly present a digital or printed copy of this pass at all security check stations.
          </p>
        </div>
        <p style="font-size:13px;line-height:1.6;color:#111827;text-align:center;max-width:480px;margin:30px auto;padding:15px;border-top:1px dotted rgba(88,15,110,0.4);border-bottom:1px dotted rgba(88,15,110,0.4);">
          "He who finds a wife finds a good thing and obtains favor from the Lord."<br/>
          <strong style="color:#580F6E;font-size:12px;display:block;margin-top:8px;">— Proverbs 18:22</strong>
        </p>
        <div style="font-size:10px;color:#6B7280;text-transform:uppercase;letter-spacing:2px;margin-top:24px;text-align:center;">
          Tobi &amp; Ayomide's Covenant Wedding • Abuja, Nigeria
        </div>
      </div>`;

    if (action === "approve") {
      if (isSmtpConfigured()) {
        try {
          const info = await sendSmtpEmail(
            record.email,
            `✨ Tobi & Ayomide's Wedding Official Entry Gatepass [Code: ${shortToken}]`,
            gatepassHtml
          );
          isEmailSent = true;
          smtpMessageId = info.messageId;
          emailMethod = "smtp";
          console.log(`[SMTP OK] Gatepass sent to ${record.email}`);
        } catch (smtpErr: any) {
          smtpError = smtpErr.message || String(smtpErr);
          console.error("❌ [SMTP Error] Failed, falling back to Resend:", smtpErr);
        }
      }

      // Fallback to Resend
      if (!isEmailSent) {
        try {
          const resend = getResend();
          const sent = await resend.emails.send({
            from: `Royal Union <${fromAddress}>`,
            to: record.email,
            subject: `✨ Tobi & Ayomide's Wedding — Official Entry Gatepass [${shortToken}]`,
            html: gatepassHtml,
          });
          isEmailSent = true;
          resendId = sent?.data?.id || "unknown";
          emailMethod = "resend";
          console.log(`[Resend OK] Gatepass sent to ${record.email}`);
        } catch (emailErr) {
          console.error("❌ Gatepass email failed:", emailErr);
        }
      }
    }

    return res.json({
      success: true,
      data: record,
      isEmailSent,
      resendId,
      smtpMessageId,
      emailMethod,
      smtpError,
      simulatedEmailCode: shortToken,
    });

  } catch (err: any) {
    console.error("[POST /api/send-invitation crash]:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}
