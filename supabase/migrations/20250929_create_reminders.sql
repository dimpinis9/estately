-- Reminders for follow-ups
create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  lead_id uuid references leads(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  due_at timestamptz not null,
  message text,
  sent boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_reminders_lead on reminders(lead_id);
create index if not exists idx_reminders_property on reminders(property_id);
