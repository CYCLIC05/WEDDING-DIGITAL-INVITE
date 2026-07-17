import React, { useState, useEffect } from "react";
import { 
  Lock, Unlock, RefreshCw, Search, Eye, Filter, Check, Trash, X, ChevronRight, FileText, Database, Info, LogOut, CheckCircle, Mail, HelpCircle, Loader2, Send, CheckSquare, Square
} from "lucide-react";
import { RSVP, RSVPResponse } from "../types.ts";
import { EnvelopeSimulator } from "./EnvelopeSimulator.tsx";
import { signInWithGoogle, logoutGoogle, getGmailAccessToken, auth as firebaseAuth } from "../lib/googleAuth.ts";
import { sendGmailEmail } from "../lib/gmailService.ts";
import { onAuthStateChanged, User } from "firebase/auth";

export function AdminDashboard() {
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState("");
  const [verifying, setVerifying] = useState(false);

  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState("");
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");



  // Multi-state for Envelope Simulator
  const [simulatorState, setSimulatorState] = useState<{
    isOpen: boolean;
    guestName: string;
    email: string;
    status: string;
    code: string;
    events: string[];
    htmlContent: string;
    isEmailSent?: boolean;
    emailMethod?: string;
    smtpError?: string;
  }>({
    isOpen: false,
    guestName: "",
    email: "",
    status: "",
    code: "",
    events: [],
    htmlContent: "",
    isEmailSent: false,
    emailMethod: "none",
    smtpError: ""
  });

  // Action states
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [seatingSelection, setSeatingSelection] = useState("Imperial Main Hall • Section A");

  // State variables for Gmail SMTP Interactive diagnostics
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [sendingTestEmail, setSendingTestEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{
    success: boolean;
    message: string;
    errorDetails?: string;
  } | null>(null);

  // Gmail & OAuth states
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [useGmailForGatepass, setUseGmailForGatepass] = useState(true);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [selectedRsvpsForEmail, setSelectedRsvpsForEmail] = useState<RSVP[]>([]);
  const [sendingEmails, setSendingEmails] = useState(false);
  const [smtpConfigured, setSmtpConfigured] = useState(false);
  const [emailSendMethod, setEmailSendMethod] = useState<"smtp" | "client">("smtp");
  const [emailProgress, setEmailProgress] = useState<{
    current: number;
    total: number;
    successCount: number;
    errorCount: number;
  } | null>(null);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmingSend, setConfirmingSend] = useState(false);
  const [emailSendErrors, setEmailSendErrors] = useState<{ recipient: string; error: string }[]>([]);

  // Monitor Google Authentication State changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setGoogleUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Check if saved passcode exists in localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem("wedding_admin_passcode");
    if (savedCode) {
      verifyPasscode(savedCode);
    }
  }, []);

  const verifyPasscode = async (codeToVerify: string) => {
    setAuthError("");
    setVerifying(true);

    // ── Local passcode check ─────────────────────────────────────────────────
    if (codeToVerify === "22122") {
      setIsAuthorized(true);
      localStorage.setItem("wedding_admin_passcode", codeToVerify);
      setPasscode("");
      setVerifying(false);
      fetchRSVPs(codeToVerify);
      return;
    }

    // ── Server-side fallback ─────────────────────────────────────────────────
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: codeToVerify })
      });

      if (!res.ok) {
        const text = await res.text();
        let errorMessage = `HTTP ${res.status}: ${text}`;
        try {
          const parsed = JSON.parse(text);
          if (parsed && parsed.error) {
            errorMessage = parsed.error;
          }
        } catch (e) {}
        setAuthError(errorMessage);
        localStorage.removeItem("wedding_admin_passcode");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setIsAuthorized(true);
        localStorage.setItem("wedding_admin_passcode", codeToVerify);
        setPasscode("");
        fetchRSVPs(codeToVerify);
      } else {
        setAuthError(data.error || "Incorrect passcode. Please try again.");
        localStorage.removeItem("wedding_admin_passcode");
      }
    } catch (err) {
      setAuthError("Incorrect passcode. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) return;
    verifyPasscode(passcode);
  };

  const handleLogout = () => {
    localStorage.removeItem("wedding_admin_passcode");
    setIsAuthorized(false);
    setRsvps([]);
  };

  const handleSendTestEmail = async () => {
    if (!testEmailAddress) {
      alert("Please provide a recipient email address to send the test message.");
      return;
    }
    const currentCode = localStorage.getItem("wedding_admin_passcode") || "";
    if (!currentCode) {
      alert("You must be logged in as admin to test SMTP mailer settings.");
      return;
    }

    setSendingTestEmail(true);
    setTestEmailResult(null);

    try {
      const res = await fetch("/api/admin/send-email-smtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentCode}`
        },
        body: JSON.stringify({
          recipients: testEmailAddress,
          subject: "💍 Wedding Mailer SMTP Integration Test",
          htmlBody: `
            <div style="font-family: sans-serif; padding: 24px; border: 3px double #580F6E; background-color: #FAF9F6; border-radius: 12px; max-width: 500px; margin: 20px auto; color: #1F2937; text-align: center;">
              <h2 style="color: #580F6E; margin-top: 0; font-size: 20px; border-bottom: 2px solid #580F6E; padding-bottom: 8px; font-family: serif; font-weight: bold;">Integration Active! 🎉</h2>
              <p style="font-size: 14px; line-height: 1.6;">This is an automated test verifying that the backend Nodemailer SMTP service is securely authenticated and communicating with Gmail SMTP server ports.</p>
              <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; padding: 12px; border-radius: 6px; margin: 20px 0; font-weight: bold; color: #047857; font-size: 13px;">
                ✓ SECURE GMAIL SMTP OUTBOUND TRANSMISSION SUCCESSFUL
              </div>
              <p style="font-size: 12px; color: #6B7280; font-style: italic; margin-top: 20px;">Tobi &amp; Ayomide's Covenant Wedding • Abuja, Nigeria</p>
            </div>
          `
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || `HTTP Error ${res.status}`);
      }

      if (data.success && data.successCount > 0) {
        setTestEmailResult({
          success: true,
          message: "✓ Success! The test email has been delivered successfully to your inbox."
        });
      } else {
        const failedDetail = data.details?.[0]?.error || data.summary || "Unknown error";
        setTestEmailResult({
          success: false,
          message: "✗ SMTP Transmission Failed",
          errorDetails: failedDetail
        });
      }
    } catch (err: any) {
      setTestEmailResult({
        success: false,
        message: "✗ SMTP Client Error",
        errorDetails: err.message || String(err)
      });
    } finally {
      setSendingTestEmail(false);
    }
  };

  const fetchRSVPs = async (code: string) => {
    const currentCode = code || localStorage.getItem("wedding_admin_passcode") || "";
    if (!currentCode) return;

    setLoadingList(true);
    setListError("");
    try {
      const res = await fetch(`/api/rsvps?passcode=${currentCode}`);

      // Check the response before parsing
      if (!res.ok) {
        const text = await res.text(); // read as text first
        console.log("Raw response:", text);  // see what's actually coming back
        
        let errorMessage = `HTTP ${res.status}: ${text}`;
        try {
          const parsed = JSON.parse(text);
          if (parsed && parsed.error) {
            errorMessage = parsed.error;
          }
        } catch (e) {}
        setListError(errorMessage);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setRsvps(data.data);
        if (data.smtpConfigured) {
          setSmtpConfigured(true);
          setEmailSendMethod("smtp");
        } else {
          setSmtpConfigured(false);
          setEmailSendMethod("client");
        }
      } else {
        setListError(data.error || "Failed to load RSVPs.");
      }
    } catch (err) {
      setListError("Network error while assembling invitation database.");
    } finally {
      setLoadingList(false);
    }
  };

  const executeRSVPAction = async (id: string, action: "approve" | "decline" | "delete") => {
    const code = localStorage.getItem("wedding_admin_passcode") || "";
    if (!code) return;

    setActioningId(id);
    try {
      const res = await fetch("/api/send-invitation", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${code}`
        },
        body: JSON.stringify({
          rsvpId: id,
          action,
          seatingSelection
        })
      });

      // Check the response before parsing
      if (!res.ok) {
        const text = await res.text(); // read as text first
        console.log("Raw response:", text);  // see what's actually coming back
        
        let errorMessage = `HTTP ${res.status}: ${text}`;
        try {
          const parsed = JSON.parse(text);
          if (parsed && parsed.error) {
            errorMessage = parsed.error;
          }
        } catch (e) {}
        throw new Error(errorMessage);
      }

      const resData: RSVPResponse = await res.json();

      // Send via Gmail if enabled and approved
      let gmailStatusMessage = "";
      if (action === "approve" && resData.data && googleUser && useGmailForGatepass) {
        try {
          await sendGmailEmail(
            resData.data.email,
            `✨ Tobi & Ayomide's Wedding Official Entry Gatepass [Code: ${resData.simulatedEmailCode || "INV-PASS"}]`,
            resData.simulatedEmailHtml || ""
          );
          gmailStatusMessage = " (Dispatched via Gmail)";
        } catch (gmailErr: any) {
          console.error("Failed to send via Gmail:", gmailErr);
          alert(`Database updated successfully, but Gmail send failed: ${gmailErr.message}. Falling back to default handler.`);
        }
      }

      // If approved, trigger the Envelope Simulator for supreme designer UX feedback
      if (action === "approve" && resData.data) {
        setSimulatorState({
          isOpen: true,
          guestName: resData.data.name + gmailStatusMessage,
          email: resData.data.email,
          status: resData.data.status,
          code: resData.simulatedEmailCode || "INV-PASS",
          events: resData.data.events,
          htmlContent: resData.simulatedEmailHtml || "",
          isEmailSent: resData.isEmailSent,
          emailMethod: resData.emailMethod,
          smtpError: resData.smtpError
        });
      }

      // Re-fetch database log to sync
      fetchRSVPs(code);
    } catch (err: any) {
      alert(`Action error: ${err.message || "Could not complete operation."}`);
    } finally {
      setActioningId(null);
    }
  };

  const metrics = {
    total: rsvps.length,
    registered: rsvps.filter((r) => r.status === "registered" || r.status === "pending").length,
    approved: rsvps.filter((r) => r.status === "approved").length,
    declined: rsvps.filter((r) => r.status === "declined").length,
  };

  const filteredRSVPs = rsvps.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter ||
      (statusFilter === "registered" && (item.status === "registered" || item.status === "pending"));
    const matchesEvent = eventFilter === "all" || item.events.includes(eventFilter);

    return matchesSearch && matchesStatus && matchesEvent;
  });

  return (
    <div className={`${!isAuthorized ? "bg-[#FAF9F6] min-h-[85vh] flex items-center justify-center p-4 md:p-8" : "bg-[#FAF9F6] min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto"}`}>
      
      {!isAuthorized ? (
        /* Login Screen protected layout */
        <div className="w-full max-w-lg bg-white p-10 md:p-14 shadow-[0_25px_50px_rgba(0,0,0,0.06)] border border-rose-100 rounded-[6px]">
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="inline-flex p-5.5 bg-rose-50 rounded-full mb-6">
              <Lock className="w-8 h-8 text-[#580F6E]" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-[32px] md:text-4xl text-[#580F6E] font-bold tracking-tight">
              Groom's Secure Portal
            </h2>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {authError && (
              <div className="p-3 bg-red-50 border-l-4 border-red-700 text-red-950 text-xs rounded-r-sm leading-relaxed animate-shake">
                {authError}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="passcode-input" className="block text-[12px] font-mono font-bold text-[#580F6E] uppercase tracking-wider">
                System Admin Secret Passcode
              </label>
              <input 
                id="passcode-input"
                type="password" 
                required 
                placeholder="Enter secret token"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white border border-[#580F6E] focus:outline-none focus:ring-1 focus:ring-[#9E2B3E] px-4 py-3.5 text-base rounded-[4px] placeholder-zinc-400 font-sans tracking-wide"
              />
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans mt-2.5">
                Credentials pass key mapping is configured in the environment parameters. Please input the authorized secret passcode to unlock administrative privileges.
              </p>
            </div>

            <button 
              type="submit"
              disabled={verifying}
              className="w-full py-4 bg-[#580F6E] hover:bg-[#9E2B3E] disabled:bg-[#580F6E]/70 duration-300 text-white font-mono text-[13px] uppercase font-bold tracking-widest transition-all rounded-[4px] flex items-center justify-center shadow-md cursor-pointer"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  DECODING CREDENTIALS...
                </>
              ) : (
                "UNLOCK REGISTRY CONSOLE"
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Protected Administrative Layout Dashboard Workspace */
        <div>
          
          {/* Header Dashboard section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-amber-900/10 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs text-amber-800 font-mono font-bold tracking-widest uppercase mb-1">
                <span>Nigeria Wedding Hub</span>
                <span>•</span>
                <span className="text-emerald-950 flex items-center"><Unlock className="w-3.5 h-3.5 mr-1" /> Authenticated Console</span>
              </div>
              <h1 className="font-serif text-3xl font-medium text-emerald-950 tracking-tight">
                Tobi &amp; Ayomide's RSVP Registry
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              {/* Refresh Button */}
              <button 
                onClick={() => fetchRSVPs("")}
                disabled={loadingList}
                className="px-4 py-2 border border-amber-900/15 hover:bg-white text-emerald-950 text-xs font-mono font-bold uppercase tracking-wider transition rounded-xs flex items-center"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loadingList ? "animate-spin" : ""}`} />
                {loadingList ? "Syncing..." : "Reload logs"}
              </button>

              {/* Logout button */}
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-amber-700/10 hover:bg-amber-700/20 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider transition rounded-xs flex items-center"
              >
                <LogOut className="w-3.5 h-3.5 mr-1.5" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <div className="space-y-6">

              {/* GMAIL INTEGRATION CONTROLLER */}
              <div className="bg-white border border-rose-100 p-6 rounded-sm shadow-xs flex flex-col lg:flex-row items-stretch gap-6">
                {/* SMTP Server Configuration card */}
                <div className="flex-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-rose-50 pb-6 lg:pb-0 lg:pr-6 gap-4">
                  <div className="flex items-start space-x-3.5">
                    <div className={`p-2.5 rounded-full shrink-0 ${smtpConfigured ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      <Database className="w-5.5 h-5.5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-base font-bold text-emerald-950 flex flex-wrap items-center gap-2">
                        <span>Backend SMTP Mailer Service</span>
                        {smtpConfigured ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-100 text-green-800 font-mono tracking-wider">
                            ✓ ACTIVE (GMAIL)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800 font-mono tracking-wider">
                            UNCONFIGURED
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                        {smtpConfigured ? (
                          <>
                            Direct confirmations, gatepass credentials, and updates are securely transmitted directly from the Node.js server using Nodemailer and Gmail SMTP credentials.
                          </>
                        ) : (
                          <>
                            To enable automated direct confirmation emails on registration approval, please define <code className="font-mono text-[10px] bg-zinc-100 px-1 py-0.5 text-rose-700">GMAIL_USER</code> and <code className="font-mono text-[10px] bg-zinc-100 px-1 py-0.5 text-rose-700">GMAIL_PASS</code> in your project environment secrets.
                          </>
                        )}
                      </p>

                      {/* Interactive SMTP Tester */}
                      {smtpConfigured && (
                        <div className="mt-4 pt-3.5 border-t border-rose-50/50">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 block mb-2">
                            ✉ Outbound SMTP Diagnostics &amp; Testing
                          </span>
                          <div className="flex items-center gap-2">
                            <input
                              type="email"
                              placeholder="admin-test-inbox@gmail.com"
                              value={testEmailAddress}
                              onChange={(e) => setTestEmailAddress(e.target.value)}
                              className="px-2.5 py-1.5 text-xs border border-rose-100 rounded bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#580F6E] flex-1 font-mono placeholder-zinc-400"
                            />
                            <button
                              onClick={handleSendTestEmail}
                              disabled={sendingTestEmail || !testEmailAddress}
                              className="px-3.5 py-1.5 bg-[#580F6E] hover:bg-[#9E2B3E] text-white disabled:bg-zinc-100 disabled:text-zinc-400 transition font-mono text-[10px] font-bold uppercase tracking-wider rounded cursor-pointer shrink-0"
                            >
                              {sendingTestEmail ? "Sending..." : "Test SMTP"}
                            </button>
                          </div>

                          {testEmailResult && (
                            <div className={`mt-3 p-3 rounded text-xs leading-relaxed font-sans ${testEmailResult.success ? "bg-emerald-50 text-emerald-900 border border-emerald-200" : "bg-amber-50 text-amber-950 border border-amber-200"}`}>
                              <p className="font-bold font-mono text-[10px] uppercase flex items-center gap-1.5">
                                {testEmailResult.success ? (
                                  <span className="text-emerald-700 font-bold">✓ SMTP TEST COMPLETED</span>
                                ) : (
                                  <span className="text-rose-800 font-bold">✗ SMTP DIAGNOSTIC FAILURE</span>
                                )}
                              </p>
                              <p className="mt-1 font-semibold text-zinc-900">{testEmailResult.message}</p>
                              {testEmailResult.errorDetails && (
                                <div className="mt-2 text-[11px]">
                                  <span className="font-mono font-bold block text-rose-800 mb-0.5">Error logs captured:</span>
                                  <pre className="font-mono text-[10px] bg-white border border-rose-100 p-2 rounded overflow-x-auto whitespace-pre-wrap select-text max-h-40">
                                    {testEmailResult.errorDetails}
                                  </pre>
                                  {testEmailResult.errorDetails.includes("Application-specific password required") && (
                                    <div className="mt-2.5 bg-white p-2.5 rounded border border-amber-200 leading-relaxed text-zinc-700 font-medium font-sans">
                                      💡 <strong>Action Required:</strong> Gmail blocks programmatic access using standard account passwords.
                                      <ol className="list-decimal pl-4.5 mt-1.5 space-y-1 text-zinc-800 font-semibold">
                                        <li>Go to your Google Account Settings (<a href="https://myaccount.google.com" target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900">myaccount.google.com</a>)</li>
                                        <li>Select the <strong>Security</strong> tab</li>
                                        <li>Under <strong>How you sign in to Google</strong>, click on <strong>2-Step Verification</strong> (ensure it is enabled)</li>
                                        <li>Scroll to the very bottom and select <strong>App Passwords</strong></li>
                                        <li>Enter "Wedding Mailer" as app name, click <strong>Create</strong>, and copy the generated 16-character passcode</li>
                                        <li>Replace your <code className="bg-zinc-100 px-1 py-0.5 rounded text-rose-700 font-mono font-bold">GMAIL_PASS</code> environment secret with this passcode.</li>
                                      </ol>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* OAuth Client Connection card */}
                <div className="flex-1 flex flex-col justify-between gap-3">
                  <div className="flex items-start space-x-3.5">
                    <div className={`p-2.5 rounded-full shrink-0 ${googleUser ? "bg-emerald-50 text-emerald-700" : "bg-zinc-50 text-zinc-400"}`}>
                      <Mail className="w-5.5 h-5.5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-base font-bold text-emerald-950 flex flex-wrap items-center gap-2">
                        <span>Admin Personal Gmail Workspace</span>
                        {googleUser ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-100 text-green-800 font-mono tracking-wider">
                            ✓ CONNECTED
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-zinc-100 text-zinc-500 font-mono tracking-wider">
                            DISCONNECTED
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                        {googleUser ? (
                          <>
                            Authorized to read/send custom broadcast emails on behalf of <strong className="text-[#580F6E] font-mono">{googleUser.email}</strong>. Useful for bespoke direct replies.
                          </>
                        ) : (
                          <>
                            (Optional) Authorize personal Gmail connection if you wish to run on-demand broadcasts directly using your individual inbox rather than the backend automated SMTP service.
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    {googleUser ? (
                      <button 
                        onClick={async () => {
                          await logoutGoogle();
                        }}
                        className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-wider transition rounded-sm flex items-center gap-1 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Disconnect
                      </button>
                    ) : (
                      <button 
                        onClick={async () => {
                          try {
                            await signInWithGoogle();
                          } catch (err: any) {
                            alert(`Google Workspace Connection failed: ${err.message || err}`);
                          }
                        }}
                        className="px-4 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-[10px] font-mono font-bold uppercase tracking-wider transition rounded-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.504 0-6.35-2.846-6.35-6.35s2.846-6.35 6.35-6.35c1.472 0 2.82.508 3.89 1.44l3.155-3.155C18.91 1.99 15.82 1 12.24 1 5.48 1 0 6.48 0 13.24s5.48 12.24 12.24 12.24c6.76 0 12.24-5.48 12.24-12.24 0-.825-.094-1.631-.262-2.41H12.24z"/>
                        </svg>
                        Connect Workspace
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* METRICS ROW COUNTERS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="bg-white border border-amber-900/10 p-5 rounded-xs shadow-xs">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#B45309] uppercase block mb-1">
                    Total Submissions
                  </span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl font-bold text-emerald-950 font-serif">{metrics.total}</span>
                    <span className="text-zinc-400 text-xs">requests</span>
                  </div>
                </div>

                <div className="bg-white border border-amber-900/10 p-5 rounded-xs shadow-xs border-l-4 border-l-amber-500">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-amber-700 uppercase block mb-1">
                    Registered
                  </span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl font-bold text-amber-700 font-serif">{metrics.registered}</span>
                    <span className="text-zinc-400 text-xs">guests</span>
                  </div>
                </div>

                <div className="bg-white border border-amber-900/10 p-5 rounded-xs shadow-xs border-l-4 border-l-emerald-800">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-800 uppercase block mb-1">
                    Passes Issued
                  </span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl font-bold text-emerald-900 font-serif">{metrics.approved}</span>
                    <span className="text-zinc-400 text-xs">verified</span>
                  </div>
                </div>

                <div className="bg-white border border-amber-900/10 p-5 rounded-xs shadow-xs border-l-4 border-l-red-500">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-red-700 uppercase block mb-1">
                    Declined Requests
                  </span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl font-bold text-red-700 font-serif">{metrics.declined}</span>
                    <span className="text-zinc-400 text-xs">canceled</span>
                  </div>
                </div>

              </div>

              {/* SEARCH, SEATING CHOOSER & FILTERS AREA */}
              <div className="bg-white border border-amber-900/10 p-6 rounded-xs shadow-xs space-y-4">
                
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                  
                  {/* Free Search input */}
                  <div className="w-full lg:flex-grow space-y-1.5">
                    <label htmlFor="search-input" className="block text-xs font-mono font-bold text-emerald-950 uppercase tracking-widest">
                      Search Attendees (Name / Email / Phone)
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input 
                        id="search-input"
                        type="text" 
                        placeholder="e.g. Uzoma Alao..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-emerald-800 focus:bg-white focus:outline-none pl-9 pr-4 py-2.5 text-xs rounded-xs"
                      />
                    </div>
                  </div>

                  {/* Status checklist dropdown */}
                  <div className="w-full sm:w-1/3 lg:w-48 space-y-1.5">
                    <label htmlFor="status-select" className="block text-xs font-mono font-bold text-emerald-950 uppercase tracking-widest">
                      Filter Status
                    </label>
                    <select
                      id="status-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-emerald-800 focus:bg-white focus:outline-none px-3 py-2.5 text-xs rounded-xs font-medium"
                    >
                      <option value="all">All statuses ({metrics.total})</option>
                      <option value="registered">Registered ({metrics.registered})</option>
                      <option value="approved">Approved passes ({metrics.approved})</option>
                      <option value="declined">Declined requests ({metrics.declined})</option>
                    </select>
                  </div>

                  {/* Event Checklist filter */}
                  <div className="w-full sm:w-1/3 lg:w-56 space-y-1.5">
                    <label htmlFor="event-select" className="block text-xs font-mono font-bold text-emerald-950 uppercase tracking-widest">
                      Filter Event Destination
                    </label>
                    <select
                      id="event-select"
                      value={eventFilter}
                      onChange={(e) => setEventFilter(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-emerald-800 focus:bg-white focus:outline-none px-3 py-2.5 text-xs rounded-xs font-medium"
                    >
                      <option value="all">All wedding parts</option>
                      <option value="traditional">Traditional (Igba Nkwu)</option>
                      <option value="church">Church Ceremony</option>
                      <option value="reception">Reception Gala</option>
                    </select>
                  </div>

                </div>

                {/* Seating Assignation Tool & Email Actions */}
                <div className="border-t border-zinc-100 pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-500">
                      <Info className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>Seating assignment allocated for newly approved invitations:</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-emerald-950 font-mono uppercase">Assign Seat:</span>
                      <input 
                        type="text" 
                        value={seatingSelection}
                        onChange={(e) => setSeatingSelection(e.target.value)}
                        placeholder="e.g. Table 5 • Imperial Row"
                        className="bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 focus:bg-white px-3 py-1.5 text-xs font-bold text-emerald-900 rounded-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (filteredRSVPs.length === 0) {
                          alert("No guests match the current filters.");
                          return;
                        }
                        setSelectedRsvpsForEmail(filteredRSVPs);
                        setEmailSubject("Important Updates: Tobi & Ayomide's Wedding Celebration");
                        setEmailBody(`<h3>Tobi &amp; Ayomide's Royal Union Wedding</h3>\n<p>Dear Guest,</p>\n<p>We are delighted to share some important details with you regarding our celebration...</p>\n<p>With love,<br/>Tobi &amp; Ayomide</p>`);
                        setIsComposeModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-white font-mono text-[11px] font-bold uppercase tracking-wider transition rounded-sm flex items-center shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 mr-1.5" />
                      Email Filtered Guests ({filteredRSVPs.length})
                    </button>
                  </div>
                </div>

              </div>

              {/* DATATABLE LIST */}
              <div className="bg-white border border-amber-900/10 rounded-xs shadow-xs overflow-hidden">
                {listError && (
                  <div className="p-4 bg-red-50 text-red-950 text-xs font-semibold m-4 rounded-xs border-l-4 border-red-700">
                    {listError}
                  </div>
                )}

                {filteredRSVPs.length === 0 ? (
                  <div className="p-16 text-center text-zinc-500">
                    <Info className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                    <p className="font-serif text-lg font-bold">No RSVPs match your details.</p>
                    <p className="text-xs font-mono text-zinc-400 mt-1">Adjust your filters, search letters, or reload log files.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-emerald-950/5 text-[10px] font-mono font-bold text-emerald-950 uppercase tracking-wider border-b border-zinc-200">
                          <th className="py-4 px-4 w-12 text-center">#</th>
                          <th className="py-4 px-6">Guest / Contact Channels</th>
                          <th className="py-4 px-4">Targeted Events</th>
                          <th className="py-4 px-4 text-center">Status Badge</th>
                          <th className="py-4 px-6 text-right">Operations Panel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {filteredRSVPs.map((row, index) => {
                          const code = row.id.substring(0, 8).toUpperCase();
                          return (
                            <tr key={row.id} className="hover:bg-zinc-50/50 transition duration-150 text-xs text-zinc-700">
                              
                              {/* Row number */}
                              <td className="py-4 px-4 text-center">
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#580F6E]/10 text-[#580F6E] font-bold font-mono text-[11px]">
                                  {index + 1}
                                </span>
                              </td>
                              
                              {/* Guest Identity */}
                              <td className="py-4 px-6">
                                <span className="font-bold text-emerald-950 text-sm block">
                                  {row.name}
                                </span>
                                <span className="text-[11px] text-zinc-500 font-mono block mt-0.5">
                                  {row.email}
                                </span>
                                <span className="text-[11px] text-zinc-500 font-mono block">
                                  {row.phone}
                                </span>
                              </td>

                              {/* Target Events checklist */}
                              <td className="py-4 px-4">
                                <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                  {row.events.map((e) => {
                                    let label = e;
                                    if (e === "traditional") label = "Igba Nkwu";
                                    if (e === "church") label = "Church";
                                    if (e === "reception") label = "Reception";
                                    return (
                                      <span key={e} className="px-2 py-0.5 bg-emerald-950/5 text-emerald-900 text-[9px] font-mono uppercase font-bold rounded-xs">
                                        {label}
                                      </span>
                                    );
                                  })}
                                </div>
                              </td>

                              <td className="py-4 px-4 text-center">
                                <span className={`inline-flex px-2.5 py-1 text-[9px] font-mono uppercase font-bold rounded-full ${
                                  row.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : row.status === "declined"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}>
                                  {row.status === "pending" ? "registered" : row.status}
                                </span>
                              </td>

                              {/* Actions / Operations */}
                              <td className="py-4 px-6 text-right">
                                <div className="inline-flex space-x-1.5 items-center">
                                  
                                  {/* Approve / Issue Gatepass Button */}
                                  {row.status !== "approved" ? (
                                    <button
                                      disabled={actioningId !== null}
                                      onClick={() => executeRSVPAction(row.id, "approve")}
                                      className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-950 disabled:bg-emerald-900/40 text-white font-mono text-[10px] font-bold uppercase tracking-wider transition rounded-xs flex items-center shadow-xs"
                                    >
                                      {actioningId === row.id ? (
                                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                      ) : (
                                        <Check className="w-3.5 h-3.5 mr-1" />
                                      )}
                                      Issue Pass
                                    </button>
                                  ) : (
                                    /* View Pass Simulation modal trigger button if already approved */
                                    <button
                                      onClick={() => {
                                        // Open envelope simulation directly
                                        setSimulatorState({
                                          isOpen: true,
                                          guestName: row.name,
                                          email: row.email,
                                          status: row.status,
                                          code: code,
                                          events: row.events,
                                          htmlContent: "" // Simulator component will deal with generating or holding
                                        });
                                      }}
                                      className="px-3 py-1.5 border border-emerald-900 hover:bg-emerald-950/5 text-emerald-950 font-mono text-[10px] font-bold uppercase tracking-wider transition rounded-xs flex items-center"
                                    >
                                      <Mail className="w-3.5 h-3.5 mr-1 text-emerald-900" />
                                      View Pass
                                    </button>
                                  )}

                                  {/* Reject / Decline Button */}
                                  {row.status === "pending" && (
                                    <button
                                      title="Decline RSVP"
                                      disabled={actioningId !== null}
                                      onClick={() => executeRSVPAction(row.id, "decline")}
                                      className="p-1.5 border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition rounded-xs"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  )}

                                  {/* Send Custom Email button */}
                                  <button
                                    title="Send Custom Email via Gmail"
                                    onClick={() => {
                                      setSelectedRsvpsForEmail([row]);
                                      setEmailSubject(`Regarding your RSVP to Tobi & Ayomide's Wedding`);
                                      setEmailBody(`<h3>Tobi &amp; Ayomide's Wedding Celebration</h3>\n<p>Dear ${row.name},</p>\n<p>We are writing to you regarding your registration for our destination wedding in Abuja...</p>\n<p>With love,<br/>Tobi &amp; Ayomide</p>`);
                                      setIsComposeModalOpen(true);
                                    }}
                                    className="p-1.5 border border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 transition rounded-xs flex items-center cursor-pointer"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Delete Button with Inline Confirmation */}
                                  {confirmDeleteId === row.id ? (
                                    <div className="flex items-center gap-1 bg-red-50 border border-red-200 p-1 rounded-sm shrink-0">
                                      <span className="text-[9px] text-red-800 font-bold uppercase tracking-wider px-1">Delete?</span>
                                      <button
                                        onClick={() => {
                                          executeRSVPAction(row.id, "delete");
                                          setConfirmDeleteId(null);
                                        }}
                                        className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded-xs text-[10px] font-bold font-mono transition cursor-pointer"
                                      >
                                        Yes
                                      </button>
                                      <button
                                        onClick={() => setConfirmDeleteId(null)}
                                        className="px-1.5 py-0.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 rounded-xs text-[10px] font-bold font-mono transition cursor-pointer"
                                      >
                                        No
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      title="Delete Submission log"
                                      disabled={actioningId !== null}
                                      onClick={() => {
                                        setConfirmDeleteId(row.id);
                                      }}
                                      className="p-1.5 border border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 hover:border-zinc-300 transition rounded-xs cursor-pointer"
                                    >
                                      <Trash className="w-3.5 h-3.5" />
                                    </button>
                                  )}

                                </div>
                              </td>

                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

          {/* Render our breathtaking Envelope simulated delivery popups */}
          <EnvelopeSimulator 
            isOpen={simulatorState.isOpen}
            onClose={() => setSimulatorState(prev => ({ ...prev, isOpen: false }))}
            guestName={simulatorState.guestName}
            email={simulatorState.email}
            status={simulatorState.status}
            code={simulatorState.code}
            events={simulatorState.events}
            isEmailSent={simulatorState.isEmailSent}
            emailMethod={simulatorState.emailMethod}
            smtpError={simulatorState.smtpError}
            simulatedHtmlContent={simulatorState.htmlContent || `
              <div style="font-family: 'Georgia', serif; background-color: #FAF4F0; padding: 40px; text-align: center; border: 12px double #C29D70; outline: 3px solid #580F6E; max-width: 600px; margin: 20px auto; color: #1E293B; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <img src="https://picsum.photos/seed/monogram/100/100" style="width: 50px; height: 50px; border-radius: 50%;" alt="Monogram" referrerPolicy="no-referrer" />
                  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #580F6E; font-weight: bold; margin-top: 10px;">Official Gatepass</div>
                </div>
                <h2 style="font-size: 26px; color: #580F6E; margin-bottom: 4px; font-weight: normal;">Tobi &amp; Ayomide</h2>
                <p style="font-size: 13px; font-style: italic; color: #C29D70; margin-top: 0; margin-bottom: 24px;">Celebrating our forever journey together</p>
                
                <div style="background-color: #ffffff; padding: 24px; border: 1px solid rgba(194, 157, 112, 0.4); text-align: left; margin: 20px 0;">
                  <p style="font-size: 16px; color: #0F172A; font-weight: bold;">Dear ${simulatorState.guestName},</p>
                  <p style="font-size: 14px; line-height: 1.6; color: #1F2937;">
                    Your RSVP seating reservation is officially **Approved**! We are deeply honored by your presence as we pledge our lives in holy matrimony before God.
                  </p>
                  
                  <div style="background-color: #FAF4F0; border-left: 4px solid #580F6E; padding: 14px; margin: 18px 0;">
                    <table style="width: 100%; font-size: 13px;">
                      <tr>
                        <td style="color: #580F6E; font-weight: bold; width: 45%;">VERIFICATION CODE:</td>
                        <td style="color: #580F6E; font-family: monospace; font-weight: bold; font-size: 16px;">${simulatorState.code}</td>
                      </tr>
                      <tr>
                        <td style="color: #C29D70; font-weight: bold;">CONFIRMED SEATING:</td>
                        <td style="color: #1E293B; font-weight: bold;">${seatingSelection}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <p style="font-size: 11px; color: #4B5563;">
                  "He who finds a wife finds a good thing and obtains favor from the Lord."<br/>
                  <strong style="color: #580F6E;">— Proverbs 18:22</strong>
                </p>
              </div>
            `}
          />

          {/* COMPOSE GMAIL MODAL */}
          {isComposeModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white border border-rose-100 rounded-sm shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-amber-400" />
                    <h3 className="font-serif text-lg font-bold">Compose Custom Email via Gmail</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setIsComposeModalOpen(false);
                      setEmailProgress(null);
                      setSendingEmails(false);
                    }}
                    className="text-white/70 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {/* Auth Warning if not connected and no SMTP */}
                  {!smtpConfigured && !googleUser ? (
                    <div className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-rose-50 text-[#580F6E] rounded-full flex items-center justify-center mx-auto">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold text-emerald-950">Email Delivery System Unconfigured</h4>
                        <p className="text-xs text-zinc-500 mt-1 max-w-md mx-auto leading-relaxed">
                          To send customized update or confirmation emails, please define <code className="font-mono bg-zinc-100 px-1 text-[#580F6E]">GMAIL_USER</code> and <code className="font-mono bg-zinc-100 px-1 text-[#580F6E]">GMAIL_PASS</code> environment variables, or link your Google Workspace account below.
                        </p>
                      </div>
                      <button
                        onClick={async () => {
                          try {
                            await signInWithGoogle();
                          } catch (err: any) {
                            alert(`Google Auth failed: ${err.message || err}`);
                          }
                        }}
                        className="px-5 py-2.5 bg-[#580F6E] hover:bg-[#9E2B3E] text-white text-xs font-mono font-bold uppercase tracking-widest transition rounded-sm shadow-xs inline-flex items-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.504 0-6.35-2.846-6.35-6.35s2.846-6.35 6.35-6.35c1.472 0 2.82.508 3.89 1.44l3.155-3.155C18.91 1.99 15.82 1 12.24 1 5.48 1 0 6.48 0 13.24s5.48 12.24 12.24 12.24c6.76 0 12.24-5.48 12.24-12.24 0-.825-.094-1.631-.262-2.41H12.24z"/>
                        </svg>
                        Link Google Account
                      </button>
                    </div>
                  ) : emailProgress && emailProgress.current >= emailProgress.total ? (
                    /* Progress Complete Screen */
                    <div className="p-8 text-center space-y-4">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-xl font-bold text-emerald-950">Emails Dispatched Successfully!</h4>
                        <p className="text-xs text-zinc-500 max-w-md mx-auto">
                          Successfully completed dispatch using the{" "}
                          <strong>
                            {emailSendMethod === "smtp" ? "Backend SMTP Mailer Service" : `Gmail Workspace account (${googleUser?.email})`}
                          </strong>.
                        </p>
                      </div>
                      
                      <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-sm text-left max-w-md mx-auto space-y-1.5 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Recipients Count:</span>
                          <span className="font-bold text-zinc-800">{emailProgress.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Successful:</span>
                          <span className="font-bold text-emerald-700">{emailProgress.successCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Failed / Skips:</span>
                          <span className="font-bold text-red-600">{emailProgress.errorCount}</span>
                        </div>
                      </div>

                      {/* Display of outbound failures if any occurred */}
                      {emailSendErrors.length > 0 && (
                        <div className="mt-4 p-3.5 bg-rose-50 border border-rose-100 rounded text-left text-xs max-w-md mx-auto space-y-2">
                          <span className="font-mono font-bold text-rose-800 block uppercase tracking-wider text-[10px]">
                            ⚠️ Outbound Mail Failures ({emailSendErrors.length}):
                          </span>
                          <div className="max-h-40 overflow-y-auto space-y-2 font-mono text-[11px] text-zinc-700 leading-normal pr-1">
                            {emailSendErrors.map((err, idx) => (
                              <div key={idx} className="border-b border-rose-100/50 pb-1.5 last:border-b-0 last:pb-0">
                                <span className="font-bold text-zinc-900">{err.recipient}:</span>
                                <div className="text-red-600 bg-white border border-rose-100 p-1.5 rounded mt-1 overflow-x-auto whitespace-pre-wrap select-text">
                                  {err.error}
                                </div>
                                {err.error.includes("Application-specific password required") && (
                                  <div className="mt-2 bg-amber-50 border border-amber-200 p-2.5 rounded font-sans text-zinc-800 text-[11px] font-medium leading-relaxed">
                                    💡 <strong>Gmail Passcode Required:</strong> Gmail blocks custom programmatic SMTP requests with your standard account password. To resolve:<br/>
                                    1. Go to <a href="https://myaccount.google.com" target="_blank" rel="noreferrer" className="text-blue-700 underline hover:text-blue-900 font-bold">Google Account Security Settings</a>.<br/>
                                    2. Turn on <strong>2-Step Verification</strong>.<br/>
                                    3. Search/Navigate to <strong>App Passwords</strong> and generate a 16-character code.<br/>
                                    4. Configure this App Password as your <code>GMAIL_PASS</code> env variable.
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setIsComposeModalOpen(false);
                            setEmailProgress(null);
                            setEmailSendErrors([]);
                          }}
                          className="px-5 py-2.5 bg-[#580F6E] hover:bg-[#9E2B3E] text-white text-xs font-mono font-bold uppercase tracking-widest transition rounded-sm cursor-pointer"
                        >
                          Return to Console
                        </button>
                      </div>
                    </div>
                  ) : confirmingSend ? (
                    /* High-Fidelity Custom Confirmation Screen */
                    <div className="p-8 text-center space-y-5">
                      <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                        <Info className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-xl font-bold text-amber-950">Confirm Outbound Broadcast</h4>
                        <p className="text-xs text-zinc-500 max-w-md mx-auto">
                          You are about to initiate a customized email broadcast to <strong>{selectedRsvpsForEmail.length} selected guest(s)</strong>.
                        </p>
                      </div>

                      <div className="bg-stone-50 border border-stone-200 p-5 rounded-sm text-left max-w-lg mx-auto space-y-3 text-xs font-mono">
                        <div className="flex justify-between border-b border-stone-200 pb-1.5">
                          <span className="text-zinc-500">Delivery Channel:</span>
                          <span className="font-bold text-zinc-800 uppercase">
                            {emailSendMethod === "smtp" ? "✓ Secure Backend SMTP" : `✓ Gmail API (${googleUser?.email})`}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-1.5">
                          <span className="text-zinc-500">Recipients Count:</span>
                          <span className="font-bold text-zinc-800">{selectedRsvpsForEmail.length} Guests</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-1.5">
                          <span className="text-zinc-500">Email Subject:</span>
                          <span className="font-bold text-zinc-800 truncate max-w-xs">{emailSubject}</span>
                        </div>
                        <div className="pt-1.5 text-zinc-600 leading-relaxed font-sans text-[11px]">
                          <strong>⚠️ Broadcast Notice:</strong> Every message will be custom-interpolated with each guest's name if the placeholder is present. Ensure your connection settings are valid. Click confirm to begin dispatching immediately.
                        </div>
                      </div>

                      <div className="flex justify-center space-x-3 pt-3">
                        <button
                          onClick={() => setConfirmingSend(false)}
                          className="px-5 py-2.5 border border-zinc-300 text-zinc-600 text-xs font-mono font-bold uppercase tracking-widest transition rounded-sm hover:bg-zinc-100 cursor-pointer"
                        >
                          Cancel / Go Back
                        </button>
                        <button
                          onClick={async () => {
                            setConfirmingSend(false);
                            setSendingEmails(true);
                            setEmailSendErrors([]);
                            const totalCount = selectedRsvpsForEmail.length;
                            const progress = { current: 0, total: totalCount, successCount: 0, errorCount: 0 };
                            setEmailProgress(progress);

                            for (let i = 0; i < totalCount; i++) {
                              const recipient = selectedRsvpsForEmail[i];
                              
                              let customizedBody = emailBody;
                              if (customizedBody.includes("[Guest Name]")) {
                                customizedBody = customizedBody.replace(/\[Guest Name\]/g, recipient.name);
                              }

                              try {
                                if (emailSendMethod === "smtp") {
                                  const adminCode = localStorage.getItem("wedding_admin_passcode") || "";
                                  const response = await fetch("/api/admin/send-email-smtp", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                      "Authorization": `Bearer ${adminCode}`,
                                      "X-Admin-Passcode": adminCode
                                    },
                                    body: JSON.stringify({
                                      recipients: [recipient.email],
                                      subject: emailSubject,
                                      htmlBody: customizedBody
                                    })
                                  });
                                  if (!response.ok) {
                                    const errData = await response.json();
                                    throw new Error(errData.error || `HTTP error ${response.status}`);
                                  }
                                } else {
                                  await sendGmailEmail(recipient.email, emailSubject, customizedBody);
                                }
                                progress.successCount++;
                              } catch (err: any) {
                                console.error(`Failed to send to ${recipient.email}:`, err);
                                progress.errorCount++;
                                setEmailSendErrors(prev => [...prev, { recipient: recipient.email, error: err.message || String(err) }]);
                              }
                              
                              progress.current = i + 1;
                              setEmailProgress({ ...progress });
                              await new Promise(resolve => setTimeout(resolve, 200));
                            }
                            
                            setSendingEmails(false);
                          }}
                          className="px-5 py-2.5 bg-[#580F6E] hover:bg-[#9E2B3E] text-white text-xs font-mono font-bold uppercase tracking-widest transition rounded-sm flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Confirm &amp; Dispatch
                        </button>
                      </div>
                    </div>
                  ) : sendingEmails ? (
                    /* Active Sending Loader */
                    <div className="p-8 text-center space-y-4">
                      <Loader2 className="w-10 h-10 animate-spin text-[#580F6E] mx-auto" />
                      <div className="space-y-1">
                        <h4 className="font-serif text-lg font-bold text-emerald-950">
                          Sending Emails...
                        </h4>
                        <p className="text-xs text-zinc-500">
                          Dispatched via{" "}
                          <strong>
                            {emailSendMethod === "smtp" ? "Secure Backend SMTP" : `Gmail Workspace (${googleUser?.email})`}
                          </strong>. Please do not close this modal.
                        </p>
                      </div>

                      <div className="max-w-md mx-auto space-y-2">
                        <div className="flex justify-between text-xs font-mono font-bold text-[#580F6E]">
                          <span>Progress</span>
                          <span>{emailProgress?.current} / {emailProgress?.total}</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#580F6E] h-full transition-all duration-300"
                            style={{ width: `${((emailProgress?.current || 0) / (emailProgress?.total || 1)) * 100}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono flex justify-between">
                          <span>Succeeded: {emailProgress?.successCount}</span>
                          <span>Failed: {emailProgress?.errorCount}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Form Input screen */
                    <div className="space-y-4">
                      {/* Delivery Mode Choice */}
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-mono font-bold text-[#580F6E] uppercase tracking-wider">
                          Email Delivery Channel
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* SMTP Channel */}
                          <div 
                            onClick={() => {
                              if (smtpConfigured) setEmailSendMethod("smtp");
                            }}
                            className={`p-3.5 border rounded-sm flex items-start space-x-3 cursor-pointer transition ${
                              emailSendMethod === "smtp" 
                                ? "bg-emerald-50/40 border-emerald-600 text-emerald-950" 
                                : smtpConfigured 
                                  ? "border-zinc-200 hover:bg-zinc-50/50" 
                                  : "opacity-50 cursor-not-allowed bg-zinc-50 border-zinc-200"
                            }`}
                          >
                            <input 
                              type="radio" 
                              id="method-smtp"
                              name="send-method"
                              checked={emailSendMethod === "smtp"}
                              disabled={!smtpConfigured}
                              onChange={() => setEmailSendMethod("smtp")}
                              className="accent-emerald-700 mt-0.5"
                            />
                            <div className="text-left">
                              <label htmlFor="method-smtp" className="text-xs font-serif font-bold cursor-pointer block">
                                Backend SMTP Service
                              </label>
                              <span className="text-[10px] text-zinc-400 block mt-0.5">
                                {smtpConfigured ? "✓ Configured & Active (Nodemailer)" : "✗ Unconfigured (GMAIL_USER env missing)"}
                              </span>
                            </div>
                          </div>

                          {/* Client Workspace Channel */}
                          <div 
                            onClick={() => {
                              if (googleUser) setEmailSendMethod("client");
                            }}
                            className={`p-3.5 border rounded-sm flex items-start space-x-3 cursor-pointer transition ${
                              emailSendMethod === "client" 
                                ? "bg-emerald-50/40 border-emerald-600 text-emerald-950" 
                                : googleUser 
                                  ? "border-zinc-200 hover:bg-zinc-50/50" 
                                  : "opacity-50 cursor-not-allowed bg-zinc-50 border-zinc-200"
                            }`}
                          >
                            <input 
                              type="radio" 
                              id="method-client"
                              name="send-method"
                              checked={emailSendMethod === "client"}
                              disabled={!googleUser}
                              onChange={() => setEmailSendMethod("client")}
                              className="accent-emerald-700 mt-0.5"
                            />
                            <div className="text-left">
                              <label htmlFor="method-client" className="text-xs font-serif font-bold cursor-pointer block">
                                Personal Workspace API
                              </label>
                              <span className="text-[10px] text-zinc-400 block mt-0.5">
                                {googleUser ? `✓ Connected: ${googleUser.email}` : "✗ Disconnected (OAuth required)"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recipients info */}
                      <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-sm text-xs">
                        <div className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Recipients Selection ({selectedRsvpsForEmail.length})
                        </div>
                        <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-1">
                          {selectedRsvpsForEmail.map(r => (
                            <span key={r.id} className="inline-flex items-center px-2 py-1 bg-white border border-zinc-200 text-zinc-700 rounded-sm font-mono text-[10px]">
                              {r.name} &lt;{r.email}&gt;
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Subject input */}
                      <div className="space-y-1">
                        <label htmlFor="subject-compose" className="block text-[11px] font-mono font-bold text-[#580F6E] uppercase tracking-wider">
                          Email Subject
                        </label>
                        <input 
                          id="subject-compose"
                          type="text"
                          required
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder="e.g. Important Wedding Venue updates"
                          className="w-full bg-white border border-zinc-300 focus:outline-none focus:border-[#580F6E] px-3.5 py-2.5 text-xs rounded-sm"
                        />
                      </div>

                      {/* Rich Content body input */}
                      <div className="space-y-1">
                        <label htmlFor="body-compose" className="block text-[11px] font-mono font-bold text-[#580F6E] uppercase tracking-wider flex justify-between">
                          <span>Email Body (HTML supported)</span>
                          <span className="text-[9px] text-zinc-400 font-normal">Use [Guest Name] as a placeholder</span>
                        </label>
                        <textarea 
                          id="body-compose"
                          required
                          rows={6}
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                          placeholder="Type your HTML body content here..."
                          className="w-full bg-white border border-zinc-300 focus:outline-none focus:border-[#580F6E] p-3.5 text-xs rounded-sm font-sans"
                        />
                      </div>

                       {/* Visual Mail Preview */}
                      <div className="border border-zinc-200 rounded-sm overflow-hidden">
                        <div className="bg-zinc-100 px-4 py-2 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-200 flex justify-between items-center">
                          <span>Real-time Live Render Preview</span>
                          <span className="text-[9px] text-emerald-800 font-normal">
                            Sender: {emailSendMethod === "smtp" ? "System SMTP Mailer" : googleUser?.email || "Personal Inbox"}
                          </span>
                        </div>
                        <div className="p-6 bg-[#FAF9F6] max-h-48 overflow-y-auto">
                          <div 
                            className="bg-white border border-rose-100 p-6 shadow-sm rounded-sm font-serif max-w-xl mx-auto text-[#4C0519]"
                            dangerouslySetInnerHTML={{ __html: emailBody.replace(/\[Guest Name\]/g, selectedRsvpsForEmail[0]?.name || "Guest") }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                {((emailSendMethod === "smtp" && smtpConfigured) || (emailSendMethod === "client" && googleUser)) && !sendingEmails && !confirmingSend && (!emailProgress || emailProgress.current < emailProgress.total) && (
                  <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-4 flex justify-between items-center">
                    <span className="text-[11px] font-mono text-zinc-400">
                      {emailSendMethod === "smtp" 
                        ? "Dispatched via high-deliverability server SMTP."
                        : "Emails sent directly through Google Mail servers."
                      }
                    </span>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setIsComposeModalOpen(false)}
                        className="px-4 py-2 border border-zinc-300 text-zinc-600 text-xs font-mono uppercase tracking-wider transition rounded-sm hover:bg-zinc-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          if (!emailSubject || !emailBody) {
                            alert("Subject and Body are required.");
                            return;
                          }
                          
                          const totalCount = selectedRsvpsForEmail.length;
                          if (totalCount === 0) return;

                          setConfirmingSend(true);
                        }}
                        className="px-5 py-2 bg-[#580F6E] hover:bg-[#9E2B3E] text-white text-xs font-mono font-bold uppercase tracking-widest transition rounded-sm flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send {selectedRsvpsForEmail.length > 1 ? `${selectedRsvpsForEmail.length} Emails` : "Email"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
