import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import { faker } from "@faker-js/faker";
import type { TablesInsert } from "@/types/supabase";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();

  const leads: import("@/types/supabase").Database["public"]["Tables"]["leads"]["Insert"][] =
    Array.from({
      length: 10,
    }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      source: faker.company.name(),
      status: "new",
      created_at: new Date().toISOString(),
      notes: null,
      tags: null,
      assigned_to: null,
      property_id: null,
    }));
  // Type workaround for Supabase typegen bug
  const { error } = await supabase.from("leads").insert(leads as any);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
