-- Activity log for leads/properties
create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  lead_id uuid references leads(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  type text not null, -- e.g. 'status_change', 'note', 'call', 'email', 'reminder', 'appointment'
  message text,
  meta jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_activity_log_lead on activity_log(lead_id);
create index if not exists idx_activity_log_property on activity_log(property_id);
