/*
  # Create projects table

  ## Description
  Creates a table to store portfolio projects with title, description, and tags.
  This table will store projects displayed on the portfolio website.

  ## Tables Created
  1. `projects`
    - `id` (bigserial, primary key) - Auto-incrementing unique identifier
    - `title` (text, not null) - Project title
    - `description` (text, not null) - Project description
    - `tags` (text[], not null, default '{}') - Array of technology tags
    - `created_at` (timestamptz, default now()) - Timestamp when project was created

  ## Security
  - Enable Row Level Security (RLS) on projects table
  - Add policy to allow anyone to read projects (public portfolio)
  - Add policy to allow anyone to insert projects (demo purposes)

  ## Notes
  - The table uses RLS with permissive policies for demonstration
  - Tags are stored as a PostgreSQL array for efficient querying
  - Default empty array for tags ensures consistent data structure
*/

CREATE TABLE IF NOT EXISTS projects (
  id bigserial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert projects"
  ON projects
  FOR INSERT
  WITH CHECK (true);
