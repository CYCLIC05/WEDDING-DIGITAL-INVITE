import React, { useState, useEffect } from "react";
import purpleRoses from "../assets/images/purple_watercolor_roses.png";

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
    setTimeout(() => setPhase("letter"), 1100);
  };

  const handleEnter = () => {
    setPhase("fadeout");
    setTimeout(onComplete, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#FFFFFF" }}
    >
      {/* Corner roses — top-left */}
      <img
        src={purpleRoses}
        className="absolute top-0 left-0 pointer-events-none select-none"
        alt=""
        aria-hidden="true"
        style={{
          width: "320px",
          height: "auto",
          marginTop: "-16px",
          marginLeft: "-16px",
          opacity: 0.55,
          filter: "brightness(0.97) saturate(0.9)",
        }}
      />

      {/* Corner roses — top-right (mirrored) */}
      <img
        src={purpleRoses}
        className="absolute top-0 right-0 pointer-events-none select-none"
        alt=""
        aria-hidden="true"
        style={{
          width: "320px",
          height: "auto",
          marginTop: "-16px",
          marginRight: "-16px",
          opacity: 0.55,
          transform: "scaleX(-1)",
          filter: "brightness(0.97) saturate(0.9)",
        }}
      />

      {/* Corner roses — bottom-left */}
      <img
        src={purpleRoses}
        className="absolute bottom-0 left-0 pointer-events-none select-none"
        alt=""
        aria-hidden="true"
        style={{
          width: "320px",
          height: "auto",
          marginBottom: "-16px",
          marginLeft: "-16px",
          opacity: 0.55,
          transform: "rotate(180deg) scaleX(-1)",
          filter: "brightness(0.97) saturate(0.9)",
        }}
      />

      {/* Corner roses — bottom-right */}
      <img
        src={purpleRoses}
        className="absolute bottom-0 right-0 pointer-events-none select-none"
        alt=""
        aria-hidden="true"
        style={{
          width: "320px",
          height: "auto",
          marginBottom: "-16px",
          marginRight: "-16px",
          opacity: 0.55,
          transform: "rotate(180deg)",
          filter: "brightness(0.97) saturate(0.9)",
        }}
      />

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(88,15,110,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Large watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="font-serif text-[22rem] leading-none font-light"
          style={{ color: "rgba(88,15,110,0.035)", userSelect: "none" }}
        >
          &amp;
        </span>
      </div>

      {/* ── ENVELOPE ── */}
      <div className="relative flex flex-col items-center gap-6 z-10">

        {/* "You're Invited" label */}
        {phase === "idle" && (
          <p
            className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#580F6E]/60 animate-fade-up"
            style={{ animationDuration: "1.4s" }}
          >
            You&apos;re Invited
          </p>
        )}

        {/* Envelope container */}
        <div
          onClick={handleOpen}
          className="relative cursor-pointer select-none group"
          style={{ perspective: "900px" }}
        >
          {/* Shadow beneath envelope */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-8 rounded-full opacity-20 blur-xl"
            style={{ background: "#580F6E" }}
          />

          {/* Envelope body */}
          <div
            className="relative w-[320px] h-[220px] sm:w-[400px] sm:h-[265px] rounded-xl overflow-visible transition-shadow duration-300"
            style={{
              background: "#FFFEFB",
              border: "1.5px solid rgba(88,15,110,0.15)",
              boxShadow: "0 12px 40px rgba(88,15,110,0.10), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Subtle inner border */}
            <div
              className="absolute inset-[6px] rounded-lg pointer-events-none"
              style={{ border: "1px solid rgba(88,15,110,0.06)" }}
            />

            {/* Flap */}
            <div
              className="absolute top-0 left-0 right-0 origin-top z-20"
              style={{
                height: "50%",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #580F6E 0%, #6B1A80 100%)",
                transformStyle: "preserve-3d",
                transform: phase === "idle" ? "rotateX(0deg)" : undefined,
                animation:
                  phase === "opening" || phase === "letter"
                    ? "flapOpen 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                    : "none",
              }}
            />

            {/* Wax seal */}
            <div
              className={`absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full z-30 flex items-center justify-center transition-all duration-400 ${
                phase === "idle"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-75"
              }`}
              style={{
                background: "linear-gradient(135deg, #580F6E 0%, #3D0A4F 100%)",
                boxShadow:
                  "0 3px 12px rgba(88,15,110,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <span className="font-serif italic font-bold text-white text-sm sm:text-base tracking-wide">
                T&amp;A
              </span>
            </div>

            {/* V-fold lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 400 265"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="0" x2="200" y2="148" stroke="rgba(88,15,110,0.08)" strokeWidth="1" />
              <line x1="400" y1="0" x2="200" y2="148" stroke="rgba(88,15,110,0.08)" strokeWidth="1" />
            </svg>
          </div>

          {/* Letter card sliding up */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-[86%] rounded-xl overflow-hidden z-10 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              phase === "letter"
                ? "-translate-y-[115%] opacity-100"
                : "translate-y-[8%] opacity-0"
            }`}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(88,15,110,0.10)",
              boxShadow: "0 8px 30px rgba(88,15,110,0.10)",
              height: "210px",
              top: "8px",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-serif italic font-bold text-white mb-3"
                style={{ background: "#580F6E" }}
              >
                T&amp;A
              </div>
              <p className="text-[8px] uppercase tracking-[0.45em] text-[#580F6E]/60 font-bold mb-1.5">
                The Wedding of
              </p>
              <p className="font-script text-[2rem] sm:text-[2.5rem] text-[#580F6E] leading-none mb-2">
                Tobi &amp; Ayomide
              </p>
              <div className="w-10 h-[1px] bg-[#580F6E]/15 my-2" />
              <p className="text-[9px] text-slate-400 tracking-wider uppercase">
                11 &amp; 12 September 2026
              </p>
              <p className="text-[8px] text-slate-400/80 tracking-wider uppercase mt-0.5">
                Abuja, Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* Bottom buttons */}
        {phase === "idle" && (
          <button
            onClick={handleOpen}
            className="group flex items-center gap-2 px-7 py-2.5 rounded-full border border-[#580F6E]/20 text-[#580F6E]/70 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#580F6E]/[0.04] hover:border-[#580F6E]/30 transition-all duration-300 animate-fade-up"
            style={{ animationDelay: "0.4s", animationDuration: "1.2s" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Open Invitation
          </button>
        )}

        {phase === "letter" && (
          <button
            onClick={handleEnter}
            className="px-9 py-3 rounded-full text-white text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:scale-[1.03] animate-fade-up"
            style={{
              background: "#580F6E",
              boxShadow: "0 4px 20px rgba(88,15,110,0.25)",
              animationDuration: "0.7s",
            }}
          >
            Enter Celebration
          </button>
        )}
      </div>
    </div>
  );
}
