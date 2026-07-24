import React, { useState } from "react";

// Inline SVGs for Gifting Registry
const GiftSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" fill="currentColor" fillOpacity="0.1" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" fill="currentColor" fillOpacity="0.1" />
  </svg>
);

const BankSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="18" height="11" rx="2" />
    <path d="M12 2L2 7h20L12 2z" fill="currentColor" fillOpacity="0.1" />
    <line x1="6" y1="21" x2="6" y2="10" />
    <line x1="10" y1="21" x2="10" y2="10" />
    <line x1="14" y1="21" x2="14" y2="10" />
    <line x1="18" y1="21" x2="18" y2="10" />
  </svg>
);

const CopySVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export function GiftingRegistry() {
  const [copiedPalmPay, setCopiedPalmPay] = useState(false);
  const [copiedOPay, setCopiedOPay] = useState(false);

  const handleCopy = (text: string, isOPay: boolean) => {
    navigator.clipboard.writeText(text);
    if (isOPay) {
      setCopiedOPay(true);
      setTimeout(() => setCopiedOPay(false), 2000);
    } else {
      setCopiedPalmPay(true);
      setTimeout(() => setCopiedPalmPay(false), 2000);
    }
  };

  return (
    <section id="gifting-section" className="py-24 px-6 bg-[#FAF9F6] border-t border-[#580F6E]/10 select-none relative overflow-hidden">
      {/* Background cross-hatch texture pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 L32 16 M16 0 L16 32' stroke='%23580F6E' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex p-3 bg-[#580F6E]/10 text-[#580F6E] rounded-full mb-3">
            <GiftSVG />
          </div>
          <span className="text-xs text-[#4A0E4E] font-semibold uppercase tracking-[0.3em] block mb-1">
            Registry &amp; Love Gift
          </span>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl tracking-tight font-bold">
            Honoring the Couple
          </h2>
          <div className="w-12 h-[1px] bg-[#580F6E] mx-auto mt-3 mb-3"></div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto font-medium">
            Your love, presence, and prayers are the greatest gifts we could ask for. However, if you wish to bless us with a gift, we have provided options below.
          </p>
        </div>

        <div className="flex justify-center max-w-md mx-auto items-stretch">
          {/* Card 1: Bank Transfer details */}
          <div className="w-full bg-white border border-[#4A0E4E]/15 rounded-3xl p-8 shadow-sm flex flex-col justify-between hover-lift relative overflow-hidden">
            <div className="absolute inset-2 border border-[#580F6E]/5 pointer-events-none" style={{ borderRadius: '1.25rem' }} />
            <div className="h-1 w-full bg-[#580F6E] absolute top-0 left-0"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#580F6E]/10 text-[#580F6E] rounded-full">
                  <BankSVG />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Bank Transfer</h3>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Naira Payments</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {/* PalmPay Account */}
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#4A0E4E]/5 relative">
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">PalmPay</p>
                  <p className="text-sm font-serif font-semibold text-slate-800 mt-1">PalmPay</p>
                  <p className="text-base font-black font-mono text-[#580F6E] tracking-wide mt-0.5">9160036915</p>
                  <p className="text-xs text-slate-600 font-medium">Oyewale Samuel</p>

                  <button
                    onClick={() => handleCopy("9160036915", false)}
                    className="absolute right-4 bottom-4 p-2 border border-slate-200 text-slate-500 hover:text-[#580F6E] hover:border-[#580F6E] rounded-full transition cursor-pointer bg-white"
                    title="Copy Account Number"
                  >
                    {copiedPalmPay ? <span className="text-[9px] font-bold px-1 font-sans text-[#580F6E]">Copied!</span> : <CopySVG />}
                  </button>
                </div>

                {/* OPay Account */}
                <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#4A0E4E]/5 relative">
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">OPay</p>
                  <p className="text-sm font-serif font-semibold text-slate-800 mt-1">OPay</p>
                  <p className="text-base font-black font-mono text-[#580F6E] tracking-wide mt-0.5">9160036915</p>
                  <p className="text-xs text-slate-600 font-medium">Oyewale Samuel</p>

                  <button
                    onClick={() => handleCopy("9160036915", true)}
                    className="absolute right-4 bottom-4 p-2 border border-slate-200 text-slate-500 hover:text-[#580F6E] hover:border-[#580F6E] rounded-full transition cursor-pointer bg-white"
                    title="Copy Account Number"
                  >
                    {copiedOPay ? <span className="text-[9px] font-bold px-1 font-sans text-[#580F6E]">Copied!</span> : <CopySVG />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
