import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();
    const { leads } = await request.json();

    if (!leads || !Array.isArray(leads)) {
      return NextResponse.json(
        { error: "Invalid leads data" },
        { status: 400 }
      );
    }

    // Validate leads data
    const validLeads = leads.filter(
      (lead) => lead.name && lead.email && lead.email.includes("@")
    );

    if (validLeads.length === 0) {
      return NextResponse.json(
        { error: "No valid leads found" },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Prepare leads for insertion
    const leadsToInsert = validLeads.map((lead) => ({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || null,
      status: "new",
      source: lead.source || "import",
      user_id: user.id,
      created_at: new Date().toISOString(),
    }));

    // Insert leads
    const { data, error } = await supabase
      .from("leads")
      .insert(leadsToInsert as any)
      .select();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to import leads" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Successfully imported ${data.length} leads`,
      count: data.length,
      leads: data,
    });
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
