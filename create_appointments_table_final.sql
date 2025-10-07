-- Create appointments table for calendar functionality
-- Run this in your Supabase SQL Editor

-- Create the table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  lead_id uuid REFERENCES leads(id) ON DELETE SET NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  start_at timestamptz NOT NULL,
  end_at timestamptz NOT NULL,
  location text,
  google_event_id text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_lead ON appointments(lead_id);
CREATE INDEX IF NOT EXISTS idx_appointments_property ON appointments(property_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_start_at ON appointments(start_at);

-- Enable Row Level Security
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies to allow all operations (since we disabled RLS for development)
CREATE POLICY "Allow all operations on appointments" ON appointments
  FOR ALL USING (true);

-- Insert sample appointment data
INSERT INTO appointments (title, description, start_at, end_at, location) VALUES
('Property Viewing', 'Showing downtown apartment to potential client', '2025-10-08 10:00:00+00', '2025-10-08 11:00:00+00', '123 Downtown Ave'),
('Client Meeting', 'Initial consultation with new lead', '2025-10-08 14:00:00+00', '2025-10-08 15:00:00+00', 'Office Conference Room'),
('Property Inspection', 'Final walkthrough before closing', '2025-10-09 09:00:00+00', '2025-10-09 10:30:00+00', '456 Suburban Dr'),
('Follow-up Call', 'Check in with interested buyer', '2025-10-10 11:00:00+00', '2025-10-10 11:30:00+00', 'Phone Call'),
('Open House', 'Weekend showing for luxury property', '2025-10-12 13:00:00+00', '2025-10-12 16:00:00+00', '789 Luxury Lane'),
('Mortgage Meeting', 'Help client with loan application', '2025-10-11 15:30:00+00', '2025-10-11 16:30:00+00', 'Bank Office'),
('Site Visit', 'Evaluate new listing potential', '2025-10-14 08:00:00+00', '2025-10-14 09:00:00+00', '321 Prospect St'),
('Contract Signing', 'Finalize purchase agreement', '2025-10-15 16:00:00+00', '2025-10-15 17:00:00+00', 'Law Office');

-- Verify the table was created and data was inserted
SELECT COUNT(*) as appointment_count FROM appointments;
SELECT title, start_at, location FROM appointments ORDER BY start_at LIMIT 5;