import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Ensure environment variables are loaded prior to examining them
dotenv.config();

/**
 * Clean credentials of hidden non-printable/zero-width formatting characters (like ZWNJ, BOM, etc.)
 */
export function cleanCredentials(val: string): string {
  if (!val) return "";
  return val.replace(/[\u200b-\u200d\u200e\u200f\ufeff\u202a-\u202e\u200c]/g, "").trim();
}

// Retrieve environment variables and trim whitespace
const supabaseUrl = cleanCredentials(process.env.SUPABASE_URL || '');
// In the backend, we prefer the Service Role Key to bypass Row-Level Security (RLS) safely.
// In the client, the Anon Key is typically used.
const supabaseKey = cleanCredentials(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '');

// Ensure the URL is valid HTTP/HTTPS and not the default example placeholder
const isValidUrl = /^https?:\/\//i.test(supabaseUrl) && !supabaseUrl.includes('your-project.supabase.co');

export const isSupabaseConfigured = Boolean(
  isValidUrl && 
  supabaseKey &&
  !supabaseKey.includes('your-supabase-service-role-key') &&
  !supabaseKey.includes('your-supabase-anon-key')
);

/**
 * Supabase client instance.
 * Automatically initialized if valid credentials are provided in the environment.
 */
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  : null;

if (!isSupabaseConfigured) {
  console.log('⚠️ Supabase credentials not fully configured or invalid. Server will run on local JSON file fallback.');
} else {
  console.log('✅ Supabase Client initialized successfully.');
}
