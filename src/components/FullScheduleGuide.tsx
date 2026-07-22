import React, { useState } from "react";

// ─── Bespoke inline SVG icons ──────────────────────────────────────────────────
const CompassSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.6"/>
  </svg>
);
const CloseSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const PinSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const CarSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 mr-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="15" cy="17" r="2" />
  </svg>
);
const ClockIconSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 mr-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const ShieldSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5 4.5-1.35 8-6.25 8-11.5V6L12 2z" fill="currentColor" fillOpacity="0.1" />
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5 4.5-1.35 8-6.25 8-11.5V6L12 2z"/>
    <path d="M9 12l2 2 4-4" strokeWidth="1.5"/>
  </svg>
);
const ShirtSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7a3 3 0 1 0-3-3" />
    <path d="M12 7L4 15.5a1.5 1.5 0 0 0 1 2.5h14a1.5 1.5 0 0 0 1-2.5L12 7z" />
    <path d="M12 13.5 C 11.5 12.5, 10.5 12.5, 10.5 13.5 C 10.5 14.5, 12 15.5, 12 15.5 C 12 15.5, 13.5 14.5, 13.5 13.5 C 13.5 12.5, 12.5 12.5, 12 13.5 Z" fill="currentColor" stroke="none" />
  </svg>
);
const InfoSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="8" strokeWidth="2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
  </svg>
);
const CheckSVG = () => (
  <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 mr-2 mt-0.5 shrink-0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2,7 5,10 12,3"/>
  </svg>
);
// ──────────────────────────────────────────────────────────────────────────────

interface ScheduleGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "timeline" | "logistics" | "attire";

export function FullScheduleGuide({ isOpen, onClose }: ScheduleGuideProps) {
  const [activeTab, setActiveTab] = useState<TabType>("timeline");

  if (!isOpen) return null;

  const timelineEvents = [
    {
      title: "J.A. – Journey Aligned (Traditional Marriage)",
      date: "Friday, Sept 11, 2026",
      venue: "Elim Top Hotel and suites, Bwari",
      location: "Bwari, Abuja",
      steps: [
        { time: "2:00 PM", label: "Guest Arrival & Welcome Reception", desc: "Guests are welcomed with beautiful traditional melodies and ushering into the main hall." },
        { time: "2:30 PM", label: "Opening Prayers & Family Introductions", desc: "Formal presentation and opening of the traditional ceremony under the guidance of family elders." },
        { time: "3:15 PM", label: "Cultural Presentation & Wine Search", desc: "The bride, Ayomide, searches for her groom, Tobi, to present him with the traditional cup of palm wine." },
        { time: "4:30 PM", label: "Presentation of Gifts & Celebratory Dance", desc: "Opening of the dance floor for celebrations, congratulations, and the presentation of family gifts." },
        { time: "5:30 PM", label: "Feasting & Traditional Buffet", desc: "Closing prayers followed by the serving of delicious local and continental delicacies." }
      ]
    },
    {
      title: "Church Wedding Ceremony",
      date: "Saturday, Sept 12, 2026",
      venue: "Deeper Life Bible Church, Bwari",
      location: "Bwari, Abuja",
      steps: [
        { time: "8:30 AM", label: "Guest Seating & Prelude of Hymns", desc: "Doors open for guest seating. Attendees are kindly requested to be seated early as the service starts on time." },
        { time: "9:00 AM", label: "Arrival of Bridal Party & Processional", desc: "The bridal train enters, ushering in the grand entrance of the bride, Ayomide." },
        { time: "9:30 AM", label: "Covenant Sermon & Holy Matrimony Vows", desc: "A beautiful, solemn service before the Altar, including scripture readings, exchange of vows, and rings." },
        { time: "11:00 AM", label: "Signing of Certificates & Thanksgiving", desc: "The newly married couple signs the wedding register, followed by special thanksgiving offerings." },
        { time: "11:45 AM", label: "Recessional & Photographs", desc: "First walk as husband and wife, followed immediately by professional group photographs in the church gardens." }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-4xl bg-white border border-[#580F6E]/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#580F6E] text-white border-b border-[#580F6E]/20">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-tight">Schedule &amp; Visitor Guide</h2>
              <p className="text-[10px] uppercase tracking-widest text-white/80 font-mono mt-0.5">Event details for guests</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-white/15 rounded-full transition duration-200 cursor-pointer"
            aria-label="Close Guide"
          >
            <CloseSVG />
          </button>
        </div>

        {/* DIALOG TABS */}
        <div className="border-b border-[#580F6E]/10 bg-white px-6 py-3.5 flex items-center overflow-x-auto space-x-2 scrollbar-none">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "timeline"
                ? "bg-[#580F6E] text-white"
                : "text-slate-600 hover:text-[#580F6E] hover:bg-[#580F6E]/10"
            }`}
          >
            <ClockIconSVG /> Timelines
          </button>
          <button
            onClick={() => setActiveTab("logistics")}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "logistics"
                ? "bg-[#580F6E] text-white"
                : "text-slate-600 hover:text-[#580F6E] hover:bg-[#580F6E]/10"
            }`}
          >
            <CarSVG /> Parking &amp; Venues
          </button>
          <button
            onClick={() => setActiveTab("attire")}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "attire"
                ? "bg-[#580F6E] text-white"
                : "text-slate-600 hover:text-[#580F6E] hover:bg-[#580F6E]/10"
            }`}
          >
            <ShirtSVG /> Attire &amp; Etiquette
          </button>
        </div>

        {/* MODAL MAIN CONTENT AREA */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow bg-[#FAF8F5]">
          
          {/* TAB 1: DETAILED TIMELINES */}
          {activeTab === "timeline" && (
            <div className="space-y-12 pb-4">
              <div className="p-4 bg-[#580F6E]/10 border-l-4 border-[#580F6E] rounded-3xl">
                <p className="text-xs text-[#580F6E] font-sans font-extrabold uppercase tracking-wider leading-relaxed block mb-1">
                  Timeline Notice
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                  Please arrive early when possible. We hope your day is relaxed, smooth, and beautiful from start to finish.
                </p>
              </div>

              {timelineEvents.map((event, idx) => (
                <div key={idx} className="bg-white border border-[#580F6E]/10 rounded-3xl p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E7EB] pb-4 mb-6">
                    <div>
                      <span className="text-[10px] font-sans text-[#580F6E] font-extrabold uppercase tracking-wider">
                        Event {idx + 1}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                        {event.title}
                      </h3>
                    </div>
                    <div className="mt-2 sm:mt-0 text-left sm:text-right">
                      <span className="inline-block bg-[#580F6E]/10 text-[#580F6E] text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#580F6E]/20">
                        {event.date}
                      </span>
                      <p className="text-[11px] font-sans text-slate-500 mt-1 font-medium">{event.venue}</p>
                    </div>
                  </div>

                  {/* Render steps list */}
                  <div className="relative pl-6 border-l border-[#E5E7EB] space-y-6">
                    {event.steps.map((step, sIdx) => (
                      <div key={sIdx} className="relative">
                        <div className="absolute -left-[20px] top-1 w-4 h-4 rounded-full bg-[#580F6E] ring-4 ring-white shadow-sm"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
                          <div className="md:col-span-1">
                            <span className="font-mono text-xs font-black text-[#580F6E]">
                              {step.time}
                            </span>
                          </div>
                          <div className="md:col-span-3">
                            <h4 className="font-sans font-semibold text-sm text-slate-900">
                              {step.label}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: DETAILED VENUES & PARKING */}
          {activeTab === "logistics" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Traditional Wedding address */}
                <div className="bg-white border border-[#580F6E]/10 rounded-3xl p-6 shadow-sm">
                  <div>
                    <h3 className="font-serif text-base font-bold text-slate-900 pt-2">
                      Traditional Venue
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#580F6E]/70 my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      Elim Top Hotel and suites
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      Bwari, FCT Abuja, Nigeria. Easily accessible along the Bwari-Dutse expressway grid.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#580F6E] uppercase tracking-widest flex items-center">
                      <CarSVG /> Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Hotel-supervised private parking is available within the secure hotel gates. Guests are requested to display their approved RSVP Gatepass at the gates.
                    </p>
                  </div>
                </div>

                {/* Church Wedding address */}
                <div className="bg-white border border-[#580F6E]/10 rounded-3xl p-6 shadow-sm">
                  <div>
                    <h3 className="font-serif text-base font-bold text-slate-900 pt-2">
                      Deeper Life Bible Church
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#580F6E]/70 my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      Main Sanctuary Bwari
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      Bwari, FCT Abuja, Nigeria. A prominent cathedral sanctuary located within the heart of Bwari municipal zone.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#580F6E] uppercase tracking-widest flex items-center">
                      Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Paved church parking is provided inside the secure church compound. Professional traffic marshals will assist with seating vehicular arrivals.
                    </p>
                  </div>
                </div>

                {/* Reception venue address */}
                <div className="bg-white border border-[#580F6E]/10 rounded-3xl p-6 shadow-sm">
                  <div>
                    <h3 className="font-serif text-base font-bold text-slate-900 pt-2">
                      Fellowship Hall
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#580F6E]/70 my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      Deeper Life Bible Church Complex
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      Bwari, FCT Abuja, Nigeria. Right next to the main cathedral auditorium inside the church fellowship zone.
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#580F6E] uppercase tracking-widest flex items-center">
                      Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Same-site parking as the church wedding. Safe and convenient foot transfer from the main auditorium to the fellowship hall.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: SPECIFIC RECOMMENDED ATTIRE & DETAILED ETIQUETTE */}
          {activeTab === "attire" && (
            <div className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Traditional Ceremony Attire Details */}
                <div className="bg-white border border-[#580F6E]/10 rounded-3xl p-6 shadow-sm">
                  <span className="text-[10px] font-sans text-[#580F6E] font-extrabold tracking-widest block mb-1">
                    CULTURAL PRIDE
                  </span>
                  <h3 className="font-serif text-base font-bold text-slate-900">
                    Traditional Attire Style
                  </h3>
                  <div className="w-12 h-[1px] bg-[#580F6E]/70 my-3"></div>
                  
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-600">
                      We celebrate our heritage with polished looks in tones of magenta, white, and muted sparkle.
                    </p>
                    <div className="p-4 bg-[#FAF8F5] rounded-3xl border border-[#580F6E]/20">
                      <p className="font-bold text-slate-900 text-[11px] uppercase tracking-wider mb-2 font-sans text-[#580F6E]">Recommended Fabrics &amp; Style:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-medium">
                        <li><strong>Ladies</strong>: Elegant wrappers, polished gowns, and tasteful headpieces.</li>
                        <li><strong>Gentlemen</strong>: Neat jackets, tailored native wear, or coordinated traditional outfits.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Holy Matrimony & Reception Attire Details */}
                <div className="bg-white border border-[#580F6E]/10 rounded-3xl p-6 shadow-sm">
                  <span className="text-[10px] font-sans text-[#580F6E] font-extrabold tracking-widest block mb-1">
                    ROMANTIC GALA &amp; SACRED REVERENCE
                  </span>
                  <h3 className="font-serif text-base font-bold text-slate-900">
                    Church &amp; Reception Attire
                  </h3>
                  <div className="w-12 h-[1px] bg-[#580F6E]/70 my-3"></div>
                  
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-600">
                      The church event is elegant and bright. Guests are invited to wear clean, polished looks in magenta and white.
                    </p>
                    
                    <div className="p-4 bg-[#FAF8F5] rounded-3xl border border-[#580F6E]/20">
                      <p className="font-bold text-slate-900 text-[11px] uppercase tracking-wider mb-2 font-sans text-[#580F6E]">Reverent Church Guidelines &amp; Colors:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-medium">
                        <li><strong>Decorum</strong>: Please choose formal, respectful attire suitable for the sanctuary.</li>
                        <li><strong>Color Harmony</strong>: Prefer shades of magenta, white, and polished neutrals.</li>
                        <li><strong>Suited Perfection</strong>: Gentlemen should wear tailored suits, crisp shirts, or refined native attire.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {/* Etiquette and guidelines card */}
              <div className="bg-[#FAF8F5] border border-[#580F6E]/20 rounded-3xl p-6">
                <h4 className="font-serif text-sm font-bold text-[#580F6E]">
                  Wedding Day Etiquette
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-[11px] leading-relaxed font-sans text-slate-600 font-medium">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-[#580F6E] mr-2 mt-0.5 shrink-0 font-bold">•</span>
                      <p><strong>Approved Pass</strong>: Have your RSVP confirmation ready to minimize delay at venue entry.</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#580F6E] mr-2 mt-0.5 shrink-0 font-bold">•</span>
                      <p><strong>Quiet Respect</strong>: Please set phones to silent before the ceremony begins.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-[#580F6E] mr-2 mt-0.5 shrink-0 font-bold">•</span>
                      <p><strong>Present Moment</strong>: Enjoy the ceremony with minimal phone use and cameras held respectfully.</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#580F6E] mr-2 mt-0.5 shrink-0 font-bold">•</span>
                      <p><strong>Child Seating</strong>: Only children registered through RSVP can be seated to ensure comfort and planning accuracy.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 bg-slate-50 border-t border-[#580F6E]/10 flex items-center justify-between">
          <p className="text-[10px] text-slate-500 font-sans font-bold">
            Tobi &amp; Ayomide • 2026
          </p>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#580F6E] hover:bg-[#9B27BE] text-white font-sans text-[10px] uppercase tracking-widest font-extrabold transition duration-300 rounded-full shadow-sm cursor-pointer border border-[#580F6E]/20"
          >
            Got it
          </button>
        </div>

      </div>
    </div>
  );
}
