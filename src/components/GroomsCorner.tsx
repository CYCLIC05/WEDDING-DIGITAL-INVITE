import React from "react";
import { Shield, Sparkles, Award, Compass, Heart } from "lucide-react";
import groomPortrait from "../assets/images/groom_portrait.jpg";

/**
 * The Groom's Corner component showcasing groom profile, Scripture, and the Groomsmen.
 */
export function GroomsCorner() {
  const groomsmen = [
    {
      name: "Akintayo O. Popoola",
      role: "Best Man (Brother & Partner)",
      bio: "Economist, investment banker, husband, and trusted friend who has been part of Jerry's journey for many years.",
      icon: Shield,
    },
    {
      name: "Uzoma Nwachukwu",
      role: "Groomsman (Childhood Friend)",
      bio: "Brilliant tech engineer who keeps everyone laughing.",
      icon: Compass,
    },
    {
      name: "Babajide Alao",
      role: "Groomsman (College Roommate)",
      bio: "A faithful friend of integrity, managing the wedding strategy.",
      icon: Award,
    },
    {
      name: "Emeka Okafor",
      role: "Groomsman (Groom's Cousin)",
      bio: "Gifted praise leader who coordinates the ceremony logistics.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#C29D70]/20 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Groom's Profile Card styled as premium Velvet & Gold frame */}
        <div className="lg:col-span-5 bg-[#5C1624] text-white p-8 md:p-10 rounded-3xl relative overflow-hidden card-shadow border-2 border-[#C29D70] double-gold-border">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#BF3B52]/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
          
          <h3 className="font-serif text-3xl font-bold text-white mb-1 tracking-tight">
            The Groom's Commitment
          </h3>
          <div className="w-16 h-[2px] bg-[#C29D70] mb-6"></div>
          
          {/* Groom portrait photo */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border border-[#C29D70]/40 shadow-inner shrink-0 bg-white/15">
              <img 
                referrerPolicy="no-referrer"
                src={groomPortrait} 
                alt="Jerry Tobi" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-white leading-tight">
                Jerry Tobi
              </h4>
              <p className="text-xs text-[#C29D70] font-sans tracking-widest uppercase mt-1 font-extrabold">
                The Groom • Man of Faith
              </p>
            </div>
          </div>

          <div className="bg-[#420E19] border-l-4 border-[#C29D70] p-4 mb-6 rounded-r-2xl border-y border-r border-[#C29D70]/10">
            <p className="font-serif text-sm italic text-stone-200 leading-relaxed">
              "He who finds a wife finds a good thing and obtains favor from the Lord."
            </p>
            <p className="font-sans text-[10px] font-bold text-[#C29D70] uppercase mt-2 text-right tracking-[0.2em]">
              — Proverbs 18:22
            </p>
          </div>

          <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
            I am grateful to God for bringing Ayomide into my life. As we begin this journey together, we look forward to building a Christ-centered home that will honor God, serve people, and impact generations.
          </p>
        </div>

        {/* Right Column: Groomsmen Grid with headings */}
        <div className="lg:col-span-7">
          <div className="mb-8 animate-fade-in">
            <span className="text-xs text-[#C29D70] font-sans font-extrabold tracking-[0.25em] uppercase block mb-1">
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
              return (
                <div 
                  key={idx} 
                  className="bg-white border-2 border-[#C29D70]/20 p-6 rounded-3xl hover:border-[#BF3B52]/40 transition duration-300 card-shadow double-gold-border"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-[#BF3B52]/5 text-[#BF3B52] rounded-2xl">
                      <IconComp className="w-5 h-5 text-[#BF3B52]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-slate-800 text-base leading-tight">
                        {man.name}
                      </h4>
                      <p className="text-xs text-[#BF3B52] font-sans font-bold tracking-wider mt-1">
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