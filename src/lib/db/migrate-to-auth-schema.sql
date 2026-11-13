-- Migrate auth tables from public to auth schema
-- Run this BEFORE drizzle-kit push

CREATE SCHEMA IF NOT EXISTS auth;

-- Move tables to auth schema
ALTER TABLE IF EXISTS public.users SET SCHEMA auth;
ALTER TABLE IF EXISTS public.sessions SET SCHEMA auth;
ALTER TABLE IF EXISTS public.accounts SET SCHEMA auth;
ALTER TABLE IF EXISTS public.verifications SET SCHEMA auth;

-- Move sequences to auth schema (if any)
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT sequence_name
    FROM information_schema.sequences
    WHERE sequence_schema = 'public'
      AND sequence_name LIKE '%users%' OR sequence_name LIKE '%sessions%'
      OR sequence_name LIKE '%accounts%' OR sequence_name LIKE '%verifications%'
  LOOP
    EXECUTE 'ALTER SEQUENCE IF EXISTS public.' || quote_ident(r.sequence_name) || ' SET SCHEMA auth';
  END LOOP;
END $$;

-- Verify
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_name IN ('users', 'sessions', 'accounts', 'verifications')
  AND table_schema IN ('public', 'auth')
ORDER BY table_schema, table_name;
