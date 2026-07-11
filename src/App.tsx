import React, { useState, useEffect } from "react";

// ─── Bespoke SVG Icons (no icon library) ──────────────────────────────────────
const HeartSVG = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);
const KeySVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="5" />
    <path d="M21 21l-4.35-4.35M15 11l2 2 4-4" />
    <path d="M11.7 12.3L21 21" />
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
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"guest" | "admin">("guest");
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // End preloader running animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

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
      const s = Math.floor((difference % (1000 * 60)) / 1005); // slightly slower decrement to sync beautifully

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

  // 1. Elegantly Styled True Love Style 1 Preloader
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF4F0] px-6 selection:bg-[#BF3B52] selection:text-white">
        
        {/* Intricate decorative outline box */}
        <div className="absolute inset-8 border border-[#C29D70]/20 pointer-events-none rounded-2xl flex items-center justify-center">
          <div className="absolute inset-2 border border-dashed border-[#C29D70]/10 rounded-xl"></div>
        </div>

        <div className="relative w-48 h-48 flex items-center justify-center">
          
          {/* Concentric rotating vintage floral/starry gold rings */}
          <svg className="absolute w-44 h-44 animate-spin-slow text-[#C29D70]/40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
            <path d="M50 2 L52 8 L58 10 L52 12 L50 18 L48 12 L42 10 L48 8 Z" fill="currentColor" transform="translate(0, 0)" />
            <path d="M50 2 L52 8 L58 10 L52 12 L50 18 L48 12 L42 10 L48 8 Z" fill="currentColor" transform="rotate(90 50 50)" />
            <path d="M50 2 L52 8 L58 10 L52 12 L50 18 L48 12 L42 10 L48 8 Z" fill="currentColor" transform="rotate(180 50 50)" />
            <path d="M50 2 L52 8 L58 10 L52 12 L50 18 L48 12 L42 10 L48 8 Z" fill="currentColor" transform="rotate(270 50 50)" />
          </svg>
          
          <svg className="absolute w-36 h-36 animate-spin-reverse-slow text-[#BF3B52]/20" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="16 12" />
          </svg>

          <div className="absolute w-28 h-28 rounded-full border border-dashed border-[#C29D70]/30 animate-pulse"></div>

          {/* Glowing heart with pulsing effect representing True Love */}
          <div className="w-16 h-16 bg-[#BF3B52] rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 animate-heart-pulse z-10">
            <HeartSVG className="w-8 h-8 text-white" />
          </div>

          {/* Extra miniature floating hearts */}
          <div className="absolute top-4 left-6 text-[#BF3B52]/60 animate-float-slow" style={{ animationDelay: '0.2s' }}>
            <HeartSVG className="w-3.5 h-3.5" />
          </div>
          <div className="absolute bottom-4 right-6 text-[#BF3B52]/60 animate-float-slow" style={{ animationDelay: '1.2s' }}>
            <HeartSVG className="w-4 h-4" />
          </div>
        </div>

        {/* Elegant typography branding */}
        <div className="text-center mt-8 space-y-2 z-10 max-w-sm">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C29D70] font-sans font-bold block">
            True Love
          </span>
          
          <h2 className="font-script text-6xl text-[#BF3B52] drop-shadow-sm select-none">
            Tobi &amp; Ayomide
          </h2>
          
          <div className="flex items-center justify-center space-x-2 my-2">
            <div className="h-[1px] w-8 bg-[#C29D70]/40"></div>
            <HeartSVG className="w-3 h-3 text-[#BF3B52]" />
            <div className="h-[1px] w-8 bg-[#C29D70]/40"></div>
          </div>
          
          <p className="font-sans text-xs italic text-slate-500 tracking-wide font-medium">
            "Celebrating a Cord of Three Strands"
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="bg-[#FAF4F0] text-slate-800 font-sans selection:bg-[#BF3B52] selection:text-white min-h-screen flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Decorative Ornate Frame corners on the global layout */}
      <div className="hidden lg:block fixed top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#C29D70]/40 pointer-events-none z-50 rounded-tl-lg"></div>
      <div className="hidden lg:block fixed top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#C29D70]/40 pointer-events-none z-50 rounded-tr-lg"></div>
      <div className="hidden lg:block fixed bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#C29D70]/40 pointer-events-none z-50 rounded-bl-lg"></div>
      <div className="hidden lg:block fixed bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#C29D70]/40 pointer-events-none z-50 rounded-br-lg"></div>

      {/* GLOBAL FLOATING CAPSULE HEADER BAR */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl bg-white/85 backdrop-blur-md border border-[#C29D70]/30 px-6 py-3 rounded-full shadow-lg transition-all duration-300 select-none">
        <div className="flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <div 
            onClick={() => changeView("guest")} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <span className="font-serif text-lg font-black tracking-widest text-[#BF3B52] group-hover:text-[#C29D70] transition-colors select-none">
              T&amp;A
            </span>
            <span className="h-4 w-[1px] bg-[#C29D70]/30 hidden sm:block"></span>
            <span className="hidden sm:block text-[9px] text-[#C29D70] font-sans tracking-widest uppercase font-extrabold select-none">
              Holy Matrimony • Sept 11th - 12th, 2026
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {view === "guest" ? (
              <>
                <nav className="hidden md:flex items-center space-x-6 text-[10px] font-sans font-bold uppercase tracking-widest text-slate-600">
                  <a href="#couple-section" className="hover:text-[#BF3B52] transition-colors">Covenant</a>
                  <button 
                    onClick={() => setIsGuideOpen(true)}
                    className="hover:text-[#BF3B52] transition-colors cursor-pointer font-bold uppercase tracking-widest"
                  >
                    Schedule Guide
                  </button>
                  <a href="#itinerary" className="hover:text-[#BF3B52] transition-colors">Itinerary</a>
                </nav>
                
                <a 
                  href="#rsvp-section"
                  className="px-5 py-2 bg-[#BF3B52] hover:bg-[#9E2B3E] text-white font-sans text-[10px] uppercase font-bold tracking-widest transition duration-300 shadow-xs rounded-full border border-[#C29D70]/30"
                >
                  RSVP
                </a>

                {/* Secure toggler button */}
                <button
                  onClick={() => changeView("admin")}
                  title="Access Groom Portal"
                  className="p-2 border border-[#C29D70]/30 text-[#BF3B52] hover:bg-[#BF3B52]/5 transition rounded-full cursor-pointer"
                >
                  <KeySVG />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => changeView("guest")}
                  className="px-5 py-2 border border-[#BF3B52] text-[#BF3B52] hover:bg-[#BF3B52] hover:text-white font-sans text-[10px] uppercase font-bold tracking-widest transition duration-300 rounded-full cursor-pointer"
                >
                  ← Return to Invitation
                </button>
              </>
            )}
          </div>

        </div>
      </header>

      {/* VIEW WORKSPACE ROUTING */}
      <main className="flex-grow">
        {view === "admin" ? (
          <AdminDashboard />
        ) : (
          <div className="animate-fade-in pb-12">
            
            {/* HERO SECTION - HIGH FIDELITY MATCH TO IMAGE 1 */}
            <section className="relative max-w-5xl mx-auto mt-24 md:mt-28 mb-8 overflow-hidden rounded-3xl border-4 border-double border-[#C29D70] bg-[#1E1114] bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center shadow-2xl select-none">
              
              {/* Image dark/rich overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-[#1E1114]/90 to-stone-950/95 z-0"></div>

              {/* Top Decorative Crimson Ribbon with scallops exactly like Image 1 */}
              <div className="relative z-10 w-full h-8 bg-[#BF3B52] flex items-center overflow-hidden border-b border-[#C29D70]/40">
                <div className="w-full h-full opacity-35 bg-[radial-gradient(#1E293B_3px,transparent_3px)] [background-size:12px_12px]"></div>
                {/* Visual black dots from Image 1 */}
                <div className="absolute inset-x-0 bottom-0.5 flex justify-center space-x-4 opacity-50">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-black rounded-full shrink-0"></div>
                  ))}
                </div>
              </div>

              {/* Hanging "True Love" Pendant (Center Overlay from Image 1) */}
              <div className="relative z-20 flex justify-center -mt-6">
                <div className="relative w-32 h-32 transform transition hover:scale-105 duration-300">
                  {/* Outer programmatic white lace */}
                  <div className="absolute inset-2 rounded-full bg-white flex flex-col items-center justify-center text-center shadow-lg border border-[#BF3B52]/20 z-10 px-3">
                    <span className="font-serif text-[10px] text-zinc-700 uppercase tracking-widest font-bold leading-none mt-1 select-none">True</span>
                    <HeartSVG className="w-3.5 h-3.5 text-[#BF3B52] animate-pulse my-1" />
                    <span className="font-script text-lg text-zinc-800 leading-none select-none">Love</span>
                  </div>
                  {/* Programmatic Scalloped Lace Frame Helper */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="43.5" stroke="#BF3B52" strokeWidth="1.5" fill="none" />
                      {Array.from({ length: 48 }).map((_, i) => {
                        const angle = (i * 360) / 48;
                        const rad = (angle * Math.PI) / 180;
                        const r = 45.5;
                        const x = 50 + r * Math.cos(rad);
                        const y = 50 + r * Math.sin(rad);
                        return <circle key={i} cx={x} cy={y} r="2.5" fill="#BF3B52" stroke="#FFFFFF" strokeWidth="0.8" />;
                      })}
                    </svg>
                  </div>
                </div>
              </div>

              {/* Inner content wrapping around plaques and scrolls */}
              <div className="relative z-10 text-center px-6 py-12 md:py-16 max-w-2xl mx-auto flex flex-col items-center">
                
                {/* SVG Decorative Curls / Flourishes Wrapping "We are getting" */}
                <div className="flex items-center justify-center space-x-4 mb-2">
                  {/* Left Flourish Curl */}
                  <svg className="w-16 h-8 text-[#C29D70]/80" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 10 25 Q 35 5, 60 25 T 90 25 M 30 20 Q 50 40, 70 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="90" cy="25" r="2.5" fill="currentColor" />
                  </svg>
                  
                  <span className="font-script text-white text-2xl md:text-3xl tracking-wide px-2 drop-shadow-sm italic">
                    We are getting
                  </span>

                  {/* Right Flourish Curl */}
                  <svg className="w-16 h-8 text-[#C29D70]/80 scale-x-[-1]" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 10 25 Q 35 5, 60 25 T 90 25 M 30 20 Q 50 40, 70 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="90" cy="25" r="2.5" fill="currentColor" />
                  </svg>
                </div>

                {/* THE EXQUISITE WHITE BRACKET PLAQUE CONTAINING "MARRIED" (Exactly like Image 1) */}
                <div className="relative bg-[#FAF4F0] py-6 px-14 md:px-24 mx-auto border-y-2 border-x-4 border-[#C29D70] shadow-2xl my-4 w-full max-w-md flex items-center justify-center rounded-sm animate-fade-in">
                  {/* Left Notch cut */}
                  <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 bg-[#1E1114] rounded-full border-r border-[#C29D70] z-20"></div>
                  {/* Right Notch cut */}
                  <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 w-7 h-7 bg-[#1E1114] rounded-full border-l border-[#C29D70] z-20"></div>

                  <span className="text-zinc-600 font-serif text-lg tracking-wider mr-2 font-light select-none">—</span>
                  <h1 className="font-script text-[#BF3B52] text-5xl md:text-7xl font-bold tracking-normal leading-none select-none drop-shadow-xs py-1">
                    Married
                  </h1>
                  <span className="text-zinc-600 font-serif text-lg tracking-wider ml-2 font-light select-none">—</span>
                </div>

                {/* Bottom curls and date display */}
                <div className="mt-4 flex flex-col items-center">
                  
                  {/* Bottom Flourish Decorative Row */}
                  <svg className="w-24 h-6 text-[#C29D70]/70" viewBox="0 0 100 30" fill="none">
                    <path d="M 10 15 Q 50 30, 90 15 M 30 15 Q 50 0, 70 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="50" cy="15" r="2.5" fill="currentColor" />
                  </svg>

                  {/* Wedding Date matching Image 1 styling */}
                  <div className="font-serif text-white text-xl md:text-2xl font-semibold tracking-[0.2em] mt-3 drop-shadow-md select-none">
                    11.09.2026
                  </div>

                  <p className="text-[10px] text-[#C29D70] font-sans font-extrabold tracking-[0.3em] uppercase mt-2">
                    ABUJA, NIGERIA
                  </p>
                </div>

                {/* SCRIPTURE OVERLAY STATEMENT (Proverbs 18:22) */}
                <div className="mt-10 max-w-lg mx-auto bg-black/40 border border-white/10 rounded-2xl p-5 backdrop-blur-xs select-none">
                  <blockquote className="font-serif italic text-xs md:text-sm text-stone-200 leading-relaxed font-normal">
                    "He who finds a wife finds a good thing and obtains favor from the Lord."
                  </blockquote>
                  <cite className="block text-[9px] font-sans font-bold text-[#C29D70] uppercase tracking-widest mt-2">
                    — Proverbs 18:22
                  </cite>
                </div>

              </div>

              {/* COUNTDOWN TIMER OVERLAY BAR IN HERO FOOTER */}
              <div className="relative z-10 w-full bg-black/40 border-t border-white/15 px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xs">
                <div>
                  <h4 className="font-serif text-sm text-white font-bold tracking-wide text-left">Counting Down to the Altar Vows</h4>
                  <p className="text-[10.5px] text-zinc-300 font-sans tracking-tight mt-0.5 text-left">Join Tobi &amp; Ayomide as they enter holy covenant.</p>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {/* Days */}
                  <div className="bg-white/10 px-4 py-2 border border-white/10 rounded-xl min-w-[64px] text-center">
                    <span className="block font-mono text-base md:text-lg text-white font-black leading-none">{timeLeft.days}</span>
                    <span className="text-[8px] font-sans font-bold text-rose-100 uppercase tracking-widest mt-1 block">Days</span>
                  </div>
                  {/* Hours */}
                  <div className="bg-white/10 px-4 py-2 border border-white/10 rounded-xl min-w-[64px] text-center">
                    <span className="block font-mono text-base md:text-lg text-white font-black leading-none">{timeLeft.hours}</span>
                    <span className="text-[8px] font-sans font-bold text-rose-100 uppercase tracking-widest mt-1 block">Hours</span>
                  </div>
                  {/* Minutes */}
                  <div className="bg-white/10 px-4 py-2 border border-white/10 rounded-xl min-w-[64px] text-center">
                    <span className="block font-mono text-base md:text-lg text-white font-black leading-none">{timeLeft.minutes}</span>
                    <span className="text-[8px] font-sans font-bold text-rose-100 uppercase tracking-widest mt-1 block">Mins</span>
                  </div>
                  {/* Seconds */}
                  <div className="bg-white/10 px-4 py-2 border border-[#BF3B52]/30 rounded-xl min-w-[64px] text-center">
                    <span className="block font-mono text-base md:text-lg text-[#C29D70] font-black leading-none">{timeLeft.seconds}</span>
                    <span className="text-[8px] font-sans font-bold text-rose-200 uppercase tracking-widest mt-1 block">Secs</span>
                  </div>
                </div>
              </div>

            </section>

            {/* THE MATCHING PORTRAITS AND CUSTOMIZABLE ABOUT SECTION (Exactly as shown in Image 2) */}
            <CoupleAbout />

            {/* THE GROOM'S CORNER BLOCK */}
            <GroomsCorner />

            {/* THREE-EVENT WEDDING GRID SECTION */}
            <div id="itinerary" className="bg-[#FAF4F0] pb-16">
              <EventGrid />
              
              {/* Detailed visitor guide invitation banner */}
              <div className="max-w-3xl mx-auto px-6 mt-4 animate-fade-in">
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-3xl p-8 text-center card-shadow relative overflow-hidden double-gold-border">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#BF3B52]"></div>
                  <span className="text-[10px] text-[#BF3B52] font-sans tracking-[0.2em] uppercase font-extrabold block mb-2">
                    Hospitality &amp; Logistics Hub
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">
                    Looking for Detailed Timings &amp; Visitor Parking?
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto mb-6">
                    Our digital Guest Center contains full step-by-step timetables, detailed estate addresses, parking guidelines, security gate clearances, and custom attire matching recommendations.
                  </p>
                  <button
                    onClick={() => setIsGuideOpen(true)}
                    className="inline-flex items-center px-8 py-3.5 bg-[#BF3B52] hover:bg-[#9E2B3E] text-white font-sans text-xs uppercase tracking-[0.2em] font-bold duration-300 rounded-full shadow-md hover:scale-[1.02] transition-all cursor-pointer border border-[#C29D70]/40"
                  >
                    Open Schedule &amp; Visitor Guide →
                  </button>
                </div>
              </div>
            </div>

            {/* DIGITAL RSVP CAPTURE FORM SECTION */}
            <RSVPForm />

          </div>
        )}
      </main>

      {/* CORE FOOTER BRAND */}
      <footer className="bg-slate-900 text-stone-300 py-16 px-6 border-t border-[#C29D70]/30 select-none">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex w-12 h-12 bg-[#BF3B52] text-white text-xl font-bold font-serif rounded-full items-center justify-center shadow-lg border border-[#C29D70]/40">
            †
          </div>
          
          <h4 className="font-serif text-2xl text-white font-medium">To God be all the Glory</h4>
          
          <p className="text-slate-400 text-xs leading-relaxed max-w-md mx-auto italic">
            "Therefore what God has joined together, let no one separate." <br/>
            <strong className="text-[#C29D70] not-italic font-sans text-[10px] uppercase tracking-widest mt-2 block">— Matthew 19:6</strong>
          </p>

          <div className="w-12 h-[1px] bg-slate-800 mx-auto"></div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-sans text-slate-500 gap-4 pt-4 border-t border-slate-800">
            <p>© 2026 Tobi &amp; Ayomide's Covenant Wedding. Designed in Majesty.</p>
          </div>
        </div>
      </footer>

      {/* DETAILED WEDDING GUIDE OVERLAY */}
      <FullScheduleGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

    </div>
  );
}
