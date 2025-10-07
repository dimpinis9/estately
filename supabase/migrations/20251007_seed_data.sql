-- Comprehensive seed data for Estately CRM
-- This script populates the database with realistic sample data

-- First, let's create some test profiles if they don't exist
INSERT INTO profiles (id, email, full_name, phone, role, avatar_url, created_at, updated_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'agent1@estately.com', 'John Smith', '+1-555-0101', 'agent', NULL, NOW() - INTERVAL '30 days', NOW()),
  ('22222222-2222-2222-2222-222222222222', 'agent2@estately.com', 'Sarah Johnson', '+1-555-0102', 'agent', NULL, NOW() - INTERVAL '25 days', NOW()),
  ('33333333-3333-3333-3333-333333333333', 'manager@estately.com', 'Mike Davis', '+1-555-0103', 'manager', NULL, NOW() - INTERVAL '20 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample leads with realistic data
INSERT INTO leads (id, name, email, phone, status, source, notes, user_id, created_at, updated_at)
VALUES 
  -- Recent leads (last 7 days)
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Emma Wilson', 'emma.wilson@email.com', '+1-555-1001', 'new', 'website', 'Interested in downtown condos', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', NOW()),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'David Brown', 'david.brown@email.com', '+1-555-1002', 'contacted', 'referral', 'Looking for family home, 3+ bedrooms', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', NOW()),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Lisa Chen', 'lisa.chen@email.com', '+1-555-1003', 'qualified', 'social_media', 'First time buyer, budget 400-500k', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '3 days', NOW()),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Robert Taylor', 'robert.taylor@email.com', '+1-555-1004', 'viewing', 'direct', 'Investor looking for rental properties', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '4 days', NOW()),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Maria Garcia', 'maria.garcia@email.com', '+1-555-1005', 'negotiating', 'advertising', 'Selling current home, needs new one', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '5 days', NOW()),
  
  -- Older leads (this month)
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'James Anderson', 'james.anderson@email.com', '+1-555-1006', 'converted', 'website', 'Purchased luxury condo downtown', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '15 days', NOW() - INTERVAL '2 days'),
  ('gggggggg-gggg-gggg-gggg-gggggggggggg', 'Jennifer Martinez', 'jennifer.martinez@email.com', '+1-555-1007', 'lost', 'referral', 'Decided to rent instead of buy', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '20 days', NOW() - INTERVAL '5 days'),
  ('hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh', 'Michael Lee', 'michael.lee@email.com', '+1-555-1008', 'qualified', 'social_media', 'Looking for investment property', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '12 days', NOW()),
  ('iiiiiiii-iiii-iiii-iiii-iiiiiiiiiiii', 'Amanda White', 'amanda.white@email.com', '+1-555-1009', 'viewing', 'direct', 'Relocating from another state', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '8 days', NOW()),
  ('jjjjjjjj-jjjj-jjjj-jjjj-jjjjjjjjjjjj', 'Christopher Moore', 'chris.moore@email.com', '+1-555-1010', 'contacted', 'advertising', 'Young professional, first home', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '6 days', NOW()),
  
  -- Last month leads
  ('kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'Jessica Thompson', 'jessica.thompson@email.com', '+1-555-1011', 'converted', 'website', 'Bought family home in suburbs', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '45 days', NOW() - INTERVAL '30 days'),
  ('llllllll-llll-llll-llll-llllllllllll', 'Daniel Rodriguez', 'daniel.rodriguez@email.com', '+1-555-1012', 'lost', 'referral', 'Budget constraints', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '50 days', NOW() - INTERVAL '35 days'),
  ('mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'Ashley Davis', 'ashley.davis@email.com', '+1-555-1013', 'converted', 'social_media', 'Starter home purchase', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '40 days', NOW() - INTERVAL '25 days'),
  ('nnnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnnnn', 'Kevin Wilson', 'kevin.wilson@email.com', '+1-555-1014', 'qualified', 'direct', 'Luxury home buyer', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '35 days', NOW()),
  ('oooooooo-oooo-oooo-oooo-oooooooooooo', 'Rachel Johnson', 'rachel.johnson@email.com', '+1-555-1015', 'viewing', 'advertising', 'Downsizing retirement home', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '30 days', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample properties
INSERT INTO properties (id, title, description, price, address, city, state, zip_code, bedrooms, bathrooms, square_feet, property_type, status, user_id, created_at, updated_at)
VALUES 
  -- Active listings
  ('pppppppp-pppp-pppp-pppp-pppppppppppp', 'Modern Downtown Condo', 'Stunning 2-bedroom condo with city views, granite countertops, and premium finishes. Walking distance to restaurants and shopping.', 450000, '123 Main St #15B', 'Downtown', 'CA', '90210', 2, 2, 1200, 'condo', 'active', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '20 days', NOW()),
  ('qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', 'Charming Family Home', 'Beautiful 4-bedroom colonial in quiet neighborhood. Large backyard, updated kitchen, and excellent schools nearby.', 625000, '456 Oak Avenue', 'Suburbs', 'CA', '90211', 4, 3, 2400, 'house', 'active', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '15 days', NOW()),
  ('rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', 'Luxury Waterfront Estate', 'Magnificent 5-bedroom estate with private dock, infinity pool, and panoramic water views. Ultimate luxury living.', 1250000, '789 Waterfront Drive', 'Waterfront', 'CA', '90212', 5, 4, 3800, 'house', 'active', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '25 days', NOW()),
  ('ssssssss-ssss-ssss-ssss-ssssssssssss', 'Cozy Starter Home', 'Perfect first home with 3 bedrooms, updated appliances, and move-in ready condition. Great investment opportunity.', 325000, '321 Pine Street', 'Midtown', 'CA', '90213', 3, 2, 1600, 'house', 'active', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '10 days', NOW()),
  ('tttttttt-tttt-tttt-tttt-tttttttttttt', 'Investment Duplex', 'Excellent rental property with two 2-bedroom units. Currently occupied with stable tenants. Great cash flow.', 525000, '654 Elm Court', 'Investment District', 'CA', '90214', 4, 4, 2000, 'duplex', 'active', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '5 days', NOW()),
  
  -- Recently sold properties
  ('uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu', 'Sold Downtown Loft', 'Modern loft with exposed brick and high ceilings. Recently renovated with top-of-the-line amenities.', 375000, '987 Loft Lane #3A', 'Downtown', 'CA', '90210', 1, 1, 900, 'condo', 'sold', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '60 days', NOW() - INTERVAL '5 days'),
  ('vvvvvvvv-vvvv-vvvv-vvvv-vvvvvvvvvvvv', 'Sold Suburban Ranch', 'Single-story ranch with large lot and mature landscaping. Perfect for families with children.', 485000, '147 Ranch Road', 'Suburbs', 'CA', '90211', 3, 2, 1800, 'house', 'sold', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '45 days', NOW() - INTERVAL '10 days'),
  ('wwwwwwww-wwww-wwww-wwww-wwwwwwwwwwww', 'Sold Townhouse', 'Modern 3-story townhouse with garage and private patio. Great for urban professionals.', 395000, '258 Urban Way #12', 'Midtown', 'CA', '90213', 3, 2.5, 1500, 'townhouse', 'sold', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '30 days', NOW() - INTERVAL '15 days')
ON CONFLICT (id) DO NOTHING;

-- Insert sample appointments
INSERT INTO appointments (id, user_id, lead_id, property_id, title, description, start_at, end_at, location, created_at)
VALUES 
  -- This week appointments
  ('aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pppppppp-pppp-pppp-pppp-pppppppppppp', 'Property Showing - Downtown Condo', 'Show Emma Wilson the downtown condo unit', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '1 hour', '123 Main St #15B', NOW()),
  ('bbbbbbbb-1111-1111-1111-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', 'Family Home Tour', 'Tour of the Oak Avenue family home with Lisa Chen', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '1.5 hours', '456 Oak Avenue', NOW()),
  ('cccccccc-1111-1111-1111-cccccccccccc', '11111111-1111-1111-1111-111111111111', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'tttttttt-tttt-tttt-tttt-tttttttttttt', 'Investment Property Meeting', 'Discuss investment duplex with Robert Taylor', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days' + INTERVAL '1 hour', '654 Elm Court', NOW()),
  ('dddddddd-1111-1111-1111-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', NULL, 'Consultation Call', 'Initial consultation with Maria Garcia about selling process', NOW() + INTERVAL '4 days', NOW() + INTERVAL '4 days' + INTERVAL '30 minutes', 'Phone Call', NOW()),
  
  -- Past appointments
  ('eeeeeeee-1111-1111-1111-eeeeeeeeeeee', '11111111-1111-1111-1111-111111111111', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu', 'Successful Closing', 'Final walkthrough and closing for James Anderson', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '2 hours', '987 Loft Lane #3A', NOW() - INTERVAL '10 days'),
  ('ffffffff-1111-1111-1111-ffffffffffff', '22222222-2222-2222-2222-222222222222', 'kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'vvvvvvvv-vvvv-vvvv-vvvv-vvvvvvvvvvvv', 'Home Purchase Meeting', 'Final negotiation with Jessica Thompson', NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days' + INTERVAL '1 hour', '147 Ranch Road', NOW() - INTERVAL '30 days'),
  ('gggggggg-1111-1111-1111-gggggggggggg', '11111111-1111-1111-1111-111111111111', 'mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'wwwwwwww-wwww-wwww-wwww-wwwwwwwwwwww', 'Townhouse Showing', 'Property tour with Ashley Davis', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days' + INTERVAL '1 hour', '258 Urban Way #12', NOW() - INTERVAL '25 days')
ON CONFLICT (id) DO NOTHING;

-- Insert lead conversion tracking
INSERT INTO lead_conversions (id, lead_id, from_status, to_status, conversion_date, days_in_previous_status, user_id)
VALUES 
  ('conv1111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'new', 'contacted', NOW() - INTERVAL '12 hours', 0, '11111111-1111-1111-1111-111111111111'),
  ('conv2222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'new', 'contacted', NOW() - INTERVAL '1 day', 1, '11111111-1111-1111-1111-111111111111'),
  ('conv3333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'contacted', 'qualified', NOW() - INTERVAL '1 day', 1, '22222222-2222-2222-2222-222222222222'),
  ('conv4444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'qualified', 'viewing', NOW() - INTERVAL '1 day', 2, '22222222-2222-2222-2222-222222222222'),
  ('conv5555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'viewing', 'negotiating', NOW() - INTERVAL '1 day', 3, '11111111-1111-1111-1111-111111111111'),
  ('conv6666-6666-6666-6666-666666666666', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'negotiating', 'converted', NOW() - INTERVAL '3 days', 5, '11111111-1111-1111-1111-111111111111'),
  ('conv7777-7777-7777-7777-777777777777', 'kkkkkkkk-kkkk-kkkk-kkkk-kkkkkkkkkkkk', 'viewing', 'converted', NOW() - INTERVAL '30 days', 7, '11111111-1111-1111-1111-111111111111'),
  ('conv8888-8888-8888-8888-888888888888', 'mmmmmmmm-mmmm-mmmm-mmmm-mmmmmmmmmmmm', 'qualified', 'converted', NOW() - INTERVAL '25 days', 10, '11111111-1111-1111-1111-111111111111')
ON CONFLICT (id) DO NOTHING;

-- Insert property metrics
INSERT INTO property_metrics (id, property_id, metric_date, views_count, inquiries_count, appointments_count, favorites_count)
VALUES 
  -- This month metrics
  ('pm111111-1111-1111-1111-111111111111', 'pppppppp-pppp-pppp-pppp-pppppppppppp', CURRENT_DATE, 45, 8, 3, 12),
  ('pm222222-2222-2222-2222-222222222222', 'qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', CURRENT_DATE, 62, 15, 5, 18),
  ('pm333333-3333-3333-3333-333333333333', 'rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', CURRENT_DATE, 38, 6, 2, 9),
  ('pm444444-4444-4444-4444-444444444444', 'ssssssss-ssss-ssss-ssss-ssssssssssss', CURRENT_DATE, 72, 18, 7, 24),
  ('pm555555-5555-5555-5555-555555555555', 'tttttttt-tttt-tttt-tttt-tttttttttttt', CURRENT_DATE, 34, 9, 4, 11),
  
  -- Previous days
  ('pm666666-6666-6666-6666-666666666666', 'pppppppp-pppp-pppp-pppp-pppppppppppp', CURRENT_DATE - 1, 42, 7, 2, 11),
  ('pm777777-7777-7777-7777-777777777777', 'qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', CURRENT_DATE - 1, 58, 12, 4, 16),
  ('pm888888-8888-8888-8888-888888888888', 'rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', CURRENT_DATE - 2, 35, 5, 1, 8),
  ('pm999999-9999-9999-9999-999999999999', 'ssssssss-ssss-ssss-ssss-ssssssssssss', CURRENT_DATE - 3, 68, 16, 6, 22)
ON CONFLICT (id) DO NOTHING;

-- Insert activity logs
INSERT INTO activity_log (id, user_id, action_type, entity_type, entity_id, details, created_at)
VALUES 
  -- Recent activities (today)
  ('act11111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'create', 'lead', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '{"name": "Emma Wilson", "source": "website"}', NOW() - INTERVAL '2 hours'),
  ('act22222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'view', 'property', 'qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', '{"title": "Charming Family Home", "viewer": "Lisa Chen"}', NOW() - INTERVAL '1 hour'),
  ('act33333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'call', 'lead', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '{"name": "David Brown", "duration": "15 minutes", "notes": "Discussed property requirements"}', NOW() - INTERVAL '30 minutes'),
  ('act44444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'appointment_scheduled', 'appointment', 'bbbbbbbb-1111-1111-1111-bbbbbbbbbbbb', '{"lead_name": "Lisa Chen", "property": "Family Home Tour"}', NOW() - INTERVAL '15 minutes'),
  
  -- Yesterday
  ('act55555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'email', 'lead', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '{"name": "Lisa Chen", "subject": "Property Information Package"}', NOW() - INTERVAL '1 day'),
  ('act66666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', 'update', 'property', 'pppppppp-pppp-pppp-pppp-pppppppppppp', '{"title": "Modern Downtown Condo", "field": "price", "old_value": "465000", "new_value": "450000"}', NOW() - INTERVAL '1 day'),
  ('act77777-7777-7777-7777-777777777777', '11111111-1111-1111-1111-111111111111', 'lead_status_change', 'lead', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '{"name": "Robert Taylor", "from_status": "qualified", "to_status": "viewing"}', NOW() - INTERVAL '1 day'),
  
  -- Last week
  ('act88888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'appointment_completed', 'appointment', 'eeeeeeee-1111-1111-1111-eeeeeeeeeeee', '{"lead_name": "James Anderson", "property": "Downtown Loft", "outcome": "successful_closing"}', NOW() - INTERVAL '2 days'),
  ('act99999-9999-9999-9999-999999999999', '22222222-2222-2222-2222-222222222222', 'property_status_change', 'property', 'uuuuuuuu-uuuu-uuuu-uuuu-uuuuuuuuuuuu', '{"title": "Downtown Loft", "from_status": "active", "to_status": "sold"}', NOW() - INTERVAL '5 days'),
  ('act10101-1010-1010-1010-101010101010', '11111111-1111-1111-1111-111111111111', 'create', 'property', 'tttttttt-tttt-tttt-tttt-tttttttttttt', '{"title": "Investment Duplex", "price": 525000}', NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

-- Insert KPI snapshots for the last 30 days
INSERT INTO kpi_snapshots (id, user_id, snapshot_date, total_leads, active_leads, converted_leads, total_properties, active_properties, sold_properties, total_appointments, completed_appointments, revenue_mtd, revenue_ytd, conversion_rate, avg_deal_size)
VALUES 
  ('kpi11111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', CURRENT_DATE, 8, 6, 2, 4, 3, 1, 5, 2, 85000, 425000, 25.0, 212500),
  ('kpi22222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', CURRENT_DATE, 7, 5, 2, 3, 2, 1, 4, 1, 78000, 385000, 28.6, 192500),
  ('kpi33333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', CURRENT_DATE - 1, 7, 5, 2, 4, 3, 1, 4, 2, 85000, 340000, 28.6, 170000),
  ('kpi44444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', CURRENT_DATE - 1, 6, 4, 2, 3, 2, 1, 3, 1, 78000, 307000, 33.3, 153500),
  ('kpi55555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', CURRENT_DATE - 7, 5, 3, 2, 3, 3, 0, 3, 1, 42500, 297500, 40.0, 148750),
  ('kpi66666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', CURRENT_DATE - 7, 4, 2, 2, 2, 2, 0, 2, 1, 39000, 268000, 50.0, 134000)
ON CONFLICT (id) DO NOTHING;

-- Insert goals for agents
INSERT INTO goals (id, user_id, goal_type, target_value, current_value, period_start, period_end, status)
VALUES 
  ('goal1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'leads', 20, 8, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 'active'),
  ('goal2222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'revenue', 150000, 85000, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 'active'),
  ('goal3333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'leads', 15, 7, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 'active'),
  ('goal4444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'properties', 5, 3, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 'active'),
  ('goal5555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'appointments', 12, 5, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 'active'),
  ('goal6666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', 'conversion_rate', 30, 28.6, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert email campaigns (if table exists)
INSERT INTO email_campaigns (id, user_id, name, subject, content, status, sent_count, open_count, click_count, created_at, sent_at)
VALUES 
  ('email111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Weekly Market Update', 'This Week in Real Estate', 'Market trends and new listings in your area...', 'sent', 150, 85, 23, NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
  ('email222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'New Property Alert', 'Perfect Home Just Listed!', 'Check out this amazing property that matches your criteria...', 'sent', 45, 32, 8, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  ('email333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Holiday Greetings', 'Happy Holidays from Our Team', 'Wishing you and your family a wonderful holiday season...', 'sent', 200, 145, 35, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days')
ON CONFLICT (id) DO NOTHING;

-- Success message
SELECT 'Seed data has been successfully inserted!' as message;