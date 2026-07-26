import React, { useState } from "react";
import carImg from "../assets/images/car.jpg";
import fridgeImg from "../assets/images/refriderator.jpg";
import appliancesImg from "../assets/images/Home appliances.jpg";
import dispenserImg from "../assets/images/Dispenser.jpg";
import vacationImg from "../assets/images/maldives_vacation.png";

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
  const [copiedNaira, setCopiedNaira] = useState(false);
  const [copiedUsd, setCopiedUsd] = useState(false);

  const giftItems = [
    {
      title: 'Vacation / Honeymoon',
      description: 'Help us create lasting memories on our first journey as husband and wife in the Maldives.',
      image: vacationImg,
      alt: 'Maldives honeymoon vacation',
    },
    {
      title: 'Car',
      description: 'A car for ease of movement and family use.',
      image: carImg,
      alt: 'Car gift idea',
    },
    {
      title: 'Refrigerator / Deep freezer',
      description: 'A practical gift for storing food and keeping the kitchen ready.',
      image: fridgeImg,
      alt: 'Refrigerator gift idea',
    },
    {
      title: 'Home Appliances',
      description: 'Useful appliances to make cooking and daily life easier at home.',
      image: appliancesImg,
      alt: 'Home appliances gift idea',
    },
    {
      title: 'Dispenser',
      description: 'A convenient gift for serving beverages at home and gatherings.',
      image: dispenserImg,
      alt: 'Water dispenser gift idea',
    },
  ];

  const handleCopy = (text: string, isUsd: boolean) => {
    navigator.clipboard.writeText(text);
    if (isUsd) {
      setCopiedUsd(true);
      setTimeout(() => setCopiedUsd(false), 2000);
    } else {
      setCopiedNaira(true);
      setTimeout(() => setCopiedNaira(false), 2000);
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

      {/* Background roses */}
      <img src="/src/assets/images/purple_watercolor_roses.png" className="pointer-events-none select-none absolute top-0 right-0 opacity-[0.12] z-0" style={{ width: '280px', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(88,15,110,0.06))' }} alt="" />
      <img src="/src/assets/images/purple_watercolor_roses.png" className="pointer-events-none select-none absolute bottom-0 left-0 opacity-[0.12] z-0" style={{ width: '280px', height: 'auto', transform: 'rotate(180deg)', filter: 'drop-shadow(0 8px 24px rgba(88,15,110,0.06))' }} alt="" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-flex p-3 bg-[#580F6E]/10 text-[#580F6E] rounded-full mb-3">
            <GiftSVG />
          </div>
          <span className="text-xs text-[#4A0E4E] font-semibold uppercase tracking-[0.3em] block mb-1">
            Gifting
          </span>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl tracking-tight font-bold">
            Your presence is the greatest gift
          </h2>
          <div className="w-12 h-[1px] bg-[#580F6E] mx-auto mt-3 mb-3"></div>
          <p className="text-base leading-relaxed text-slate-500 max-w-2xl mx-auto">
            For those who desire to bless our new home, we welcome any expression of generosity. Below are the most meaningful ways to celebrate with us.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#4A0E4E]/15 bg-white p-8 shadow-sm">
              <h3 className="font-serif text-xl text-slate-900 font-bold mb-6">Gift Ideas</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                  {giftItems.map((item) => (
                    <div key={item.title} className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4">
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="rounded-3xl border border-[#4A0E4E]/15 bg-white p-8 shadow-sm text-center">
              <h3 className="font-serif text-xl text-slate-900 font-bold mb-4">Naira Contribution</h3>
              <div className="space-y-4 text-slate-700 text-sm font-medium">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-bold mb-2">Bank</p>
                  <p className="text-base text-[#580F6E] font-semibold">First Bank</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-bold mb-2">Account Name</p>
                  <p className="text-base text-slate-900">Oyewale Patience Ayomide</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-bold mb-2">Account Number</p>
                  <div className="flex items-center justify-center bg-[#FAF9F6] border border-[#4A0E4E]/15 rounded-2xl px-4 py-3 relative">
                    <p className="text-base font-black text-[#580F6E]">3136722099</p>
                    <button
                      onClick={() => handleCopy("3136722099", false)}
                      className="absolute right-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:border-[#580F6E] hover:text-[#580F6E] transition"
                      title="Copy Naira account number"
                    >
                      {copiedNaira ? <span className="text-[11px] font-semibold">Copied!</span> : <CopySVG />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#4A0E4E]/15 bg-white p-8 shadow-sm text-center">
              <h3 className="font-serif text-xl text-slate-900 font-bold mb-4">USD Contribution</h3>
              <div className="space-y-4 text-slate-700 text-sm font-medium">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-bold mb-2">Bank</p>
                  <p className="text-base text-[#580F6E]">FCMB</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-bold mb-2">Account Name</p>
                  <p className="text-base text-slate-900">Olanrewaju Tobi J</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-bold mb-2">Account Number</p>
                  <div className="flex items-center justify-center bg-[#FAF9F6] border border-[#4A0E4E]/15 rounded-2xl px-4 py-3 relative">
                    <p className="text-base font-black text-[#580F6E]">6073750027</p>
                    <button
                      onClick={() => handleCopy("6073750027", true)}
                      className="absolute right-4 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-500 hover:border-[#580F6E] hover:text-[#580F6E] transition"
                      title="Copy USD account number"
                    >
                      {copiedUsd ? <span className="text-[11px] font-semibold">Copied!</span> : <CopySVG />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SPECIAL NOTE ── */}
        <div className="mt-10 rounded-[1.75rem] border border-[#580F6E]/10 bg-white p-8 md:p-10 shadow-sm text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#580F6E] font-bold mb-3">
            Special Note
          </p>
          <p className="text-base md:text-lg leading-8 text-slate-700">
            Your prayers, love, and support mean so much to us. We look forward to celebrating this special occasion with you as we begin our journey together.
          </p>
          <div className="mt-6 text-slate-700">
            <p className="text-base md:text-lg leading-7 mb-2">With Love,</p>
            <p className="text-base md:text-lg leading-7 font-semibold mb-1">Jerry Tobi &amp; Ayomide</p>
            <p className="text-sm text-slate-500 uppercase tracking-[0.3em]">September 2026</p>
          </div>
        </div>

      </div>
    </section>
  );
}
