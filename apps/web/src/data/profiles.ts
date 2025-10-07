import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import type { Database } from "@/types/supabase";

export async function getProfile(userId: string | null) {
  if (!userId) return null;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId as string)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

// Add more typed profile services as needed (updateProfile, etc)
