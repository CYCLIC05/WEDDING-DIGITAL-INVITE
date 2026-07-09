import { getGmailAccessToken } from "./googleAuth.ts";

/**
 * Encodes a string to base64url format as required by the Gmail API
 */
function encodeBase64Url(str: string): string {
  // Use btoa with unescape/encodeURIComponent to support UTF-8 characters safely
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Sends an email using the Gmail API
 * @param to Recipient's email address
 * @param subject Subject of the email
 * @param htmlBody HTML body content of the email
 * @param customToken Optional custom OAuth token (uses cached one if omitted)
 */
export async function sendGmailEmail(
  to: string,
  subject: string,
  htmlBody: string,
  customToken?: string
): Promise<any> {
  const token = customToken || getGmailAccessToken();
  if (!token) {
    throw new Error("Google Workspace account not connected. Please log in first.");
  }

  // Construct MIME message (RFC 2822 compliant)
  const mailParts = [
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "Content-Transfer-Encoding: base64",
    "",
    btoa(unescape(encodeURIComponent(htmlBody)))
  ];

  const emailMime = mailParts.join("\r\n");
  const rawEncoded = encodeBase64Url(emailMime);

  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        raw: rawEncoded
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Gmail API error (${response.status})`;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.error && parsed.error.message) {
        errorMessage = parsed.error.message;
      }
    } catch (e) {}
    throw new Error(errorMessage);
  }

  return await response.json();
}
