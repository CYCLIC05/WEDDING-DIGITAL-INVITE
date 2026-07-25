import React from "react";

const HeartSVG = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function GroomsCorner() {
  return (
    <section id="groom-section" className="relative py-20 px-6 max-w-7xl mx-auto border-t border-[#580F6E]/15 bg-white select-none overflow-hidden">
      {/* Background roses */}
      <img src="/src/assets/images/purple_watercolor_roses.png" className="pointer-events-none select-none absolute top-0 left-0 opacity-15" style={{ width: '260px', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(88,15,110,0.06))' }} alt="" />
      <img src="/src/assets/images/purple_watercolor_roses.png" className="pointer-events-none select-none absolute bottom-0 right-0 opacity-15" style={{ width: '260px', height: 'auto', transform: 'rotate(180deg)', filter: 'drop-shadow(0 8px 24px rgba(88,15,110,0.06))' }} alt="" />
      <div className="max-w-3xl mx-auto text-center">

        {/* ── GROOM'S CORNER ── */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-[#580F6E] opacity-20" />
            <div className="text-[#580F6E]">
              <HeartSVG className="w-3 h-3" />
            </div>
            <div className="h-px w-16 bg-[#580F6E] opacity-20" />
          </div>
          <p className="text-[10px] text-[#580F6E] uppercase tracking-[0.35em] font-bold mb-2">Groom's Corner</p>
          <h2 className="font-serif text-3xl text-slate-900 font-bold">Special Message</h2>
        </div>

        {/* Groom's message */}
        <div className="rounded-[1.75rem] border border-[#580F6E]/10 bg-[#FAF9F6] p-8 md:p-10 shadow-sm mb-8 text-left">
          <p className="font-serif text-base md:text-lg leading-8 text-slate-700 italic">
            "I am grateful to God for bringing Ayomide into my life. As we begin this journey together, we look forward to building a Christ-centered home that will honor God, serve people, and impact generations."
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#580F6E]/10 flex items-center justify-center">
              <span className="font-serif text-sm font-bold text-[#580F6E]">JT</span>
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-slate-900">Jerry Tobi</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">The Groom</p>
            </div>
          </div>
        </div>

        {/* Best Man card */}
        <div className="rounded-[1.75rem] border border-[#E5E7EB] bg-white p-6 md:p-8 shadow-sm text-left">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E] font-bold mb-2">Best Man / Chief Groomsman</p>
          <h3 className="font-serif text-xl text-slate-900 font-bold">Mr. Akintayo O. Popoola</h3>
          <p className="text-[10px] font-sans text-slate-500 uppercase tracking-[0.3em] mt-2 mb-4">Relationship: Friend, Brother &amp; Business Partner</p>
          <p className="font-serif text-base text-slate-700 leading-8 italic">
            Akintayo is an economist, investment banker, husband, and trusted friend who has been part of Jerry's journey for many years.
          </p>
          <p className="font-serif text-base text-slate-700 leading-8 mt-4 italic">
            "Jerry is my gee from university days, and I am happy and honored to stand with him on this special occasion."
          </p>
        </div>

        {/* ── BRIDE'S CORNER ── */}
        <div className="mt-20 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-[#580F6E] opacity-20" />
            <div className="text-[#580F6E]">
              <HeartSVG className="w-3 h-3" />
            </div>
            <div className="h-px w-16 bg-[#580F6E] opacity-20" />
          </div>
          <p className="text-[10px] text-[#580F6E] uppercase tracking-[0.35em] font-bold mb-2">Bride's Corner</p>
          <h2 className="font-serif text-3xl text-slate-900 font-bold">Special Message</h2>
        </div>

        {/* Bride's message */}
        <div className="rounded-[1.75rem] border border-[#580F6E]/10 bg-[#FAF9F6] p-8 md:p-10 shadow-sm mb-8 text-center">
          <p className="font-serif text-base md:text-lg leading-8 text-slate-700 italic">
            "A covenant journey with my beloved."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#580F6E]/10 flex items-center justify-center">
              <span className="font-serif text-sm font-bold text-[#580F6E]">AO</span>
            </div>
            <div>
              <p className="font-serif text-sm font-semibold text-slate-900">Ayomide</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">The Bride</p>
            </div>
          </div>
        </div>

        {/* Best Lady card */}
        <div className="rounded-[1.75rem] border border-[#E5E7EB] bg-white p-6 md:p-8 shadow-sm text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E] font-bold mb-2">Best Lady</p>
          <h3 className="font-serif text-xl text-slate-900 font-bold">Esther Kikelomo Oyewale</h3>
          <p className="text-[10px] font-sans text-slate-500 uppercase tracking-[0.3em] mt-2 mb-4">Relationship: Sister</p>
          <p className="font-serif text-base text-slate-700 leading-8">
            "From your best sister in the world, it's a thing of joy to stand beside you on this day. We have come a long way to be here. I'm filled with mixed emotions because I wouldn't have someone to disturb and borrow from on a daily. All the clothes, shoe, perfume and even soap 🤲🏿😩🥲 thank you. Anyways, I'd be visiting you once in a while on this occasion of need. I love you 😉"
          </p>
        </div>



      </div>
    </section>
  );
}
