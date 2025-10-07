-- Analytics and tracking tables for real estate CRM

-- Activity log for tracking all user actions
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL, -- 'lead_created', 'property_viewed', 'appointment_scheduled', etc.
  entity_type VARCHAR(50) NOT NULL, -- 'lead', 'property', 'appointment', etc.
  entity_id UUID,
  details JSONB, -- Additional details about the action
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead conversion tracking
CREATE TABLE IF NOT EXISTS lead_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  from_status VARCHAR(50) NOT NULL,
  to_status VARCHAR(50) NOT NULL,
  conversion_date TIMESTAMPTZ DEFAULT NOW(),
  days_in_previous_status INTEGER,
  notes TEXT,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL
);

-- Property performance metrics
CREATE TABLE IF NOT EXISTS property_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  metric_date DATE DEFAULT CURRENT_DATE,
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  appointments_count INTEGER DEFAULT 0,
  favorites_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- KPI snapshots for historical tracking
CREATE TABLE IF NOT EXISTS kpi_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  snapshot_date DATE DEFAULT CURRENT_DATE,
  total_leads INTEGER DEFAULT 0,
  active_leads INTEGER DEFAULT 0,
  converted_leads INTEGER DEFAULT 0,
  total_properties INTEGER DEFAULT 0,
  active_properties INTEGER DEFAULT 0,
  sold_properties INTEGER DEFAULT 0,
  total_appointments INTEGER DEFAULT 0,
  completed_appointments INTEGER DEFAULT 0,
  revenue_mtd DECIMAL(12,2) DEFAULT 0,
  revenue_ytd DECIMAL(12,2) DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  avg_deal_size DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email campaign tracking
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  content TEXT,
  target_type VARCHAR(50), -- 'all_leads', 'active_leads', 'custom_list'
  target_criteria JSONB,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'scheduled', 'sent', 'cancelled'
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  recipients_count INTEGER DEFAULT 0,
  opens_count INTEGER DEFAULT 0,
  clicks_count INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  unsubscribes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email campaign recipients
CREATE TABLE IF NOT EXISTS email_campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES email_campaigns(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced'
  sent_at TIMESTAMPTZ,
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  bounce_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goals and targets
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  goal_type VARCHAR(50) NOT NULL, -- 'leads_monthly', 'revenue_monthly', 'appointments_weekly', etc.
  target_value DECIMAL(12,2) NOT NULL,
  current_value DECIMAL(12,2) DEFAULT 0,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'paused'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_action_type ON activity_log(action_type);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON activity_log(entity_type, entity_id);

CREATE INDEX IF NOT EXISTS idx_lead_conversions_lead_id ON lead_conversions(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_conversions_date ON lead_conversions(conversion_date);

CREATE INDEX IF NOT EXISTS idx_property_metrics_property_id ON property_metrics(property_id);
CREATE INDEX IF NOT EXISTS idx_property_metrics_date ON property_metrics(metric_date);

CREATE INDEX IF NOT EXISTS idx_kpi_snapshots_user_id ON kpi_snapshots(user_id);
CREATE INDEX IF NOT EXISTS idx_kpi_snapshots_date ON kpi_snapshots(snapshot_date);

CREATE INDEX IF NOT EXISTS idx_email_campaigns_user_id ON email_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);

CREATE INDEX IF NOT EXISTS idx_email_campaign_recipients_campaign_id ON email_campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_campaign_recipients_lead_id ON email_campaign_recipients(lead_id);

CREATE INDEX IF NOT EXISTS idx_goals_user_id ON goals(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_period ON goals(period_start, period_end);

-- Function to update property metrics
CREATE OR REPLACE FUNCTION update_property_metrics()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'activity_log' AND NEW.entity_type = 'property' THEN
    INSERT INTO property_metrics (property_id, metric_date, views_count)
    VALUES (NEW.entity_id::UUID, CURRENT_DATE, 1)
    ON CONFLICT (property_id, metric_date) 
    DO UPDATE SET 
      views_count = property_metrics.views_count + 1,
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for property metrics
CREATE TRIGGER trigger_update_property_metrics
  AFTER INSERT ON activity_log
  FOR EACH ROW
  EXECUTE FUNCTION update_property_metrics();

-- Function to track lead conversions
CREATE OR REPLACE FUNCTION track_lead_conversion()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO lead_conversions (lead_id, from_status, to_status, user_id)
    VALUES (NEW.id, OLD.status, NEW.status, NEW.assigned_to);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for lead conversion tracking
CREATE TRIGGER trigger_track_lead_conversion
  AFTER UPDATE ON leads
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION track_lead_conversion();