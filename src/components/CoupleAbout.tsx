import React from "react";
import groomPortrait from "../assets/images/groom_portrait.jpg";
import bridePortrait from "../assets/images/bride_portrait.jpg";

const HeartSVG = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

/** Wedding rings SVG ornament */
const RingsSVG = () => (
  <svg viewBox="0 0 80 40" fill="none" className="w-16 h-8" stroke="#580F6E" strokeWidth="2" strokeLinecap="round">
    <circle cx="27" cy="20" r="15" />
    <circle cx="27" cy="20" r="11" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
    <circle cx="53" cy="20" r="15" />
    <circle cx="53" cy="20" r="11" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
    <path d="M22 17 L27 12 L32 17 L27 24 Z" fill="#580F6E" fillOpacity="0.15" stroke="#580F6E" strokeWidth="1.2" />
    <path d="M48 17 L53 12 L58 17 L53 24 Z" fill="#580F6E" fillOpacity="0.15" stroke="#580F6E" strokeWidth="1.2" />
  </svg>
);

/**
 * Large decorative botanical/floral spray SVG — used in corners and center.
 * Hand-drawn style line-art peony / rose cluster.
 */
const FloralSprayLeft = () => (
  <svg viewBox="0 0 200 260" fill="none" className="w-full h-full text-[#580F6E]" xmlns="http://www.w3.org/2000/svg">
    {/* Main stem */}
    <path d="M100 250 C95 200 80 160 60 120 C40 80 20 60 10 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
    {/* Branch left */}
    <path d="M60 160 C40 145 20 150 5 140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
    {/* Branch right */}
    <path d="M75 130 C90 110 100 90 95 65" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />

    {/* Large bloom — top right */}
    <circle cx="95" cy="55" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
    <path d="M95 37 C88 42 85 50 95 55 C105 50 102 42 95 37 Z" fill="currentColor" opacity="0.12" />
    <path d="M77 48 C82 55 90 55 95 55 C95 50 88 43 77 48 Z" fill="currentColor" opacity="0.12" />
    <path d="M113 48 C108 55 100 55 95 55 C95 50 102 43 113 48 Z" fill="currentColor" opacity="0.12" />
    <path d="M95 73 C88 68 85 60 95 55 C105 60 102 68 95 73 Z" fill="currentColor" opacity="0.12" />
    <circle cx="95" cy="55" r="5" fill="currentColor" opacity="0.18" />
    {/* Petals inner ring */}
    <path d="M95 46 C92 50 92 54 95 55 C98 54 98 50 95 46 Z" fill="currentColor" opacity="0.08" />
    <path d="M86 55 C90 52 94 52 95 55 C94 58 90 58 86 55 Z" fill="currentColor" opacity="0.08" />
    <path d="M104 55 C100 52 96 52 95 55 C96 58 100 58 104 55 Z" fill="currentColor" opacity="0.08" />

    {/* Medium bloom — mid left */}
    <path d="M5 138 C8 130 16 128 22 132 C26 126 34 126 36 132 C42 128 48 132 46 138 C52 142 50 150 44 150 C44 156 38 160 32 156 C28 162 20 162 18 156 C12 160 6 156 8 150 C2 148 0 142 5 138 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.07" opacity="0.5" />
    <circle cx="26" cy="143" r="4" fill="currentColor" opacity="0.12" />

    {/* Small bud — lower branch */}
    <path d="M60 160 C57 154 60 148 66 148 C72 148 75 154 72 160 C70 166 62 166 60 160 Z" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.06" opacity="0.4" />

    {/* Leaves */}
    <path d="M80 130 C70 115 65 100 75 90 C80 100 82 115 80 130 Z" fill="currentColor" opacity="0.1" />
    <path d="M80 130 C90 115 95 100 85 90 C80 100 78 115 80 130 Z" fill="currentColor" opacity="0.07" />
    <path d="M55 165 C42 158 35 145 43 135 C50 145 55 158 55 165 Z" fill="currentColor" opacity="0.1" />
    <path d="M55 165 C65 155 68 142 58 134 C52 144 52 158 55 165 Z" fill="currentColor" opacity="0.07" />

    {/* Tiny dots / buds */}
    <circle cx="20" cy="60" r="3" fill="currentColor" opacity="0.12" />
    <circle cx="15" cy="50" r="2" fill="currentColor" opacity="0.1" />
    <circle cx="30" cy="40" r="2.5" fill="currentColor" opacity="0.1" />
    <path d="M10 30 C10 24 14 20 18 22 C18 26 14 28 10 30 Z" fill="currentColor" opacity="0.15" />
    <path d="M10 30 C14 24 20 22 22 26 C18 30 14 30 10 30 Z" fill="currentColor" opacity="0.1" />
  </svg>
);

/** Mirrored floral spray for right side */
const FloralSprayRight = () => (
  <svg viewBox="0 0 200 260" fill="none" className="w-full h-full text-[#580F6E]" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
    <path d="M100 250 C95 200 80 160 60 120 C40 80 20 60 10 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
    <path d="M60 160 C40 145 20 150 5 140" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
    <path d="M75 130 C90 110 100 90 95 65" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
    <circle cx="95" cy="55" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
    <path d="M95 37 C88 42 85 50 95 55 C105 50 102 42 95 37 Z" fill="currentColor" opacity="0.12" />
    <path d="M77 48 C82 55 90 55 95 55 C95 50 88 43 77 48 Z" fill="currentColor" opacity="0.12" />
    <path d="M113 48 C108 55 100 55 95 55 C95 50 102 43 113 48 Z" fill="currentColor" opacity="0.12" />
    <path d="M95 73 C88 68 85 60 95 55 C105 60 102 68 95 73 Z" fill="currentColor" opacity="0.12" />
    <circle cx="95" cy="55" r="5" fill="currentColor" opacity="0.18" />
    <path d="M95 46 C92 50 92 54 95 55 C98 54 98 50 95 46 Z" fill="currentColor" opacity="0.08" />
    <path d="M86 55 C90 52 94 52 95 55 C94 58 90 58 86 55 Z" fill="currentColor" opacity="0.08" />
    <path d="M104 55 C100 52 96 52 95 55 C96 58 100 58 104 55 Z" fill="currentColor" opacity="0.08" />
    <path d="M5 138 C8 130 16 128 22 132 C26 126 34 126 36 132 C42 128 48 132 46 138 C52 142 50 150 44 150 C44 156 38 160 32 156 C28 162 20 162 18 156 C12 160 6 156 8 150 C2 148 0 142 5 138 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.07" opacity="0.5" />
    <circle cx="26" cy="143" r="4" fill="currentColor" opacity="0.12" />
    <path d="M60 160 C57 154 60 148 66 148 C72 148 75 154 72 160 C70 166 62 166 60 160 Z" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.06" opacity="0.4" />
    <path d="M80 130 C70 115 65 100 75 90 C80 100 82 115 80 130 Z" fill="currentColor" opacity="0.1" />
    <path d="M80 130 C90 115 95 100 85 90 C80 100 78 115 80 130 Z" fill="currentColor" opacity="0.07" />
    <path d="M55 165 C42 158 35 145 43 135 C50 145 55 158 55 165 Z" fill="currentColor" opacity="0.1" />
    <path d="M55 165 C65 155 68 142 58 134 C52 144 52 158 55 165 Z" fill="currentColor" opacity="0.07" />
    <circle cx="20" cy="60" r="3" fill="currentColor" opacity="0.12" />
    <circle cx="15" cy="50" r="2" fill="currentColor" opacity="0.1" />
    <circle cx="30" cy="40" r="2.5" fill="currentColor" opacity="0.1" />
    <path d="M10 30 C10 24 14 20 18 22 C18 26 14 28 10 30 Z" fill="currentColor" opacity="0.15" />
    <path d="M10 30 C14 24 20 22 22 26 C18 30 14 30 10 30 Z" fill="currentColor" opacity="0.1" />
  </svg>
);

/** Small floral corner accent */
const FloralCorner = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path d="M5 75 C10 55 20 40 35 25 C45 15 60 8 72 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.3" />
    {/* Branch */}
    <path d="M30 35 C18 28 10 20 8 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.22" />
    {/* Bloom */}
    <path d="M72 5 C68 12 65 18 70 22 C75 18 76 12 72 5 Z" fill="currentColor" opacity="0.18" />
    <path d="M72 5 C64 8 60 14 65 18 C70 16 72 10 72 5 Z" fill="currentColor" opacity="0.14" />
    <path d="M72 5 C78 8 80 14 75 18 C70 16 72 10 72 5 Z" fill="currentColor" opacity="0.14" />
    <circle cx="70" cy="16" r="3.5" fill="currentColor" opacity="0.18" />
    {/* Leaf */}
    <path d="M35 25 C28 18 24 10 30 5 C34 12 36 20 35 25 Z" fill="currentColor" opacity="0.12" />
    <path d="M35 25 C42 18 46 10 40 5 C36 12 34 20 35 25 Z" fill="currentColor" opacity="0.09" />
    {/* Small bud */}
    <path d="M8 10 C7 6 9 3 12 4 C13 7 11 9 8 10 Z" fill="currentColor" opacity="0.15" />
    <path d="M8 10 C10 6 14 5 15 8 C12 10 10 10 8 10 Z" fill="currentColor" opacity="0.1" />
  </svg>
);

/**
 * Programmatic SVG scallop lace vector overlay for the circle pendants/badges.
 */
export function LaceFrame({ className, color = "#580F6E" }: { className?: string; color?: string }) {
  const scallops = Array.from({ length: 48 }).map((_, i) => {
    const angle = (i * 360) / 48;
    const rad = (angle * Math.PI) / 180;
    const r = 45.5;
    const x = 50 + r * Math.cos(rad);
    const y = 50 + r * Math.sin(rad);
    return (
      <circle
        key={i}
        cx={x}
        cy={y}
        r="2.8"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />
    );
  });

  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="43.5" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="41.5" stroke="#580F6E" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
      {scallops}
    </svg>
  );
}

/**
 * Custom Premium Square Elegant Frame SVG for the portraits.
 */
export function SquareElegantFrame({ className, color = "#580F6E" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="92" rx="16" stroke={color} strokeWidth="1.5" />
      <rect x="8" y="8" width="84" height="84" rx="12" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

      {/* Corner decorations */}
      <path d="M4 20C4 11.1634 11.1634 4 20 4" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="20" r="2.2" fill={color} />
      <path d="M80 4C88.8366 4 96 11.1634 96 20" stroke={color} strokeWidth="2" />
      <circle cx="80" cy="20" r="2.2" fill={color} />
      <path d="M4 80C4 88.8366 11.1634 96 20 96" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="80" r="2.2" fill={color} />
      <path d="M80 96C88.8366 96 96 88.8366 96 80" stroke={color} strokeWidth="2" />
      <circle cx="80" cy="80" r="2.2" fill={color} />


    </svg>
  );
}

interface CoupleData {
  groomName: string;
  groomTitle: string;
  groomImage: string;
  groomAbout: string;
  brideName: string;
  brideTitle: string;
  brideImage: string;
  brideAbout: string;
}

const DEFAULT_COUPLE_DATA: CoupleData = {
  groomName: "Tobi",
  groomTitle: "The groom",
  groomImage: groomPortrait,
  groomAbout: "I am deeply grateful to God for bringing Ayomide into my life. She is the answer to my prayers and my partner in faith. I look forward to building a Christ-centered home with her that will honor God, serve people, and impact generations.",
  brideName: "Ayomide",
  brideTitle: "The bride",
  brideImage: bridePortrait,
  brideAbout: "A covenant journey with my beloved. I thank God for His faithful leading and for blessing me with Tobi. As we unite in marriage, I pledge my heart and commitment to walk with him, build a godly home together, and share God's love."
};

export function CoupleAbout() {
  const couple = DEFAULT_COUPLE_DATA;

  return (
    <section id="couple-section" className="relative select-none overflow-hidden" style={{ background: '#F7F3EE' }}>

      {/* Background cross-hatch texture pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 L32 16 M16 0 L16 32' stroke='%23580F6E' stroke-width='0.4' stroke-opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Full-height left floral spray ── */}
      <div className="absolute left-0 top-0 h-full w-52 pointer-events-none z-0 opacity-90 hidden lg:block" style={{ paddingTop: '2rem' }}>
        <FloralSprayLeft />
      </div>

      {/* ── Full-height right floral spray ── */}
      <div className="absolute right-0 top-0 h-full w-52 pointer-events-none z-0 opacity-90 hidden lg:block" style={{ paddingTop: '2rem' }}>
        <FloralSprayRight />
      </div>

      {/* ── Corner florals on small screens ── */}
      <div className="absolute top-4 left-2 w-20 h-20 pointer-events-none z-0 text-[#580F6E] lg:hidden">
        <FloralCorner className="w-full h-full" />
      </div>
      <div className="absolute top-4 right-2 w-20 h-20 pointer-events-none z-0 text-[#580F6E] lg:hidden" style={{ transform: 'scaleX(-1)' }}>
        <FloralCorner className="w-full h-full" />
      </div>

      {/* Decorative SVG top ornament — fine-line arch with dots */}
      <div className="w-full flex justify-center pt-16 pb-0 relative">
        <svg viewBox="0 0 600 40" fill="none" className="w-full max-w-2xl h-10 text-[#580F6E]" preserveAspectRatio="xMidYMid meet">
          <line x1="0" y1="20" x2="220" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
          <line x1="380" y1="20" x2="600" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
          <path d="M220 20 Q300 4 380 20" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5" />
          <circle cx="300" cy="8" r="2.5" fill="currentColor" opacity="0.55" />
          <circle cx="220" cy="20" r="3" fill="currentColor" opacity="0.3" />
          <circle cx="380" cy="20" r="3" fill="currentColor" opacity="0.3" />
          <circle cx="110" cy="20" r="1.5" fill="currentColor" opacity="0.18" />
          <circle cx="490" cy="20" r="1.5" fill="currentColor" opacity="0.18" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative pt-8 pb-24 z-10">

        {/* Section Header — editorial stationery style */}
        <div className="text-center mb-20 relative animate-fade-up">
          <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-[#580F6E] font-bold mb-5 opacity-70">
            ✦ &ensp; The Hearts Behind the Vows &ensp; ✦
          </p>

          <h2 className="font-script text-6xl md:text-7xl text-[#1E293B] leading-none">
            The Covenant Hearts
          </h2>

          {/* Ornamental rings divider */}
          <div className="flex items-center justify-center gap-4 mt-6 mb-5">
            <div className="h-px w-24 bg-[#580F6E] opacity-20" />
            <RingsSVG />
            <div className="h-px w-24 bg-[#580F6E] opacity-20" />
          </div>

          <p className="font-serif italic text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            "We love because He first loved us." — A quiet reflection of our journey, devotion, and commitment.
          </p>
        </div>

        {/* GRAPHIC GUEST DISPLAY LAYOUT */}
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* GROOM COLUMN */}
          <div className="md:col-span-5 text-center z-10 animate-fade-left">
            <span className="block text-[9px] font-sans font-bold text-[#580F6E] tracking-[0.35em] uppercase mb-5 opacity-60">
              {couple.groomTitle}
            </span>

            {/* Portrait with elegant frame */}
            <div className="relative w-64 h-64 mx-auto portrait-hover">
              <div
                className="absolute inset-[9%] rounded-3xl overflow-hidden border border-[#580F6E]/15 bg-[#FAF8F5] z-10"
                style={{ boxShadow: '0 24px 60px -16px rgba(88,15,110,0.22)' }}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={couple.groomImage}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.07]"
                  alt={couple.groomName}
                />
              </div>
              <SquareElegantFrame className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
            </div>

            {/* Script Name Display */}
            <div className="mt-8 flex flex-col items-center">
              <h3 className="font-script text-6xl text-[#1E293B] leading-none">
                {couple.groomName}
              </h3>
              <div className="my-3 text-[#580F6E] animate-heart-pulse" style={{ animationDuration: '3s' }}>
                <HeartSVG className="w-3 h-3" />
              </div>
              <p className="text-[12px] text-slate-500 max-w-xs leading-relaxed px-2 font-medium italic font-serif">
                "{couple.groomAbout}"
              </p>
            </div>
          </div>

          {/* MIDDLE — heart & dashed connectors */}
          <div className="md:col-span-2 flex flex-col items-center justify-start pt-20 z-10 gap-3 animate-float-slow">
            <svg viewBox="0 0 2 60" className="hidden md:block h-16 w-px" preserveAspectRatio="none">
              <line x1="1" y1="0" x2="1" y2="60" stroke="#580F6E" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
            </svg>
            <div className="relative w-14 h-14 flex items-center justify-center select-none cursor-pointer">
              <svg className="absolute inset-0 w-full h-full text-[#580F6E] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                <path
                  d="M12 19L11 18C6 14 3 11 3 8c0-2 2-4 4-4c1.5 0 3 1 4 2.5l1 1.5 1-1.5C14 5 15.5 4 17 4c2 0 4 2 4 4c0 3-3 6-8 10l-1 1z"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                  fill="none"
                  opacity="0.7"
                />
              </svg>
              <span className="font-serif text-white font-bold text-base italic mt-[-2px] relative z-10 select-none">
                &amp;
              </span>
            </div>
            <svg viewBox="0 0 2 60" className="hidden md:block h-16 w-px" preserveAspectRatio="none">
              <line x1="1" y1="0" x2="1" y2="60" stroke="#580F6E" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
            </svg>
          </div>

          {/* BRIDE COLUMN */}
          <div className="md:col-span-5 text-center z-10 animate-fade-right">
            <span className="block text-[9px] font-sans font-bold text-[#580F6E] tracking-[0.35em] uppercase mb-5 opacity-60">
              {couple.brideTitle}
            </span>

            {/* Portrait with elegant frame */}
            <div className="relative w-64 h-64 mx-auto portrait-hover">
              <div
                className="absolute inset-[9%] rounded-3xl overflow-hidden border border-[#580F6E]/15 bg-[#FAF8F5] z-10"
                style={{ boxShadow: '0 24px 60px -16px rgba(88,15,110,0.22)' }}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={couple.brideImage}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.07]"
                  alt={couple.brideName}
                />
              </div>
              <SquareElegantFrame className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
            </div>

            {/* Script Name Display */}
            <div className="mt-8 flex flex-col items-center">
              <h3 className="font-script text-6xl text-[#1E293B] leading-none">
                {couple.brideName}
              </h3>
              <div className="my-3 text-[#580F6E] animate-heart-pulse" style={{ animationDuration: '3.4s' }}>
                <HeartSVG className="w-3 h-3" />
              </div>
              <p className="text-[12px] text-slate-500 max-w-xs leading-relaxed px-2 font-medium italic font-serif">
                "{couple.brideAbout}"
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom ornamental hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#580F6E] opacity-10" />
    </section>
  );
}