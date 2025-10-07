import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ezzrdzgfjswbpyvmrlls.supabase.co";
const supabaseServiceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6enJkemdmanN3YnB5dm1ybGxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDY1NjE4OSwiZXhwIjoyMDcwMjMyMTg5fQ.iJteni9xzVxS91rEqylaFSq1ksJ_fnHTlXqOz-iQ0-o";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugDatabase() {
  try {
    console.log("🔍 Debugging database structure...");

    // Check existing data
    console.log("\n📋 Checking profiles table...");
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .limit(5);

    if (profilesError) {
      console.error("❌ Profiles error:", profilesError);
    } else {
      console.log("✅ Profiles count:", profiles?.length || 0);
      if (profiles && profiles.length > 0) {
        console.log("📄 Sample profile:", profiles[0]);
      }
    }

    console.log("\n📞 Checking leads table...");
    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("*")
      .limit(5);

    if (leadsError) {
      console.error("❌ Leads error:", leadsError);
    } else {
      console.log("✅ Leads count:", leads?.length || 0);
      if (leads && leads.length > 0) {
        console.log("📄 Sample lead:", leads[0]);
      }
    }

    console.log("\n🏠 Checking properties table...");
    const { data: properties, error: propertiesError } = await supabase
      .from("properties")
      .select("*")
      .limit(5);

    if (propertiesError) {
      console.error("❌ Properties error:", propertiesError);
    } else {
      console.log("✅ Properties count:", properties?.length || 0);
      if (properties && properties.length > 0) {
        console.log("📄 Sample property:", properties[0]);
      }
    }
  } catch (error) {
    console.error("💥 Debug failed:", error);
  }
}

debugDatabase();
