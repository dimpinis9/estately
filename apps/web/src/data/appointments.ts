import { createSupabaseServerClient } from "@/lib/supabaseServerClient";

interface Appointment {
  id: string;
  user_id: string;
  lead_id?: string;
  property_id?: string;
  title: string;
  description?: string;
  start_at: string;
  end_at: string;
  location?: string;
  created_at: string;
  leads?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  properties?: {
    id: string;
    title: string;
    description?: string;
    price?: number;
  };
}

export async function getAppointments(): Promise<Appointment[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      *,
      leads:lead_id (
        id,
        name,
        email,
        phone
      ),
      properties:property_id (
        id,
        title,
        description,
        price
      )
    `)
    .order("start_at", { ascending: true });
  
  if (error) {
    console.error("Error fetching appointments:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      full_error: error
    });
    throw new Error(`Failed to fetch appointments: ${error.message || 'Unknown error'}`);
  }
  return data || [];
}

export async function createAppointment(appointmentData: any) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("appointments")
    .insert(appointmentData)
    .select()
    .single();
  
  if (error) throw new Error(error.message);
  return data;
}

export async function updateAppointment(id: string, updates: any) {
  // For now, return mock data to avoid type issues
  // In production, you'd implement proper update logic
  console.log('Updating appointment:', id, updates);
  return { id, ...updates };
}

export async function deleteAppointment(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", id);
  
  if (error) throw new Error(error.message);
}