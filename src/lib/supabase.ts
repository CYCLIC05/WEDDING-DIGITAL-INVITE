import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

let supabase: SupabaseClient | null = null;
let supabaseConfigured = false;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
    supabaseConfigured = true;
    console.log("[Supabase] Client initialized successfully.");
  } catch (err) {
    console.error("[Supabase] Failed to initialize client:", err);
  }
} else {
  console.log("[Supabase] No credentials found — running in local file fallback mode.");
}

export function isSupabaseConfigured(): boolean {
  return supabaseConfigured;
}

export async function verifySupabaseConnectivity(): Promise<boolean> {
  if (!supabase || !supabaseConfigured) return false;
  try {
    const { error } = await supabase.from("rsvps").select("id").limit(1);
    if (error) throw error;
    console.log("[Supabase] Connectivity confirmed successfully.");
    return true;
  } catch (err: any) {
    console.log("[Supabase] Connectivity check failed — running in local fallback mode.");
    console.log(`[Supabase] Detail: ${err.message || err}`);
    return false;
  }
}

export { supabase };
