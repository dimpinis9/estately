// Test the API endpoint
async function testAPI() {
  try {
    console.log("🧪 Testing GET /api/dev/seed-data...");

    const response = await fetch("http://localhost:3001/api/dev/seed-data");
    const data = await response.json();

    console.log("✅ Response status:", response.status);
    console.log("📊 Response data:", JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log("🎉 API is working correctly!");
    } else {
      console.log("❌ API returned an error");
    }
  } catch (error) {
    console.error("💥 Failed to test API:", error);
  }
}

testAPI();
