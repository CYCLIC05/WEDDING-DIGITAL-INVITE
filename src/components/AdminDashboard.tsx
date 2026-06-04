import React, { useState, useEffect } from "react";
import { 
  Lock, Unlock, RefreshCw, Search, Eye, Filter, Check, Trash, X, ChevronRight, FileText, Database, Info, LogOut, CheckCircle, Mail, HelpCircle, Loader2
} from "lucide-react";
import { RSVP, RSVPResponse } from "../types.ts";
import { EnvelopeSimulator } from "./EnvelopeSimulator.tsx";

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

  // Tab
  const [activeTab, setActiveTab] = useState<"roster" | "sql">("roster");

  // Multi-state for Envelope Simulator
  const [simulatorState, setSimulatorState] = useState<{
    isOpen: boolean;
    guestName: string;
    email: string;
    status: string;
    code: string;
    events: string[];
    htmlContent: string;
  }>({
    isOpen: false,
    guestName: "",
    email: "",
    status: "",
    code: "",
    events: [],
    htmlContent: ""
  });

  // Action states
  const [actioningId, setActioningId] = useState<string | null>(null);
  const [seatingSelection, setSeatingSelection] = useState("Imperial Main Hall • Section A");

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
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: codeToVerify })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthorized(true);
        localStorage.setItem("wedding_admin_passcode", codeToVerify);
        setPasscode("");
        fetchRSVPs(codeToVerify);
      } else {
        setAuthError(data.error || "Incorrect passcode string.");
        localStorage.removeItem("wedding_admin_passcode");
      }
    } catch (err) {
      setAuthError("Failed to verify passcode. Check if local dev server is running.");
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

  const fetchRSVPs = async (code: string) => {
    const currentCode = code || localStorage.getItem("wedding_admin_passcode") || "";
    if (!currentCode) return;

    setLoadingList(true);
    setListError("");
    try {
      const res = await fetch(`/api/rsvps?passcode=${currentCode}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setRsvps(data.data);
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

      const resData: RSVPResponse = await res.json();

      if (!res.ok) {
        throw new Error(resData.error || "Execution state failed to complete.");
      }

      // If approved, trigger the Envelope Simulator for supreme designer UX feedback
      if (action === "approve" && resData.data) {
        setSimulatorState({
          isOpen: true,
          guestName: resData.data.name,
          email: resData.data.email,
          status: resData.data.status,
          code: resData.simulatedEmailCode || "INV-PASS",
          events: resData.data.events,
          htmlContent: resData.simulatedEmailHtml || ""
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

  // Tallies count
  const metrics = {
    total: rsvps.length,
    pending: rsvps.filter((r) => r.status === "pending").length,
    approved: rsvps.filter((r) => r.status === "approved").length,
    declined: rsvps.filter((r) => r.status === "declined").length,
  };

  // Search & Filters filtering
  const filteredRSVPs = rsvps.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesEvent = eventFilter === "all" || item.events.includes(eventFilter);

    return matchesSearch && matchesStatus && matchesEvent;
  });

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 px-4 md:px-8 max-w-7xl mx-auto">
      
      {!isAuthorized ? (
        /* Login Screen protected layout */
        <div className="max-w-md mx-auto my-12 bg-white border border-amber-900/10 p-8 shadow-md rounded-xs">
          <div className="text-center mb-8">
            <div className="inline-flex p-3.5 bg-emerald-950/5 text-emerald-900 rounded-full mb-3 shadow-inner">
              <Lock className="w-5.5 h-5.5 text-amber-700" />
            </div>
            <h2 className="font-serif text-2xl text-emerald-950 font-bold tracking-tight">
              Groom's Secure Portal
            </h2>
            <p className="text-xs text-zinc-500 mt-2 font-mono">
              Nigeria Union Admin System v1.5
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 border-l-4 border-red-700 text-red-950 text-xs rounded-r-sm leading-relaxed">
                {authError}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="passcode-input" className="block text-xs font-mono font-bold text-emerald-950 uppercase tracking-wider">
                System Admin Secret Passcode
              </label>
              <input 
                id="passcode-input"
                type="password" 
                required 
                placeholder="Enter secret token e.g. ChidiAdanna2026"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-emerald-800 focus:bg-white focus:outline-none px-4 py-3 text-sm rounded-xs"
              />
              <p className="text-[10px] text-zinc-400 leading-normal">
                Credentials fallback pass key mapping is configured inside the `.env.local` or `.env` system parameters. (Default is <strong>ChidiAdanna2026</strong>)
              </p>
            </div>

            <button 
              type="submit"
              disabled={verifying}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 disabled:bg-emerald-900/60 duration-300 text-white font-mono text-xs uppercase font-bold tracking-widest transition-all rounded-xs flex items-center justify-center shadow-md"
            >
              {verifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Decoding Credentials...
                </>
              ) : (
                "Unlock Registry Console"
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
                Chidi &amp; Adanna's RSVP Registry
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

          {/* Sub Navigation Tabs */}
          <div className="flex space-x-1 border-b border-zinc-200 mb-6">
            <button
              onClick={() => setActiveTab("roster")}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition duration-200 ${
                activeTab === "roster"
                  ? "border-emerald-900 text-emerald-900"
                  : "border-transparent text-zinc-500 hover:text-emerald-950"
              }`}
            >
              Attendee Roster
            </button>
            <button
              onClick={() => setActiveTab("sql")}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold border-b-2 transition duration-200 ${
                activeTab === "sql"
                  ? "border-emerald-900 text-emerald-900"
                  : "border-transparent text-zinc-500 hover:text-emerald-950"
              }`}
            >
              Supabase SQL Script
            </button>
          </div>

          {activeTab === "sql" ? (
            /* Database SQL Schema Instructions Panel */
            <div className="bg-white border border-amber-900/10 p-6 md:p-8 rounded-sm shadow-sm">
              <div className="flex items-start space-x-3 mb-6">
                <Database className="w-6 h-6 text-amber-700 mt-1 shrink-0" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-emerald-950">
                    Database Schema (Supabase SQL Script)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                    Execute the following script inside your Supabase project's SQL Editor to bootstrap the exact table variables, types, and security parameters required by this wedding system.
                  </p>
                </div>
              </div>

              {/* Code window block */}
              <div className="relative">
                <textarea 
                  readOnly
                  rows={15}
                  value={`-- Supabase Database Schema for Nigerian Christian Wedding RSVP
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    events TEXT[] NOT NULL,
    dietary_notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' 
        CONSTRAINT check_rsvp_status CHECK (status IN ('pending', 'approved', 'declined'))
);

-- Enable Row-Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public inserts" ON public.rsvps FOR INSERT WITH CHECK (true);

-- Allow system admin reads
CREATE POLICY "Restricted SELECT to service_role" ON public.rsvps FOR SELECT USING (auth.role() = 'authenticated');`}
                  className="w-full bg-zinc-950 text-emerald-400 font-mono text-xs p-4 rounded-xs border border-zinc-800 leading-relaxed shadow-inner"
                />
              </div>

              <div className="mt-4 p-4 bg-emerald-950/5 border-l-4 border-emerald-900 text-xs text-emerald-950 leading-relaxed">
                <strong>🔒 Elite Security Practice:</strong> The Express server bypasses client-side restrictions by routing connection strings securely behind backend proxies. Raw Supabase anon credentials or database passwords are completely hidden from the browser.
              </div>
            </div>
          ) : (
            /* Main Dashboard Content */
            <div className="space-y-6">

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
                    Pending Review
                  </span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-3xl font-bold text-amber-700 font-serif">{metrics.pending}</span>
                    <span className="text-zinc-400 text-xs">queue</span>
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
                      <option value="pending">Pending review ({metrics.pending})</option>
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

                {/* Seating Assignation Tool */}
                <div className="border-t border-zinc-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                          <th className="py-4 px-6">Guest / Contact Channels</th>
                          <th className="py-4 px-4">Targeted Events</th>
                          <th className="py-4 px-4 text-center">Status Badge</th>
                          <th className="py-4 px-6 text-right">Operations Panel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200">
                        {filteredRSVPs.map((row) => {
                          const code = row.id.substring(0, 8).toUpperCase();
                          return (
                            <tr key={row.id} className="hover:bg-zinc-50/50 transition duration-150 text-xs text-zinc-700">
                              
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

                              {/* Status Badges */}
                              <td className="py-4 px-4 text-center">
                                <span className={`inline-flex px-2.5 py-1 text-[9px] font-mono uppercase font-bold rounded-full ${
                                  row.status === "approved"
                                    ? "bg-green-100 text-green-800"
                                    : row.status === "declined"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}>
                                  {row.status}
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

                                  {/* Delete Button */}
                                  <button
                                    title="Delete Submission log"
                                    disabled={actioningId !== null}
                                    onClick={() => {
                                      if (confirm(`Remove records for ${row.name} permanently?`)) {
                                        executeRSVPAction(row.id, "delete");
                                      }
                                    }}
                                    className="p-1.5 border border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 hover:border-zinc-300 transition rounded-xs"
                                  >
                                    <Trash className="w-3.5 h-3.5" />
                                  </button>

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
          )}

          {/* Render our breathtaking Envelope simulated delivery popups */}
          <EnvelopeSimulator 
            isOpen={simulatorState.isOpen}
            onClose={() => setSimulatorState(prev => ({ ...prev, isOpen: false }))}
            guestName={simulatorState.guestName}
            email={simulatorState.email}
            status={simulatorState.status}
            code={simulatorState.code}
            events={simulatorState.events}
            simulatedHtmlContent={simulatorState.htmlContent || `
              <div style="font-family: 'Georgia', serif; background-color: #FAF4F0; padding: 40px; text-align: center; border: 12px double #C29D70; outline: 3px solid #BF3B52; max-width: 600px; margin: 20px auto; color: #1E293B; border-radius: 8px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <img src="https://picsum.photos/seed/monogram/100/100" style="width: 50px; height: 50px; border-radius: 50%;" alt="Monogram" referrerPolicy="no-referrer" />
                  <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #BF3B52; font-weight: bold; margin-top: 10px;">Official Gatepass</div>
                </div>
                <h2 style="font-size: 26px; color: #BF3B52; margin-bottom: 4px; font-weight: normal;">Chidi &amp; Adanna</h2>
                <p style="font-size: 13px; font-style: italic; color: #C29D70; margin-top: 0; margin-bottom: 24px;">Celebrating a Cord of Three Strands</p>
                
                <div style="background-color: #ffffff; padding: 24px; border: 1px solid rgba(194, 157, 112, 0.4); text-align: left; margin: 20px 0;">
                  <p style="font-size: 16px; color: #0F172A; font-weight: bold;">Dear ${simulatorState.guestName},</p>
                  <p style="font-size: 14px; line-height: 1.6; color: #1F2937;">
                    Your RSVP seating reservation is officially **Approved**! We are deeply honored by your presence as we pledge our lives in holy matrimony before God.
                  </p>
                  
                  <div style="background-color: #FAF4F0; border-left: 4px solid #BF3B52; padding: 14px; margin: 18px 0;">
                    <table style="width: 100%; font-size: 13px;">
                      <tr>
                        <td style="color: #BF3B52; font-weight: bold; width: 45%;">VERIFICATION CODE:</td>
                        <td style="color: #BF3B52; font-family: monospace; font-weight: bold; font-size: 16px;">${simulatorState.code}</td>
                      </tr>
                      <tr>
                        <td style="color: #C29D70; font-weight: bold;">CONFIRMED SEATING:</td>
                        <td style="color: #1E293B; font-weight: bold;">${seatingSelection}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <p style="font-size: 11px; color: #4B5563;">
                  "Though one may be overpowered, two can defend themselves. A cord of three strands is not quickly broken."<br/>
                  <strong style="color: #BF3B52;">— Ecclesiastes 4:12</strong>
                </p>
              </div>
            `}
          />

        </div>
      )}

    </div>
  );
}
