import React from "react";
import groomPortrait from "../assets/images/groom_portrait.jpg";

const HeartSVG = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

/**
 * Programmatic SVG scallop lace vector overlay for the circle portraits.
 * Automatically aligns 48 decorative little crimson crests to create a flawless lace outline.
 */
export function LaceFrame({ className, color = "#BF3B52" }: { className?: string; color?: string }) {
  const scallops = Array.from({ length: 48 }).map((_, i) => {
    const angle = (i * 360) / 48;
    const rad = (angle * Math.PI) / 180;
    const r = 45.5; // Radius of outer ring scallops
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
      {/* Outer rings */}
      <circle cx="50" cy="50" r="43.5" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="41.5" stroke="#C29D70" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
      {/* Decorative scallop beads */}
      {scallops}
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
  brideImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80",
  brideAbout: "A covenant journey with my beloved. I thank God for His faithful leading and for blessing me with Tobi. As we unite in marriage, I pledge my heart and commitment to walk with him, build a godly home together, and share God's love."
};

export function CoupleAbout() {
  const couple = DEFAULT_COUPLE_DATA;


  return (
    <section id="couple-section" className="py-20 bg-white relative select-none">
      
      {/* Decorative Top Pink Dotted Ribbon exactly from Image 2 */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#BF3B52] flex overflow-hidden">
        <div className="w-full h-full opacity-35 bg-[radial-gradient(#1E293B_3px,transparent_3px)] [background-size:12px_12px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative pt-4">

        {/* Mini Section Identifier Pendant */}
        <div className="text-center mb-16 relative">
          <div className="flex justify-center mb-4">
            {/* The Badge matching the central True Love item from Image 2 */}
            <div className="relative w-24 h-24 transform transition hover:scale-105 duration-300">
              <div className="absolute inset-1.5 rounded-full bg-white flex flex-col items-center justify-center text-center shadow-md border border-[#BF3B52]/10 z-15">
                <span className="font-serif text-[11px] italic text-[#1E293B] uppercase tracking-wider font-semibold leading-none mt-1">True</span>
                <HeartSVG className="w-3.5 h-3.5 text-[#BF3B52] animate-pulse my-0.5" />
                <span className="font-script text-base text-[#1E293B] leading-none">Love</span>
              </div>
              <LaceFrame className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
            </div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl text-slate-800 font-bold tracking-tight">
            The Covenant Hearts
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C29D70] mx-auto mt-3"></div>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
            "We love because He first loved us." A beautiful reflection of our journey, devotion, and shared promises.
          </p>
        </div>

        {/* GRAPHIC GUEST DISPLAY LAYOUT (Strict layout alignment with Image 2) */}
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Beautiful decorative curved dashed path background (Vector-drawn) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            {/* Left swirl path with end arrow */}
            <svg className="absolute left-[8%] top-[10%] w-[38%] h-[80%] text-[#BF3B52]" fill="none" viewBox="0 0 400 300">
              <path 
                d="M 50,220 C 5,160 5,80 80,10 C 180,-10 240,60 170,120 C 130,165 90,135 110,80 C 120,50 150,55 160,80" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeDasharray="5 5" 
                strokeLinecap="round"
                opacity="0.25"
              />
              <path d="M 152,70 L 160,80 L 163,68" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
            </svg>
            
            {/* Right swirl path with end arrow */}
            <svg className="absolute right-[8%] top-[10%] w-[38%] h-[80%] text-[#BF3B52]" fill="none" viewBox="0 0 400 300">
              <path 
                d="M 350,220 C 395,160 395,80 320,10 C 220,-10 160,60 230,120 C 270,165 310,135 290,80 C 280,50 250,55 240,80" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeDasharray="5 5" 
                strokeLinecap="round"
                opacity="0.25"
              />
              <path d="M 248,70 L 240,80 L 237,68" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
            </svg>
          </div>

          {/* GROOM COLUMN */}
          <div className="md:col-span-5 text-center z-10 animate-fade-in">
            <span className="block text-[11px] font-sans font-bold text-slate-400 tracking-[0.25em] uppercase mb-4">
              {couple.groomTitle}
            </span>

            {/* Scallop-lace Circle Frame */}
            <div className="relative w-60 h-60 mx-auto transform transition hover:scale-[1.03] duration-500">
              {/* Profile Photo */}
              <div className="absolute inset-[9%] rounded-full overflow-hidden border border-[#C29D70]/20 bg-[#FAF4F0] z-10">
                <img 
                  referrerPolicy="no-referrer"
                  src={couple.groomImage} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.06]" 
                  alt={couple.groomName} 
                />
              </div>
              {/* Programmatic Lace Frame */}
              < LaceFrame className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
            </div>

            {/* Script Name Display */}
            <div className="mt-6 flex flex-col items-center">
              <h3 className="font-script text-5xl text-[#1E293B] drop-shadow-xs">
                {couple.groomName}
              </h3>
              
              <div className="my-2 text-[#BF3B52]">
                <HeartSVG className="w-3.5 h-3.5" />
              </div>

              <p className="text-xs md:text-sm text-slate-600 max-w-sm leading-relaxed px-4 font-medium italic font-serif">
                “{couple.groomAbout}”
              </p>
            </div>
          </div>

          {/* MIDDLE AMPERSAND SIGN STITCHED HEART (Exactly as shown in Image 2) */}
          <div className="md:col-span-2 flex flex-col items-center justify-center py-6 md:py-0 z-10">
            <div className="relative w-16 h-16 flex items-center justify-center animate-heart-pulse select-none cursor-pointer">
              
              {/* The Stitched Red Heart Shape */}
              <svg 
                className="absolute inset-0 w-full h-full text-[#BF3B52] drop-shadow-md filter hover:brightness-110 duration-200" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                {/* Standard heart dashed outline loop for a stitched craft feel */}
                <path 
                  d="M12 19L11 18C6 14 3 11 3 8c0-2 2-4 4-4c1.5 0 3 1 4 2.5l1 1.5 1-1.5C14 5 15.5 4 17 4c2 0 4 2 4 4c0 3-3 6-8 10l-1 1z" 
                  stroke="#FFFFFF" 
                  strokeWidth="1" 
                  strokeDasharray="2 2" 
                  fill="none" 
                  opacity="0.8"
                />
              </svg>

              {/* The ampersand sign aligned gracefully in the heart center */}
              <span className="font-serif text-white font-bold text-lg italic mt-[-2px] relative z-10 select-none">
                &amp;
              </span>

            </div>
          </div>

          {/* BRIDE COLUMN */}
          <div className="md:col-span-5 text-center z-10 animate-fade-in">
            <span className="block text-[11px] font-sans font-bold text-slate-400 tracking-[0.25em] uppercase mb-4">
              {couple.brideTitle}
            </span>

            {/* Scallop-lace Circle Frame */}
            <div className="relative w-60 h-60 mx-auto transform transition hover:scale-[1.03] duration-500">
              {/* Profile Photo */}
              <div className="absolute inset-[9%] rounded-full overflow-hidden border border-[#C29D70]/20 bg-[#FAF4F0] z-10">
                <img 
                  referrerPolicy="no-referrer"
                  src={couple.brideImage} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.06]" 
                  alt={couple.brideName} 
                />
              </div>
              {/* Programmatic Lace Frame */}
              <LaceFrame className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
            </div>

            {/* Script Name Display */}
            <div className="mt-6 flex flex-col items-center">
              <h3 className="font-script text-5xl text-[#1E293B] drop-shadow-xs">
                {couple.brideName}
              </h3>
              
              <div className="my-2 text-[#BF3B52]">
                <HeartSVG className="w-3.5 h-3.5" />
              </div>

              <p className="text-xs md:text-sm text-slate-600 max-w-sm leading-relaxed px-4 font-medium italic font-serif">
                “{couple.brideAbout}”
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}