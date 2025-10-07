import { createSupabaseServerClient } from "@/lib/supabaseServerClient";
import { supabaseClient } from "@/lib/supabaseClient";
import type { Database } from "@/types/supabase";

export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function signUp(
  email: string,
  password: string,
  fullName?: string
) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || email.split("@")[0],
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();
  if (error) throw new Error(error.message);
  return user;
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabaseClient.auth.getSession();
  if (error) throw new Error(error.message);
  return session;
}
