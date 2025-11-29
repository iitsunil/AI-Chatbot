-- Migration script to fix duplicate constraint issue
-- Run this if you get "constraint already exists" error

-- Drop the constraint if it exists (in case table was partially created)
ALTER TABLE IF EXISTS messages DROP CONSTRAINT IF EXISTS messages_role_check;

-- Now the main schema can be run safely
-- The constraint is defined inline in the CREATE TABLE statement

