import React, { useState, useEffect } from "react";

// ─── Bespoke SVG Icons (no icon library) ──────────────────────────────────────
const HeartSVG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);
const KeySVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="5" />
    <path d="M21 21l-4.35-4.35M15 11l2 2 4-4" />
    <path d="M11.7 12.3L21 21" />
  </svg>
);

const BlossomSVG = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    <path d="M12 5.5 C10 8.5, 14 8.5, 12 5.5 Z" fill="currentColor" opacity="0.8" />
    <path d="M12 18.5 C10 15.5, 14 15.5, 12 18.5 Z" fill="currentColor" opacity="0.8" />
    <path d="M5.5 12 C8.5 10, 8.5 14, 5.5 12 Z" fill="currentColor" opacity="0.8" />
    <path d="M18.5 12 C15.5 10, 15.5 14, 18.5 12 Z" fill="currentColor" opacity="0.8" />
  </svg>
);

/**
 * Hand-drawn style botanical corner ornament — four of these sit in each
 * corner of the hero card, rotated 0 / 90 / -90 / 180 degrees.
 */
const BotanicalCorner = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="5" cy="5" r="3.5" fill="currentColor"/>
    <line x1="5" y1="8.5" x2="5" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8.5" y1="5" x2="56" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5 20 C14 15 22 18 18 27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M5 20 C0 28 2 36 5 32" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.5"/>
    <path d="M5 32 C16 25 26 30 21 40" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M20 5 C15 14 18 22 27 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M20 5 C28 0 36 2 32 5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" fill="none" opacity="0.5"/>
    <path d="M32 5 C25 16 30 26 40 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <circle cx="5" cy="44" r="2" fill="currentColor" opacity="0.4"/>
    <circle cx="5" cy="54" r="1.2" fill="currentColor" opacity="0.28"/>
    <circle cx="44" cy="5" r="2" fill="currentColor" opacity="0.4"/>
    <circle cx="54" cy="5" r="1.2" fill="currentColor" opacity="0.28"/>
    <circle cx="15" cy="15" r="3.5" fill="currentColor" opacity="0.1"/>
    <circle cx="15" cy="15" r="1.8" fill="currentColor" opacity="0.22"/>
    <circle cx="22" cy="13" r="1.2" fill="currentColor" opacity="0.18"/>
    <circle cx="13" cy="22" r="1.2" fill="currentColor" opacity="0.18"/>
  </svg>
);

/**
 * Elegant botanical flower — used as decorative accents in the hero.
 * Drawn as a 5-petal bloom with a stem and two leaves.
 */
const FlowerSVG = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path d="M30 55 Q28 70 30 85" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    {/* Left leaf */}
    <path d="M30 72 Q18 65 16 55 Q24 60 30 72Z" fill="currentColor" opacity="0.35"/>
    {/* Right leaf */}
    <path d="M30 65 Q42 58 44 48 Q36 54 30 65Z" fill="currentColor" opacity="0.35"/>
    {/* Petals — 5 rotated ovals around center */}
    <ellipse cx="30" cy="28" rx="5" ry="13" fill="currentColor" opacity="0.75"/>
    <ellipse cx="30" cy="28" rx="5" ry="13" fill="currentColor" opacity="0.75" transform="rotate(72 30 28)"/>
    <ellipse cx="30" cy="28" rx="5" ry="13" fill="currentColor" opacity="0.75" transform="rotate(144 30 28)"/>
    <ellipse cx="30" cy="28" rx="5" ry="13" fill="currentColor" opacity="0.75" transform="rotate(216 30 28)"/>
    <ellipse cx="30" cy="28" rx="5" ry="13" fill="currentColor" opacity="0.75" transform="rotate(288 30 28)"/>
    {/* Center */}
    <circle cx="30" cy="28" r="6" fill="currentColor"/>
    <circle cx="30" cy="28" r="3" fill="white" opacity="0.55"/>
  </svg>
);

/**
 * Small decorative sprig / bud — used in pairs flanking the divider line.
 */
const SprigSVG = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 48 Q14 36 15 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <ellipse cx="15" cy="14" rx="4" ry="9" fill="currentColor" opacity="0.7"/>
    <path d="M15 30 Q6 24 4 16 Q10 22 15 30Z" fill="currentColor" opacity="0.4"/>
    <path d="M15 24 Q24 18 26 10 Q20 16 15 24Z" fill="currentColor" opacity="0.4"/>
    <circle cx="15" cy="9" r="3.5" fill="currentColor"/>
    <circle cx="15" cy="9" r="1.5" fill="white" opacity="0.5"/>
  </svg>
);

/**
 * Lush purple wedding bouquet — centrepiece decorative SVG for the hero card.
 */
const WeddingBouquetSVG = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">

    {/* ── Stems & leaves ── */}
    {/* Centre stem */}
    <path d="M100 130 Q99 160 100 195" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round"/>
    {/* Left stems */}
    <path d="M100 145 Q82 148 68 138" stroke="#4A7C59" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M100 155 Q75 162 58 155" stroke="#4A7C59" strokeWidth="1.4" strokeLinecap="round"/>
    {/* Right stems */}
    <path d="M100 145 Q118 148 132 138" stroke="#4A7C59" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M100 155 Q125 162 142 155" stroke="#4A7C59" strokeWidth="1.4" strokeLinecap="round"/>
    {/* Leaves */}
    <path d="M88 170 Q76 158 80 148 Q86 162 88 170Z" fill="#5A8C6A" opacity="0.8"/>
    <path d="M112 170 Q124 158 120 148 Q114 162 112 170Z" fill="#5A8C6A" opacity="0.8"/>
    <path d="M80 182 Q66 168 70 156 Q76 172 80 182Z" fill="#4A7C59" opacity="0.7"/>
    <path d="M120 182 Q134 168 130 156 Q124 172 120 182Z" fill="#4A7C59" opacity="0.7"/>
    <path d="M100 175 Q93 185 96 195 Q100 183 100 175Z" fill="#5A8C6A" opacity="0.65"/>

    {/* ── Ribbon bow at base ── */}
    <path d="M85 190 Q78 182 82 176 Q90 186 85 190Z" fill="#C084FC" opacity="0.5"/>
    <path d="M115 190 Q122 182 118 176 Q110 186 115 190Z" fill="#C084FC" opacity="0.5"/>
    <ellipse cx="100" cy="190" rx="8" ry="5" fill="#A855F7" opacity="0.55"/>
    <path d="M96 190 Q100 198 104 190" stroke="#7E22CE" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

    {/* ── Centre large rose (deep purple) ── */}
    <circle cx="100" cy="72" r="22" fill="#580F6E" opacity="0.12"/>
    <ellipse cx="100" cy="80" rx="18" ry="10" fill="#7E22CE" opacity="0.85"/>
    <ellipse cx="100" cy="74" rx="14" ry="9" fill="#6B21A8" opacity="0.9"/>
    <ellipse cx="100" cy="68" rx="10" ry="7" fill="#581C87" opacity="0.95"/>
    <ellipse cx="100" cy="63" rx="7" ry="5" fill="#4C1D95"/>
    <path d="M86 78 Q88 68 100 65 Q88 72 86 78Z" fill="#A855F7" opacity="0.35"/>
    <path d="M114 78 Q112 68 100 65 Q112 72 114 78Z" fill="#A855F7" opacity="0.35"/>
    <path d="M100 88 Q88 82 85 72 Q96 80 100 88Z" fill="#9333EA" opacity="0.3"/>
    <path d="M100 88 Q112 82 115 72 Q104 80 100 88Z" fill="#9333EA" opacity="0.3"/>
    <circle cx="100" cy="62" r="4" fill="#DDD6FE" opacity="0.6"/>

    {/* ── Left medium rose (medium purple) ── */}
    <ellipse cx="68" cy="90" rx="14" ry="8" fill="#9333EA" opacity="0.8"/>
    <ellipse cx="68" cy="85" rx="10" ry="7" fill="#7C3AED" opacity="0.9"/>
    <ellipse cx="68" cy="80" rx="7" ry="5" fill="#6D28D9"/>
    <path d="M58 88 Q60 80 68 77 Q58 83 58 88Z" fill="#C4B5FD" opacity="0.3"/>
    <path d="M78 88 Q76 80 68 77 Q78 83 78 88Z" fill="#C4B5FD" opacity="0.3"/>
    <circle cx="68" cy="79" r="3" fill="#EDE9FE" opacity="0.55"/>

    {/* ── Right medium rose (violet) ── */}
    <ellipse cx="132" cy="90" rx="14" ry="8" fill="#9333EA" opacity="0.8"/>
    <ellipse cx="132" cy="85" rx="10" ry="7" fill="#7C3AED" opacity="0.9"/>
    <ellipse cx="132" cy="80" rx="7" ry="5" fill="#6D28D9"/>
    <path d="M122 88 Q124 80 132 77 Q122 83 122 88Z" fill="#C4B5FD" opacity="0.3"/>
    <path d="M142 88 Q140 80 132 77 Q142 83 142 88Z" fill="#C4B5FD" opacity="0.3"/>
    <circle cx="132" cy="79" r="3" fill="#EDE9FE" opacity="0.55"/>

    {/* ── Far-left small bud (lavender) ── */}
    <ellipse cx="48" cy="105" rx="10" ry="6" fill="#C084FC" opacity="0.75"/>
    <ellipse cx="48" cy="101" rx="7" ry="5" fill="#A855F7" opacity="0.85"/>
    <ellipse cx="48" cy="97" rx="4.5" ry="3.5" fill="#9333EA"/>
    <circle cx="48" cy="96" r="2" fill="#F3E8FF" opacity="0.5"/>

    {/* ── Far-right small bud (lavender) ── */}
    <ellipse cx="152" cy="105" rx="10" ry="6" fill="#C084FC" opacity="0.75"/>
    <ellipse cx="152" cy="101" rx="7" ry="5" fill="#A855F7" opacity="0.85"/>
    <ellipse cx="152" cy="97" rx="4.5" ry="3.5" fill="#9333EA"/>
    <circle cx="152" cy="96" r="2" fill="#F3E8FF" opacity="0.5"/>

    {/* ── Upper-left tiny bud ── */}
    <ellipse cx="78" cy="52" rx="7" ry="4.5" fill="#D8B4FE" opacity="0.7"/>
    <ellipse cx="78" cy="48" rx="5" ry="3.5" fill="#C084FC" opacity="0.85"/>
    <circle cx="78" cy="47" r="2" fill="#F5F3FF" opacity="0.5"/>

    {/* ── Upper-right tiny bud ── */}
    <ellipse cx="122" cy="52" rx="7" ry="4.5" fill="#D8B4FE" opacity="0.7"/>
    <ellipse cx="122" cy="48" rx="5" ry="3.5" fill="#C084FC" opacity="0.85"/>
    <circle cx="122" cy="47" r="2" fill="#F5F3FF" opacity="0.5"/>

    {/* ── Tiny accent dots / pollen ── */}
    <circle cx="62" cy="68" r="1.5" fill="#E9D5FF" opacity="0.6"/>
    <circle cx="138" cy="68" r="1.5" fill="#E9D5FF" opacity="0.6"/>
    <circle cx="55" cy="80" r="1.2" fill="#DDD6FE" opacity="0.5"/>
    <circle cx="145" cy="80" r="1.2" fill="#DDD6FE" opacity="0.5"/>
  </svg>
);

// ──────────────────────────────────────────────────────────────────────────────
import { EventGrid } from "./components/EventGrid.tsx";
import { RSVPForm } from "./components/RSVPForm.tsx";
import { AdminDashboard } from "./components/AdminDashboard.tsx";
import purpleRoses from "./assets/images/purple_watercolor_roses.png";
import { FullScheduleGuide } from "./components/FullScheduleGuide.tsx";
import { CoupleAbout } from "./components/CoupleAbout.tsx";

export default function App() {
  const [loading] = useState(false);
  const [view, setView] = useState<"guest" | "admin">("guest");
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    document.title = "Tobi & Ayomide's Wedding";
  }, []);

  // Suppress HMR-related Vite logs/overlays if they happen
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = typeof reason === "string" ? reason : reason?.message || "";
      if (
        message.includes("websocket") || 
        message.includes("WebSocket") || 
        message.includes("vite") || 
        message.includes("Vite")
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleError = (event: ErrorEvent) => {
      const message = event.message || "";
      if (
        message.includes("websocket") || 
        message.includes("WebSocket") || 
        message.includes("vite") || 
        message.includes("Vite")
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  // Native Routing Toggler
  useEffect(() => {
    const handleRouting = () => {
      if (
        window.location.pathname === "/admin" || 
        window.location.hash === "#admin" || 
        window.location.search.includes("admin")
      ) {
        setView("admin");
      } else {
        setView("guest");
      }
    };

    handleRouting();
    window.addEventListener("popstate", handleRouting);
    window.addEventListener("hashchange", handleRouting);
    
    return () => {
      window.removeEventListener("popstate", handleRouting);
      window.removeEventListener("hashchange", handleRouting);
    };
  }, []);

  // Countdown calculations
  useEffect(() => {
    const targetDate = new Date("2026-09-11T14:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1005);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s === 60 ? 59 : s });
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  const changeView = (newView: "guest" | "admin") => {
    setView(newView);
    if (newView === "admin") {
      window.location.hash = "admin";
    } else {
      window.location.hash = "";
      if (window.location.pathname === "/admin") {
        window.history.pushState({}, "", "/");
      }
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col justify-between relative overflow-x-hidden selection:bg-[#580F6E] selection:text-white">

      {/* ─── ELEGANT STATIC STATIONERY HEADER (Scrolls away naturally) ─── */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 border-b border-slate-100 select-none animate-fade-up">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Circular Royal Monogram */}
          <div
            onClick={() => changeView("guest")}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#580F6E] text-white font-serif italic font-bold text-base shadow-sm group-hover:bg-[#4A0E4E] transition-colors duration-300">
              T&amp;A
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 tracking-[0.2em] uppercase">Tobi &amp; Ayomide</span>
              <span className="block text-[9px] text-[#580F6E] font-medium tracking-[0.25em] uppercase mt-0.5">The Covenant Union</span>
            </div>
          </div>

          {/* Clean Static Navigation & Utility Link */}
          <div className="flex items-center gap-6">
            {view === "guest" ? (
              <>
                <nav className="flex items-center gap-6 text-[10px] uppercase tracking-[0.28em] text-slate-500 font-bold">
                  <a href="#couple-section" className="hover:text-[#580F6E] transition-colors duration-200">Couple</a>
                  <button onClick={() => setIsGuideOpen(true)} className="hover:text-[#580F6E] transition-colors duration-200">Guide</button>
                  <a href="#itinerary" className="hover:text-[#580F6E] transition-colors duration-200">Itinerary</a>
                </nav>
                <button
                  onClick={() => changeView("admin")}
                  title="Admin Dashboard"
                  className="p-2 border border-slate-200 text-slate-400 hover:text-[#580F6E] hover:border-[#580F6E] rounded-full transition-all duration-200"
                >
                  <KeySVG />
                </button>
              </>
            ) : (
              <button
                onClick={() => changeView("guest")}
                className="px-4 py-2 rounded-full border border-[#580F6E] text-[#580F6E] hover:bg-[#FAF8F5] transition text-[10px] uppercase tracking-[0.2em] font-bold"
              >
                ← Return to Invite
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ─── FLOATING CORNER QUICK-NAV (Bottom-right corner, clean & modern) ─── */}
      {view === "guest" && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 select-none">
          {/* Vertical Menu Stack */}
          {isFloatingMenuOpen && (
            <div className="flex flex-col gap-2.5 mb-1 animate-scale-up">
              <a
                href="#couple-section"
                onClick={() => setIsFloatingMenuOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-lg text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 hover:text-[#580F6E] hover:border-[#580F6E] transition"
              >
                Couple
              </a>
              <button
                onClick={() => {
                  setIsGuideOpen(true);
                  setIsFloatingMenuOpen(false);
                }}
                className="flex items-center justify-center px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-lg text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 hover:text-[#580F6E] hover:border-[#580F6E] transition"
              >
                Guide
              </button>
              <a
                href="#itinerary"
                onClick={() => setIsFloatingMenuOpen(false)}
                className="flex items-center justify-center px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-lg text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600 hover:text-[#580F6E] hover:border-[#580F6E] transition"
              >
                Itinerary
              </a>
              <a
                href="#rsvp-section"
                onClick={() => setIsFloatingMenuOpen(false)}
                className="flex items-center justify-center px-5 py-2.5 rounded-full bg-[#580F6E] text-white shadow-lg text-[10px] uppercase tracking-[0.22em] font-bold hover:bg-[#4A0E4E] transition"
              >
                RSVP Now
              </a>
            </div>
          )}

          {/* Main Floating Trigger Button */}
          <button
            onClick={() => setIsFloatingMenuOpen(!isFloatingMenuOpen)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#580F6E] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-[#580F6E]/10"
            title="Navigate Invite"
          >
            <BlossomSVG className={`w-5 h-5 transition-transform duration-300 ${isFloatingMenuOpen ? 'rotate-45' : ''}`} />
          </button>
        </div>
      )}

      <main className="flex-grow pt-8">
        {view === "admin" ? (
          <AdminDashboard />
        ) : (
          <div className="pb-12">

            {/* ─── HERO — Floral Corner Design ─── */}
            <section
              className="relative max-w-5xl mx-auto mb-10 select-none overflow-hidden"
              style={{
                borderRadius: '1.5rem',
                background: 'linear-gradient(160deg, #FDFBFF 0%, #F7F0FF 40%, #FBF8FF 70%, #FDFBFF 100%)',
                border: '1px solid rgba(139,92,246,0.15)',
                boxShadow: '0 8px 48px rgba(88,15,110,0.10), 0 2px 12px rgba(88,15,110,0.06)',
              }}
            >
              {/* ── Top accent line ── */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #580F6E 30%, #A855F7 50%, #580F6E 70%, transparent)' }} />
              <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #580F6E 30%, #A855F7 50%, #580F6E 70%, transparent)' }} />

              {/* ── Inset double border ── */}
              <div className="absolute inset-4 pointer-events-none z-0" style={{ border: '1px solid rgba(139,92,246,0.12)', borderRadius: '1.1rem' }} />

              {/* ── TOP-LEFT corner roses ── */}
              <img
                src={purpleRoses}
                className="absolute top-0 left-0 pointer-events-none z-0 select-none opacity-85"
                style={{ width: '280px', height: 'auto', marginTop: '-10px', marginLeft: '-20px' }}
                alt=""
              />

              {/* ── BOTTOM-RIGHT corner roses ── */}
              <img
                src={purpleRoses}
                className="absolute bottom-0 right-0 pointer-events-none z-0 select-none opacity-85 transform rotate-180"
                style={{ width: '280px', height: 'auto', marginBottom: '-10px', marginRight: '-20px' }}
                alt=""
              />

              {/* ── Large decorative & watermark ── */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none"
                aria-hidden="true"
              >
                <span
                  className="font-serif text-[20rem] leading-none font-light"
                  style={{ color: 'rgba(88,15,110,0.025)', userSelect: 'none', marginTop: '-2rem' }}
                >
                  &amp;
                </span>
              </div>

              {/* ── Main content ── */}
              <div className="relative z-10 px-16 md:px-28 pt-16 pb-14 md:pt-20 md:pb-16 text-center">

                {/* Please join us header */}
                <p className="animate-shimmer-reveal font-sans text-[9px] uppercase tracking-[0.6em] text-slate-400 font-semibold">
                  Please join us for
                </p>

                {/* Wedding of label */}
                <div className="mt-5 space-y-0.5">
                  <p className="font-serif italic text-sm text-slate-400" style={{ letterSpacing: '0.15em' }}>the</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.55em] text-[#580F6E] font-bold">Wedding</p>
                  <p className="font-serif italic text-sm text-slate-400" style={{ letterSpacing: '0.15em' }}>of</p>
                </div>

                {/* The Names */}
                <h1
                  className="animate-hero-entrance font-script text-[4.8rem] md:text-[7.5rem] text-[#1E293B] leading-[0.85] mt-4"
                  style={{ letterSpacing: '0.01em' }}
                >
                  Tobi &amp; Ayomide
                </h1>

                {/* Subtitle */}
                <p className="animate-fade-up delay-300 font-sans text-[10px] uppercase tracking-[0.45em] text-slate-500 font-semibold mt-6">
                  Invite you to the celebration of their marriage
                </p>

                {/* Ornamental divider */}
                <div className="animate-fade-up delay-400 flex items-center justify-center gap-4 mt-7" aria-hidden="true">
                  <SprigSVG className="w-4 h-7 text-[#580F6E] opacity-35" style={{ transform: 'scaleX(-1) rotate(15deg)', marginBottom: '-4px' }} />
                  <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(88,15,110,0.3), transparent)' }} />
                  <HeartSVG className="w-3.5 h-3.5 text-[#580F6E] animate-heart-pulse" />
                  <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, rgba(88,15,110,0.3), transparent)' }} />
                  <SprigSVG className="w-4 h-7 text-[#580F6E] opacity-35" style={{ transform: 'rotate(15deg)', marginBottom: '-4px' }} />
                </div>

                {/* Date & Venue */}
                <div className="animate-fade-up delay-500 mt-7 space-y-2">
                  <p className="font-sans font-bold text-xs md:text-[13px] text-[#1E293B] uppercase tracking-[0.45em]">
                    Friday 11 September, 2026
                  </p>
                  <p className="font-sans font-bold text-xs md:text-[13px] text-[#1E293B] uppercase tracking-[0.45em]">
                    Saturday 12 September, 2026
                  </p>
                  <p className="font-sans text-[10px] text-slate-400 tracking-[0.35em] uppercase mt-1">Abuja · Nigeria</p>
                </div>

                {/* Countdown tiles */}
                <div className="animate-fade-up delay-600 mt-9 inline-grid grid-cols-4" style={{ border: '1px solid rgba(88,15,110,0.12)', background: 'rgba(250,248,255,0.8)', backdropFilter: 'blur(4px)' }}>
                  {([
                    { label: "Days",  value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Mins",  value: timeLeft.minutes },
                    { label: "Secs",  value: timeLeft.seconds },
                  ] as const).map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`flex flex-col items-center justify-center px-5 py-4 ${i < 3 ? 'border-r' : ''}`}
                      style={{ borderColor: 'rgba(88,15,110,0.10)' }}
                    >
                      <span className="text-3xl md:text-4xl font-black text-[#580F6E] tabular-nums font-mono leading-none">
                        {String(value).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.28em] text-slate-400 font-bold mt-1.5">{label}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="animate-fade-up delay-700 mt-10 flex flex-wrap items-center justify-center gap-5">
                  <a
                    href="#rsvp-section"
                    className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden"
                    style={{
                      padding: '14px 36px',
                      background: 'linear-gradient(135deg, #580F6E 0%, #3D0A4F 60%, #580F6E 100%)',
                      backgroundSize: '200% 200%',
                      color: '#fff',
                      fontFamily: 'inherit',
                      fontSize: '10px',
                      fontWeight: 800,
                      letterSpacing: '0.32em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(88,15,110,0.5)',
                      boxShadow: '0 4px 20px rgba(88,15,110,0.28), inset 0 1px 0 rgba(255,255,255,0.08)',
                      transition: 'all 0.35s ease',
                      textDecoration: 'none',
                      borderRadius: '2px',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(88,15,110,0.42)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(88,15,110,0.28), inset 0 1px 0 rgba(255,255,255,0.08)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)', backgroundSize: '200% 100%', animation: 'btnShimmer 2.8s ease-in-out infinite', pointerEvents: 'none' }} />
                    <HeartSVG className="w-3 h-3 opacity-80" />
                    <span>Confirm Attendance</span>
                  </a>

                  <button
                    onClick={() => setIsGuideOpen(true)}
                    style={{
                      padding: '13px 30px',
                      background: 'rgba(255,255,255,0.7)',
                      color: '#580F6E',
                      fontFamily: 'inherit',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      border: '1.5px solid rgba(88,15,110,0.4)',
                      boxShadow: '0 2px 12px rgba(88,15,110,0.08)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      borderRadius: '2px',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = '#FAF4FC';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(88,15,110,0.16)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.7)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(88,15,110,0.08)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                      </svg>
                      View Guide
                    </span>
                  </button>

                  <style>{`
                    @keyframes btnShimmer {
                      0%   { background-position: 200% 0; }
                      50%  { background-position: -200% 0; }
                      100% { background-position: -200% 0; }
                    }
                  `}</style>
                </div>

                {/* ✦ Animated floating hearts ✦ */}
                <div className="relative mt-8 flex items-center justify-center h-16 overflow-hidden pointer-events-none select-none" aria-hidden="true">
                  {[
                    { delay: "0s",   left: "46%", scale: 1.0, dur: "2.9s" },
                    { delay: "1.0s", left: "35%", scale: 0.65, dur: "3.3s" },
                    { delay: "1.7s", left: "57%", scale: 0.8, dur: "2.6s" },
                    { delay: "0.5s", left: "63%", scale: 0.5, dur: "3.8s" },
                    { delay: "2.2s", left: "28%", scale: 0.7, dur: "3.0s" },
                  ].map(({ delay, left, scale, dur }, i) => (
                    <span key={`h${i}`} style={{ position: 'absolute', bottom: 0, left, fontSize: `${Math.round(18 * scale)}px`, animation: `floatUp ${dur} ${delay} ease-in infinite`, color: '#9333EA', opacity: 0.5 * scale + 0.15 }}>
                      ♡
                    </span>
                  ))}
                  {[
                    { size: 36, delay: "0.4s", left: "42%", dur: "3.2s" },
                    { size: 24, delay: "1.4s", left: "54%", dur: "2.8s" },
                    { size: 44, delay: "2.0s", left: "38%", dur: "3.6s" },
                  ].map(({ size, delay, left, dur }, i) => (
                    <span key={`r${i}`} style={{ position: 'absolute', bottom: 0, left, width: size, height: size, border: '1.5px solid #A855F7', borderRadius: '50%', opacity: 0.12, animation: `floatUp ${dur} ${delay} ease-in infinite` }} />
                  ))}
                  <style>{`
                    @keyframes floatUp {
                      0%   { transform: translateY(0) scale(0.7); opacity: 0; }
                      15%  { opacity: 1; }
                      80%  { opacity: 0.6; }
                      100% { transform: translateY(-70px) scale(1.1); opacity: 0; }
                    }
                  `}</style>
                </div>

              </div>
            </section>

            {/* THE MATCHING PORTRAITS AND CUSTOMIZABLE ABOUT SECTION */}
            <CoupleAbout />



            {/* THREE-EVENT WEDDING GRID SECTION */}
            <div id="itinerary" className="bg-white pb-16">
              <EventGrid />

              {/* Guest Guide editorial banner */}
              <div className="max-w-3xl mx-auto px-6 mt-4 animate-fade-up">
                <div className="relative overflow-hidden border border-[#1E293B]/10 hover-lift bg-[#FAF8F5]" style={{borderRadius: '1rem'}}>
                  {/* Solid deep purple left stripe */}
                  <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#580F6E]" />
                  <div className="pl-10 pr-8 py-8 text-left">
                    <span className="inline-block mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#580F6E]">
                      Guest Guide
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2 leading-tight">
                      Need directions, timings or dress guidance?
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-lg mb-6">
                      Everything in one place — venue details, parking notes, the full schedule and dress code for each event.
                    </p>
                    <button
                      onClick={() => setIsGuideOpen(true)}
                      className="px-7 py-3 border-2 border-[#580F6E] text-[#580F6E] font-bold text-[11px] uppercase tracking-[0.28em] hover:bg-[#580F6E] hover:text-white transition-all duration-300"
                    >
                      Open Guest Guide
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* DIGITAL RSVP CAPTURE FORM SECTION */}
            <RSVPForm />

          </div>
        )}
      </main>

      {/* CORE FOOTER BRAND */}
      <footer className="bg-white text-slate-700 py-16 px-6 border-t border-slate-100 select-none">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex w-12 h-12 bg-[#580F6E] text-white text-xl font-bold font-serif rounded-full items-center justify-center">
            †
          </div>

          <h4 className="font-serif text-2xl text-slate-900 font-medium">To God be all the Glory</h4>

          <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto italic">
            "Therefore what God has joined together, let no one separate." <br />
            <strong className="text-[#580F6E] not-italic font-sans text-xs uppercase tracking-widest mt-2 block">— Matthew 19:6</strong>
          </p>

          <div className="w-12 h-[1px] bg-slate-200 mx-auto"></div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-slate-500 gap-4 pt-4 border-t border-slate-100">
            <p>© 2026 Tobi &amp; Ayomide. Designed with clean style.</p>
          </div>
        </div>
      </footer>

      {/* DETAILED WEDDING GUIDE OVERLAY */}
      <FullScheduleGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

    </div>
  );
}
