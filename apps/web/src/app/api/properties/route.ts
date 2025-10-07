import { NextRequest, NextResponse } from "next/server";
import { getProperties } from "@/data/properties";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

export async function GET(req: NextRequest) {
  try {
    const properties = await getProperties();
    return NextResponse.json(properties);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, price, image_url, extended_data } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();

    // For now, we'll store extended data in the description field as JSON
    const propertyData = {
      title,
      description: extended_data ? JSON.stringify(extended_data) : description,
      price: price || null,
      image_url: image_url || null,
    };

    const { data, error } = await supabase
      .from("properties")
      .insert(propertyData as any)
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
