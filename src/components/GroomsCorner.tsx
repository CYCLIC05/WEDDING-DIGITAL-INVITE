import React from "react";
import groomPortrait from "../assets/images/groom_portrait.jpg";

// Bespoke Roman numeral / monogram SVGs for each groomsman card
const IconI = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <rect x="8" y="3" width="4" height="14" rx="1" fill="currentColor" stroke="none" opacity="0.85"/>
    <line x1="5" y1="3" x2="15" y2="3" strokeWidth="2"/>
    <line x1="5" y1="17" x2="15" y2="17" strokeWidth="2"/>
  </svg>
);
const IconII = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <rect x="4" y="3" width="3.5" height="14" rx="0.8" opacity="0.85"/>
    <rect x="12.5" y="3" width="3.5" height="14" rx="0.8" opacity="0.85"/>
  </svg>
);
const IconIII = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <rect x="2" y="3" width="3" height="14" rx="0.8" opacity="0.85"/>
    <rect x="8.5" y="3" width="3" height="14" rx="0.8" opacity="0.85"/>
    <rect x="15" y="3" width="3" height="14" rx="0.8" opacity="0.85"/>
  </svg>
);
const IconIV = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4l5 12M3 4h7M14 4l3 12" />
    <line x1="11" y1="10" x2="17" y2="10" strokeWidth="1.5"/>
  </svg>
);

/**
 * The Groom's Corner component showcasing groom profile, Scripture, and the Groomsmen.
 */
export function GroomsCorner() {
  const groomsmen = [
    {
      name: "Akintayo O. Popoola",
      role: "Best Man (Brother & Partner)",
      bio: "Economist, investment banker, husband, and trusted friend who has been part of Jerry's journey for many years.",
      icon: IconI,
    },
    {
      name: "Uzoma Nwachukwu",
      role: "Groomsman (Childhood Friend)",
      bio: "Brilliant tech engineer who keeps everyone laughing.",
      icon: IconII,
    },
    {
      name: "Babajide Alao",
      role: "Groomsman (College Roommate)",
      bio: "A faithful friend of integrity, managing the wedding strategy.",
      icon: IconIII,
    },
    {
      name: "Emeka Okafor",
      role: "Groomsman (Groom's Cousin)",
      bio: "Gifted praise leader who coordinates the ceremony logistics.",
      icon: IconIV,
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#580F6E]/15 bg-white select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Groom profile */}
        <div className="lg:col-span-5 bg-[#FAF8F5] text-slate-900 p-8 md:p-10 relative overflow-hidden border border-[#1E293B]/10 hover-lift animate-fade-left" style={{borderRadius: '1rem'}}>
          {/* Decorative inset line */}
          <div className="absolute inset-3 border border-[#580F6E]/12 pointer-events-none" style={{borderRadius: '0.75rem'}} />
          
          <h3 className="font-serif text-2xl font-bold text-slate-900 mb-1 tracking-tight">
            The Groom's Commitment
          </h3>
          <div className="w-12 h-[1px] bg-[#580F6E] mb-6"></div>
          
          {/* Groom portrait photo */}
          <div className="flex items-center space-x-4 mb-6 relative">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#580F6E]/25 shrink-0 bg-white">
              <img 
                referrerPolicy="no-referrer"
                src={groomPortrait} 
                alt="Jerry Tobi" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                Jerry Tobi
              </h4>
              <p className="text-[10px] text-[#580F6E] font-sans tracking-widest uppercase mt-1 font-bold">
                The Groom • Man of Faith
              </p>
            </div>
          </div>

          <div className="bg-white border-l-2 border-[#580F6E] p-4 mb-6 rounded-r-xl border border-slate-100">
            <p className="font-serif text-sm italic text-slate-700 leading-relaxed">
              "He who finds a wife finds a good thing and obtains favor from the Lord."
            </p>
            <p className="font-sans text-[9px] font-bold text-[#580F6E] uppercase mt-2 text-right tracking-[0.2em]">
              — Proverbs 18:22
            </p>
          </div>

          <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-sans relative">
            I am grateful to God for bringing Ayomide into my life. As we begin this journey together, we look forward to building a Christ-centered home that will honor God, serve people, and impact generations.
          </p>
        </div>

        {/* Right Column: Groomsmen Grid with headings */}
        <div className="lg:col-span-7 animate-fade-right">
          <div className="mb-8">
            <span className="text-[10px] text-[#580F6E] font-sans font-bold tracking-[0.25em] uppercase block mb-1">
              Guard of Honor
            </span>
            <h3 className="font-serif text-3xl text-slate-800 font-bold tracking-tight">
              The Groom's Party
            </h3>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Brilliant men of virtue standing alongside Tobi in prayers and covenant strength.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groomsmen.map((man, idx) => {
              const IconComp = man.icon;
              const staggerClass = idx === 0 ? 'animate-stagger-1' : idx === 1 ? 'animate-stagger-2' : idx === 2 ? 'animate-stagger-3' : 'animate-stagger-4';
              return (
                <div 
                  key={idx} 
                  className={`bg-[#FAF8F5] border border-[#1E293B]/10 p-6 relative hover-lift ${staggerClass}`}
                  style={{borderRadius: '1rem'}}
                >
                  {/* Decorative inset line */}
                  <div className="absolute inset-2 border border-[#580F6E]/8 pointer-events-none" style={{borderRadius: '0.8rem'}} />
                  <div className="flex items-start space-x-4 relative">
                    <div className="p-3 bg-white text-[#580F6E] border border-slate-100 rounded-xl">
                      <IconComp className="w-5 h-5 text-[#580F6E]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-slate-800 text-base leading-tight">
                        {man.name}
                      </h4>
                      <p className="text-[10px] text-[#580F6E] font-sans font-bold tracking-wider mt-1">
                        {man.role}
                      </p>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {man.bio}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}