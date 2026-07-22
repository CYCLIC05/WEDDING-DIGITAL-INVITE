-- ============================================================================
-- DELETE ALL RSVPs - Run this in Supabase SQL Editor
-- ============================================================================
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor
-- Paste this query and click "Run"
-- ============================================================================

-- Delete all registrations from the rsvps table
DELETE FROM public.rsvps;

-- Optional: Reset the table sequence (if using serial IDs)
-- ALTER SEQUENCE rsvps_id_seq RESTART WITH 1;

-- Verify deletion
SELECT COUNT(*) as remaining_registrations FROM public.rsvps;

-- ============================================================================
-- FIX RLS POLICY - Allow service role to read data
-- ============================================================================
-- This fixes the issue where admin can't see registrations

-- Drop the restrictive policy
DROP POLICY IF EXISTS "Restrict read operations to authenticated service role" ON public.rsvps;

-- Create a new policy that allows service role to read
CREATE POLICY "Allow service role to read RSVPs"
ON public.rsvps
FOR SELECT
USING (true);

-- ============================================================================
-- END OF SCRIPT
-- ============================================================================
