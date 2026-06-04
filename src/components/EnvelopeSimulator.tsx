import React, { useState } from "react";
import { Mail, X, CheckCircle, Info, Sparkles, Send } from "lucide-react";

interface EnvelopeProps {
  isOpen: boolean;
  onClose: () => void;
  guestName: string;
  email: string;
  status: string;
  code: string;
  events: string[];
  simulatedHtmlContent: string;
}

export function EnvelopeSimulator({
  isOpen,
  onClose,
  guestName,
  email,
  status,
  code,
  events,
  simulatedHtmlContent
}: EnvelopeProps) {
  const [opened, setOpened] = useState(false);

  if (!isOpen) return null;

  const eventLabels = events.map((e) => {
    if (e === "traditional") return "Traditional";
    if (e === "church") return "Church Ceremony";
    if (e === "reception") return "Reception Gala";
    return e;
  }).join(", ");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#FAF4F0] border-2 border-[#C29D70] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] double-gold-border animate-scale-up">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#BF3B52] text-white">
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-[#C29D70]" />
            <span className="font-serif text-lg font-bold">Gatepass Mail Delivery System</span>
          </div>
          <button 
            onClick={() => {
              setOpened(false);
              onClose();
            }}
            className="text-white hover:bg-white/10 p-1.5 rounded-full duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative message */}
        <div className="p-4 bg-[#C29D70]/5 border-b border-[#C29D70]/20 text-[11px] font-semibold leading-relaxed font-mono flex items-start text-[#BF3B52]">
          <Info className="w-4 h-4 mr-2 text-[#BF3B52] shrink-0 mt-0.5" />
          <div>
            <strong className="uppercase">Transactional Sandbox Broadcast:</strong> Approving {guestName}'s credentials triggers a secure outbound transactional email from Resend. Below is the exact, high-fidelity gatepass letter dispatched to <strong>{email}</strong>.
          </div>
        </div>

        {/* Simulator body */}
        <div className="flex-grow p-6 overflow-y-auto bg-zinc-100/50 flex flex-col items-center">
          
          {!opened ? (
            /* Envelope cover */
            <div className="w-full max-w-md my-8 bg-[#5C1624] border-4 border-double border-[#C29D70] p-8 rounded-2xl shadow-xl text-center relative flex flex-col justify-between aspect-video select-none transform transition hover:scale-[1.02] duration-300">
              {/* Gold wax seal monogram */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#BF3B52] border-4 border-[#C29D70] text-white font-serif font-black flex items-center justify-center text-xl shadow-lg ring-8 ring-[#C29D70]/10">
                C&amp;A
              </div>

              <div className="text-[10px] text-[#C29D70] font-mono uppercase tracking-widest leading-relaxed font-bold">
                Nigerian Christian Wedding Hub<br/>
                Chidi &amp; Adanna • 2026
              </div>

              <div className="pt-12 text-center">
                <span className="text-stone-300 font-sans text-xs uppercase block tracking-wider font-semibold">Pre-Registered Admittance Pass</span>
                <span className="text-white font-serif text-lg mt-1 font-bold block">{guestName}</span>
                <span className="text-stone-400 font-mono text-[10px]">{email}</span>
              </div>

              <div className="pt-4 z-10">
                <button
                  onClick={() => setOpened(true)}
                  className="px-6 py-2.5 bg-[#BF3B52] hover:bg-[#9E2B3E] font-bold font-mono text-[11px] uppercase tracking-wider text-white transition duration-200 rounded-full flex items-center justify-center mx-auto border border-[#C29D70]/40 cursor-pointer"
                >
                  <Send className="w-4.5 h-4.5 mr-1" /> Open Transformed Envelope
                </button>
              </div>
            </div>
          ) : (
            /* Letter pulled out of envelope */
            <div className="w-full max-w-xl bg-white border border-[#C29D70]/20 shadow-lg p-3 rounded-2xl relative">
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Interactive Gatepass E-mail Preview</span>
                <button
                  onClick={() => setOpened(false)}
                  className="text-xs text-[#BF3B52] hover:text-[#5C1624] font-mono font-bold"
                >
                  ← Pack Envelope
                </button>
              </div>
              
              {/* Insert the email HTML template */}
              <div 
                className="email-content shadow-xs rounded-2xl overflow-hidden" 
                dangerouslySetInnerHTML={{ __html: simulatedHtmlContent }}
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-zinc-50 border-t border-[#C29D70]/20 flex items-center justify-between font-mono">
          <div className="flex items-center space-x-2 text-xs text-slate-700 font-bold">
            <CheckCircle className="w-4 h-4 text-[#BF3B52]" />
            <span>Outbound State: <strong className="text-[#BF3B52] font-bold">Approved / Delivered</strong></span>
          </div>
          <button 
            onClick={() => {
              setOpened(false);
              onClose();
            }}
            className="px-5 py-2.5 bg-[#BF3B52] hover:bg-[#9E2B3E] text-white text-xs uppercase tracking-wider font-bold transition duration-200 rounded-full cursor-pointer border border-[#C29D70]/30"
          >
            Acknowledge Gatepass
          </button>
        </div>

      </div>
    </div>
  );
}
