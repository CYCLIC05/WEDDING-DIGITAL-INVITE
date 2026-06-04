import React from "react";
import { MapPin, Calendar, Clock, Sparkles } from "lucide-react";

export function EventGrid() {
  const events = [
    {
      title: "Traditional Wedding (Igba Nkwu)",
      date: "Thursday, Oct 15, 2026",
      time: "2:00 PM Prompt",
      venue: "The Bride's Family Compound",
      location: "Independence Layout, Enugu, Nigeria",
      mapUrl: "https://maps.google.com/?q=Independence+Layout+Enugu+Nigeria",
      dressCode: "Traditional Royalty (Coral Beads, George, Isiagu, & Elegant Accents)",
      subtitle: "The beautiful blessing and joining in accordance with our sacred heritage.",
    },
    {
      title: "Church Holy Matrimony Ceremony",
      date: "Saturday, Oct 17, 2026",
      time: "10:00 AM Sharp",
      venue: "Cathedral of Good Shepherd",
      location: "Enugu, Nigeria",
      mapUrl: "https://maps.google.com/?q=Cathedral+of+Good+Shepherd+Enugu+Nigeria",
      dressCode: "Strictly Formal (Modest Floor-Length Gowns & Bespoke Classic Suits)",
      subtitle: "The sacred exchanging of vows before the Altar, the Church, and Almighty God.",
    },
    {
      title: "White Wedding Reception",
      date: "Saturday, Oct 17, 2026",
      time: "1:30 PM Prompt",
      venue: "Royal Event Pavilion, Nike Lake Resort",
      location: "Nike Lake Road, Enugu, Nigeria",
      mapUrl: "https://maps.google.com/?q=Nike+Lake+Resort+Enugu+Nigeria",
      dressCode: "Glamorous Evening Gala (Splendid Cyan Elegance & Platinum accents)",
      subtitle: "The feast of love, royal toasts, traditional dining, and exquisite rejoicing.",
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
                <span>✨</span>
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
                  <Calendar className="w-4 h-4 text-[#C29D70] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 tracking-wide">Date</span>
                    <span className="mt-0.5 font-sans text-slate-600 block">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-start text-xs text-slate-700">
                  <Clock className="w-4 h-4 text-[#C29D70] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 tracking-wide">Reception &amp; Time</span>
                    <span className="mt-0.5 font-sans text-slate-600 block">{event.time}</span>
                  </div>
                </div>

                <div className="flex items-start text-xs text-slate-700">
                  <MapPin className="w-4 h-4 text-[#C29D70] mr-3 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 tracking-wide">Venue Location</span>
                    <span className="mt-0.5 block font-semibold text-slate-800">{event.venue}</span>
                    <span className="text-slate-500 text-[11px] font-sans mt-0.5 block">{event.location}</span>
                  </div>
                </div>

                <div className="flex items-start text-xs text-slate-700 pt-2">
                  <Sparkles className="w-4 h-4 text-[#BF3B52] mr-3 mt-0.5 shrink-0 animate-pulse" />
                  <div>
                    <span className="font-bold text-[#BF3B52] tracking-wide block">Dress Code Designation</span>
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
