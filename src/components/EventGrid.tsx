import React from "react";

// Bespoke inline SVG icon components — professional fine-line wedding guide set
const CalendarSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeWidth="2" />
  </svg>
);
const ClockSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const PinSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const HangerSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7a3 3 0 1 0-3-3" />
    <path d="M12 7L4 15.5a1.5 1.5 0 0 0 1 2.5h14a1.5 1.5 0 0 0 1-2.5L12 7z" />
    <path d="M12 13.5 C 11.5 12.5, 10.5 12.5, 10.5 13.5 C 10.5 14.5, 12 15.5, 12 15.5 C 12 15.5, 13.5 14.5, 13.5 13.5 C 13.5 12.5, 12.5 12.5, 12 13.5 Z" fill="currentColor" stroke="none" />
  </svg>
);

export function EventGrid() {
  const events = [
    {
      title: "EVENT 1: J.A. – Journey Aligned (Traditional Marriage)",
      date: "Friday, 11th September 2026",
      time: "2:00 – 4:00 PM",
      venue: "Bwari, FCT Abuja",
      location: "Elim Top Hotel and suites",
      mapUrl: "https://maps.google.com/?q=Elim+Top+Hotel+Bwari+Abuja",
      dressCode: "Mangenta and White (Head Gear)",
      subtitle: "The beautiful blessing and joining in accordance with our sacred heritage.",
    },
    {
      title: "EVENT 2: J.A. – Journey Aligned Church Wedding",
      date: "Saturday, 12th September 2026",
      time: "9:00 AM",
      venue: "Deeper Life Bible Church",
      location: "Deeper Life Junction, Bwari, FCT Abuja (901101)",
      mapUrl: "https://maps.google.com/?q=Deeper+Life+Junction+Bwari+Abuja",
      dressCode: "White Native and a Touch of Gold/magenta",
      subtitle: "The sacred exchanging of vows before the Altar, the Church, and Almighty God.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14 select-none animate-fade-up">
        <div className="inline-flex items-center justify-center gap-3 text-[#580F6E] text-xs md:text-sm font-semibold tracking-wide mb-2">
          <span className="h-px w-8 bg-[#580F6E]/30" />
          <span>✿ Itinerary Guide ✿</span>
          <span className="h-px w-8 bg-[#580F6E]/30" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight mb-3">
          Wedding Schedule
        </h2>
        <p className="text-sm md:text-base text-slate-600 font-sans leading-relaxed max-w-xl mx-auto">
          Kindly take note of the respective dress codes, venues, and timestamps for each event. Seating pre-registration is required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
        {events.map((event, idx) => {
          const staggerClass = idx === 0 ? 'animate-stagger-1' : idx === 1 ? 'animate-stagger-2' : 'animate-stagger-3';
          return (
            <article
              key={idx}
              className={`bg-[#FAF9F6] border border-[#580F6E]/40 rounded-[1.5rem] relative hover-lift ${staggerClass} flex flex-col overflow-hidden shadow-sm`}
            >
              {/* Inner thin purple line creating double border */}
              <div className="absolute inset-1.5 border border-[#580F6E]/25 rounded-[1.25rem] pointer-events-none z-10" />
              
              {/* Double thin purple top lines */}
              <div className="w-full flex flex-col gap-[2px] pt-1 px-1 relative z-10">
                <div className="h-[2px] w-full bg-[#580F6E]/80 rounded-full" />
                <div className="h-[1px] w-full bg-[#580F6E]/40 rounded-full" />
              </div>
              
              <div className="p-8 flex flex-col gap-6 relative z-10 flex-1">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#580F6E] font-bold">
                  Part {idx + 1}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-sans mt-2 leading-relaxed">
                    {event.subtitle}
                  </p>
                </div>


                <div className="space-y-4 flex-1">
                  <div className="flex gap-3 text-sm text-slate-700">
                    <span className="text-[#580F6E] mt-1"><CalendarSVG /></span>
                    <div>
                      <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Date</p>
                      <p className="text-slate-500 text-xs font-semibold mt-0.5">{event.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm text-slate-700">
                    <span className="text-[#580F6E] mt-1"><ClockSVG /></span>
                    <div>
                      <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Time</p>
                      <p className="text-slate-500 text-xs font-semibold mt-0.5">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm text-slate-700">
                    <span className="text-[#580F6E] mt-1"><PinSVG /></span>
                    <div>
                      <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Venue</p>
                      <p className="text-slate-500 text-xs font-semibold mt-0.5">{event.venue}</p>
                      <p className="text-slate-400 text-[10px] uppercase tracking-wider mt-1">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm text-slate-700 pt-2 border-t border-slate-100">
                    <span className="text-[#580F6E] mt-1"><HangerSVG /></span>
                    <div>
                      <p className="font-semibold text-[#580F6E] uppercase text-[9px] tracking-[0.15em]">Dress Code</p>
                    <p className="font-sans text-slate-500 text-xs font-semibold mt-0.5 leading-relaxed">{event.dressCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 relative z-10">
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-full border border-[#580F6E]/25 bg-white py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#580F6E] transition hover:bg-[#580F6E] hover:text-white"
                >
                  Open map
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
