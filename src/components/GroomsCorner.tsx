import React from "react";

const HeartSVG = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function GroomsCorner() {
  return (
    <section id="groom-section" className="relative py-20 px-6 max-w-7xl mx-auto border-t border-[#580F6E]/15 bg-white diagonal-pattern select-none overflow-hidden">
      {/* Cross-hatch texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 L32 16 M16 0 L16 32' stroke='%23580F6E' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/svg%3E")`, backgroundSize: '32px 32px' }} />
      {/* Background roses */}
      <img src="/src/assets/images/purple_watercolor_roses.png" className="pointer-events-none select-none absolute top-0 left-0 opacity-[0.12] z-0" style={{ width: '260px', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(88,15,110,0.06))' }} alt="" />
      <img src="/src/assets/images/purple_watercolor_roses.png" className="pointer-events-none select-none absolute bottom-0 right-0 opacity-[0.12] z-0" style={{ width: '260px', height: 'auto', transform: 'rotate(180deg)', filter: 'drop-shadow(0 8px 24px rgba(88,15,110,0.06))' }} alt="" />
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
          <p className="text-xs text-[#580F6E] uppercase tracking-[0.3em] font-semibold mb-2">Groom's Corner</p>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 tracking-tight font-bold">Special Message</h2>
        </div>

        {/* Groom's message */}
        <div className="rounded-[1.75rem] border border-[#580F6E]/40 bg-[#FAF9F6] p-8 md:p-10 shadow-sm mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-1.5 border border-[#580F6E]/25 rounded-[1.5rem] pointer-events-none" />
          <p className="text-base leading-relaxed text-slate-600 relative z-10">
            "I am grateful to God for bringing Ayomide into my life. As we begin this journey together, we look forward to building a Christ-centered home that will honor God, serve people, and impact generations."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#580F6E]/10 flex items-center justify-center border border-[#580F6E]/30">
              <span className="font-serif text-sm font-bold text-[#580F6E]">JT</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Jerry Tobi</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">The Groom</p>
            </div>
          </div>
        </div>

        {/* Best Man card */}
        <div className="rounded-[1.75rem] border border-[#580F6E]/40 bg-[#FAF9F6] p-8 md:p-10 shadow-sm mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-1.5 border border-[#580F6E]/25 rounded-[1.5rem] pointer-events-none" />
          <p className="text-base leading-relaxed text-slate-600 relative z-10">
            "Jerry is my gee from university days. As an economist and investment banker, I have been part of his journey for many years, and I am happy and honored to stand with him on this special occasion."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#580F6E]/10 flex items-center justify-center border border-[#580F6E]/30">
              <span className="font-serif text-sm font-bold text-[#580F6E]">AP</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Mr. Akintayo O. Popoola</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Best Man / Chief Groomsman</p>
            </div>
          </div>
        </div>

        {/* ── BRIDE'S CORNER ── */}
        <div id="bride-section" className="mt-20 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-[#580F6E] opacity-20" />
            <div className="text-[#580F6E]">
              <HeartSVG className="w-3 h-3" />
            </div>
            <div className="h-px w-16 bg-[#580F6E] opacity-20" />
          </div>
          <p className="text-xs text-[#580F6E] uppercase tracking-[0.3em] font-semibold mb-2">Bride's Corner</p>
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 tracking-tight font-bold">Special Message</h2>
        </div>

        {/* Bride's message */}
        <div className="rounded-[1.75rem] border border-[#580F6E]/40 bg-[#FAF9F6] p-8 md:p-10 shadow-sm mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-1.5 border border-[#580F6E]/25 rounded-[1.5rem] pointer-events-none" />
          <p className="text-base leading-relaxed text-slate-600 relative z-10">
            "A covenant journey with my beloved."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#580F6E]/10 flex items-center justify-center border border-[#580F6E]/30">
              <span className="font-serif text-sm font-bold text-[#580F6E]">AO</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Ayomide</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">The Bride</p>
            </div>
          </div>
        </div>

        {/* Best Lady card */}
        <div className="rounded-[1.75rem] border border-[#580F6E]/40 bg-[#FAF9F6] p-8 md:p-10 shadow-sm mb-8 text-center relative overflow-hidden">
          <div className="absolute inset-1.5 border border-[#580F6E]/25 rounded-[1.5rem] pointer-events-none" />
          <p className="text-base leading-relaxed text-slate-600 relative z-10">
            "From your best sister in the world, it's a thing of joy to stand beside you on this day. We have come a long way to be here. I'm filled with mixed emotions because I wouldn't have someone to disturb and borrow from on a daily. All the clothes, shoe, perfume and even soap... thank you. Anyways, I'd be visiting you once in a while on this occasion of need. I love you."
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#580F6E]/10 flex items-center justify-center border border-[#580F6E]/30">
              <span className="font-serif text-sm font-bold text-[#580F6E]">EO</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Esther Kikelomo Oyewale</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Best Lady</p>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
}
