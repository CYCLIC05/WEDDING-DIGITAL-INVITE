import React from "react";

/**
 * The Groom's Corner component showing only the requested Best Man details.
 */
export function GroomsCorner() {
  return (
    <section id="groom-section" className="py-20 px-6 max-w-7xl mx-auto border-t border-[#580F6E]/15 bg-white select-none">
      <div className="text-center mb-12">
        <p className="text-[10px] text-[#580F6E] uppercase tracking-[0.35em] font-bold mb-2">Groom's Corner</p>
        <h2 className="font-serif text-4xl text-slate-900 font-bold">Special Message</h2>
        <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-3">
          "I am grateful to God for bringing Ayomide into my life. As we begin this journey together, we look forward to building a Christ-centered home that will honor God, serve people, and impact generations."
        </p>
      </div>

      <div className="max-w-3xl mx-auto rounded-[2rem] border border-[#580F6E]/10 bg-white/90 p-8 md:p-10 shadow-[0_20px_60px_-24px_rgba(88,15,110,0.25)] backdrop-blur-sm">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E] font-semibold mb-2">Best Man / Chief Groomsman</div>
            <h3 className="font-serif text-2xl text-slate-900 font-bold">Mr. Akintayo O. Popoola</h3>
          </div>

          <div className="rounded-[1.75rem] border border-[#E5E7EB] bg-[#FAF9F6] p-6 md:p-8 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mt-3 font-bold">
              Relationship: Friend, Brother & Business Partner
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
