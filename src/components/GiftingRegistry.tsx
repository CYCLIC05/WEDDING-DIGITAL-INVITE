import React, { useState } from "react";
import carImg from "../assets/images/car.jpg";
import fridgeImg from "../assets/images/refriderator.jpg";
import dispenserImg from "../assets/images/Dispenser.jpg";
import vacationImg from "../assets/images/maldives_vacation.png";
import nairaCashImg from "../assets/images/naira_cash_gift_1785600651759.jpg";
import wrappedGiftImg from "../assets/images/wrapped_love_gift_1785600665865.jpg";
import purpleRoses from "../assets/images/purple_watercolor_roses.png";

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
      title: 'Monetary Cash Blessing',
      description: 'Cash transfers and direct financial blessings to empower our new beginning together.',
      image: nairaCashImg,
      badge: 'Cash Blessing',
      alt: 'Nigerian Naira cash gift blessing',
    },
    {
      title: 'Wrapped Love Gift Box',
      description: 'A thoughtfully wrapped present, home decor, or surprise physical gift box for our home.',
      image: wrappedGiftImg,
      badge: 'Physical Gift',
      alt: 'Wrapped love gift box with gold ribbon',
    },
    {
      title: 'Honeymoon & Vacation',
      description: 'Help us create lasting memories on our first romantic journey as husband and wife in the Maldives.',
      image: vacationImg,
      badge: 'Honeymoon',
      alt: 'Maldives honeymoon vacation',
    },
    {
      title: 'Family Automobile',
      description: 'A car for ease of movement, daily commute, and long-term family convenience.',
      image: carImg,
      badge: 'Mobility',
      alt: 'Car gift idea',
    },
    {
      title: 'Refrigerator & Deep Freezer',
      description: 'A practical kitchen appliance for storing food and keeping our home kitchen fully stocked.',
      image: fridgeImg,
      badge: 'Kitchen Essential',
      alt: 'Refrigerator gift idea',
    },
    {
      title: 'Water Dispenser',
      description: 'A convenient gift for serving cool, refreshing beverages at home and during family gatherings.',
      image: dispenserImg,
      badge: 'Home Living',
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
    <section id="gifting-section" className="py-20 px-4 sm:px-6 bg-[#FAF9F6] border-t border-[#580F6E]/10 select-none relative overflow-hidden">
      {/* Background cross-hatch texture pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 16 L32 16 M16 0 L16 32' stroke='%23580F6E' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Background roses */}
      <img src={purpleRoses} className="pointer-events-none select-none absolute top-0 right-0 opacity-[0.12] z-0" style={{ width: '280px', height: 'auto', mixBlendMode: 'multiply', filter: 'drop-shadow(0 8px 24px rgba(88,15,110,0.06))' }} alt="" />
      <img src={purpleRoses} className="pointer-events-none select-none absolute bottom-0 left-0 opacity-[0.12] z-0" style={{ width: '280px', height: 'auto', transform: 'rotate(180deg)', mixBlendMode: 'multiply', filter: 'drop-shadow(0 8px 24px rgba(88,15,110,0.06))' }} alt="" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex p-3 bg-[#580F6E]/10 text-[#580F6E] rounded-full mb-3">
            <GiftSVG />
          </div>
          <span className="text-xs text-[#4A0E4E] font-extrabold uppercase tracking-[0.3em] block mb-1">
            Gifting &amp; Registry
          </span>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl tracking-tight font-bold">
            Your Presence is the Greatest Gift
          </h2>
          <div className="w-12 h-[1.5px] bg-[#580F6E] mx-auto mt-3 mb-3"></div>
          <p className="text-sm md:text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
            For family &amp; friends who desire to bless our new home, we welcome any expression of generosity. Below are meaningful ways and account details to celebrate with us.
          </p>
        </div>

        {/* ── BANK CONTRIBUTIONS CARDS ── */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BankSVG />
            <h3 className="font-serif text-xl sm:text-2xl text-slate-900 font-bold text-center">
              Direct Account Transfers
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Naira Contribution */}
            <div
              className="relative overflow-hidden rounded-3xl border border-[#580F6E]/15 p-6 sm:p-8 shadow-md text-center"
              style={{ background: '#F4EFFB' }}
            >
              <div className="pointer-events-none absolute -top-14 -right-8 w-44 h-44 rounded-full bg-[#580F6E]/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-8 w-48 h-48 rounded-full bg-[#580F6E]/5 blur-3xl" />
              <div className="inline-block px-3 py-1 bg-[#580F6E]/10 text-[#580F6E] text-[10px] uppercase font-bold tracking-[0.25em] rounded-full mb-3">
                Naira Account
              </div>
              <h4 className="relative font-serif text-2xl text-[#580F6E] font-bold mb-4">Naira Contribution</h4>
              <div className="relative space-y-4 text-slate-800 text-sm font-medium max-w-md mx-auto">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E]/60 font-bold mb-1">Bank Name</p>
                  <p className="text-base text-slate-900 font-semibold">First Bank</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E]/60 font-bold mb-1">Account Name</p>
                  <p className="text-base text-slate-900 font-medium">Oyewale Patience Ayomide</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E]/60 font-bold mb-1">Account Number</p>
                  <div className="flex items-center justify-center bg-white border border-[#580F6E]/20 rounded-2xl px-4 py-3 relative">
                    <p className="text-lg font-black text-[#580F6E] tracking-wider">3136722099</p>
                    <button
                      onClick={() => handleCopy("3136722099", false)}
                      className="absolute right-3 inline-flex items-center justify-center rounded-xl border border-[#580F6E]/30 bg-[#580F6E]/10 px-3 py-1.5 text-xs text-[#580F6E] hover:bg-[#580F6E] hover:text-white transition font-bold cursor-pointer"
                      title="Copy Naira account number"
                    >
                      {copiedNaira ? "Copied!" : <span className="inline-flex items-center gap-1"><CopySVG /> Copy</span>}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* USD Contribution */}
            <div
              className="relative overflow-hidden rounded-3xl border border-[#580F6E]/15 p-6 sm:p-8 shadow-md text-center"
              style={{ background: '#F4EFFB' }}
            >
              <div className="pointer-events-none absolute -top-14 -right-8 w-44 h-44 rounded-full bg-[#580F6E]/5 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-8 w-48 h-48 rounded-full bg-[#580F6E]/5 blur-3xl" />
              <div className="inline-block px-3 py-1 bg-[#580F6E]/10 text-[#580F6E] text-[10px] uppercase font-bold tracking-[0.25em] rounded-full mb-3">
                USD Account
              </div>
              <h4 className="relative font-serif text-2xl text-[#580F6E] font-bold mb-4">USD Contribution</h4>
              <div className="relative space-y-4 text-slate-800 text-sm font-medium max-w-md mx-auto">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E]/60 font-bold mb-1">Bank Name</p>
                  <p className="text-base text-slate-900 font-semibold">FCMB</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E]/60 font-bold mb-1">Account Name</p>
                  <p className="text-base text-slate-900 font-medium">Olanrewaju Tobi J</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#580F6E]/60 font-bold mb-1">Account Number</p>
                  <div className="flex items-center justify-center bg-white border border-[#580F6E]/20 rounded-2xl px-4 py-3 relative">
                    <p className="text-lg font-black text-[#580F6E] tracking-wider">6073750027</p>
                    <button
                      onClick={() => handleCopy("6073750027", true)}
                      className="absolute right-3 inline-flex items-center justify-center rounded-xl border border-[#580F6E]/30 bg-[#580F6E]/10 px-3 py-1.5 text-xs text-[#580F6E] hover:bg-[#580F6E] hover:text-white transition font-bold cursor-pointer"
                      title="Copy USD account number"
                    >
                      {copiedUsd ? "Copied!" : <span className="inline-flex items-center gap-1"><CopySVG /> Copy</span>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── GIFT IDEAS & REGISTRY ITEMS GRID ── */}
        <div className="rounded-3xl border border-[#580F6E]/15 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#580F6E] block mb-1">
                Registry Wishlist
              </span>
              <h3 className="font-serif text-2xl text-slate-900 font-bold">Gift Ideas &amp; Essentials</h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#580F6E] bg-[#580F6E]/10 px-3.5 py-1.5 rounded-full w-fit">
              ✿ 6 Wishlist Items
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {giftItems.map((item) => (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#580F6E]/15 bg-white shadow-sm hover:shadow-md hover:border-[#580F6E]/40 transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-50">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider bg-[#580F6E]/90 backdrop-blur-md text-white rounded-md shadow-sm">
                    {item.badge}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#580F6E] mb-2 group-hover:text-[#4A0E4E] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SPECIAL NOTE ── */}
        <div className="mt-10 rounded-[1.75rem] border border-[#580F6E]/10 bg-white p-8 md:p-10 shadow-sm text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#580F6E] font-bold mb-3">
            Special Note
          </p>
          <p className="text-base md:text-lg leading-8 text-slate-700 max-w-2xl mx-auto">
            Your prayers, love, and support mean so much to us. We look forward to celebrating this special occasion with you as we begin our journey together.
          </p>
          <div className="mt-6 text-slate-700 flex flex-col items-center">
            {/* Heart Icon with dashed border and ampersand */}
            <div className="relative w-12 h-12 mb-3 flex items-center justify-center animate-heart-pulse">
              <svg viewBox="0 0 100 90" className="w-12 h-12 drop-shadow-sm">
                <path
                  d="M 50 88 C 20 60 0 40 0 25 C 0 10 12 0 27 0 C 37 0 46 6 50 14 C 54 6 63 0 73 0 C 88 0 100 10 100 25 C 100 40 80 60 50 88 Z"
                  fill="#580F6E"
                />
                <path
                  d="M 50 80 C 23 55 7 37 7 24 C 7 14 16 6 28 6 C 36 6 44 11 48 18 L 50 21 L 52 18 C 56 11 64 6 72 6 C 84 6 93 14 93 24 C 93 37 77 55 50 80 Z"
                  fill="none"
                  stroke="#E9D5FF"
                  strokeWidth="3"
                  strokeDasharray="4 3"
                />
              </svg>
              <span className="absolute font-serif italic text-white text-xs font-bold select-none">&amp;</span>
            </div>
            <p className="text-base md:text-lg leading-7 mb-2 text-slate-600 font-serif italic">With Love,</p>
            <p className="text-base md:text-lg leading-7 font-bold text-slate-900 mb-1">Jerry Tobi ❤️ Ayomide</p>
            <p className="text-xs md:text-sm text-slate-500 uppercase tracking-[0.35em] font-medium">September 2026</p>
          </div>
        </div>

      </div>
    </section>
  );
}
