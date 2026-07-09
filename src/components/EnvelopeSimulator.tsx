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
  isEmailSent?: boolean;
  emailMethod?: string;
  smtpError?: string;
}

export function EnvelopeSimulator({
  isOpen,
  onClose,
  guestName,
  email,
  status,
  code,
  events,
  simulatedHtmlContent,
  isEmailSent = false,
  emailMethod = "none",
  smtpError = ""
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
        <div className={`p-4 border-b border-[#C29D70]/20 text-[11px] font-semibold leading-relaxed font-mono flex flex-col gap-2.5 ${smtpError ? "bg-amber-50 text-amber-900" : "bg-[#C29D70]/5 text-[#BF3B52]"}`}>
          <div className="flex items-start">
            <Info className={`w-4 h-4 mr-2 shrink-0 mt-0.5 ${smtpError ? "text-amber-600" : "text-[#BF3B52]"}`} />
            <div>
              <strong className="uppercase">Transactional Delivery Log:</strong> Approving {guestName}'s credentials triggered an outbound gatepass email transmission to <strong>{email}</strong>.
            </div>
          </div>
          
          {/* Detailed SMTP/Resend delivery logs */}
          <div className="mt-2 pl-6 space-y-1.5 border-t border-dashed border-rose-150 pt-2 text-[10px]">
            <div>• Preferred Mailer: <span className="font-bold underline">Gmail SMTP (Nodemailer)</span></div>
            {emailMethod === "smtp" && (
              <div className="text-emerald-700 font-bold">✓ SUCCESS: Mail sent successfully via Gmail SMTP (Nodemailer).</div>
            )}
            {(emailMethod === "resend" || emailMethod === "none") && smtpError && (
              <div className="text-rose-700 bg-rose-50/70 p-3 rounded-md border border-rose-100/50 leading-relaxed font-sans text-xs">
                <div className="font-mono text-[10px] font-bold text-rose-800 flex items-center gap-1 mb-1">
                  <span>✗ SMTP Error occurred during Nodemailer dispatch</span>
                </div>
                <div className="font-mono text-[11px] bg-white p-1.5 rounded border border-rose-100 overflow-x-auto whitespace-pre-wrap select-text mb-2">
                  {smtpError}
                </div>
                {smtpError.includes("Application-specific password required") && (
                  <div className="text-zinc-700 text-xs bg-amber-50 border border-amber-200 p-2.5 rounded leading-relaxed">
                    💡 <strong>How to Resolve:</strong> Gmail requires an <strong>App Password</strong>. Please follow these steps:
                    <ol className="list-decimal pl-5 mt-1.5 space-y-1 font-semibold text-zinc-800">
                      <li>Go to your Google Account Settings (<a href="https://myaccount.google.com" target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900">myaccount.google.com</a>)</li>
                      <li>Select the <strong>Security</strong> tab</li>
                      <li>Under <strong>How you sign in to Google</strong>, click on <strong>2-Step Verification</strong> (ensure it is enabled)</li>
                      <li>Scroll to the very bottom and select <strong>App Passwords</strong></li>
                      <li>Enter "Wedding Mailer" as app name, click <strong>Create</strong>, and copy the generated 16-character passcode</li>
                      <li>Paste this passcode as <code className="bg-zinc-100 px-1 py-0.5 rounded text-[#BF3B52] font-mono">GMAIL_PASS</code> in the project's environment settings.</li>
                    </ol>
                  </div>
                )}
              </div>
            )}
            {emailMethod === "resend" && (
              <div className="text-emerald-700 font-bold mt-1">
                ✓ Resend Fallback: Dispatch succeeded using Resend fallback client (ID: {code}).
              </div>
            )}
          </div>
        </div>

        {/* Simulator body */}
        <div className="flex-grow p-6 overflow-y-auto bg-zinc-100/50 flex flex-col items-center">
          
          {!opened ? (
            /* Envelope cover */
            <div className="w-full max-w-md my-8 bg-[#5C1624] border-4 border-double border-[#C29D70] p-8 rounded-2xl shadow-xl text-center relative flex flex-col justify-between aspect-video select-none transform transition hover:scale-[1.02] duration-300">
              {/* Gold wax seal monogram */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#BF3B52] border-4 border-[#C29D70] text-white font-serif font-black flex items-center justify-center text-xl shadow-lg ring-8 ring-[#C29D70]/10">
                T&amp;A
              </div>

              <div className="text-[10px] text-[#C29D70] font-mono uppercase tracking-widest leading-relaxed font-bold">
                Nigerian Christian Wedding Hub<br/>
                Tobi &amp; Ayomide • 2026
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
            <CheckCircle className={`w-4 h-4 ${isEmailSent ? "text-emerald-600" : "text-amber-500"}`} />
            <span>Outbound State: <strong className={isEmailSent ? "text-[#BF3B52] font-bold" : "text-amber-600 font-bold"}>{isEmailSent ? `Delivered via ${emailMethod.toUpperCase()}` : "Local Backup Draft (Unsent)"}</strong></span>
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
