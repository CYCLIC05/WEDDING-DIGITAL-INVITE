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
    events: [] as string[],
    dietary_notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submittedName, setSubmittedName] = useState("");

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

    try {
      const response = await fetch("/api/rsvps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
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
          <div className="rounded-3xl p-8 text-center shadow-sm border border-[#4A0E4E]/15 bg-[#FAF8F5]">
            <div className="w-16 h-16 bg-[#580F6E] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow">
              <CelebrationSVG />
            </div>
            <h3 className="font-serif text-2xl text-slate-900 mb-2 font-bold">
              Response Received, {submittedName}!
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto mb-6">
              Thank you for letting us know. Your RSVP is recorded and we look forward to celebrating together.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 bg-white border border-[#580F6E] text-[#580F6E] rounded-full font-semibold text-xs uppercase tracking-[0.2em] transition hover:bg-[#580F6E] hover:text-white"
            >
              Submit Another RSVP
            </button>
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
                className="w-full bg-[#FAF8F5] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-[0.25em]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email-input"
                  type="email"
                  required
                  placeholder="e.g. name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
                />
              </div>
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
                  className="w-full bg-[#FAF8F5] border border-[#4A0E4E]/15 focus:border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#580F6E] px-4 py-3 text-sm text-slate-900 rounded-2xl transition"
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
                      className={`w-full text-left p-3 rounded-2xl border transition duration-200 flex items-center gap-3 ${isChecked ? "border-[#580F6E] bg-[#FAF8F5]" : "border-[#4A0E4E]/15 bg-white"
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
