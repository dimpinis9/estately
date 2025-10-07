import { NextRequest, NextResponse } from "next/server";
import { getLeads } from "@/data/leads";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export async function GET(req: NextRequest) {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, source, status, notes, tags } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();

    const leadData = {
      name,
      email,
      phone: phone || null,
      source: source || null,
      status: status || "new",
      notes: notes || null,
      tags: tags || null,
      assigned_to: null,
      property_id: null,
    };

    const { data, error } = await supabase
      .from("leads")
      .insert(leadData as any)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
