export function formatEventLabels(events: string[]) {
  return events.map((event) => {
    if (event === "traditional") return "Traditional Marriage (J.A. – Journey Aligned)";
    if (event === "church") return "Church Wedding Ceremony";
    if (event === "reception") return "Thanksgiving & Fellowship Reception";
    return event;
  });
}

export function buildInvitationEmailHtml({
  guestName,
  shortToken,
  seating,
  events,
}: {
  guestName: string;
  shortToken: string;
  seating: string;
  events: string[];
}) {
  const eventList = formatEventLabels(events).join("<br/>");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your Wedding Invitation</title>
      </head>
      <body style="margin:0;background:#f7f2eb;font-family:Georgia,serif;color:#3d2a1c;">
        <div style="max-width:640px;margin:24px auto;padding:24px;background:#fffdf9;border:1px solid #e7d8c5;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,0.08);">
          <div style="text-align:center;padding-bottom:16px;border-bottom:1px solid #e7d8c5;">
            <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#b85c4b;font-weight:bold;">Official Invitation</div>
            <h1 style="margin:8px 0 6px;font-size:28px;color:#8b3f36;font-weight:600;">Tobi & Ayomide</h1>
            <p style="margin:0;font-size:13px;color:#8f6c4e;">A celebration of love, faith, and family</p>
          </div>

          <div style="padding:24px 12px 8px;">
            <p style="margin:0 0 10px;font-size:16px;">Dear ${guestName},</p>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">
              Your reservation has been approved. We are delighted to welcome you as part of this special occasion and would be honored to have you with us.
            </p>

            <div style="background:#f8efe6;border-left:4px solid #b85c4b;padding:16px 18px;border-radius:8px;margin:18px 0;">
              <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8b3f36;font-weight:bold;margin-bottom:8px;">Invitation Details</div>
              <p style="margin:4px 0;font-size:14px;"><strong>Verification Code:</strong> <span style="font-family:monospace;color:#b85c4b;letter-spacing:1px;">${shortToken}</span></p>
              <p style="margin:4px 0;font-size:14px;"><strong>Seating:</strong> ${seating}</p>
              <p style="margin:4px 0;font-size:14px;"><strong>Events:</strong><br/>${eventList}</p>
            </div>

            <p style="margin:0 0 12px;font-size:14px;line-height:1.7;">
              Please present this invitation at the venue entrance and arrive a little early so we can welcome you warmly.
            </p>
            <p style="margin:0;font-size:14px;line-height:1.7;">
              With love,<br/><strong>Tobi & Ayomide</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
