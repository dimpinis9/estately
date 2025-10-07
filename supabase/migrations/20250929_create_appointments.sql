-- Appointments for calendar integration
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  lead_id uuid references leads(id) on delete set null,
  property_id uuid references properties(id) on delete set null,
  title text not null,
  description text,
  start_at timestamptz not null,
  end_at timestamptz not null,
  location text,
  google_event_id text,
  created_at timestamptz default now()
);

create index if not exists idx_appointments_lead on appointments(lead_id);
create index if not exists idx_appointments_property on appointments(property_id);
create index if not exists idx_appointments_user on appointments(user_id);
create index if not exists idx_appointments_start_at on appointments(start_at);

-- Enable RLS
alter table appointments enable row level security;

-- Create RLS policies
create policy "Allow all operations on appointments" on appointments
  for all using (true);

-- Insert sample appointment data
insert into appointments (title, description, start_at, end_at, location) values
('Property Viewing', 'Showing downtown apartment to potential client', '2025-10-08 10:00:00+00', '2025-10-08 11:00:00+00', '123 Downtown Ave'),
('Client Meeting', 'Initial consultation with new lead', '2025-10-08 14:00:00+00', '2025-10-08 15:00:00+00', 'Office Conference Room'),
('Property Inspection', 'Final walkthrough before closing', '2025-10-09 09:00:00+00', '2025-10-09 10:30:00+00', '456 Suburban Dr'),
('Follow-up Call', 'Check in with interested buyer', '2025-10-10 11:00:00+00', '2025-10-10 11:30:00+00', 'Phone Call'),
('Open House', 'Weekend showing for luxury property', '2025-10-12 13:00:00+00', '2025-10-12 16:00:00+00', '789 Luxury Lane'),
('Mortgage Meeting', 'Help client with loan application', '2025-10-11 15:30:00+00', '2025-10-11 16:30:00+00', 'Bank Office'),
('Site Visit', 'Evaluate new listing potential', '2025-10-14 08:00:00+00', '2025-10-14 09:00:00+00', '321 Prospect St'),
('Contract Signing', 'Finalize purchase agreement', '2025-10-15 16:00:00+00', '2025-10-15 17:00:00+00', 'Law Office');
