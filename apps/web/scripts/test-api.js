import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ezzrdzgfjswbpyvmrlls.supabase.co";
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6enJkemdmanN3YnB5dm1ybGxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDY1NjE4OSwiZXhwIjoyMDcwMjMyMTg5fQ.iJteni9xzVxS91rEqylaFSq1ksJ_fnHTlXqOz-iQ0-o";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testCountsAPI() {
  try {
    console.log("🧪 Testing counts API similar to backend...");

    const [
      { count: profilesCount },
      { count: leadsCount },
      { count: propertiesCount },
      { count: appointmentsCount },
      { count: activitiesCount },
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("properties").select("*", { count: "exact", head: true }),
      supabase.from("appointments").select("*", { count: "exact", head: true }),
      supabase.from("activity_log").select("*", { count: "exact", head: true }),
    ]);

    console.log("📊 Raw counts:");
    console.log("  - profilesCount:", profilesCount);
    console.log("  - leadsCount:", leadsCount);
    console.log("  - propertiesCount:", propertiesCount);
    console.log("  - appointmentsCount:", appointmentsCount);
    console.log("  - activitiesCount:", activitiesCount);

    const result = {
      profiles: profilesCount || 0,
      leads: leadsCount || 0,
      properties: propertiesCount || 0,
      appointments: appointmentsCount || 0,
      activityLog: activitiesCount || 0,
    };

    console.log("🎯 Final result that API should return:");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("💥 API test failed:", error);
  }
}

testCountsAPI();
