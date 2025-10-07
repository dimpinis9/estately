import { createClient } from "@supabase/supabase-js";

// Read environment variables from .env.local
const supabaseUrl = "https://ezzrdzgfjswbpyvmrlls.supabase.co";
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6enJkemdmanN3YnB5dm1ybGxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDY1NjE4OSwiZXhwIjoyMDcwMjMyMTg5fQ.iJteni9xzVxS91rEqylaFSq1ksJ_fnHTlXqOz-iQ0-o";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Seed profiles (agents)
    console.log("👥 Seeding profiles...");
    const { error: profilesError } = await supabase.from("profiles").upsert(
      [
        {
          id: "11111111-1111-1111-1111-111111111111",
          email: "agent1@estately.com",
          full_name: "John Smith",
          phone: "+1-555-0101",
          role: "agent",
        },
        {
          id: "22222222-2222-2222-2222-222222222222",
          email: "agent2@estately.com",
          full_name: "Sarah Johnson",
          phone: "+1-555-0102",
          role: "agent",
        },
      ],
      {
        onConflict: "id",
      }
    );

    if (profilesError) {
      console.error("❌ Error seeding profiles:", profilesError);
    } else {
      console.log("✅ Profiles seeded successfully");
    }

    // Seed leads
    console.log("📞 Seeding leads...");
    const { error: leadsError } = await supabase.from("leads").upsert(
      [
        {
          id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
          name: "Emma Wilson",
          email: "emma.wilson@email.com",
          phone: "+1-555-1001",
          status: "new",
          source: "website",
          notes: "Interested in downtown condos",
          user_id: "11111111-1111-1111-1111-111111111111",
        },
        {
          id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
          name: "David Brown",
          email: "david.brown@email.com",
          phone: "+1-555-1002",
          status: "contacted",
          source: "referral",
          notes: "Looking for family home",
          user_id: "11111111-1111-1111-1111-111111111111",
        },
        {
          id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
          name: "Lisa Chen",
          email: "lisa.chen@email.com",
          phone: "+1-555-1003",
          status: "qualified",
          source: "social_media",
          notes: "First time buyer",
          user_id: "22222222-2222-2222-2222-222222222222",
        },
      ],
      {
        onConflict: "id",
      }
    );

    if (leadsError) {
      console.error("❌ Error seeding leads:", leadsError);
    } else {
      console.log("✅ Leads seeded successfully");
    }

    // Seed properties
    console.log("🏠 Seeding properties...");
    const { error: propertiesError } = await supabase.from("properties").upsert(
      [
        {
          id: "pppppppp-pppp-pppp-pppp-pppppppppppp",
          title: "Modern Downtown Condo",
          description: "Stunning 2-bedroom condo with city views",
          price: 450000,
          address: "123 Main St #15B",
          city: "Downtown",
          state: "CA",
          zip_code: "90210",
          bedrooms: 2,
          bathrooms: 2,
          square_feet: 1200,
          property_type: "condo",
          status: "active",
          user_id: "11111111-1111-1111-1111-111111111111",
        },
        {
          id: "qqqqqqqq-qqqq-qqqq-qqqq-qqqqqqqqqqqq",
          title: "Charming Family Home",
          description: "Beautiful 4-bedroom colonial",
          price: 625000,
          address: "456 Oak Avenue",
          city: "Suburbs",
          state: "CA",
          zip_code: "90211",
          bedrooms: 4,
          bathrooms: 3,
          square_feet: 2400,
          property_type: "house",
          status: "active",
          user_id: "22222222-2222-2222-2222-222222222222",
        },
      ],
      {
        onConflict: "id",
      }
    );

    if (propertiesError) {
      console.error("❌ Error seeding properties:", propertiesError);
    } else {
      console.log("✅ Properties seeded successfully");
    }

    console.log("🎉 Database seeding completed!");
    console.log("📊 Check the dashboard to see your seeded data");
  } catch (error) {
    console.error("💥 Seeding failed:", error);
  }
}

// Run the seeding
seedDatabase();
