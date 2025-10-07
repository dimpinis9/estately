import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // Use raw SQL query since appointments table might not be in generated types
    const { data: appointments, error } = await supabase.rpc(
      "get_appointments_with_relations"
    );

    if (error) {
      // Fallback to simple appointments query
      const { data: simpleAppointments, error: simpleError } = await supabase
        .from("appointments" as any)
        .select("*")
        .order("start_at", { ascending: true });

      if (simpleError) {
        return NextResponse.json(
          { error: simpleError.message },
          { status: 500 }
        );
      }

      // Transform data for calendar component
      const transformedAppointments = simpleAppointments?.map(
        (appointment: any) => ({
          id: appointment.id,
          title: appointment.title,
          description: appointment.description,
          start: new Date(appointment.start_at),
          end: new Date(appointment.end_at),
          location: appointment.location,
          lead_id: appointment.lead_id,
          property_id: appointment.property_id,
        })
      );

      return NextResponse.json(transformedAppointments || []);
    }

    return NextResponse.json(appointments || []);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, start, end, location, lead_id, property_id } =
      body;

    const { data, error } = await supabase
      .from("appointments" as any)
      .insert([
        {
          title,
          description: description || null,
          start_at: new Date(start).toISOString(),
          end_at: new Date(end).toISOString(),
          location: location || null,
          lead_id: lead_id || null,
          property_id: property_id || null,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
