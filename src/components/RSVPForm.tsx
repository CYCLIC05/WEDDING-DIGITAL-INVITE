import React, { useState } from "react";
import { Check, ClipboardList, Loader2, PartyPopper } from "lucide-react";

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
    <section id="rsvp-section" className="py-24 px-6 bg-white border-t border-b border-[#C29D70]/20 select-none">
      <div className="max-w-xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex p-3 bg-[#BF3B52]/5 text-[#BF3B52] rounded-full mb-3 shadow-inner">
            <ClipboardList className="w-5 h-5 text-[#BF3B52]" />
          </div>
          <span className="text-xs text-[#C29D70] font-sans font-extrabold tracking-[0.25em] uppercase block mb-1">
            Secure Attendance
          </span>
          <h2 className="font-serif text-3xl text-slate-800 md:text-4xl tracking-tight font-bold">
            Digital RSVP Registry
          </h2>
          <div className="w-12 h-[1px] bg-[#C29D70] mx-auto mt-3 mb-3"></div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto font-medium">
            Due to seating constraints and strict security guidelines at Nike Lake Resort, all guests must pre-register. Approved reservations will receive an official entry pass.
          </p>
        </div>

        {/* Form area */}
        {success ? (
          /* Animated success panel */
          <div className="border-2 border-[#C29D70]/30 bg-[#FAF4F0] rounded-3xl p-8 text-center card-shadow duration-500 transform scale-100 animate-fade-in double-gold-border">
            <div className="w-16 h-16 bg-[#BF3B52] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md animate-bounce border border-[#C29D70]/40">
              <PartyPopper className="w-8 h-8" />
            </div>
            
            <h3 className="font-serif text-2xl text-slate-800 mb-2 font-bold">
              RSVP Registered, {submittedName}!
            </h3>
            
            <p className="text-xs font-sans text-[#BF3B52] uppercase tracking-widest mb-4 font-extrabold">
              ✨ Seating Approval is Pending ✨
            </p>

            <div className="h-[1px] bg-[#C29D70]/25 my-4 max-w-xs mx-auto"></div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto mb-6 font-medium">
              Thank you for compiling your reservation. Your request has been queued for review by Tobi & Ayomide's wedding host. An official Gatepass with your <strong>Verification Token</strong> and confirmed table selection will be emailed shortly.
            </p>

            <button 
              onClick={() => setSuccess(false)}
              className="px-6 py-3 border border-[#BF3B52] text-[#BF3B52] hover:bg-[#BF3B52] hover:text-white hover:border-[#BF3B52] text-xs uppercase font-sans font-bold tracking-widest transition duration-300 rounded-full cursor-pointer bg-white"
            >
              Submit Another RSVP
            </button>
          </div>
        ) : (
          /* Active form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-950 text-xs rounded-r-xl leading-relaxed">
                <span className="font-semibold block mb-0.5">Please check constraints:</span>
                {error}
              </div>
            )}

            {/* Guest Name input */}
            <div className="space-y-1.5">
              <label htmlFor="name-input" className="block text-xs font-sans font-bold text-slate-700 uppercase tracking-widest">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input 
                id="name-input"
                type="text" 
                required 
                placeholder="e.g. Uzoma Nze"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#FAF4F0]/50 border border-[#C29D70]/40 focus:border-[#BF3B52] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-4 py-3 text-sm text-slate-800 transition-colors rounded-xl shadow-xs"
              />
            </div>

            {/* Contact Details Email & WhatsApp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label htmlFor="email-input" className="block text-xs font-sans font-bold text-slate-700 uppercase tracking-widest">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input 
                  id="email-input"
                  type="email" 
                  required 
                  placeholder="e.g. name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#FAF4F0]/50 border border-[#C29D70]/40 focus:border-[#BF3B52] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-4 py-3 text-sm text-slate-800 transition-colors rounded-xl shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone-input" className="block text-xs font-sans font-bold text-slate-700 uppercase tracking-widest">
                  WhatsApp Phone <span className="text-red-500">*</span>
                </label>
                <input 
                  id="phone-input"
                  type="tel" 
                  required 
                  placeholder="e.g. +234 803 111 2222"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#FAF4F0]/50 border border-[#C29D70]/40 focus:border-[#BF3B52] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#BF3B52] px-4 py-3 text-sm text-slate-800 transition-colors rounded-xl shadow-xs"
                />
              </div>
            </div>

            {/* Event Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-sans font-bold text-slate-700 uppercase tracking-widest">
                Select Events You Are Attending <span className="text-red-500">*</span>
              </label>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: "传统", label: "Part 1 • Traditional Wedding (Igba Nkwu) - Oct 15", val: "traditional" },
                  { value: "教堂", label: "Part 2 • Church Holy Matrimony - Oct 17", val: "church" },
                  { value: "招待", label: "Part 3 • White Wedding Reception - Oct 17", val: "reception" }
                ].map((item) => {
                  const isChecked = formData.events.includes(item.val);
                  return (
                    <div 
                      key={item.val} 
                      onClick={() => handleCheckboxChange(item.val)}
                      className={`flex items-start p-3 border-2 cursor-pointer hover:bg-[#BF3B52]/5 transition duration-200 rounded-xl select-none ${
                        isChecked ? 'border-[#BF3B52] bg-[#BF3B52]/5' : 'border-[#C29D70]/20 bg-[#FAF4F0]/30'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-lg border flex items-center justify-center mr-3 shrink-0 ${
                        isChecked ? 'border-[#BF3B52] bg-[#BF3B52] text-white' : 'border-[#C29D70]/40'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs text-slate-800 font-semibold">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button 
                id="submit-rsvp-btn"
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#BF3B52] hover:bg-[#9E2B3E] disabled:bg-[#BF3B52]/60 duration-300 text-white font-sans text-xs uppercase font-bold tracking-[0.2em] transition-all shadow-md rounded-full flex items-center justify-center cursor-pointer border border-[#C29D70]/40"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Compiling Reservation...
                  </>
                ) : (
                  "Confirm Seating Reservation"
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
}
