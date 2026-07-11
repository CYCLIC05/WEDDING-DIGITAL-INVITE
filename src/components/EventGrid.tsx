import React from "react";

// Bespoke inline SVG icon components — no icon library
const CalendarSVG = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="16" height="14" rx="2" />
    <path d="M2 8h16M7 2v4M13 2v4" />
  </svg>
);
const ClockSVG = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="8" />
    <path d="M10 6v4l3 2" />
  </svg>
);
const PinSVG = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2C7.24 2 5 4.24 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.76-2.24-5-5-5z" />
    <circle cx="10" cy="7" r="1.8" />
  </svg>
);
const DiamondSVG = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2l4 5H6L10 2zM6 7l4 11 4-11H6z" />
  </svg>
);

export function EventGrid() {
  const events = [
    {
      title: "J.A. – Journey Aligned (Traditional Marriage)",
      date: "Friday, Sept 11, 2026",
      time: "2:00 PM Prompt",
      venue: "Elim Top Hotel and suites, Bwari",
      location: "Bwari, FCT Abuja, Nigeria",
      mapUrl: "https://maps.google.com/?q=Elim+Top+Hotel+Bwari+Abuja",
      dressCode: "Purple & Gold (Elegant traditional attire reflecting celebration colors)",
      subtitle: "The beautiful blessing and joining in accordance with our sacred heritage.",
    },
    {
      title: "Church Wedding Ceremony",
      date: "Saturday, Sept 12, 2026",
      time: "9:00 AM Sharp",
      venue: "Deeper Life Bible Church, Bwari",
      location: "Bwari, FCT Abuja, Nigeria",
      mapUrl: "https://maps.google.com/?q=Deeper+Life+Bible+Church+Bwari+Abuja",
      dressCode: "Magenta purple, White & Gold (Formal & Elegant)",
      subtitle: "The sacred exchanging of vows before the Altar, the Church, and Almighty God.",
    },
    {
      title: "Thanksgiving & Fellowship",
      date: "Saturday, Sept 12, 2026",
      time: "Following Church Wedding",
      venue: "Deeper Life Bible Church (Fellowship Hall), Bwari",
      location: "Bwari, FCT Abuja, Nigeria",
      mapUrl: "https://maps.google.com/?q=Deeper+Life+Bible+Church+Bwari+Abuja",
      dressCode: "Magenta purple, White & Gold",
      subtitle: "Rejoicing together in fellowship, sharing a feast of love and thanks to God.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      
      {/* Decorative Ornate Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in select-none">
        <span className="text-xs text-[#C29D70] font-sans font-extrabold tracking-[0.25em] uppercase block mb-2">
          The Wedding Itinerary
        </span>
        <h2 className="font-serif text-4xl text-slate-800 font-bold tracking-tight">
          Three Sacred Celebrations
        </h2>
        <div className="flex items-center justify-center space-x-3 mt-4 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C29D70]"></div>
          <span className="text-xs text-[#BF3B52] font-semibold">✿ Itinerary Guide ✿</span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C29D70]"></div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Kindly take note of the respective dress codes, venues, and timestamps for each event. Seating pre-registration is required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {events.map((event, idx) => (
          <div 
            key={idx} 
            className="bg-white border-2 border-[#C29D70]/20 rounded-3xl hover:border-[#BF3B52]/40 card-shadow transition-all duration-300 flex flex-col justify-between overflow-hidden group double-gold-border"
          >
            {/* Elegant Header Accent */}
            <div className="h-2 w-full bg-[#BF3B52] duration-300 transition-all opacity-20 group-hover:opacity-100"></div>
            
            <div className="p-8 flex-grow">
              {/* Event Card Badge */}
              <div className="text-[10px] text-[#BF3B52] font-sans tracking-[0.2em] uppercase font-extrabold mb-3 border-b border-rose-50 pb-2 flex items-center justify-between select-none">
                <span>Part {idx + 1} • Celebration</span>
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-[#C29D70]">
                  <path d="M8 0l1.5 4.5H14l-3.7 2.7 1.4 4.3L8 9l-3.7 2.5 1.4-4.3L2 4.5h4.5z"/>
                </svg>
              </div>

              <h3 className="font-serif text-xl font-bold text-slate-800 leading-snug mb-3">
                {event.title}
              </h3>
              
              <p className="text-xs text-slate-500 mb-6 leading-relaxed font-medium">
                {event.subtitle}
              </p>

              {/* Details List */}
              <div className="space-y-4 mb-2">
                <div className="flex items-start text-xs text-slate-700">
                  <span className="text-[#C29D70] mr-3 mt-0.5"><CalendarSVG /></span>
                  <div>
                    <span className="font-bold text-slate-800 tracking-wide">Date</span>
                    <span className="mt-0.5 font-sans text-slate-600 block">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-start text-xs text-slate-700">
                  <span className="text-[#C29D70] mr-3 mt-0.5"><ClockSVG /></span>
                  <div>
                    <span className="font-bold text-slate-800 tracking-wide">Reception &amp; Time</span>
                    <span className="mt-0.5 font-sans text-slate-600 block">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start text-xs text-slate-700">
                  <span className="text-[#C29D70] mr-3 mt-0.5"><PinSVG /></span>
                  <div>
                    <span className="font-bold text-slate-800 tracking-wide">Venue Location</span>
                    <span className="mt-0.5 block font-semibold text-slate-800">{event.venue}</span>
                    <span className="text-slate-500 text-[11px] font-sans mt-0.5 block">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-start text-xs text-slate-700 pt-2">
                  <span className="text-[#BF3B52] mr-3 mt-0.5"><DiamondSVG /></span>
                  <div>
                    <span className="font-bold text-[#BF3B52] tracking-wide block">Dress Code</span>
                    <span className="mt-0.5 text-slate-800 italic font-sans text-[11px] leading-relaxed font-semibold block">
                      {event.dressCode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Anchor Link */}
            <div className="px-8 pb-8">
              <a 
                href={event.mapUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="block text-center py-3 border border-[#C29D70] text-[#BF3B52] hover:bg-[#BF3B52] hover:text-white hover:border-[#BF3B52] transition duration-300 font-sans text-[10px] uppercase font-bold tracking-[0.2em] rounded-full shadow-xs cursor-pointer bg-stone-50/50"
              >
                Navigate Google Maps
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
