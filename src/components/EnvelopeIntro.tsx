import React, { useState, useEffect } from "react";

interface EnvelopeIntroProps {
  onComplete: () => void;
}

/** Scalloped wax-seal edge, 100x100 viewBox, centered (50,50) r=38 */
const SEAL_EDGE_PATH =
  "M 92.00 50.00 Q 85.06 56.18 89.47 64.36 Q 80.83 67.80 82.17 77.00 Q 72.88 77.27 71.00 86.37 " +
  "Q 62.18 83.45 57.29 91.36 Q 50.00 85.60 42.71 91.36 Q 37.82 83.45 29.00 86.37 Q 27.12 77.27 17.83 77.00 " +
  "Q 19.17 67.80 10.53 64.36 Q 14.94 56.18 8.00 50.00 Q 14.94 43.82 10.53 35.64 Q 19.17 32.20 17.83 23.00 " +
  "Q 27.12 22.73 29.00 13.63 Q 37.82 16.55 42.71 8.64 Q 50.00 14.40 57.29 8.64 Q 62.18 16.55 71.00 13.63 " +
  "Q 72.88 22.73 82.17 23.00 Q 80.83 32.20 89.47 35.64 Q 85.06 43.82 92.00 50.00 Z";

export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<"idle" | "cracking" | "opening" | "letter" | "fadeout">("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleOpen = () => {
    if (phase !== "idle") return;
    setPhase("cracking");
    setTimeout(() => setPhase("opening"), 420);
    setTimeout(() => setPhase("letter"), 420 + 900);
  };

  const handleEnter = () => {
    setPhase("fadeout");
    setTimeout(onComplete, 700);
  };

  const sealVisible = phase === "idle" || phase === "cracking";
  const flapOpenActive = phase === "opening" || phase === "letter";
  const showLetter = phase === "letter" || phase === "fadeout";

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "linear-gradient(180deg, #F8F0F7 0%, #F0E2EF 100%)" }}
    >
      {/* Decorative diagonal creases across the whole backdrop, purely atmospheric */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <g stroke="#D9BFDA" strokeWidth="0.15" opacity="0.7">
          <line x1="0" y1="0" x2="50" y2="50" />
          <line x1="100" y1="0" x2="50" y2="50" />
          <line x1="50" y1="50" x2="0" y2="100" />
          <line x1="50" y1="50" x2="100" y2="100" />
        </g>
      </svg>

      {/* Large watermark ampersand, always dead-center of the viewport */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
        <span
          className="font-serif text-[16rem] sm:text-[22rem] leading-none font-light"
          style={{ color: "rgba(88,15,110,0.035)", userSelect: "none" }}
        >
          &amp;
        </span>
      </div>

      {/* Foreground: one flex column, always centered in the middle of the screen */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full gap-5 px-4 py-8 overflow-y-auto">

        {phase === "idle" && (
          <p
            className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#580F6E]/60 animate-fade-up"
            style={{ animationDuration: "1.4s" }}
          >
            You&apos;re Invited
          </p>
        )}

        {/* Envelope graphic: flap + seal, fixed-size so it's never mispositioned */}
        <div
          onClick={handleOpen}
          className="relative w-[280px] h-[170px] sm:w-[340px] sm:h-[200px] cursor-pointer select-none shrink-0"
          style={{ perspective: "1200px" }}
        >
          {/* Corner floral accents */}
          <svg className="absolute top-1 left-1 w-14 h-14 opacity-40 pointer-events-none" viewBox="0 0 60 60" aria-hidden="true">
            <g stroke="#C9A0CC" strokeWidth="0.8" fill="none">
              <path d="M8 8 Q 18 -2 28 8 Q 18 18 8 8 Z" />
              <path d="M10 24 q 5 -5 0 -10" />
              <path d="M28 40 Q 38 30 48 40 Q 38 50 28 40 Z" />
            </g>
          </svg>
          <svg className="absolute bottom-1 right-1 w-14 h-14 opacity-40 pointer-events-none rotate-180" viewBox="0 0 60 60" aria-hidden="true">
            <g stroke="#C9A0CC" strokeWidth="0.8" fill="none">
              <path d="M8 8 Q 18 -2 28 8 Q 18 18 8 8 Z" />
              <path d="M10 24 q 5 -5 0 -10" />
              <path d="M28 40 Q 38 30 48 40 Q 38 50 28 40 Z" />
            </g>
          </svg>

          {/* Base envelope body */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(160deg, #F5E7F4 0%, #E9D2E8 100%)",
              border: "1.5px solid rgba(88,15,110,0.14)",
              boxShadow: "0 12px 40px rgba(88,15,110,0.14)",
            }}
          />

          {/* Flap — peels open on click */}
          <div
            className="absolute top-0 left-0 right-0 origin-top z-20"
            style={{
              height: "62%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #F0E2EF 0%, #E4CBE6 100%)",
              transformStyle: "preserve-3d",
              animation: flapOpenActive ? "flapPeel 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards" : "none",
            }}
          />

          {/* Wax seal, centered where the flap point meets the body */}
          <div
            className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-[74px] sm:h-[74px] z-30"
            style={{ display: sealVisible ? "block" : "none" }}
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: "inset(0 50% 0 0)",
                animation: phase === "cracking" ? "sealCrackLeft 0.42s ease-in forwards" : "none",
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="waxGradL" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6E1A82" />
                    <stop offset="100%" stopColor="#3D0A4F" />
                  </linearGradient>
                </defs>
                <path d={SEAL_EDGE_PATH} fill="url(#waxGradL)" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                <ellipse cx="38" cy="34" rx="10" ry="5" fill="rgba(255,255,255,0.12)" />
              </svg>
            </div>

            <div
              className="absolute inset-0"
              style={{
                clipPath: "inset(0 0 0 50%)",
                animation: phase === "cracking" ? "sealCrackRight 0.42s ease-in forwards" : "none",
              }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="waxGradR" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6E1A82" />
                    <stop offset="100%" stopColor="#3D0A4F" />
                  </linearGradient>
                </defs>
                <path d={SEAL_EDGE_PATH} fill="url(#waxGradR)" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
              </svg>
            </div>

            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ opacity: phase === "cracking" ? 0 : 1, transition: "opacity 0.25s ease-in" }}
            >
              <span
                className="font-script text-[#F3E8DA] text-xl sm:text-2xl"
                style={{ textShadow: "0 1px 1px rgba(0,0,0,0.15)" }}
              >
                T&amp;A
              </span>
            </div>
          </div>
        </div>

        {/* Letter card — appears as the next item in the centered column, no absolute math */}
        {showLetter && (
          <div
            className="w-[86%] max-w-sm rounded-xl overflow-hidden shrink-0 transition-all duration-700 ease-out"
            style={{
              background: "#FFFDF9",
              border: "1px solid rgba(88,15,110,0.10)",
              boxShadow: "0 8px 30px rgba(88,15,110,0.12)",
              opacity: phase === "letter" ? 1 : phase === "fadeout" ? 1 : 0,
              transform: phase === "letter" || phase === "fadeout" ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <div className="flex flex-col items-center justify-center px-6 py-6 text-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-serif italic font-bold text-[#F3E8DA] mb-3"
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
        )}

        {phase === "idle" && (
          <button
            onClick={handleOpen}
            className="group flex items-center gap-2 px-7 py-2.5 rounded-full border border-[#580F6E]/20 text-[#580F6E]/70 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#580F6E]/[0.04] hover:border-[#580F6E]/30 transition-all duration-300 animate-fade-up shrink-0"
            style={{ animationDelay: "0.4s", animationDuration: "1.2s" }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 transition-transform group-hover:scale-110" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Open Invitation
          </button>
        )}

        {phase === "letter" && (
          <button
            onClick={handleEnter}
            className="px-9 py-3 rounded-full text-[#F3E8DA] text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 hover:scale-[1.03] animate-fade-up shrink-0"
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
