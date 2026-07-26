import React, { useState, useEffect } from "react";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<"idle" | "opening" | "letter" | "fadeout">("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => setPhase("letter"), 1200);
  };

  const handleEnter = () => {
    setPhase("fadeout");
    setTimeout(onComplete, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(160deg, #1a0625 0%, #2d0a3e 30%, #1a0625 60%, #0f0318 100%)",
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              left: `${5 + (i * 5.3) % 90}%`,
              top: `${8 + (i * 7.1) % 80}%`,
              background: i % 3 === 0 ? "#C4A0D8" : i % 3 === 1 ? "#9E6BB5" : "#E9D5FF",
              opacity: 0.15 + (i % 5) * 0.06,
              animation: `particleFloat ${3 + (i % 4)}s ${(i * 0.4) % 3}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Background large ampersand watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="font-serif text-[28rem] leading-none font-light"
          style={{ color: "rgba(88,15,110,0.06)", userSelect: "none" }}
        >
          &amp;
        </span>
      </div>

      {/* ── ENVELOPE ── */}
      <div className="relative flex flex-col items-center gap-8 z-10">

        {/* Instruction text */}
        {phase === "idle" && (
          <p
            className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#C4A0D8] animate-fade-up"
            style={{ animationDuration: "1.5s" }}
          >
            You&apos;re Invited
          </p>
        )}

        {/* Envelope body */}
        <div
          onClick={handleOpen}
          className="relative cursor-pointer select-none"
          style={{ perspective: "800px" }}
        >
          {/* Envelope back */}
          <div
            className="relative w-[340px] h-[230px] sm:w-[420px] sm:h-[280px] rounded-2xl overflow-visible"
            style={{
              background: "linear-gradient(145deg, #FAF4F0 0%, #F5EDE6 40%, #FAF4F0 100%)",
              border: "2px solid #C29D70",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 4px 16px rgba(88,15,110,0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            {/* Inner border line */}
            <div
              className="absolute inset-2 rounded-xl pointer-events-none"
              style={{ border: "1px solid rgba(194,157,112,0.25)" }}
            />

            {/* Flap (triangle) */}
            <div
              className="absolute top-0 left-0 right-0 origin-top z-20"
              style={{
                height: "50%",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #5C1624 0%, #7A1E35 100%)",
                borderTop: "2px solid #C29D70",
                borderLeft: "2px solid #C29D70",
                borderRight: "2px solid #C29D70",
                transformStyle: "preserve-3d",
                animation: phase === "idle" ? "none" : phase === "opening" ? "flapOpen 1s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "flapOpen 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                transform: phase === "idle" ? "rotateX(0deg)" : undefined,
              }}
            >
              {/* Gold trim on flap */}
              <div
                className="absolute bottom-0 left-[10%] right-[10%] h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, #C29D70, transparent)" }}
              />
            </div>

            {/* Wax seal */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full z-30 flex items-center justify-center transition-all duration-500 ${
                phase === "opening" ? "opacity-0 scale-75" : "opacity-100 scale-100"
              }`}
              style={{
                background: "linear-gradient(135deg, #580F6E 0%, #3D0A4F 100%)",
                border: "3px solid #C29D70",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 30px rgba(88,15,110,0.3)",
              }}
            >
              <span className="font-serif italic font-black text-white text-lg sm:text-xl">T&amp;A</span>
            </div>

            {/* Bottom V-fold decoration lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 420 280">
              <line x1="0" y1="0" x2="210" y2="160" stroke="#C29D70" strokeWidth="0.8" opacity="0.3" />
              <line x1="420" y1="0" x2="210" y2="160" stroke="#C29D70" strokeWidth="0.8" opacity="0.3" />
            </svg>
          </div>

          {/* Letter inside (rises up when flap opens) */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[88%] rounded-xl overflow-hidden transition-all duration-1000 ease-out z-10 ${
              phase === "letter" ? "-translate-y-[110%] opacity-100" : "translate-y-[10%] opacity-0"
            }`}
            style={{
              background: "linear-gradient(160deg, #FFFDFB 0%, #FAF8FF 100%)",
              border: "1px solid rgba(88,15,110,0.15)",
              boxShadow: "0 8px 32px rgba(88,15,110,0.12)",
              height: "220px",
              top: "10px",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-8 h-8 rounded-full bg-[#580F6E] text-white font-serif font-black flex items-center justify-center text-xs mb-3 shadow-sm">
                T&amp;A
              </div>
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#580F6E] font-bold mb-2">The Wedding of</p>
              <p className="font-script text-3xl sm:text-4xl text-[#580F6E] leading-tight mb-2">Tobi &amp; Ayomide</p>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase mb-1">11 &amp; 12 September 2026</p>
              <p className="text-[9px] text-slate-400 tracking-wider uppercase">Abuja, Nigeria</p>
              <div className="mt-4 w-16 h-[1px] bg-[#580F6E]/20" />
            </div>
          </div>
        </div>

        {/* Tap to open / Enter button */}
        {phase === "idle" && (
          <button
            onClick={handleOpen}
            className="group flex items-center gap-2 px-8 py-3 rounded-full border border-[#C29D70]/50 text-[#C29D70] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C29D70]/10 hover:border-[#C29D70] transition-all duration-300 animate-fade-up"
            style={{ animationDelay: "0.5s", animationDuration: "1.2s" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 transition-transform group-hover:scale-110" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Open Invitation
          </button>
        )}

        {phase === "letter" && (
          <button
            onClick={handleEnter}
            className="px-10 py-3.5 rounded-full text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:scale-105 animate-fade-up shadow-xl"
            style={{
              background: "linear-gradient(135deg, #580F6E 0%, #3D0A4F 100%)",
              boxShadow: "0 4px 24px rgba(88,15,110,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              animationDuration: "0.8s",
            }}
          >
            Enter Celebration
          </button>
        )}
      </div>
    </div>
  );
}
