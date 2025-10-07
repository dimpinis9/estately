import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import type { Database } from "@/types/supabase";

export async function getProperties() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getProperty(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Add more typed property services as needed (createProperty, updateProperty, etc)
