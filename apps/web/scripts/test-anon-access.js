import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ezzrdzgfjswbpyvmrlls.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6enJkemdmanN3YnB5dm1ybGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NTYxODksImV4cCI6MjA3MDIzMjE4OX0.GuUD2pZDXIQ4OvJM8VRfNtaaqs4GbeMxZMOhKDxQUnI";

const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);

async function testAnonAccess() {
  try {
    console.log("🔍 Testing ANON key access to data...");

    // Test leads access
    console.log("\n📞 Testing leads access with ANON key...");
    const { data: leadsData, error: leadsError } = await supabaseAnon
      .from("leads")
      .select("*")
      .limit(5);

    if (leadsError) {
      console.error("❌ Leads error:", leadsError);
    } else {
      console.log("✅ Leads accessible:", leadsData?.length || 0, "records");
      if (leadsData && leadsData.length > 0) {
        console.log("📄 Sample lead:", leadsData[0]);
      }
    }

    // Test properties access
    console.log("\n🏠 Testing properties access with ANON key...");
    const { data: propertiesData, error: propertiesError } = await supabaseAnon
      .from("properties")
      .select("*")
      .limit(5);

    if (propertiesError) {
      console.error("❌ Properties error:", propertiesError);
    } else {
      console.log(
        "✅ Properties accessible:",
        propertiesData?.length || 0,
        "records"
      );
      if (propertiesData && propertiesData.length > 0) {
        console.log("📄 Sample property:", propertiesData[0]);
      }
    }

    // Test profiles access
    console.log("\n👥 Testing profiles access with ANON key...");
    const { data: profilesData, error: profilesError } = await supabaseAnon
      .from("profiles")
      .select("*")
      .limit(5);

    if (profilesError) {
      console.error("❌ Profiles error:", profilesError);
    } else {
      console.log(
        "✅ Profiles accessible:",
        profilesData?.length || 0,
        "records"
      );
      if (profilesData && profilesData.length > 0) {
        console.log("📄 Sample profile:", profilesData[0]);
      }
    }
  } catch (error) {
    console.error("💥 Test failed:", error);
  }
}

testAnonAccess();
