import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import type { Database } from "@/types/supabase";

export async function getLeads() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

// Μπορείς να προσθέσεις και άλλες typed υπηρεσίες εδώ (π.χ. createLead, updateLead, κλπ)
