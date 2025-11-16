-- Migration: Add ingredients column to recipes table
-- Run this in Supabase SQL Editor

-- Add ingredients column (JSONB array of {name, quantity} objects)
ALTER TABLE recipes
ADD COLUMN IF NOT EXISTS ingredients JSONB DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN recipes.ingredients IS 'Array of ingredient objects with name and quantity fields';

-- Example data structure:
-- [
--   {"name": "Flour", "quantity": "2 cups"},
--   {"name": "Sugar", "quantity": "1 cup"},
--   {"name": "Eggs", "quantity": "3 large"}
-- ]
