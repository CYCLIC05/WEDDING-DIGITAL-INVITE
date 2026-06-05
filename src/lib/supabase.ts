import { createClient } from "@supabase/supabase-js";

/**
 * Clean credentials of hidden non-printable/zero-width formatting characters (like ZWNJ, BOM, etc.)
 */
export function cleanCredentials(val: string): string {
  if (!val) return "";
  return val.replace(/[\u200b-\u200d\u200e\u200f\ufeff\u202a-\u202e\u200c]/g, "").trim();
}

// Check runtime execution context
const isServer = typeof window === "undefined";

// Select matching credential sets based on runtime architecture
const supabaseUrl = cleanCredentials(
  isServer
    ? (process.env.SUPABASE_URL || "")
    : (((import.meta as any).env.VITE_SUPABASE_URL as string) || "")
);

const supabaseKey = cleanCredentials(
  isServer
    ? (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "")
    : (((import.meta as any).env.VITE_SUPABASE_ANON_KEY as string) || "")
);

// Verify validity of target URL
const isValidUrl = /^https?:\/\//i.test(supabaseUrl) && !supabaseUrl.includes("your-project.supabase.co");

export const isSupabaseConfigured = Boolean(
  isValidUrl &&
  supabaseKey &&
  !supabaseKey.includes("your-supabase-service-role-key") &&
  !supabaseKey.includes("your-supabase-anon-key")
);

/**
 * Supabase client instance.
 * Server uses the Service Role Key to bypass RLS, ensuring high performance.
 * Client uses Anon Key to restrict direct operations.
 */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  : null;

if (isServer) {
  if (!isSupabaseConfigured) {
    console.log("ℹ️ Info: Supabase is unconfigured or using placeholder parameters. The application remains fully responsive using high-performance local JSON-based registry fallback.");
  } else {
    console.log("✅ Supabase Client initialized successfully in server context.");
  }
}
