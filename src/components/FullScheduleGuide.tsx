import React, { useState } from "react";
import { 
  Clock, MapPin, Car, Shirt, Calendar, Shield, Map, Info, X, Check, Eye, Compass
} from "lucide-react";

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
      title: "Traditional Marriage (Igba Nkwu)",
      date: "Thursday, Oct 15, 2026",
      venue: "The Bride's Family Compound",
      location: "Independence Layout, Enugu",
      steps: [
        { time: "1:30 PM", label: "Arrival of Guests & Traditional Music", desc: "Guests are welcomed with traditional highlife melodies and seated by representatives." },
        { time: "2:00 PM", label: "Solemn Prayer & Kolo Presentation", desc: "Traditional presentation and blessing of kola nuts by the elders of both families." },
        { time: "3:00 PM", label: "The Wine Carrying Ceremony (Igba Nkwu)", desc: "Adanna searches for her groom Chidi amidst the crowd to present him with the traditional cup of palm wine." },
        { time: "4:15 PM", label: "Presentation of Nuptial Gifts & Dancing", desc: "Opening of the floor for traditional celebrations, congratulations, and family presentation of gifts." },
        { time: "5:30 PM", label: "Vote of Thanks & Exquisite Local Feast", desc: "Concluding prayers and serving of traditional Enugu delicacies (Abacha, Ugba, and native soups)." }
      ]
    },
    {
      title: "Church Holy Matrimony",
      date: "Saturday, Oct 17, 2026",
      venue: "Cathedral of Good Shepherd",
      location: "Ogui Road, Enugu",
      steps: [
        { time: "9:00 AM", label: "Arrival of Groomsmen & Guests", desc: "Doors open for guest seating. All attendees are kindly requested to be seated early." },
        { time: "9:45 AM", label: "Processional & Entrance of the Bride", desc: "The bridal party enters, followed by the grand entrance of Adanna with her father." },
        { time: "10:00 AM", label: "Liturgies & Exchange of Sacred Vows", desc: "A beautiful, solemn service before the Altar, including scripture readings, vows, and ring exchange." },
        { time: "11:30 AM", label: "Holy Communion & Register Signing", desc: "The newly married couple shares Holy Communion, followed by the signing of the ecclesial certificates." },
        { time: "12:15 PM", label: "Recessional & Professional Photoshoot", desc: "First walk as husband and wife, followed immediately by family and guest photographs at the cathedral courtyard." }
      ]
    },
    {
      title: "Grand Reception & Rejoicing",
      date: "Saturday, Oct 17, 2026",
      venue: "Royal Event Pavilion, Nike Lake Resort",
      location: "Nike Lake Road, Enugu",
      steps: [
        { time: "1:00 PM", label: "Cocktail Reception & Seating", desc: "Pre-reception lounge opens with live harp scores and delicate refreshments by the lakeside." },
        { time: "1:30 PM", label: "Grand Entry of the Royal Couple", desc: "The bridal train makes its high-energy entry, ushering in Chidi & Adanna." },
        { time: "2:15 PM", label: "Feast & Toasting", desc: "Opening of the exquisite continental and local buffet dinner. Groom's and Bride's fathers present royal toasts." },
        { time: "3:30 PM", label: "Cake Cutting & Choreographed Waltz", desc: "The official cutting of the royal wedding cake and the couple's beautiful first dance." },
        { time: "4:30 PM", label: "Nupe-Igbo Cultural Dance & Rejoicing", desc: "Celebrating our diverse cultural union with dynamic traditional dance and music." },
        { time: "6:00 PM", label: "Bridal Exit & Farewell", desc: "Concluding prayers and departure of the bride and groom under a canopy of light." }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-4xl bg-[#FAF4F0] border-2 border-[#C29D70] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] double-gold-border animate-scale-up">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#BF3B52] text-white border-b border-[#C29D70]">
          <div className="flex items-center space-x-3">
            <Compass className="w-5 h-5 text-white stroke-[2.5]" />
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
            <X className="w-6 h-6 text-white" />
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
                    <div className="w-8 h-8 rounded-full bg-[#BF3B52]/10 text-[#BF3B52] flex items-center justify-center mb-4 border border-[#C29D70]/25">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-slate-800">
                      Traditional Venue
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#C29D70] my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      The Bride's Family Compound
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      No. 17, Independence Layout Extension, Phase II, Enugu, Nigeria. Directly behind the Government House, easily accessible via Presidential Road.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-rose-50">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#BF3B52] uppercase tracking-widest flex items-center">
                      <Car className="w-3.5 h-3.5 mr-1 text-[#C29D70]" /> Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Street parking is strictly organized along Independence Boulevard. Marked parallel slots will be fully guarded by armed patrols. Ensure your gatepass code is visible.
                    </p>
                  </div>
                </div>

                {/* Church Wedding address */}
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between double-gold-border">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#BF3B52]/10 text-[#BF3B52] flex items-center justify-center mb-4 border border-[#C29D70]/25">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-slate-800">
                      Good Shepherd Cathedral
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#C29D70] my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      Holy Trinity Cathedral Precincts
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      No 4 Ogui Road, Enugu, Nigeria. Centrally located right adjacent to the Michael Okpara Square in Enugu's civic center.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-rose-50">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#BF3B52] uppercase tracking-widest flex items-center">
                      <Car className="w-3.5 h-3.5 mr-1 text-[#C29D70]" /> Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Spacious, secure, paved parking is generously provided in the Cathedral's North Yard and South Courtyard. Dedicated church wardens will guide vehicular arrivals.
                    </p>
                  </div>
                </div>

                {/* Reception venue address */}
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between double-gold-border">
                  <div>
                    <div className="w-8 h-8 rounded-full bg-[#BF3B52]/10 text-[#BF3B52] flex items-center justify-center mb-4 border border-[#C29D70]/25">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-slate-800">
                      Nike Lake Pavilion
                    </h3>
                    <div className="w-8 h-[1.5px] bg-[#C29D70] my-3"></div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-semibold">
                      Nike Lake Resort Complex
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                      Nike Lake Road, Enugu, Nigeria. Set in pristine visual beauty, entered via the resort's secure main gate along the Abakpa-Nike road grid.
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-rose-50">
                    <h4 className="text-[10px] font-sans font-extrabold text-[#BF3B52] uppercase tracking-widest flex items-center">
                      <Car className="w-3.5 h-3.5 mr-1 text-[#C29D70]" /> Parking Guideline
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                      Complimentary visitor parking is provided in the resort's premium lakeside compound. Battery-powered shuttle golf buggies are on standby for elderly guests.
                    </p>
                  </div>
                </div>

              </div>

              {/* Security Banner Info */}
              <div className="bg-[#BF3B52] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm border border-[#C29D70]">
                <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0 border border-[#C29D70]/40">
                  <Shield className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-white tracking-wide">Strict Security Protocols Implemented</h4>
                  <p className="text-xs text-[#FAF4F0] mt-1 leading-relaxed font-sans font-medium">
                    Nike Lake Resort and wedding security will strictly check everyone at the gates. Please display your approved Gatepass on your dashboard or present your verification token text on your mobile screen.
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
                  <h3 className="font-serif text-base font-bold text-slate-800 flex items-center">
                    <Shirt className="w-4 h-4 mr-2 text-[#C29D70]" /> Traditional (Igba Nkwu) Attire
                  </h3>
                  <div className="w-12 h-[1px] bg-[#C29D70] my-3"></div>
                  
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-600">
                      We celebrate the rich, royal African heritage. Guests are highly encouraged to wear glamorous traditional attire with primary accents in <strong>Beige, Cream, or Regal Gold</strong>.
                    </p>
                    <div className="p-4 bg-[#FAF4F0]/60 rounded-xl border border-dashed border-[#C29D70]/40">
                      <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-2 font-sans text-[#BF3B52]">Recommended Fabrics &amp; Style:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-medium">
                        <li><strong>Ladies</strong>: George wrappers, upscale Lace styles, embellished blouses, elegant head ties (Gele), and coral beaded necklines.</li>
                        <li><strong>Gentlemen</strong>: Chieftaincy kaftans, majestic Agbada styles, or structured Isiagu shirts matched with complementary caps and walking sticks.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Holy Matrimony & Reception Attire Details */}
                <div className="bg-white border-2 border-[#C29D70]/20 rounded-2xl p-6 shadow-sm double-gold-border">
                  <span className="text-[10px] font-sans text-[#BF3B52] font-extrabold tracking-widest block mb-1">
                    ROMANTIC GALA &amp; SACRED REVERENCE
                  </span>
                  <h3 className="font-serif text-base font-bold text-slate-800 flex items-center">
                    <Shirt className="w-4 h-4 mr-2 text-[#C29D70]" /> White Wedding Gala Attire
                  </h3>
                  <div className="w-12 h-[1px] bg-[#C29D70] my-3"></div>
                  
                  <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-600">
                      The White Wedding calls for glamorous, formal wedding luxury. Our chosen theme features gorgeous <strong>Cyan Elegance &amp; Premium Platinum</strong> accents.
                    </p>
                    
                    <div className="p-4 bg-[#FAF4F0]/60 rounded-xl border border-dashed border-[#C29D70]/40">
                      <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-2 font-sans text-[#BF3B52]">Reverent Church Guidelines &amp; Colors:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-600 font-medium">
                        <li><strong>Cathedral Decorum</strong>: In respect of the Cathedral, ladies are requested to wear elegant floor-length dresses that cover shoulders.</li>
                        <li><strong>Color Harmony</strong>: Splendid shades of beautiful Cyan or shimmering Platinum white are requested.</li>
                        <li><strong>Suited Perfection</strong>: Gentlemen should don classic dark tuxedo-cut suits, sleek bow-ties, or pristine white formal Kaftans with structured lines.</li>
                        <li><strong className="text-red-700">Strict Note</strong>: White clothing is reserved exclusively for the beautiful bride Adanna.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              {/* Etiquette and guidelines card */}
              <div className="bg-[#BF3B52]/5 border border-[#C29D70]/30 rounded-2xl p-6">
                <h4 className="font-serif text-sm font-bold text-[#BF3B52] flex items-center">
                  <Info className="w-4.5 h-4.5 mr-2 stroke-[2.5] text-[#C29D70]" /> Golden Wedding Day Etiquette
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-[11px] leading-relaxed font-sans text-slate-600 font-medium">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Check className="w-3.5 h-3.5 text-[#BF3B52] mr-2 mt-0.5 shrink-0 stroke-[3]" />
                      <p><strong>Approved Digital Pass</strong>: Have your personal QR / token ready to minimize delay at resort security checks.</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-3.5 h-3.5 text-[#BF3B52] mr-2 mt-0.5 shrink-0 stroke-[3]" />
                      <p><strong>Ecclesiastical Silence</strong>: Please switch all mobile phones to silent or vibrate mode when entering the sacred church cathedral.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Check className="w-3.5 h-3.5 text-[#BF3B52] mr-2 mt-0.5 shrink-0 stroke-[3]" />
                      <p><strong>Unplugged Ceremony</strong>: Let the official photographers capture the vows. We request guests enjoy the ceremony offline with eyes and hearts.</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-3.5 h-3.5 text-[#BF3B52] mr-2 mt-0.5 shrink-0 stroke-[3]" />
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
            Holy Matrimony • Chidi &amp; Adanna • 2026
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
