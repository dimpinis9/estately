import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Browser-compatible Supabase client functions
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getLeadsBrowser() {
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getPropertiesBrowser() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateLeadStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updatePropertyStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from("properties")
    .update({
      description: JSON.stringify({ status }), // Temporary solution
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function bulkUpdateLeads(ids: string[], updates: any) {
  const { data, error } = await supabase
    .from("leads")
    .update(updates)
    .in("id", ids)
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteLeadsBrowser(ids: string[]) {
  const { error } = await supabase.from("leads").delete().in("id", ids);

  if (error) throw new Error(error.message);
}

export async function deletePropertiesBrowser(ids: string[]) {
  const { error } = await supabase.from("properties").delete().in("id", ids);

  if (error) throw new Error(error.message);
}
