import React, { useState, useEffect } from "react";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

type Phase = "sealed" | "breaking" | "opening" | "sliding" | "invitation" | "rsvp" | "submitted" | "fadeout";

export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<Phase>("sealed");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    needsHotel: "no" as "yes" | "no",
    events: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSealClick = () => {
    if (phase !== "sealed") return;
    setPhase("breaking");
    setTimeout(() => setPhase("opening"), 400);
    setTimeout(() => setPhase("sliding"), 1300);
    setTimeout(() => setPhase("invitation"), 2300);
  };

  const handleRsvpClick = () => setPhase("rsvp");

  const handleEnterSite = () => {
    setPhase("fadeout");
    setTimeout(onComplete, 700);
  };

  const handleCheckboxChange = (eventValue: string) => {
    setFormData((prev) => {
      const alreadyChecked = prev.events.includes(eventValue);
      return {
        ...prev,
        events: alreadyChecked
          ? prev.events.filter((e) => e !== eventValue)
          : [...prev.events, eventValue],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.events.length === 0) {
      setError("Please select at least one wedding event.");
      return;
    }
    setLoading(true);
    const cleanPhone = formData.phone.replace(/[^0-9]/g, "");
    const dummyEmail = `${cleanPhone || Date.now()}@tobiayomide2026.com`;
    try {
      const res = await fetch("/api/rsvps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.trim() || dummyEmail,
          phone: formData.phone,
          events: formData.events,
          dietary_notes: `Location: ${formData.location || "Abuja"} | Hotel: ${formData.needsHotel === "yes" ? "Yes" : "No"}`,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        let msg = `Error ${res.status}`;
        try { msg = JSON.parse(text).error || msg; } catch {}
        throw new Error(msg);
      }
      setPhase("submitted");
    } catch (err: any) {
      setError(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const hideEnvelope = phase === "invitation" || phase === "rsvp" || phase === "submitted";
  const showCard = phase === "sliding" || phase === "invitation" || phase === "rsvp" || phase === "submitted";

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#FFFCF9" }}
    >
      {/* Paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── MAIN CONTAINER ── */}
      <div className="relative z-10 flex flex-col items-center" style={{ width: "min(340px, 88vw)" }}>

        {/* ── INVITATION CARD (sits on top, slides up from inside envelope position) ── */}
        <div
          className="absolute left-0 right-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: "100%",
            zIndex: 20,
            ...(showCard
              ? { top: "-280px", opacity: 1 }
              : { top: "0px", opacity: 0 }),
          }}
        >
          <InvitationCard
            onRsvp={handleRsvpClick}
            onEnter={handleEnterSite}
            showRsvp={phase === "rsvp"}
            showSubmitted={phase === "submitted"}
            formData={formData}
            setFormData={setFormData}
            error={error}
            loading={loading}
            onCheckboxChange={handleCheckboxChange}
            onSubmit={handleSubmit}
          />
        </div>

        {/* ── ENVELOPE ── */}
        <div
          className="relative"
          style={{
            width: "100%",
            height: "min(240px, 62vw)",
            opacity: hideEnvelope ? 0 : 1,
            transition: "opacity 0.6s ease 0.3s",
            pointerEvents: phase !== "sealed" ? "none" : "auto",
          }}
          onClick={handleSealClick}
        >
          {/* Envelope body */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(175deg, #FFFDF8 0%, #F8F3EC 100%)",
              border: "1px solid rgba(139,90,43,0.12)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div
              className="absolute inset-[5px] rounded-xl pointer-events-none"
              style={{ border: "1px solid rgba(139,90,43,0.06)" }}
            />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 240" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="170" y2="140" stroke="rgba(139,90,43,0.07)" strokeWidth="0.8" />
              <line x1="340" y1="0" x2="170" y2="140" stroke="rgba(139,90,43,0.07)" strokeWidth="0.8" />
            </svg>
          </div>

          {/* THE FLAP */}
          <div
            className="absolute top-0 left-0 right-0 z-20"
            style={{
              height: "50%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #FFFCF8 0%, #F5EDE2 100%)",
              border: "1px solid rgba(139,90,43,0.10)",
              borderBottom: "none",
              transformOrigin: "top center",
              backfaceVisibility: "hidden",
              animation:
                phase === "opening" || phase === "sliding" || phase === "invitation"
                  ? "flapFold 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                  : "none",
            }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 120" preserveAspectRatio="none">
              <line x1="8" y1="0" x2="170" y2="110" stroke="rgba(139,90,43,0.06)" strokeWidth="0.5" />
              <line x1="332" y1="0" x2="170" y2="110" stroke="rgba(139,90,43,0.06)" strokeWidth="0.5" />
            </svg>
          </div>

          {/* WAX SEAL */}
          <div
            className="absolute z-30"
            style={{
              top: "38%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: phase === "sealed" ? "sealPulse 2.4s ease-in-out infinite" : "none",
            }}
          >
            <div
              className="rounded-full flex items-center justify-center transition-all duration-400"
              style={{
                width: "min(68px, 18vw)",
                height: "min(68px, 18vw)",
                background: "linear-gradient(145deg, #8B1A1A 0%, #6B1010 40%, #8B1A1A 100%)",
                boxShadow: "0 3px 10px rgba(107,16,16,0.35), inset 0 2px 4px rgba(255,255,255,0.12), inset 0 -2px 6px rgba(0,0,0,0.25)",
                opacity: phase === "breaking" ? 0 : 1,
                scale: phase === "breaking" ? "1.3" : "1",
                filter: phase === "breaking" ? "blur(4px)" : "none",
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: "calc(100% - 8px)", height: "calc(100% - 8px)", border: "1.5px solid rgba(255,255,255,0.15)" }}
              >
                <span
                  className="select-none"
                  style={{
                    fontFamily: "'Great Vibes', 'Alex Brush', cursive",
                    color: "rgba(255,220,200,0.85)",
                    fontSize: "min(20px, 5.5vw)",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                >
                  T&A
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hint */}
        {phase === "sealed" && (
          <p
            className="mt-6 text-[10px] uppercase tracking-[0.4em] font-semibold animate-fade-up"
            style={{ color: "rgba(139,90,43,0.35)", animationDuration: "1.5s" }}
          >
            Tap the seal to open
          </p>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════ */

interface CardProps {
  onRsvp: () => void;
  onEnter: () => void;
  showRsvp: boolean;
  showSubmitted: boolean;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  error: string;
  loading: boolean;
  onCheckboxChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function InvitationCard({
  onRsvp,
  onEnter,
  showRsvp,
  showSubmitted,
  formData,
  setFormData,
  error,
  loading,
  onCheckboxChange,
  onSubmit,
}: CardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(139,90,43,0.10)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent */}
      <div className="h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #8B1A1A 30%, #8B1A1A 70%, transparent)" }} />

      {showSubmitted ? (
        <div className="flex flex-col items-center justify-center text-center px-6 py-10 animate-fade-up">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">RSVP Confirmed</h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
            Thank you, {formData.name || "Guest"}. We&apos;ve received your response and look forward to celebrating with you.
          </p>
          <button
            onClick={onEnter}
            className="px-8 py-3 rounded-full text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:scale-[1.03]"
            style={{ background: "#8B1A1A", boxShadow: "0 4px 16px rgba(139,26,26,0.25)" }}
          >
            Enter Celebration
          </button>
        </div>
      ) : showRsvp ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 animate-fade-up" style={{ animationDuration: "0.6s" }}>
          <div className="text-center mb-5">
            <p className="text-[9px] uppercase tracking-[0.4em] font-bold mb-1" style={{ color: "rgba(139,26,26,0.5)" }}>RSVP</p>
            <h3 className="text-lg font-bold text-slate-900">Confirm Your Attendance</h3>
            <div className="w-8 h-[1px] mx-auto mt-2" style={{ background: "rgba(139,26,26,0.2)" }} />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border-l-3 border-red-400 text-red-800 text-xs rounded-lg mb-4 leading-relaxed">{error}</div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-1">Full Name <span className="text-red-500">*</span></label>
              <input type="text" required placeholder="e.g. Uzoma Nze" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 text-sm text-slate-900 rounded-xl border border-slate-200 focus:border-[#8B1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B1A1A]/30 transition bg-[#FFFCF9]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-1">WhatsApp Phone <span className="text-red-500">*</span></label>
              <input type="tel" required placeholder="e.g. +234 803 111 2222" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 text-sm text-slate-900 rounded-xl border border-slate-200 focus:border-[#8B1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B1A1A]/30 transition bg-[#FFFCF9]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-1">Location <span className="text-red-500">*</span></label>
                <input type="text" required placeholder="e.g. Lagos" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm text-slate-900 rounded-xl border border-slate-200 focus:border-[#8B1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B1A1A]/30 transition bg-[#FFFCF9]" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-1">Hotel?</label>
                <select value={formData.needsHotel} onChange={(e) => setFormData({ ...formData, needsHotel: e.target.value as "yes" | "no" })}
                  className="w-full px-4 py-2.5 text-sm text-slate-900 rounded-xl border border-slate-200 focus:border-[#8B1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B1A1A]/30 transition bg-[#FFFCF9]">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-2">Email <span className="text-slate-400 font-normal">(optional)</span></label>
              <input type="email" placeholder="e.g. name@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 text-sm text-slate-900 rounded-xl border border-slate-200 focus:border-[#8B1A1A] focus:outline-none focus:ring-1 focus:ring-[#8B1A1A]/30 transition bg-[#FFFCF9]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 mb-2">Events <span className="text-red-500">*</span></label>
              <div className="space-y-2">
                {[
                  { value: "traditional", label: "Traditional Marriage — Sept 11" },
                  { value: "church", label: "Church Wedding — Sept 12" },
                ].map((item) => {
                  const checked = formData.events.includes(item.value);
                  return (
                    <button key={item.value} type="button" onClick={() => onCheckboxChange(item.value)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm flex items-center gap-3 transition-all duration-200 ${checked ? "border-[#8B1A1A] bg-[#FFF5F5]" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                      <span className={`w-4 h-4 shrink-0 rounded flex items-center justify-center transition-all ${checked ? "bg-[#8B1A1A]" : "bg-slate-200"}`}>
                        {checked && <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="1.5,6 4.5,9 10.5,3" /></svg>}
                      </span>
                      <span className="text-slate-700">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-full text-white text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)", boxShadow: "0 4px 16px rgba(139,26,26,0.25)" }}>
              {loading ? "Submitting..." : "Confirm RSVP"}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center px-6 py-8 sm:py-10">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white mb-4" style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)" }}>
            <span style={{ fontFamily: "'Great Vibes', 'Alex Brush', cursive", fontSize: "14px" }}>T&A</span>
          </div>
          <p className="text-[8px] uppercase tracking-[0.5em] font-bold mb-1" style={{ color: "rgba(139,90,43,0.4)" }}>The Wedding of</p>
          <h1 className="leading-none mb-1" style={{ fontFamily: "'Alex Brush', 'Great Vibes', cursive", color: "#5C1624", fontSize: "clamp(2rem, 8vw, 3rem)" }}>
            Tobi &amp; Ayomide
          </h1>
          <div className="w-10 h-[1px] my-3" style={{ background: "rgba(139,90,43,0.15)" }} />
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-700 mb-0.5">Friday, 11 September 2026</p>
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-slate-700 mb-0.5">Saturday, 12 September 2026</p>
          <p className="text-[9px] uppercase tracking-[0.2em] text-slate-400 mt-1 mb-6">Abuja, Nigeria</p>
          <p className="text-xs text-slate-500 leading-relaxed max-w-[260px] mb-6">
            Together with their families, request the honour of your presence as they unite in marriage.
          </p>
          <div className="flex flex-col gap-2.5 w-full max-w-[240px]">
            <button onClick={onRsvp}
              className="w-full py-3 rounded-full text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #8B1A1A, #6B1010)", boxShadow: "0 4px 16px rgba(139,26,26,0.25)" }}>
              RSVP Now
            </button>
            <button onClick={onEnter}
              className="w-full py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 hover:bg-slate-50"
              style={{ color: "rgba(139,26,26,0.6)", border: "1px solid rgba(139,26,26,0.15)" }}>
              Skip to Site
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
