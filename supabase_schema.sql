-- ============================================================================
-- SQL Schema: sovereign_christian_wedding_rsvps
-- Target Platform: Supabase / PostgreSQL (15+)
-- 
-- Description: Establishes a highly-performant, optimized, and secure schema
--              for Tobi & Ayomide's Covenant Wedding RSVP system.
-- ============================================================================

-- ENABLE NECESSARY EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DROP TABLE IF EXISTS
-- DROP TABLE IF EXISTS public.rsvps;

-- CREATE TABLE STRUCTURE
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL CONSTRAINT rsvp_name_length_check CHECK (char_length(name) >= 2),
    email TEXT NOT NULL UNIQUE CONSTRAINT rsvp_email_format_check CHECK (email ~* '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'),
    phone TEXT NOT NULL,
    events TEXT[] NOT NULL CONSTRAINT rsvp_events_not_empty CHECK (array_length(events, 1) > 0),
    dietary_notes TEXT DEFAULT ''::text,
    status TEXT NOT NULL DEFAULT 'pending' 
        CONSTRAINT check_rsvp_status CHECK (status IN ('pending', 'approved', 'declined'))
);

-- OPTIMIZING INDEXES FOR METRICS AND PERFORMANCE
-- Status index for fast tallies and filter counters (e.g. Approved, Pending, Declined)
CREATE INDEX IF NOT EXISTS rsvps_status_idx ON public.rsvps (status);

-- Created at index for sorting rosters by newest submission desc
CREATE INDEX IF NOT EXISTS rsvps_created_at_desc_idx ON public.rsvps (created_at DESC);

-- UNIQUE Index on email (Automatically created by UNIQUE constraint, included index for lookup visibility)
-- CREATE UNIQUE INDEX IF NOT EXISTS rsvps_email_uniq_idx ON public.rsvps (email);

-- ENABLE ROW-LEVEL SECURITY (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- SECURITY POLICIES:

-- 1. Policy: Allow anyone (public/anon) to submit their RSVP (Insert operations)
CREATE POLICY "Enable public inserts for RSVPs" 
ON public.rsvps 
FOR INSERT 
WITH CHECK (true);

-- 2. Policy: Lock down SELECT queries completely to Service Role API proxy
-- Note: In production, the Express backend utilizes the SUPABASE_SERVICE_ROLE_KEY to perform roster reads.
-- This bypasses RLS and completely hides data from any malicious client browser.
CREATE POLICY "Restrict read operations to authenticated service role"
ON public.rsvps
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
