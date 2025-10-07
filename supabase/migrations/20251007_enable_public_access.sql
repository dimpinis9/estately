-- Enable Row Level Security and create policies for public access
-- This is for development purposes - in production you'd want proper user-based policies

-- Leads table policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read leads (for development)
CREATE POLICY "Allow public read access on leads" ON leads
    FOR SELECT TO public
    USING (true);

-- Allow anyone to insert leads (for development)
CREATE POLICY "Allow public insert on leads" ON leads
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow anyone to update leads (for development)
CREATE POLICY "Allow public update on leads" ON leads
    FOR UPDATE TO public
    USING (true)
    WITH CHECK (true);

-- Properties table policies
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read properties (for development)
CREATE POLICY "Allow public read access on properties" ON properties
    FOR SELECT TO public
    USING (true);

-- Allow anyone to insert properties (for development)
CREATE POLICY "Allow public insert on properties" ON properties
    FOR INSERT TO public
    WITH CHECK (true);

-- Allow anyone to update properties (for development)
CREATE POLICY "Allow public update on properties" ON properties
    FOR UPDATE TO public
    USING (true)
    WITH CHECK (true);

-- Appointments table policies
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read appointments (for development)
CREATE POLICY "Allow public read access on appointments" ON appointments
    FOR SELECT TO public
    USING (true);

-- Allow anyone to insert appointments (for development)
CREATE POLICY "Allow public insert on appointments" ON appointments
    FOR INSERT TO public
    WITH CHECK (true);

-- Activity log table policies
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read activity log (for development)
CREATE POLICY "Allow public read access on activity_log" ON activity_log
    FOR SELECT TO public
    USING (true);

-- Allow anyone to insert activity log (for development)
CREATE POLICY "Allow public insert on activity_log" ON activity_log
    FOR INSERT TO public
    WITH CHECK (true);

-- Analytics tables policies
-- Lead conversions
ALTER TABLE lead_conversions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on lead_conversions" ON lead_conversions
    FOR SELECT TO public
    USING (true);

-- Property metrics
ALTER TABLE property_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on property_metrics" ON property_metrics
    FOR SELECT TO public
    USING (true);

-- KPI snapshots
ALTER TABLE kpi_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on kpi_snapshots" ON kpi_snapshots
    FOR SELECT TO public
    USING (true);
CREATE POLICY "Allow public insert on kpi_snapshots" ON kpi_snapshots
    FOR INSERT TO public
    WITH CHECK (true);

-- Goals table
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on goals" ON goals
    FOR SELECT TO public
    USING (true);
CREATE POLICY "Allow public insert on goals" ON goals
    FOR INSERT TO public
    WITH CHECK (true);
CREATE POLICY "Allow public update on goals" ON goals
    FOR UPDATE TO public
    USING (true)
    WITH CHECK (true);

-- Email campaigns
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on email_campaigns" ON email_campaigns
    FOR SELECT TO public
    USING (true);
CREATE POLICY "Allow public insert on email_campaigns" ON email_campaigns
    FOR INSERT TO public
    WITH CHECK (true);