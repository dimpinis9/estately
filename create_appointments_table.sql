-- Create appointments table if it doesn't exist
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_appointments_lead ON appointments(lead_id);
CREATE INDEX IF NOT EXISTS idx_appointments_property ON appointments(property_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_start_at ON appointments(start_at);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view all appointments" ON appointments FOR SELECT USING (true);
CREATE POLICY "Users can insert appointments" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update appointments" ON appointments FOR UPDATE USING (true);
CREATE POLICY "Users can delete appointments" ON appointments FOR DELETE USING (true);

-- Insert some sample appointments
INSERT INTO appointments (title, description, start_at, end_at, location) VALUES
('Property Viewing', 'Showing downtown apartment to potential client', '2025-10-08 10:00:00+00', '2025-10-08 11:00:00+00', '123 Downtown Ave'),
('Client Meeting', 'Initial consultation with new lead', '2025-10-08 14:00:00+00', '2025-10-08 15:00:00+00', 'Office Conference Room'),
('Property Inspection', 'Final walkthrough before closing', '2025-10-09 09:00:00+00', '2025-10-09 10:30:00+00', '456 Suburban Dr'),
('Follow-up Call', 'Check in with interested buyer', '2025-10-10 11:00:00+00', '2025-10-10 11:30:00+00', 'Phone Call'),
('Open House', 'Weekend showing for luxury property', '2025-10-12 13:00:00+00', '2025-10-12 16:00:00+00', '789 Luxury Lane');