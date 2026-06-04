import React, { useState, useEffect } from "react";
import { Heart, Edit3, Save, X, RotateCcw, AlertCircle, Sparkles, Check } from "lucide-react";

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

// Gorgeous High-Quality Unsplash Stock Options representing beautiful Afro-Nigerian wedding models
const PRESET_MALE_PHOTOS = [
  {
    name: "Classic Tux",
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Royal Velvet Suit",
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Dapper Smile",
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=600&q=80"
  }
];

const PRESET_FEMALE_PHOTOS = [
  {
    name: "Glowing White Gown",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Golden Embroidery Dress",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Radiant Veil",
    url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&h=600&q=80"
  }
];

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
  groomName: "Chidi",
  groomTitle: "The groom",
  groomImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&auto=format&fit=crop&w=600&h=600&q=80",
  groomAbout: "A man of vision, stalwart faith, and absolute honor. From the moment Adanna walked into my life, I recognized she was the answer to every earnest prayer I shared with God. I vow to guide, support, and cherish her in this holy union.",
  brideName: "Adanna",
  brideTitle: "The bride",
  brideImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80",
  brideAbout: "A woman of joyful warmth, divine grace, and unconditional love. Chidi is my beloved companion, my reliable harbor, and my greatest blessing. I stand in overwhelming gratitude as we step forward and pledge our sacred forever."
};

export function CoupleAbout() {
  const [couple, setCouple] = useState<CoupleData>(DEFAULT_COUPLE_DATA);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<CoupleData>(DEFAULT_COUPLE_DATA);
  const [saveNotification, setSaveNotification] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem("chidi_adanna_couple_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCouple(parsed);
        setEditForm(parsed);
      } catch (err) {
        console.error("Failed to parse saved couple profile data, using default", err);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCouple(editForm);
    localStorage.setItem("chidi_adanna_couple_profile", JSON.stringify(editForm));
    setIsEditing(false);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  const handleReset = () => {
    if (confirm("Reset couple profiles to beautiful default settings?")) {
      setCouple(DEFAULT_COUPLE_DATA);
      setEditForm(DEFAULT_COUPLE_DATA);
      localStorage.removeItem("chidi_adanna_couple_profile");
      setIsEditing(false);
    }
  };

  return (
    <section id="couple-section" className="py-20 bg-white relative select-none">
      
      {/* Decorative Top Pink Dotted Ribbon exactly from Image 2 */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[#BF3B52] flex overflow-hidden">
        <div className="w-full h-full opacity-35 bg-[radial-gradient(#1E293B_3px,transparent_3px)] [background-size:12px_12px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative pt-4">
        
        {/* Save confirmation banner */}
        {saveNotification && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-2xl flex items-center space-x-2.5 shadow-xl border border-[#C29D70]/40 animate-fade-in">
            <div className="w-6 h-6 bg-[#BF3B52] rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-sans font-semibold">Couple Profiles updated beautifully!</span>
          </div>
        )}

        {/* Mini Section Identifier Pendant */}
        <div className="text-center mb-16 relative">
          <div className="flex justify-center mb-4">
            {/* The Badge matching the central True Love item from Image 2 */}
            <div className="relative w-24 h-24 transform transition hover:scale-105 duration-300">
              <div className="absolute inset-1.5 rounded-full bg-white flex flex-col items-center justify-center text-center shadow-md border border-[#BF3B52]/10 z-15">
                <span className="font-serif text-[11px] italic text-[#1E293B] uppercase tracking-wider font-semibold leading-none mt-1">True</span>
                <Heart className="w-3.5 h-3.5 text-[#BF3B52] fill-[#BF3B52] my-0.5 animate-pulse" />
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
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>

              <p className="text-xs md:text-sm text-slate-600 max-w-sm leading-relaxed px-4 font-medium italic font-serif">
                "{couple.groomAbout}"
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
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>

              <p className="text-xs md:text-sm text-slate-600 max-w-sm leading-relaxed px-4 font-medium italic font-serif">
                "{couple.brideAbout}"
              </p>
            </div>
          </div>

        </div>

        {/* CUSTOM PROFILE EDITOR ACCESS TRIGGER */}
        <div className="mt-16 text-center">
          {!isEditing ? (
            <button
              onClick={() => {
                setEditForm({ ...couple });
                setIsEditing(true);
              }}
              className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-[#BF3B52]/30 text-[#BF3B52] hover:bg-[#BF3B52] hover:text-white hover:border-[#BF3B52] rounded-full text-xs font-sans font-bold tracking-[0.2em] uppercase duration-300 transition-all cursor-pointer bg-[#FAF4F0]/30"
            >
              <Edit3 className="w-4 h-4" />
              <span>Customize Couple Profiles</span>
            </button>
          ) : (
            <div className="max-w-2xl mx-auto bg-[#FAF4F0] border-2 border-[#C29D70] rounded-3xl p-6 md:p-8 card-shadow double-gold-border animate-fade-in text-left">
              
              {/* Editor Header */}
              <div className="flex items-center justify-between border-b border-[#C29D70]/30 pb-4 mb-6">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-[#BF3B52]/10 text-[#BF3B52] rounded-xl">
                    <Sparkles className="w-4.5 h-4.5 text-[#BF3B52]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-slate-800">Covenant Profiles Customizer</h4>
                    <span className="text-[10px] font-sans text-slate-400 font-extrabold uppercase tracking-widest mt-0.5 block">Update pictures, Names &amp; Love stories</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-1 hover:bg-slate-200/50 rounded-full transition"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Dynamic Edit Form */}
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Section Break: Groom */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b border-[#C29D70]/20 pb-2">
                    <Heart className="w-4 h-4 text-[#BF3B52] fill-[#BF3B52]" />
                    <span className="font-sans text-xs font-extrabold uppercase tracking-wider text-slate-800">The Groom's Details</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-extrabold text-slate-600 uppercase tracking-widest block">Groom First Name</label>
                      <input 
                        type="text"
                        required
                        value={editForm.groomName}
                        onChange={(e) => setEditForm({...editForm, groomName: e.target.value})}
                        className="w-full bg-white border border-[#C29D70]/40 focus:border-[#BF3B52] focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-3.5 py-2.5 rounded-xl text-xs text-slate-800 font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-extrabold text-slate-600 uppercase tracking-widest block">Groom Title designation</label>
                      <input 
                        type="text"
                        required
                        value={editForm.groomTitle}
                        onChange={(e) => setEditForm({...editForm, groomTitle: e.target.value})}
                        className="w-full bg-white border border-[#C29D70]/40 focus:border-[#BF3B52] focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-3.5 py-2.5 rounded-xl text-xs text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-extrabold text-slate-600 uppercase tracking-widest block">Groom Photo Source URL</label>
                    <input 
                      type="url"
                      required
                      placeholder="Paste portrait photo URL..."
                      value={editForm.groomImage}
                      onChange={(e) => setEditForm({...editForm, groomImage: e.target.value})}
                      className="w-full bg-white border border-[#C29D70]/40 focus:border-[#BF3B52] focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-3.5 py-2.5 rounded-xl text-xs text-slate-600 font-mono"
                    />
                    
                    {/* Prest Quick Photo selectors */}
                    <div className="pt-2 flex items-center space-x-3 overflow-x-auto py-1">
                      <span className="text-[9px] font-sans text-slate-400 font-bold uppercase tracking-wider shrink-0">Sample Portraits:</span>
                      {PRESET_MALE_PHOTOS.map((pres) => (
                        <button
                          key={pres.name}
                          type="button"
                          onClick={() => setEditForm({...editForm, groomImage: pres.url})}
                          className={`px-3 py-1 text-[9px] rounded-lg border font-medium font-sans ${
                            editForm.groomImage === pres.url 
                              ? "bg-[#BF3B52] text-white border-[#BF3B52]" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-[#BF3B52]"
                          }`}
                        >
                          {pres.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-extrabold text-slate-600 uppercase tracking-widest block">Groom About Story / Confession</label>
                    <textarea 
                      required
                      rows={3}
                      value={editForm.groomAbout}
                      onChange={(e) => setEditForm({...editForm, groomAbout: e.target.value})}
                      className="w-full bg-white border border-[#C29D70]/40 focus:border-[#BF3B52] focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-3.5 py-2.5 rounded-xl text-xs text-slate-700 leading-relaxed font-sans"
                    />
                  </div>
                </div>

                {/* Section Break: Bride */}
                <div className="space-y-4 pt-4 border-t border-[#C29D70]/20">
                  <div className="flex items-center space-x-2 border-b border-[#C29D70]/20 pb-2">
                    <Heart className="w-4 h-4 text-[#BF3B52] fill-[#BF3B52]" />
                    <span className="font-sans text-xs font-extrabold uppercase tracking-wider text-slate-800">The Bride's Details</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-extrabold text-slate-600 uppercase tracking-widest block">Bride First Name</label>
                      <input 
                        type="text"
                        required
                        value={editForm.brideName}
                        onChange={(e) => setEditForm({...editForm, brideName: e.target.value})}
                        className="w-full bg-white border border-[#C29D70]/40 focus:border-[#BF3B52] focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-3.5 py-2.5 rounded-xl text-xs text-slate-800 font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-sans font-extrabold text-slate-600 uppercase tracking-widest block">Bride Title designation</label>
                      <input 
                        type="text"
                        required
                        value={editForm.brideTitle}
                        onChange={(e) => setEditForm({...editForm, brideTitle: e.target.value})}
                        className="w-full bg-white border border-[#C29D70]/40 focus:border-[#BF3B52] focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-3.5 py-2.5 rounded-xl text-xs text-slate-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-extrabold text-slate-600 uppercase tracking-widest block">Bride Photo Source URL</label>
                    <input 
                      type="url"
                      required
                      placeholder="Paste portrait photo URL..."
                      value={editForm.brideImage}
                      onChange={(e) => setEditForm({...editForm, brideImage: e.target.value})}
                      className="w-full bg-white border border-[#C29D70]/40 focus:border-[#BF3B52] focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-3.5 py-2.5 rounded-xl text-xs text-slate-600 font-mono"
                    />

                    {/* Prest Quick Photo selectors */}
                    <div className="pt-2 flex items-center space-x-3 overflow-x-auto py-1">
                      <span className="text-[9px] font-sans text-slate-400 font-bold uppercase tracking-wider shrink-0">Sample Portraits:</span>
                      {PRESET_FEMALE_PHOTOS.map((pres) => (
                        <button
                          key={pres.name}
                          type="button"
                          onClick={() => setEditForm({...editForm, brideImage: pres.url})}
                          className={`px-3 py-1 text-[9px] rounded-lg border font-medium font-sans ${
                            editForm.brideImage === pres.url 
                              ? "bg-[#BF3B52] text-white border-[#BF3B52]" 
                              : "bg-white text-slate-600 border-slate-200 hover:border-[#BF3B52]"
                          }`}
                        >
                          {pres.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-sans font-extrabold text-slate-600 uppercase tracking-widest block">Bride About Story / Confession</label>
                    <textarea 
                      required
                      rows={3}
                      value={editForm.brideAbout}
                      onChange={(e) => setEditForm({...editForm, brideAbout: e.target.value})}
                      className="w-full bg-white border border-[#C29D70]/40 focus:border-[#BF3B52] focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-3.5 py-2.5 rounded-xl text-xs text-slate-700 leading-relaxed font-sans"
                    />
                  </div>
                </div>

                {/* Submit Controls */}
                <div className="pt-6 border-t border-[#C29D70]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 border border-slate-300 text-slate-500 hover:bg-slate-50 text-[10px] uppercase font-sans font-bold tracking-widest rounded-xl transition duration-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default Values</span>
                  </button>

                  <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2 border border-slate-300 text-slate-600 hover:bg-slate-100 text-[10px] uppercase font-sans font-bold tracking-widest rounded-full transition duration-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center space-x-1.5 px-6 py-2.5 bg-[#BF3B52] hover:bg-[#9E2B3E] text-white text-[10px] uppercase font-sans font-bold tracking-widest rounded-full transition duration-200 cursor-pointer border border-[#C29D70]/40 shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Profile Changes</span>
                    </button>
                  </div>
                </div>

              </form>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
