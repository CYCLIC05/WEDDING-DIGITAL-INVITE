import React, { useState } from "react";

// ─── Bespoke SVG icons ────────────────────────────────────────────────────────
const PassSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M8 8h8M8 12h8M8 16h5" />
    <circle cx="17" cy="15" r="2" />
  </svg>
);
const SearchSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const DownloadSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const SpinnerSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 animate-spin mr-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

function eventShortLabels(events: string[]): string {
  return events
    .map((e) => {
      if (e === "traditional") return "Traditional Marriage";
      if (e === "church") return "Church Wedding Ceremony";
      if (e === "reception") return "Thanksgiving & Fellowship Reception";
      return e;
    })
    .join(" & ");
}

function extractLocation(dietaryNotes: string | undefined): string {
  if (!dietaryNotes) return "";
  const match = dietaryNotes.match(/Location:\s*([^|]+)/i);
  return match ? match[1].trim() : "";
}

// ─── Canvas pass-image generator (2x resolution for crisp output) ────────────
function buildPassCanvas(record: any): HTMLCanvasElement {
  const SCALE = 2;
  const W = 800;
  const H = 1160;
  const canvas = document.createElement("canvas");
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);
  ctx.textAlign = "center";

  const PURPLE = "#580F6E";
  const DARK = "#1E293B";
  const SLATE = "#94A3B8";
  const CREAM = "#FAF8FF";

  const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  };

  const wrapText = (text: string, maxWidth: number): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  };

  const label = (text: string, x: number, y: number) => {
    ctx.fillStyle = SLATE;
    ctx.font = "bold 13px 'Trebuchet MS', Arial, sans-serif";
    (ctx as any).letterSpacing = "2px";
    ctx.fillText(text, x, y);
    (ctx as any).letterSpacing = "0px";
  };

  // Background
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, W, H);

  // Outer + inner frames
  ctx.strokeStyle = PURPLE;
  ctx.lineWidth = 4;
  roundRect(20, 20, W - 40, H - 40, 24);
  ctx.stroke();
  ctx.strokeStyle = "rgba(88,15,110,0.35)";
  ctx.lineWidth = 1.5;
  roundRect(34, 34, W - 68, H - 68, 18);
  ctx.stroke();

  // Monogram
  ctx.beginPath();
  ctx.arc(W / 2, 150, 42, 0, Math.PI * 2);
  ctx.fillStyle = PURPLE;
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 34px Georgia, 'Times New Roman', serif";
  ctx.fillText("T&A", W / 2, 161);

  // Title
  ctx.fillStyle = PURPLE;
  ctx.font = "bold 17px 'Trebuchet MS', Arial, sans-serif";
  (ctx as any).letterSpacing = "4px";
  ctx.fillText("OFFICIAL ADMITTANCE PASS", W / 2, 225);
  (ctx as any).letterSpacing = "0px";

  // Couple names
  ctx.fillStyle = DARK;
  ctx.font = "bold 54px Georgia, 'Times New Roman', serif";
  ctx.fillText("Tobi & Ayomide", W / 2, 300);

  ctx.fillStyle = SLATE;
  ctx.font = "20px Georgia, serif";
  ctx.fillText("September 2026 • Abuja, Nigeria", W / 2, 338);

  // Divider
  ctx.strokeStyle = "rgba(88,15,110,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(300, 360);
  ctx.lineTo(500, 360);
  ctx.stroke();

  // Details panel
  const boxX = 120;
  const boxW = W - 240;
  const shortCode = record.id.substring(0, 8).toUpperCase();
  const location = extractLocation(record.dietary_notes);
  const eventText = eventShortLabels(record.events);
  const status = record.status === "approved" ? "APPROVED" : record.status.toUpperCase();

  ctx.font = "22px Georgia, serif";
  const eventLines = wrapText(eventText, boxW - 80);

  const boxY = 395;
  const boxH = 500;
  ctx.fillStyle = "#FFFFFF";
  ctx.strokeStyle = "rgba(88,15,110,0.25)";
  ctx.lineWidth = 1;
  roundRect(boxX, boxY, boxW, boxH, 12);
  ctx.fill();
  ctx.stroke();

  let cursorY = boxY + 55;

  // Guest admitted
  label("GUEST ADMITTED", W / 2, cursorY);
  ctx.fillStyle = DARK;
  ctx.font = "bold 28px Georgia, serif";
  ctx.fillText(record.name, W / 2, cursorY + 34);
  cursorY += 78;

  // Verification code
  label("GATE VERIFICATION CODE", W / 2, cursorY);
  ctx.fillStyle = PURPLE;
  ctx.font = "bold 34px 'Courier New', monospace";
  ctx.fillText(shortCode, W / 2, cursorY + 40);
  cursorY += 84;

  // Pass status
  label("PASS STATUS", W / 2, cursorY);
  const chipW = 150;
  const chipH = 30;
  const chipX = W / 2 - chipW / 2;
  const chipY = cursorY + 12;
  ctx.fillStyle = record.status === "approved" ? "#047857" : "#B45309";
  roundRect(chipX, chipY, chipW, chipH, 15);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 13px 'Trebuchet MS', Arial, sans-serif";
  ctx.fillText(status, W / 2, chipY + 20);
  cursorY = chipY + chipH + 36;

  // Traveling from (if provided)
  if (location) {
    label("TRAVELING FROM", W / 2, cursorY);
    ctx.fillStyle = DARK;
    ctx.font = "bold 20px Georgia, serif";
    ctx.fillText(location, W / 2, cursorY + 26);
    cursorY += 62;
  }

  // Confirmed events
  label("CONFIRMED EVENTS", W / 2, cursorY);
  ctx.fillStyle = "#334155";
  ctx.font = "20px Georgia, serif";
  const eventY0 = cursorY + 28;
  eventLines.forEach((line, i) => {
    ctx.fillText(line, W / 2, eventY0 + i * 26);
  });

  // Verse footer
  ctx.fillStyle = "#64748B";
  ctx.font = "italic 20px Georgia, serif";
  ctx.fillText("\u201CTherefore what God has joined together, let no one separate.\u201D", W / 2, 1040);
  ctx.fillStyle = PURPLE;
  ctx.font = "bold 14px 'Trebuchet MS', Arial, sans-serif";
  ctx.fillText("— Matthew 19:6", W / 2, 1072);

  // Footer
  ctx.fillStyle = SLATE;
  ctx.font = "12px 'Trebuchet MS', Arial, sans-serif";
  (ctx as any).letterSpacing = "2px";
  ctx.fillText("TOBI & AYOMIDE'S COVENANT WEDDING • ABUJA, NIGERIA", W / 2, 1120);
  (ctx as any).letterSpacing = "0px";

  return canvas;
}

export function MyPass() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setRecord(null);
    setLoading(true);

    try {
      const response = await fetch("/api/pass/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMessage = `HTTP ${response.status}: ${text}`;
        try {
          const parsed = JSON.parse(text);
          if (parsed && parsed.error) errorMessage = parsed.error;
        } catch (err) {
          // not JSON, keep status text
        }
        throw new Error(errorMessage);
      }

      const resData = await response.json();
      setRecord(resData.data);
    } catch (err: any) {
      setError(err.message || "Failed to retrieve your pass. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!record) return;
    setDownloading(true);
    try {
      const canvas = buildPassCanvas(record);
      const safeName = (record.name || "Guest").replace(/[^a-zA-Z0-9]+/g, "_");
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `Tobi_Ayomide_Gatepass_${safeName}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      setError(err.message || "Could not generate your pass image.");
    } finally {
      setDownloading(false);
    }
  };

  const isApproved = record?.status === "approved";
  const shortCode = record?.id ? record.id.substring(0, 8).toUpperCase() : "";

  return (
    <section id="my-pass-section" className="relative py-24 px-6 bg-[#FAF8FF] dot-pattern border-t border-b border-[#4A0E4E]/10 select-none overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 L32 16 M16 0 L16 32' stroke='%23580F6E' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/svg%3E")`, backgroundSize: '32px 32px' }} />
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-[#580F6E]/10 text-[#580F6E] rounded-full mb-3">
            <PassSVG />
          </div>
          <span className="text-xs text-[#4A0E4E] font-semibold uppercase tracking-[0.3em] block mb-1">
            Guest Access
          </span>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl tracking-tight font-bold">
            My Wedding Pass
          </h2>
          <div className="w-12 h-[1px] bg-[#580F6E] mx-auto mt-3 mb-3"></div>
          <p className="text-base leading-relaxed text-slate-500 max-w-md mx-auto">
            Once your attendance is approved, view and download your official pass right here.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-900 text-sm rounded-r-xl leading-relaxed mb-6">
            {error}
          </div>
        )}

        {!record ? (
          <form onSubmit={handleLookup} className="space-y-6 bg-white border border-[#580F6E]/40 rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute inset-1.5 border border-[#580F6E]/25 rounded-[1.75rem] pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="pass-email-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                  Email Used At Registration <span className="text-red-500">*</span>
                </label>
                <input
                  id="pass-email-input"
                  type="email"
                  required
                  placeholder="e.g. name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="pass-code-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                  Verification Code <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="pass-code-input"
                  type="text"
                  placeholder="e.g. A1B2C3D4"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
                />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Found on your approval email. Entering it helps confirm you are the registered guest.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#580F6E] hover:bg-[#4A0E4E] disabled:bg-[#580F6E]/60 text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <SpinnerSVG />
                    Searching For Your Pass...
                  </>
                ) : (
                  <>
                    <SearchSVG />
                    <span className="ml-2">Find My Pass</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : isApproved ? (
          <div className="space-y-6 animate-celebratory-pop">
            <div className="rounded-3xl p-6 md:p-8 text-center shadow-sm border border-[#4A0E4E]/15 bg-white">
              <div className="w-full max-w-md mx-auto bg-[#FAF4F0] border-8 border-double border-[#580F6E]/40 p-6 md:p-8 rounded-2xl shadow-lg relative text-left select-text">
                <div className="text-center mb-6 border-b border-[#580F6E]/15 pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#580F6E] text-white font-serif font-black flex items-center justify-center text-sm mx-auto shadow-sm">
                    T&amp;A
                  </div>
                  <div className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#580F6E] font-extrabold mt-2">
                    Official Admittance Pass
                  </div>
                  <h4 className="font-serif text-lg text-slate-900 font-bold mt-1">Tobi &amp; Ayomide</h4>
                  <p className="text-[10px] italic text-slate-400">September 2026 • Abuja, Nigeria</p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Guest Admitted</span>
                    <span className="text-sm font-semibold text-slate-800">{record.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Gate Verification Code</span>
                      <span className="text-base font-black font-mono text-[#580F6E]">{shortCode}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Pass Status</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase bg-green-100 text-green-800 mt-0.5">
                        Approved
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Confirmed Events</span>
                    <span className="text-xs text-slate-700 font-semibold block mt-0.5">
                      {eventShortLabels(record.events)}
                    </span>
                  </div>

                  {extractLocation(record.dietary_notes) && (
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Traveling From</span>
                      <span className="text-xs text-slate-700 font-semibold block mt-0.5">
                        {extractLocation(record.dietary_notes)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute -left-2 top-1/2 -mt-2 w-4 h-4 rounded-full bg-[#FAF8FF] border-r border-[#580F6E]/15"></div>
                <div className="absolute -right-2 top-1/2 -mt-2 w-4 h-4 rounded-full bg-[#FAF8FF] border-l border-[#580F6E]/15"></div>

                <div className="mt-6 pt-4 border-t border-dashed border-[#580F6E]/20 text-center">
                  <p className="text-[10px] italic text-slate-500 leading-relaxed">
                    "Therefore what God has joined together, let no one separate."
                  </p>
                  <span className="block text-[9px] text-[#580F6E] uppercase font-bold tracking-wider mt-1">— Matthew 19:6</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="px-6 py-3 bg-[#580F6E] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-[#4A0E4E] transition cursor-pointer flex items-center justify-center gap-2"
                >
                  {downloading ? <SpinnerSVG /> : <DownloadSVG />}
                  {downloading ? "Generating Pass..." : "Download Pass"}
                </button>
                <button
                  onClick={() => setRecord(null)}
                  className="px-6 py-3 bg-white border border-[#580F6E] text-[#580F6E] rounded-full font-bold text-xs uppercase tracking-[0.2em] transition hover:bg-[#FAF8FF] cursor-pointer"
                >
                  Look Up Another
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Tip: Keep the downloaded image or your verification code handy for the venue entrance.
              </p>
            </div>
          </div>
        ) : record.status === "declined" ? (
          <div className="rounded-3xl p-8 text-center shadow-sm border border-red-200 bg-white">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-slate-900 mb-2 font-bold">Attendance Declined</h3>
            <p className="text-base leading-relaxed text-slate-600 max-w-sm mx-auto">
              Unfortunately, your attendance request could not be approved at this time. Please reach out to the couple directly for assistance.
            </p>
            <button
              onClick={() => setRecord(null)}
              className="mt-6 px-6 py-3 bg-[#580F6E] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-[#4A0E4E] transition cursor-pointer"
            >
              Look Up Another
            </button>
          </div>
        ) : (
          <div className="rounded-3xl p-8 text-center shadow-sm border border-[#4A0E4E]/15 bg-white">
            <div className="w-12 h-12 bg-[#580F6E]/10 text-[#580F6E] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-slate-900 mb-2 font-bold">Pass Pending Approval</h3>
            <p className="text-base leading-relaxed text-slate-600 max-w-sm mx-auto mb-6">
              {record.name}, your registration has been received and is awaiting approval. Once approved, your pass and download button will appear here.
            </p>
            <div className="inline-flex items-center gap-3 rounded-full bg-[#FAF4F0] border border-[#580F6E]/20 px-5 py-2.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Your Verification Code</span>
              <span className="text-base font-black font-mono text-[#580F6E]">{shortCode}</span>
            </div>
            <button
              onClick={() => setRecord(null)}
              className="mt-6 px-6 py-3 bg-[#580F6E] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-[#4A0E4E] transition cursor-pointer"
            >
              Look Up Another
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
