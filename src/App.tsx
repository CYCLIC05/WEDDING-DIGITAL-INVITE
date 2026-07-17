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
// ──────────────────────────────────────────────────────────────────────────────
import { GroomsCorner } from "./components/GroomsCorner.tsx";
import { EventGrid } from "./components/EventGrid.tsx";
import { RSVPForm } from "./components/RSVPForm.tsx";
import { AdminDashboard } from "./components/AdminDashboard.tsx";
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

            {/* ─── HERO — Editorial Luxury Stationery ─── */}
            <section className="relative max-w-5xl mx-auto mb-10 bg-white border border-[#1E293B]/10 select-none overflow-hidden" style={{borderRadius: '1.25rem'}}>

              {/* Inset decorative border ring */}
              <div className="absolute inset-5 border border-[#580F6E]/15 pointer-events-none z-0" style={{borderRadius: '0.75rem'}} />

              {/* ✦ Botanical corner ornaments */}
              <BotanicalCorner className="absolute top-3 left-3 w-[72px] h-[72px] text-[#580F6E] pointer-events-none z-10" />
              <BotanicalCorner className="absolute top-3 right-3 w-[72px] h-[72px] text-[#580F6E] pointer-events-none z-10 rotate-90" />
              <BotanicalCorner className="absolute bottom-3 left-3 w-[72px] h-[72px] text-[#580F6E] pointer-events-none z-10 -rotate-90" />
              <BotanicalCorner className="absolute bottom-3 right-3 w-[72px] h-[72px] text-[#580F6E] pointer-events-none z-10 rotate-180" />

              {/* Solid dark purple accent strip */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#580F6E]" />

              <div className="relative z-10 px-12 md:px-20 pt-20 pb-16 md:pt-24 md:pb-20 text-center">

                {/* Top label */}
                <p className="animate-shimmer-reveal font-sans text-[10px] uppercase tracking-[0.6em] text-[#580F6E] font-bold">
                  ✦&ensp; The Wedding of &ensp;✦
                </p>

                {/* The Names */}
                <h1 className="animate-hero-entrance font-script text-[4.5rem] md:text-[7rem] text-[#1E293B] leading-[0.88] mt-6" style={{letterSpacing: '0.01em'}}>
                  Tobi &amp; Ayomide
                </h1>

                {/* Serif subtitle */}
                <p className="animate-fade-up delay-300 font-serif italic text-lg md:text-xl text-slate-400 mt-6">
                  are getting married
                </p>

                {/* Ornamental divider */}
                <div className="animate-fade-up delay-400 flex items-center justify-center gap-5 mt-7">
                  <div className="h-px w-20 bg-[#580F6E]/20" />
                  <HeartSVG className="w-3.5 h-3.5 text-[#580F6E] animate-heart-pulse" />
                  <div className="h-px w-20 bg-[#580F6E]/20" />
                </div>

                {/* Date & Venue */}
                <div className="animate-fade-up delay-500 mt-7 space-y-1.5">
                  <p className="font-sans font-bold text-xs md:text-[13px] text-[#1E293B] uppercase tracking-[0.4em]">
                    Friday 11 · Saturday 12 September, 2026
                  </p>
                  <p className="font-sans text-[10px] text-slate-400 tracking-[0.35em] uppercase">Abuja · Nigeria</p>
                </div>

                {/* Countdown tiles */}
                <div className="animate-fade-up delay-600 mt-10 inline-grid grid-cols-4 border border-[#1E293B]/10 bg-[#FAF8F5]">
                  {([
                    { label: "Days",    value: timeLeft.days },
                    { label: "Hours",   value: timeLeft.hours },
                    { label: "Mins",    value: timeLeft.minutes },
                    { label: "Secs",    value: timeLeft.seconds },
                  ] as const).map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`flex flex-col items-center justify-center px-5 py-4 ${i < 3 ? 'border-r border-[#1E293B]/10' : ''}`}
                    >
                      <span className="text-3xl md:text-4xl font-black text-[#580F6E] tabular-nums font-mono leading-none">
                        {String(value).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.28em] text-slate-400 font-bold mt-1.5">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="animate-fade-up delay-700 mt-11 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#rsvp-section"
                    className="px-8 py-3.5 border-2 border-[#580F6E] text-[#580F6E] font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-[#580F6E] hover:text-white transition-all duration-300"
                  >
                    Confirm Attendance
                  </a>
                  <button
                    onClick={() => setIsGuideOpen(true)}
                    className="px-6 py-3.5 border border-slate-300 text-slate-500 font-bold text-[11px] uppercase tracking-[0.25em] hover:border-[#580F6E] hover:text-[#580F6E] transition-all duration-300"
                  >
                    View Guide
                  </button>
                </div>

              </div>
            </section>

            {/* THE MATCHING PORTRAITS AND CUSTOMIZABLE ABOUT SECTION */}
            <CoupleAbout />

            {/* THE GROOM'S CORNER BLOCK */}
            <GroomsCorner />

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
