import React, { useState } from "react";

// Bespoke SVG icons
const QuillSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);
const SpinnerSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 animate-spin mr-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);
const CelebrationSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9.5" cy="13.5" r="4.5" />
    <circle cx="9.5" cy="13.5" r="3.2" fill="currentColor" fillOpacity="0.15" />
    <circle cx="14.5" cy="11.5" r="4.5" />
    <circle cx="14.5" cy="11.5" r="3.2" fill="currentColor" fillOpacity="0.15" />
    <path d="M14.5 7 L15.5 5 L16.5 7 L15.5 9 Z" fill="currentColor" stroke="none" />
    <path d="M7 6 L7.5 4.5 L8 6 L7.5 7.5 Z" fill="currentColor" stroke="none" />
  </svg>
);
const CheckSVG = () => (
  <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1.5,6 4.5,9 10.5,3" />
  </svg>
);

export function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    needsHotel: "no" as "yes" | "no",
    events: [] as string[],
    dietary_notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [registeredPass, setRegisteredPass] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (eventValue: string) => {
    setFormData((prev) => {
      const alreadyChecked = prev.events.includes(eventValue);
      if (alreadyChecked) {
        return { ...prev, events: prev.events.filter((e) => e !== eventValue) };
      } else {
        return { ...prev, events: [...prev.events, eventValue] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.events.length === 0) {
      setError("Please select at least one wedding event you wish to attend.");
      setLoading(false);
      return;
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    const dummyEmail = `${cleanPhone || Date.now()}@tobiayomide2026.com`;
    const payload = {
      name: formData.name,
      email: formData.email.trim() ? formData.email.trim() : dummyEmail,
      phone: formData.phone,
      events: formData.events,
      dietary_notes: `Location: ${formData.location.trim() || "Abuja"} | Hotel Needed: ${formData.needsHotel === "yes" ? "Yes" : "No"}`
    };

    try {
      const response = await fetch("/api/rsvps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check the response before parsing
      if (!response.ok) {
        const text = await response.text(); // read as text first
        console.log("Raw response:", text);  // see what's actually coming back

        let errorMessage = `HTTP ${response.status}: ${text}`;
        try {
          const parsed = JSON.parse(text);
          if (parsed && parsed.error) {
            errorMessage = parsed.error;
          }
        } catch (e) {
          // not JSON, keep status text
        }
        throw new Error(errorMessage);
      }

      const resData = await response.json();

      setSubmittedName(formData.name);
      setRegisteredPass(resData.data);
      setSuccess(true);
      setCopied(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        needsHotel: "no",
        events: [],
        dietary_notes: "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to submit RSVP. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp-section" className="py-24 px-6 bg-white border-t border-b border-[#4A0E4E]/10 select-none">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-[#580F6E]/10 text-[#580F6E] rounded-full mb-3">
            <QuillSVG />
          </div>
          <span className="text-xs text-[#4A0E4E] font-semibold uppercase tracking-[0.3em] block mb-1">
            RSVP
          </span>
          <h2 className="font-serif text-3xl text-slate-900 md:text-4xl tracking-tight font-bold">
            Confirm Attendance
          </h2>
          <div className="w-12 h-[1px] bg-[#580F6E] mx-auto mt-3 mb-3"></div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto font-medium">
            Please respond with your details so we can prepare for your arrival.
          </p>
        </div>

        {success ? (
          <div className="space-y-8 animate-fade-up">
            <div className="rounded-3xl p-6 md:p-8 text-center shadow-sm border border-[#4A0E4E]/15 bg-[#FAF8FF]">
              <div className="w-12 h-12 bg-[#580F6E] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <CelebrationSVG />
              </div>
              <h3 className="font-serif text-2xl text-slate-900 mb-2 font-bold">
                Registration Confirmed!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
                Thank you, {submittedName}. Your RSVP is recorded. Below is your admittance pass. Please <strong>screenshot or copy this pass</strong> to show at the gate for entry.
              </p>

              {/* BEAUTIFUL DIGITAL PASS */}
              <div className="w-full max-w-md mx-auto bg-[#FAF4F0] border-8 border-double border-[#580F6E]/40 p-6 md:p-8 rounded-2xl shadow-lg relative text-left select-text">
                {/* Decorative monogram header */}
                <div className="text-center mb-6 border-b border-[#580F6E]/15 pb-4">
                  <div className="w-10 h-10 rounded-full bg-[#580F6E] text-white font-serif font-black flex items-center justify-center text-sm mx-auto shadow-sm">
                    T&amp;A
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#580F6E] font-extrabold mt-2">
                    Official Admittance Pass
                  </div>
                  <h4 className="font-serif text-lg text-slate-900 font-bold mt-1">Tobi &amp; Ayomide</h4>
                  <p className="text-[10px] italic text-slate-400">September 2026 • Abuja, Nigeria</p>
                </div>

                {/* Details Table */}
                <div className="space-y-3.5">
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Guest Admitted</span>
                    <span className="text-sm font-semibold text-slate-800">{submittedName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Gate Verification Code</span>
                      <span className="text-base font-black font-mono text-[#580F6E]">
                        {registeredPass?.id ? registeredPass.id.substring(0, 8).toUpperCase() : "VERIFYING"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Pass Status</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase bg-[#580F6E]/10 text-[#580F6E] mt-0.5">
                        Registered
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Confirmed Events</span>
                    <span className="text-xs text-slate-700 font-semibold block mt-0.5">
                      {registeredPass?.events?.map((e: string) => {
                        if (e === "traditional") return "Traditional Marriage";
                        if (e === "church") return "Church Wedding";
                        return e;
                      }).join(" & ")}
                    </span>
                  </div>
                </div>

                {/* Scallop edge aesthetic */}
                <div className="absolute -left-2 top-1/2 -mt-2 w-4 h-4 rounded-full bg-[#FAF8FF] border-r border-[#580F6E]/15"></div>
                <div className="absolute -right-2 top-1/2 -mt-2 w-4 h-4 rounded-full bg-[#FAF8FF] border-l border-[#580F6E]/15"></div>

                {/* Verse Footer */}
                <div className="mt-6 pt-4 border-t border-dashed border-[#580F6E]/20 text-center">
                  <p className="text-[10px] italic text-slate-500 font-serif leading-relaxed">
                    "Therefore what God has joined together, let no one separate."
                  </p>
                  <span className="block text-[9px] text-[#580F6E] uppercase font-bold tracking-wider mt-1">— Matthew 19:6</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => {
                    const passCode = registeredPass?.id ? registeredPass.id.substring(0, 8).toUpperCase() : "";
                    if (passCode) {
                      navigator.clipboard.writeText(passCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  className="px-6 py-3 bg-[#580F6E] text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-[#4A0E4E] transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  {copied ? "Code Copied!" : "Copy Verification Code"}
                </button>
                <a
                  href="#gifting-section"
                  className="px-6 py-3 bg-[#FAF4F0] border border-[#580F6E] text-[#580F6E] rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-[#FAF8FF] transition cursor-pointer flex items-center justify-center gap-2 text-center"
                  style={{ textDecoration: 'none' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" width="12" height="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 12 20 22 4 22 4 12" />
                    <rect x="2" y="7" width="20" height="5" />
                    <line x1="12" y1="22" x2="12" y2="7" />
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" fill="currentColor" fillOpacity="0.1" />
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" fill="currentColor" fillOpacity="0.1" />
                  </svg>
                  Send Gift
                </a>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-3 bg-white border border-[#580F6E] text-[#580F6E] rounded-full font-bold text-xs uppercase tracking-[0.2em] transition hover:bg-[#FAF8FF] cursor-pointer"
                >
                  Register Another Guest
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-900 text-sm rounded-r-xl leading-relaxed">
                <span className="font-semibold block mb-1">Please check constraints:</span>
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="name-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                required
                placeholder="e.g. Uzoma Nze"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="phone-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                  WhatsApp Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  required
                  placeholder="e.g. +234 803 111 2222"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="location-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                  Traveling From (Location) <span className="text-red-500">*</span>
                </label>
                <input
                  id="location-input"
                  type="text"
                  required
                  placeholder="e.g. Lagos, Nigeria"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="hotel-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                  Do you require hotel? <span className="text-red-500">*</span>
                </label>
                <select
                  id="hotel-select"
                  required
                  value={formData.needsHotel}
                  onChange={(e) => setFormData({ ...formData, needsHotel: e.target.value as "yes" | "no" })}
                  className="w-full bg-[#FAF9F6] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3.5 text-sm text-slate-900 rounded-2xl transition"
                >
                  <option value="no">No, I will sort my accommodation</option>
                  <option value="yes">Yes, I require hotel accommodation</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="e.g. name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                Select events you are attending <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: "traditional", label: "Part 1 • Traditional Marriage - Sept 11" },
                  { value: "church", label: "Part 2 • Church Wedding Ceremony - Sept 12" },
                ].map((item) => {
                  const isChecked = formData.events.includes(item.value);
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handleCheckboxChange(item.value)}
                      className={`w-full text-left p-3 rounded-2xl border transition duration-200 flex items-center gap-3 ${isChecked ? "border-[#580F6E] bg-[#FAF9F6]" : "border-[#4A0E4E]/15 bg-white"
                        }`}
                    >
                      <span className={`inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-lg text-white ${isChecked ? "bg-[#580F6E]" : "bg-slate-200"
                        }`}>
                        {isChecked ? <CheckSVG /> : null}
                      </span>
                      <span className="text-sm text-slate-900">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3">
              <button
                id="submit-rsvp-btn"
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#580F6E] hover:bg-[#4A0E4E] disabled:bg-[#580F6E]/60 text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition"
              >
                {loading ? (
                  <>
                    <SpinnerSVG />
                    Submitting Response...
                  </>
                ) : (
                  "Confirm RSVP"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
