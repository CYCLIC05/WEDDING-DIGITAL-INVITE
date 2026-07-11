import test from "node:test";
import assert from "node:assert/strict";
import { buildInvitationEmailHtml, formatEventLabels } from "./inviteEmail.ts";

test("formats wedding event labels for invitation content", () => {
  assert.deepEqual(formatEventLabels(["traditional", "church", "reception"]), [
    "Traditional Marriage (J.A. – Journey Aligned)",
    "Church Wedding Ceremony",
    "Thanksgiving & Fellowship Reception",
  ]);
});

test("builds a polished invitation email template", () => {
  const html = buildInvitationEmailHtml({
    guestName: "Ada",
    shortToken: "ABC12345",
    seating: "Imperial Main Hall • Section A",
    events: ["traditional", "church"],
  });

  assert.match(html, /Your Wedding Invitation/i);
  assert.match(html, /Ada/i);
  assert.match(html, /ABC12345/i);
  assert.match(html, /Imperial Main Hall/i);
});
