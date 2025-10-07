import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

// Helper function to get current date ranges
const getDateRanges = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return {
    startOfMonth: startOfMonth.toISOString(),
    startOfYear: startOfYear.toISOString(),
    thirtyDaysAgo: thirtyDaysAgo.toISOString(),
    now: now.toISOString(),
  };
};

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dates = getDateRanges();

    // Fetch leads metrics with proper typing
    const { data: leadsData } = await supabase
      .from("leads")
      .select("id, status, created_at")
      .eq("assigned_to", user.id);

    const totalLeads = leadsData?.length || 0;
    const newLeadsThisMonth =
      leadsData?.filter(
        (lead: any) =>
          new Date(lead.created_at || "") >= new Date(dates.startOfMonth)
      ).length || 0;

    const activeLeads =
      leadsData?.filter((lead: any) =>
        ["new", "contacted", "qualified", "proposal"].includes(
          lead.status || ""
        )
      ).length || 0;

    const convertedLeads =
      leadsData?.filter((lead: any) => lead.status === "converted").length || 0;

    const conversionRate =
      totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;

    // Fetch properties metrics
    const { data: propertiesData } = await supabase
      .from("properties")
      .select("id, created_at")
      .eq("user_id", user.id);

    const totalProperties = propertiesData?.length || 0;
    const newPropertiesThisMonth =
      propertiesData?.filter(
        (property: any) =>
          new Date(property.created_at || "") >= new Date(dates.startOfMonth)
      ).length || 0;

    // Fetch appointments metrics
    const { data: appointmentsData } = await supabase
      .from("appointments")
      .select("id, start_at, created_at")
      .eq("user_id", user.id)
      .gte("created_at", dates.startOfMonth);

    const appointmentsThisMonth = appointmentsData?.length || 0;
    const upcomingAppointments =
      appointmentsData?.filter(
        (apt: any) => new Date(apt.start_at) > new Date()
      ).length || 0;

    // Calculate some mock revenue data (you can integrate with actual revenue tracking)
    const mockRevenueMTD = convertedLeads * 25000; // Average commission
    const mockRevenueYTD = convertedLeads * 12 * 25000; // Extrapolated
    const targetProgress = mockRevenueMTD / 100000; // Target of 100k per month

    const dashboardMetrics = {
      leads: {
        total: totalLeads,
        new_this_month: newLeadsThisMonth,
        conversion_rate: Number(conversionRate.toFixed(2)),
        avg_response_time: 2.5, // Mock data - hours
      },
      properties: {
        total: totalProperties,
        active: totalProperties, // Mock - assume all active
        sold_this_month: newPropertiesThisMonth,
        avg_days_on_market: 45, // Mock data
      },
      appointments: {
        total_this_month: appointmentsThisMonth,
        completed: Math.floor(appointmentsThisMonth * 0.8), // Mock 80% completion rate
        no_shows: Math.floor(appointmentsThisMonth * 0.1), // Mock 10% no-show rate
        upcoming: upcomingAppointments,
      },
      revenue: {
        mtd: mockRevenueMTD,
        ytd: mockRevenueYTD,
        target_progress: Number((targetProgress * 100).toFixed(1)),
        avg_deal_size:
          convertedLeads > 0 ? mockRevenueMTD / convertedLeads : 25000,
      },
    };

    return NextResponse.json(dashboardMetrics);
  } catch (error: any) {
    console.error("Dashboard metrics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard metrics" },
      { status: 500 }
    );
  }
}

// POST endpoint for tracking activity
export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action_type, entity_type, entity_id, details } = body;

    // For now, just log the activity (later we'll store in activity_log table)
    console.log("Activity tracked:", {
      user_id: user.id,
      action_type,
      entity_type,
      entity_id,
      details,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Activity tracked successfully",
    });
  } catch (error: any) {
    console.error("Activity tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track activity" },
      { status: 500 }
    );
  }
}
