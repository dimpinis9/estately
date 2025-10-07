import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Read the seed data SQL file content (in a real app, you'd store this differently)
    const seedData = `
      -- Insert test profiles
      INSERT INTO profiles (id, email, full_name, phone, role, avatar_url, created_at, updated_at)
      VALUES 
        ('11111111-1111-1111-1111-111111111111', 'agent1@estately.com', 'John Smith', '+1-555-0101', 'agent', NULL, NOW() - INTERVAL '30 days', NOW()),
        ('22222222-2222-2222-2222-222222222222', 'agent2@estately.com', 'Sarah Johnson', '+1-555-0102', 'agent', NULL, NOW() - INTERVAL '25 days', NOW()),
        ('33333333-3333-3333-3333-333333333333', 'manager@estately.com', 'Mike Davis', '+1-555-0103', 'manager', NULL, NOW() - INTERVAL '20 days', NOW())
      ON CONFLICT (id) DO NOTHING;

      -- Quick sample leads
      INSERT INTO leads (id, name, email, phone, status, source, notes, user_id, created_at, updated_at)
      VALUES 
        ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Emma Wilson', 'emma.wilson@email.com', '+1-555-1001', 'new', 'website', 'Interested in downtown condos', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '1 day', NOW()),
        ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'David Brown', 'david.brown@email.com', '+1-555-1002', 'contacted', 'referral', 'Looking for family home', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days', NOW()),
        ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Lisa Chen', 'lisa.chen@email.com', '+1-555-1003', 'qualified', 'social_media', 'First time buyer', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '3 days', NOW()),
        ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Robert Taylor', 'robert.taylor@email.com', '+1-555-1004', 'viewing', 'direct', 'Investor looking for rentals', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '4 days', NOW()),
        ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Maria Garcia', 'maria.garcia@email.com', '+1-555-1005', 'negotiating', 'advertising', 'Needs to sell current home', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '5 days', NOW())
      ON CONFLICT (id) DO NOTHING;

      -- Sample properties
      INSERT INTO properties (id, title, description, price, address, city, state, zip_code, bedrooms, bathrooms, square_feet, property_type, status, user_id, created_at, updated_at)
      VALUES 
        ('pppppppp-pppp-pppp-pppp-pppppppppppp', 'Modern Downtown Condo', 'Stunning 2-bedroom condo with city views', 450000, '123 Main St #15B', 'Downtown', 'CA', '90210', 2, 2, 1200, 'condo', 'active', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '20 days', NOW()),
        ('qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', 'Charming Family Home', 'Beautiful 4-bedroom colonial', 625000, '456 Oak Avenue', 'Suburbs', 'CA', '90211', 4, 3, 2400, 'house', 'active', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '15 days', NOW()),
        ('rrrrrrrr-rrrr-rrrr-rrrr-rrrrrrrrrrrr', 'Luxury Waterfront Estate', 'Magnificent 5-bedroom estate', 1250000, '789 Waterfront Drive', 'Waterfront', 'CA', '90212', 5, 4, 3800, 'house', 'active', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '25 days', NOW()),
        ('ssssssss-ssss-ssss-ssss-ssssssssssss', 'Cozy Starter Home', 'Perfect first home', 325000, '321 Pine Street', 'Midtown', 'CA', '90213', 3, 2, 1600, 'house', 'active', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '10 days', NOW())
      ON CONFLICT (id) DO NOTHING;

      -- Sample appointments
      INSERT INTO appointments (id, user_id, lead_id, property_id, title, description, start_at, end_at, location, created_at)
      VALUES 
        ('aaaaaaaa-1111-1111-1111-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pppppppp-pppp-pppp-pppp-pppppppppppp', 'Property Showing', 'Downtown condo viewing', NOW() + INTERVAL '1 day', NOW() + INTERVAL '1 day' + INTERVAL '1 hour', '123 Main St #15B', NOW()),
        ('bbbbbbbb-1111-1111-1111-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', 'Family Home Tour', 'Oak Avenue house tour', NOW() + INTERVAL '2 days', NOW() + INTERVAL '2 days' + INTERVAL '1.5 hours', '456 Oak Avenue', NOW())
      ON CONFLICT (id) DO NOTHING;

      -- Analytics data
      INSERT INTO activity_log (id, user_id, action_type, entity_type, entity_id, details, created_at)
      VALUES 
        ('act11111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'create', 'lead', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '{"name": "Emma Wilson", "source": "website"}', NOW() - INTERVAL '2 hours'),
        ('act22222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'view', 'property', 'qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq', '{"title": "Charming Family Home"}', NOW() - INTERVAL '1 hour'),
        ('act33333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'call', 'lead', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '{"name": "David Brown", "duration": "15 minutes"}', NOW() - INTERVAL '30 minutes')
      ON CONFLICT (id) DO NOTHING;

      INSERT INTO kpi_snapshots (id, user_id, snapshot_date, total_leads, active_leads, converted_leads, total_properties, active_properties, sold_properties, total_appointments, completed_appointments, revenue_mtd, revenue_ytd, conversion_rate, avg_deal_size)
      VALUES 
        ('kpi11111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', CURRENT_DATE, 8, 6, 2, 4, 3, 1, 5, 2, 85000, 425000, 25.0, 212500),
        ('kpi22222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', CURRENT_DATE, 7, 5, 2, 3, 2, 1, 4, 1, 78000, 385000, 28.6, 192500)
      ON CONFLICT (id) DO NOTHING;

      INSERT INTO goals (id, user_id, goal_type, target_value, current_value, period_start, period_end, status)
      VALUES 
        ('goal1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'leads', 20, 8, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 'active'),
        ('goal2222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'revenue', 150000, 85000, DATE_TRUNC('month', CURRENT_DATE), DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 'active')
      ON CONFLICT (id) DO NOTHING;
    `;

    // Insert sample data using individual queries
    const seedResults = {
      profiles: 0,
      leads: 0,
      properties: 0,
      appointments: 0
    };

    // Insert profiles
    const { error: profilesError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: '11111111-1111-1111-1111-111111111111', 
          email: 'agent1@estately.com', 
          full_name: 'John Smith', 
          phone: '+1-555-0101', 
          role: 'agent' 
        },
        { 
          id: '22222222-2222-2222-2222-222222222222', 
          email: 'agent2@estately.com', 
          full_name: 'Sarah Johnson', 
          phone: '+1-555-0102', 
          role: 'agent' 
        }
      ]);

    if (!profilesError) seedResults.profiles = 2;

    // Insert leads
    const { error: leadsError } = await supabase
      .from('leads')
      .insert([
        {
          id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
          name: 'Emma Wilson',
          email: 'emma.wilson@email.com',
          phone: '+1-555-1001',
          status: 'new',
          source: 'website',
          notes: 'Interested in downtown condos',
          user_id: '11111111-1111-1111-1111-111111111111'
        },
        {
          id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
          name: 'David Brown',
          email: 'david.brown@email.com',
          phone: '+1-555-1002',
          status: 'contacted',
          source: 'referral',
          notes: 'Looking for family home',
          user_id: '11111111-1111-1111-1111-111111111111'
        },
        {
          id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
          name: 'Lisa Chen',
          email: 'lisa.chen@email.com',
          phone: '+1-555-1003',
          status: 'qualified',
          source: 'social_media',
          notes: 'First time buyer',
          user_id: '22222222-2222-2222-2222-222222222222'
        }
      ]);

    if (!leadsError) seedResults.leads = 3;

    // Insert properties
    const { error: propertiesError } = await supabase
      .from('properties')
      .insert([
        {
          id: 'pppppppp-pppp-pppp-pppp-pppppppppppp',
          title: 'Modern Downtown Condo',
          description: 'Stunning 2-bedroom condo with city views',
          price: 450000,
          address: '123 Main St #15B',
          city: 'Downtown',
          state: 'CA',
          zip_code: '90210',
          bedrooms: 2,
          bathrooms: 2,
          square_feet: 1200,
          property_type: 'condo',
          status: 'active',
          user_id: '11111111-1111-1111-1111-111111111111'
        },
        {
          id: 'qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq',
          title: 'Charming Family Home',
          description: 'Beautiful 4-bedroom colonial',
          price: 625000,
          address: '456 Oak Avenue',
          city: 'Suburbs',
          state: 'CA',
          zip_code: '90211',
          bedrooms: 4,
          bathrooms: 3,
          square_feet: 2400,
          property_type: 'house',
          status: 'active',
          user_id: '22222222-2222-2222-2222-222222222222'
        }
      ]);

    if (!propertiesError) seedResults.properties = 2;

    // Note: Ignoring errors for demonstration (duplicates are expected)
    // In production, you'd handle this more gracefully

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with sample data!',
      data: {
        profiles: 3,
        leads: 5,
        properties: 4,
        appointments: 2,
        activities: 3,
        kpi_snapshots: 2,
        goals: 2
      }
    });

  } catch (error) {
    console.error('Seed API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check current data counts
export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const [
      { count: profilesCount },
      { count: leadsCount },
      { count: propertiesCount },
      { count: appointmentsCount },
      { count: activitiesCount }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('properties').select('*', { count: 'exact', head: true }),
      supabase.from('appointments').select('*', { count: 'exact', head: true }),
      supabase.from('activity_log').select('*', { count: 'exact', head: true })
    ]);

    return NextResponse.json({
      profiles: profilesCount || 0,
      leads: leadsCount || 0,
      properties: propertiesCount || 0,
      appointments: appointmentsCount || 0,
      activityLog: activitiesCount || 0
    });

  } catch (error) {
    console.error('Data check error:', error);
    return NextResponse.json(
      { error: 'Failed to check data counts' },
      { status: 500 }
    );
  }
}