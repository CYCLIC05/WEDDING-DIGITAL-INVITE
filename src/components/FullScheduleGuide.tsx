import React, { useState } from "react";

// ─── Bespoke inline SVG icons ──────────────────────────────────────────────────
const CompassSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.6"/>
  </svg>
);
const CloseSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const PinSVG = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2C7.24 2 5 4.24 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.76-2.24-5-5-5z"/>
    <circle cx="10" cy="7" r="1.8"/>
  </svg>
);
const CarSVG = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 mr-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10l1.5-4h11L17 10"/>
    <rect x="2" y="10" width="16" height="5" rx="1.5"/>
    <circle cx="6" cy="16" r="1.5" fill="currentColor"/>
    <circle cx="14" cy="16" r="1.5" fill="currentColor"/>
  </svg>
);
const ShieldSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5 4.5-1.35 8-6.25 8-11.5V6L12 2z" fill="currentColor" opacity="0.15"/>
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5 4.5-1.35 8-6.25 8-11.5V6L12 2z"/>
    <path d="M9 12l2 2 4-4" strokeWidth="2"/>
  </svg>
);
const ShirtSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10a2 2 0 002 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>
  </svg>
);
const InfoSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3"/>
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
    },
    {
      title: "Thanksgiving & Fellowship Reception",
      date: "Saturday, Sept 12, 2026",
      venue: "Fellowship Hall, Deeper Life Bible Church",
      location: "Bwari, Abuja",
      steps: [
        { time: "12:30 PM", label: "Fellowship Hall Doors Open", desc: "Pre-reception lounge opens with light refreshments in the church fellowship hall." },
        { time: "1:00 PM", label: "Grand Entry of the New Couple", desc: "The bridal train makes its high-energy entry, ushering in Mr. and Mrs. Jerry Tobi." },
        { time: "1:45 PM", label: "Thanksgiving Feast & Toasting", desc: "Opening of the exquisite buffet dinner, accompanied by toasts from the groom's and bride's families." },
        { time: "3:00 PM", label: "Cake Cutting & First Waltz", desc: "The official cutting of the wedding cake and the couple's celebratory waltz." },
        { time: "3:45 PM", label: "Cultural Dance & Rejoicing", desc: "Celebrating our diverse union with beautiful cultural dance performances and rejoicing." },
        { time: "4:30 PM", label: "Closing Prayers & Royal Send-off", desc: "Concluding prayers and departure of the bride and groom under a canopy of love." }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-4xl bg-[#FAF4F0] border-2 border-[#C29D70] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] double-gold-border animate-scale-up">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#BF3B52] text-white border-b border-[#C29D70]">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="font-serif text-xl font-bold tracking-tight">Schedule &amp; Visitor Guide</h2>
              <p className="text-[10px] uppercase tracking-widest text-[#FAF4F0]/85 font-mono mt-0.5">Holy Matrimony Information Center</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-white/10 rounded-full transition duration-200 cursor-pointer"
            aria-label="Close Guide"
          >
            <CloseSVG />
          </button>
        </div>

        {/* DIALOG TABS */}
        <div className="border-b border-[#C29D70]/20 bg-white px-6 py-3.5 flex items-center overflow-x-auto space-x-2 scrollbar-none">
          <button
            onClick={() => setActiveTab("timeline")}
            className={`px-5 py-2 text-xs font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "timeline"
                ? "bg-[#BF3B52] text-white"
                : "text-slate-600 hover:text-[#BF3B52] hover:bg-[#BF3B52]/5"
            }`}
          >
            ⏰ Timelines
          </button>
          <button
            onClick={() => setActiveTab("logistics")}
            className={`px-5 py-2 text-xs font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "logistics"
                ? "bg-[#BF3B52] text-white"
                : "text-slate-600 hover:text-[#BF3B52] hover:bg-[#BF3B52]/5"
            }`}
          >
            🚗 Parking &amp; Venues
          </button>
          <button
            onClick={() => setActiveTab("attire")}
            className={`px-5 py-2 text-xs font-sans font-extrabold uppercase tracking-widest rounded-full transition-all shrink-0 cursor-pointer ${
              activeTab === "attire"
                ? "bg-[#BF3B52] text-white"
                : "text-slate-600 hover:text-[#BF3B52] hover:bg-[#BF3B52]/5"
            }`}
          >
            🌟 Attire &amp; Etiquette
          </button>
        </div>

        {/* MODAL MAIN CONTENT AREA */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow bg-[#FAF4F0]/40">
          
          {/* TAB 1: DETAILED TIMELINES */}
          {activeTab === "timeline" && (
            <div className="space-y-12 animate-fade-in pb-4">
              <div className="p-4 bg-[#BF3B52]/5 border-l-4 border-[#BF3B52] rounded-r-2xl border-y border-r border-[#C29D70]/10">
                <p className="text-xs text-[#BF3B52] font-sans font-extrabold uppercase tracking-wider leading-relaxed block mb-1">
                  ⏱️ Timeline Notice
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                  We are operating on a strict schedule. Guests are kindly urged to strive for punctuality so that we can witness all solemn sacraments and cultural celebrations comfortably.
                </p>
              </div>

              {timelineEvents.map((event, idx) => (
                <div key={idx} className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm double-gold-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-rose-50 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] font-sans text-[#BF3B52] font-extrabold uppercase tracking-wider">
                        Part {idx + 1} Ceremony
                      </span>
                      <h3 className="font-serif text-lg font-bold text-slate-800 mt-0.5">
                        {event.title}
                      </h3>
                    </div>
                    <div className="mt-2 sm:mt-0 text-left sm:text-right">
                      <span className="inline-block bg-[#BF3B52]/10 text-[#BF3B52] text-[10px] font-sans font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#C29D70]/30 animate-pulse">
                        {event.date}
                      </span>
                      <p className="text-[11px] font-sans text-slate-500 mt-1 font-medium">{event.venue}</p>
                    </div>
                  </div>

                  {/* Render steps list */}
                  <div className="relative pl-6 border-l border-rose-100 space-y-6">
                    {event.steps.map((step, sIdx) => (
                      <div key={sIdx} className="relative">
                        {/* Circle bullet representation with dynamic colors */}
                        <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full border-2 border-white bg-[#BF3B52] shadow-xs flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-start">
                          <div className="md:col-span-1">
                            <span className="font-mono text-xs font-black text-[#BF3B52]">
                              {step.time}
                            </span>
                          </div>
                          <div className="md:col-span-3">
                            <h4 className="font-sans font-bold text-xs text-slate-800">
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
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Traditional Wedding address */}
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between double-gold-border">
                  <div>
                    <h3 className="font-serif text-base font-bold text-slate-800 pt-2">
                      Traditional Venue
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#C29D70] my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      Elim Top Hotel and suites
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      Bwari, FCT Abuja, Nigeria. Easily accessible along the Bwari-Dutse expressway grid.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-rose-50">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#BF3B52] uppercase tracking-widest flex items-center">
                      <CarSVG /> Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Hotel-supervised private parking is available within the secure hotel gates. Guests are requested to display their approved RSVP Gatepass at the gates.
                    </p>
                  </div>
                </div>

                {/* Church Wedding address */}
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between double-gold-border">
                  <div>
                    <h3 className="font-serif text-base font-bold text-slate-800 pt-2">
                      Deeper Life Bible Church
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#C29D70] my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      Main Sanctuary Bwari
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      Bwari, FCT Abuja, Nigeria. A prominent cathedral sanctuary located within the heart of Bwari municipal zone.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-rose-50">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#BF3B52] uppercase tracking-widest flex items-center">
                      Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Paved church parking is provided inside the secure church compound. Professional traffic marshals will assist with seating vehicular arrivals.
                    </p>
                  </div>
                </div>

                {/* Reception venue address */}
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between double-gold-border">
                  <div>
                    <h3 className="font-serif text-base font-bold text-slate-800 pt-2">
                      Fellowship Hall
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#C29D70] my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      Deeper Life Bible Church Complex
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      Bwari, FCT Abuja, Nigeria. Right next to the main cathedral auditorium inside the church fellowship zone.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-rose-50">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#BF3B52] uppercase tracking-widest flex items-center">
                      Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Same-site parking as the church wedding. Safe and convenient foot transfer from the main auditorium to the fellowship hall.
                    </p>
                  </div>
                </div>

              </div>

              {/* Security Banner Info */}
              <div className="bg-[#BF3B52] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm border border-[#C29D70]">
                <div>
                  <h4 className="font-serif text-base font-bold text-white tracking-wide">Strict Security Protocols Implemented</h4>
                  <p className="text-xs text-[#FAF4F0] mt-1 leading-relaxed font-sans font-medium">
                    Church security patrols and hotel check stations will strictly check everyone at the gates. Please display your approved Gatepass on your dashboard or present your verification token text on your mobile screen.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPECIFIC RECOMMENDED ATTIRE & DETAILED ETIQUETTE */}
          {activeTab === "attire" && (
            <div className="space-y-8 animate-fade-in">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Traditional Ceremony Attire Details */}
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm double-gold-border">
                  <span className="text-[10px] font-sans text-[#BF3B52] font-extrabold tracking-widest block mb-1">
                    CULTURAL PRIDE
                  </span>
                  <h3 className="font-serif text-base font-bold text-slate-800">
                    Traditional Attire Style
                  </h3>
                  <div className="w-12 h-[1px] bg-[#C29D70] my-3"></div>
                  
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-600">
                      We celebrate our rich African heritage. Guests are highly encouraged to wear glamorous traditional attire with primary accents in <strong>Purple &amp; Gold</strong>.
                    </p>
                    <div className="p-4 bg-[#FAF4F0]/60 rounded-xl border border-dashed border-[#C29D70]/40">
                      <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-2 font-sans text-[#BF3B52]">Recommended Fabrics &amp; Style:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-medium">
                        <li><strong>Ladies</strong>: Beautiful lace wrappers, embellished traditional gowns, and custom elegant head ties (Gele).</li>
                        <li><strong>Gentlemen</strong>: Chieftaincy kaftans, majestic Agbada styles, or styled native senator wears with custom caps.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Holy Matrimony & Reception Attire Details */}
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm double-gold-border">
                  <span className="text-[10px] font-sans text-[#BF3B52] font-extrabold tracking-widest block mb-1">
                    ROMANTIC GALA &amp; SACRED REVERENCE
                  </span>
                  <h3 className="font-serif text-base font-bold text-slate-800">
                    Church &amp; Reception Attire
                  </h3>
                  <div className="w-12 h-[1px] bg-[#C29D70] my-3"></div>
                  
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-600">
                      The Church Wedding calls for formal elegance. Our chosen color theme features gorgeous <strong>Magenta purple, White &amp; Gold</strong>.
                    </p>
                    
                    <div className="p-4 bg-[#FAF4F0]/60 rounded-xl border border-dashed border-[#C29D70]/40">
                      <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-2 font-sans text-[#BF3B52]">Reverent Church Guidelines &amp; Colors:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-medium">
                        <li><strong>Decorum</strong>: In respect of the sanctuary, guests are requested to wear elegant, modest, and respectful formal wear.</li>
                        <li><strong>Color Harmony</strong>: Splendid shades of Magenta purple, White, or shimmering Gold are requested.</li>
                        <li><strong>Suited Perfection</strong>: Gentlemen should don formal suits or crisp, structured traditional native attire.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {/* Etiquette and guidelines card */}
              <div className="bg-[#BF3B52]/5 border border-[#C29D70]/30 rounded-2xl p-6">
                <h4 className="font-serif text-sm font-bold text-[#BF3B52]">
                  Golden Wedding Day Etiquette
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-[11px] leading-relaxed font-sans text-slate-600 font-medium">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-[#C29D70] mr-2 mt-0.5 shrink-0 font-bold">&bull;</span>
                      <p><strong>Approved Digital Pass</strong>: Have your personal QR / token ready to minimize delay at resort security checks.</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#C29D70] mr-2 mt-0.5 shrink-0 font-bold">&bull;</span>
                      <p><strong>Ecclesiastical Silence</strong>: Please switch all mobile phones to silent or vibrate mode when entering the sacred church cathedral.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-[#C29D70] mr-2 mt-0.5 shrink-0 font-bold">&bull;</span>
                      <p><strong>Unplugged Ceremony</strong>: Let the official photographers capture the vows. We request guests enjoy the ceremony offline with eyes and hearts.</p>
                    </div>
                    <div className="flex items-start">
                      <span className="text-[#C29D70] mr-2 mt-0.5 shrink-0 font-bold">&bull;</span>
                      <p><strong>Child Accommodation</strong>: The venue is meticulously seating-planned. Only children explicitly registered in RSVPs can be allocated dining passes.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-[#C29D70]/20 flex items-center justify-between">
          <p className="text-[10px] text-zinc-400 font-sans font-bold">
            Holy Matrimony • Tobi &amp; Ayomide • 2026
          </p>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-[#BF3B52] hover:bg-[#9E2B3E] text-white font-sans text-[10px] uppercase tracking-widest font-extrabold transition duration-300 rounded-full shadow-sm cursor-pointer border border-[#C29D70]/40"
          >
            I Acknowledge
          </button>
        </div>

      </div>
    </div>
  );
}
