import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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

// Luxury brand colors
const PALETTE = {
  primaryPurple: "#580F6E",
  darkPurple: "#3D0A4F",
  lavender: "#F8F0F7",
  softPink: "#F0E2EF",
  paper: "#FFFDF9",
  envelope: "#F5E7F4",
  gold: "#D4AF37",
  goldLight: "#F3E5AB",
};

// Ambient floating dust particles
const DUST_MOTES = Array.from({ length: 24 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 7 + 5,
  delay: Math.random() * 4,
  opacity: Math.random() * 0.35 + 0.15,
  driftX: (Math.random() - 0.5) * 30,
}));

// Exploding wax debris shards
const WAX_DEBRIS = Array.from({ length: 12 }).map((_, i) => {
  const angle = (i / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
  const dist = Math.random() * 110 + 50;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist + 60,
    rotate: (Math.random() - 0.5) * 540,
    size: Math.random() * 8 + 4,
  };
});

export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [phase, setPhase] = useState<"idle" | "cracking" | "opening" | "letter" | "fadeout">("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
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
  const flapOpenActive = phase === "opening" || phase === "letter" || phase === "fadeout";
  const showLetter = phase === "letter" || phase === "fadeout";

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden select-none font-sans"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Cinematic Luxury Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          scale: phase === "fadeout" ? 1.3 : 1,
          filter: phase === "fadeout" ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(circle at 50% 45%, ${PALETTE.lavender} 0%, ${PALETTE.softPink} 60%, #E2CDE4 100%)`,
        }}
      >
        {/* Soft Vignette */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(61,10,79,0.2) 100%)",
          }}
        />

        {/* Ambient Backlight Glow behind Envelope */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-25 blur-[100px] pointer-events-none"
          style={{ background: PALETTE.primaryPurple }}
          animate={{
            scale: [0.9, 1.15, 0.9],
            opacity: [0.2, 0.32, 0.2],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Ambient Particles */}
        {DUST_MOTES.map((mote) => (
          <motion.div
            key={mote.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${mote.x}%`,
              top: `${mote.y}%`,
              width: mote.size,
              height: mote.size,
              background: mote.id % 2 === 0 ? PALETTE.goldLight : "#FFF",
              boxShadow: `0 0 6px ${mote.id % 2 === 0 ? PALETTE.gold : PALETTE.softPink}`,
            }}
            animate={{
              y: ["0px", "-100px"],
              x: ["0px", `${mote.driftX}px`],
              opacity: [0, mote.opacity, mote.opacity, 0],
            }}
            transition={{
              duration: mote.duration,
              repeat: Infinity,
              delay: mote.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Decorative Atmospheric Crease Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
          <g stroke="#D9BFDA" strokeWidth="0.12">
            <line x1="0" y1="0" x2="50" y2="50" />
            <line x1="100" y1="0" x2="50" y2="50" />
            <line x1="50" y1="50" x2="0" y2="100" />
            <line x1="50" y1="50" x2="100" y2="100" />
          </g>
        </svg>

        {/* Giant Watermark Ampersand */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <motion.span
            className="font-serif text-[16rem] sm:text-[24rem] leading-none font-light italic"
            style={{ color: "rgba(88,15,110,0.035)" }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            &amp;
          </motion.span>
        </div>
      </motion.div>

      {/* Foreground Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full gap-5 px-4 py-8 overflow-y-auto">
        <AnimatePresence>
          {phase === "idle" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase tracking-[0.55em] font-bold text-[#580F6E]/70"
            >
              You&apos;re Invited
            </motion.p>
          )}
        </AnimatePresence>

        {/* Envelope Stage */}
        <motion.div
          onClick={handleOpen}
          className="relative w-[290px] h-[180px] sm:w-[360px] sm:h-[220px] cursor-pointer select-none shrink-0"
          style={{ perspective: "1300px" }}
          animate={
            phase === "idle"
              ? {
                  y: [0, -6, 0],
                  rotateX: [0, 1.2, 0],
                  rotateY: [0, -1.2, 0],
                }
              : {}
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Envelope Base Shadow */}
          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[90%] h-8 rounded-full opacity-25 blur-xl pointer-events-none"
            style={{ background: PALETTE.darkPurple }}
          />

          {/* Corner Floral Ornaments */}
          <svg className="absolute top-1.5 left-1.5 w-14 h-14 opacity-40 pointer-events-none z-10" viewBox="0 0 60 60">
            <g stroke="#C9A0CC" strokeWidth="0.8" fill="none">
              <path d="M8 8 Q 18 -2 28 8 Q 18 18 8 8 Z" />
              <path d="M10 24 q 5 -5 0 -10" />
              <path d="M28 40 Q 38 30 48 40 Q 38 50 28 40 Z" />
            </g>
          </svg>
          <svg className="absolute bottom-1.5 right-1.5 w-14 h-14 opacity-40 pointer-events-none rotate-180 z-10" viewBox="0 0 60 60">
            <g stroke="#C9A0CC" strokeWidth="0.8" fill="none">
              <path d="M8 8 Q 18 -2 28 8 Q 18 18 8 8 Z" />
              <path d="M10 24 q 5 -5 0 -10" />
              <path d="M28 40 Q 38 30 48 40 Q 38 50 28 40 Z" />
            </g>
          </svg>

          {/* Base Envelope Body */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(160deg, #F5E7F4 0%, #E9D2E8 100%)",
              border: "1.5px solid rgba(88,15,110,0.15)",
              boxShadow: "0 16px 45px rgba(88,15,110,0.15), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          />

          {/* Top Flap — 3D Peeling Open */}
          <motion.div
            className="absolute top-0 left-0 right-0 origin-top z-20 pointer-events-none rounded-t-xl"
            style={{
              height: "62%",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: flapOpenActive
                ? `linear-gradient(180deg, ${PALETTE.darkPurple} 0%, #2A0638 100%)`
                : "linear-gradient(180deg, #F0E2EF 0%, #E4CBE6 100%)",
              transformStyle: "preserve-3d",
            }}
            animate={{ rotateX: flapOpenActive ? -180 : 0 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          >
            {/* Gold Accent Line along Flap Edge */}
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 360 136" preserveAspectRatio="none">
              <path d="M 0,0 L 180,136 L 360,0" fill="none" stroke={PALETTE.gold} strokeWidth="1.2" />
            </svg>
          </motion.div>

          {/* Wax Seal */}
          {sealVisible && (
            <div className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-[76px] sm:h-[76px] z-30">
              {/* Left Wax Half */}
              <motion.div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0 0, 52% 0, 48% 25%, 54% 48%, 46% 72%, 52% 100%, 0 100%)",
                }}
                animate={
                  phase === "cracking"
                    ? { x: -60, y: 120, rotate: -35, opacity: 0 }
                    : { x: 0, y: 0, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.42, ease: "easeIn" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  <defs>
                    <linearGradient id="waxGradL" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7B1796" />
                      <stop offset="100%" stopColor={PALETTE.darkPurple} />
                    </linearGradient>
                  </defs>
                  <path d={SEAL_EDGE_PATH} fill="url(#waxGradL)" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                  <ellipse cx="38" cy="34" rx="10" ry="5" fill="rgba(255,255,255,0.12)" />
                </svg>
              </motion.div>

              {/* Right Wax Half */}
              <motion.div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(52% 0, 100% 0, 100% 100%, 52% 100%, 46% 72%, 54% 48%, 48% 25%)",
                }}
                animate={
                  phase === "cracking"
                    ? { x: 60, y: 120, rotate: 35, opacity: 0 }
                    : { x: 0, y: 0, rotate: 0, opacity: 1 }
                }
                transition={{ duration: 0.42, ease: "easeIn" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  <defs>
                    <linearGradient id="waxGradR" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7B1796" />
                      <stop offset="100%" stopColor={PALETTE.darkPurple} />
                    </linearGradient>
                  </defs>
                  <path d={SEAL_EDGE_PATH} fill="url(#waxGradR)" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                </svg>
              </motion.div>

              {/* Center Monogram T&A */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ opacity: phase === "cracking" ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="font-serif italic font-bold text-[#F3E8DA] text-lg sm:text-2xl"
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  T&amp;A
                </span>
              </motion.div>

              {/* Continuous Shimmer Light Beam */}
              {phase === "idle" && (
                <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden" style={{ clipPath: "circle(45% at 50% 50%)" }}>
                  <motion.div
                    className="w-full h-full"
                    style={{
                      background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                  />
                </div>
              )}

              {/* Exploding Wax Particles */}
              {phase === "cracking" &&
                WAX_DEBRIS.map((shard) => (
                  <motion.div
                    key={shard.id}
                    className="absolute left-1/2 top-1/2 rounded-sm pointer-events-none"
                    style={{
                      width: shard.size,
                      height: shard.size * 0.7,
                      background: PALETTE.primaryPurple,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: shard.x,
                      y: shard.y,
                      rotate: shard.rotate,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                ))}
            </div>
          )}
        </motion.div>

        {/* Letter Card */}
        {showLetter && (
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-[88%] max-w-sm rounded-xl overflow-hidden shrink-0"
            style={{
              background: PALETTE.paper,
              border: "1px solid rgba(212,175,55,0.4)",
              boxShadow: "0 12px 35px rgba(88,15,110,0.15), 0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex flex-col items-center justify-center px-6 py-6 text-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-serif italic font-bold text-[#F3E8DA] mb-3 shadow-sm"
                style={{ background: PALETTE.primaryPurple, border: "1px solid rgba(212,175,55,0.5)" }}
              >
                T&amp;A
              </div>
              <p className="text-[8px] uppercase tracking-[0.45em] text-[#580F6E]/70 font-bold mb-1.5">
                The Wedding of
              </p>
              <p className="font-script text-[2rem] sm:text-[2.5rem] text-[#580F6E] leading-none mb-2">
                Tobi &amp; Ayomide
              </p>

              <div className="flex items-center justify-center gap-2 my-2 w-full">
                <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <span className="text-[10px] text-[#D4AF37]">✦</span>
                <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </div>

              <p className="text-[9px] text-slate-500 tracking-wider uppercase font-medium">
                11 &amp; 12 September 2026
              </p>
              <p className="text-[8px] text-slate-400 tracking-wider uppercase mt-0.5">
                Abuja, Nigeria
              </p>
            </div>
          </motion.div>
        )}

        {/* Buttons */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={handleOpen}
              className="group flex items-center gap-2 px-7 py-2.5 rounded-full border border-[#580F6E]/25 text-[#580F6E] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#580F6E]/[0.05] hover:border-[#580F6E]/40 transition-all duration-300 shrink-0 shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 transition-transform group-hover:scale-110" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Open Invitation
            </motion.button>
          )}
        </AnimatePresence>

        {phase === "letter" && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleEnter}
            className="px-9 py-3 rounded-full text-[#F3E8DA] text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 shrink-0 shadow-lg"
            style={{
              background: PALETTE.primaryPurple,
              boxShadow: "0 6px 20px rgba(88,15,110,0.3)",
            }}
          >
            Enter Celebration
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

