import { Database } from "@/types/supabase";

// Base types from Supabase
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type Property = Database["public"]["Tables"]["properties"]["Row"];

// Define Appointment type based on the migration schema
export interface Appointment {
  id: string;
  user_id: string | null;
  lead_id: string | null;
  property_id: string | null;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string;
  location: string | null;
  google_event_id: string | null;
  created_at: string | null;
}

// Analytics types
export interface ActivityLog {
  id: string;
  user_id: string | null;
  action_type: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface LeadConversion {
  id: string;
  lead_id: string;
  from_status: string;
  to_status: string;
  conversion_date: string;
  days_in_previous_status: number | null;
  notes: string | null;
  user_id: string | null;
}

export interface PropertyMetrics {
  id: string;
  property_id: string;
  metric_date: string;
  views_count: number;
  inquiries_count: number;
  appointments_count: number;
  favorites_count: number;
  created_at: string;
  updated_at: string;
}

export interface KPISnapshot {
  id: string;
  user_id: string | null;
  snapshot_date: string;
  total_leads: number;
  active_leads: number;
  converted_leads: number;
  total_properties: number;
  active_properties: number;
  sold_properties: number;
  total_appointments: number;
  completed_appointments: number;
  revenue_mtd: number;
  revenue_ytd: number;
  conversion_rate: number;
  avg_deal_size: number;
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  goal_type: string;
  target_value: number;
  current_value: number;
  period_start: string;
  period_end: string;
  status: "active" | "completed" | "paused";
  created_at: string;
  updated_at: string;
}

// Extended types για το Redux store
export interface LeadWithExtras extends Lead {
  propertyTitle?: string;
  appointmentCount?: number;
}

export interface AppointmentWithExtras extends Appointment {
  leadName?: string;
  propertyTitle?: string;
  duration?: number; // in minutes
  reminderSent?: boolean;
  status?: "scheduled" | "completed" | "cancelled" | "no-show";
}

export interface PropertyWithExtras extends Property {
  leadCount?: number;
  appointmentCount?: number;

  // Additional property fields that may not be in the basic schema
  address?: string;
  city?: string;
  state?: string;
  neighborhood?: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  type?: string;
  status?: string;
  features?: string[];

  extendedData?: {
    bedrooms?: number;
    bathrooms?: number;
    squareFootage?: number;
    propertyType?: string;
    status?: string;
    address?: string;
    city?: string;
    state?: string;
  };
}

// Filter types
export interface LeadFilters {
  search: string;
  status: string[];
  source: string[];
  dateRange: {
    start?: string;
    end?: string;
  };
  sortBy: "name" | "created_at" | "status";
  sortOrder: "asc" | "desc";
}

export interface PropertyFilters {
  search: string;
  status: string[];
  propertyType: string[];
  priceRange: {
    min?: number;
    max?: number;
  };
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: {
    min?: number;
    max?: number;
  };
  location: string;
  sortBy: "title" | "price" | "created_at";
  sortOrder: "asc" | "desc";
}

// UI State
export interface UIState {
  loading: {
    leads: boolean;
    properties: boolean;
    appointments: boolean;
  };
  modals: {
    createLead: boolean;
    editLead: boolean;
    createProperty: boolean;
    editProperty: boolean;
    createAppointment: boolean;
    editAppointment: boolean;
  };
  selectedItems: {
    leads: string[];
    properties: string[];
  };
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Properties State
export interface PropertiesState {
  byId: { [id: string]: PropertyWithExtras };
  allIds: string[];
  filteredIds: string[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string[];
    type: string[];
    priceRange: { min: number | null; max: number | null };
    bedroomsRange: { min: number | null; max: number | null };
    bathroomsRange: { min: number | null; max: number | null };
    location: string[];
    features: string[];
  };
  searchQuery: string;
  sortOrder: {
    field: string;
    direction: "asc" | "desc";
  };
  selectedIds: string[];
  viewMode: "list" | "grid" | "map";
  lastUpdated: string | null;
  operations: {
    creating: boolean;
    updating: { [id: string]: boolean };
    deleting: { [id: string]: boolean };
    bulkOperating: boolean;
    importing: boolean;
    exporting: boolean;
  };
}

// Dashboard and Analytics Types
export interface DashboardMetrics {
  leads: {
    total: number;
    new_this_month: number;
    conversion_rate: number;
    avg_response_time: number;
  };
  properties: {
    total: number;
    active: number;
    sold_this_month: number;
    avg_days_on_market: number;
  };
  appointments: {
    total_this_month: number;
    completed: number;
    no_shows: number;
    upcoming: number;
  };
  revenue: {
    mtd: number;
    ytd: number;
    target_progress: number;
    avg_deal_size: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    fill?: boolean;
  }[];
}

export interface ReportFilter {
  dateRange: {
    start: string;
    end: string;
  };
  leadStatus?: string[];
  propertyStatus?: string[];
  agents?: string[];
  sources?: string[];
}

export interface CustomReport {
  id: string;
  name: string;
  description: string;
  type: "leads" | "properties" | "appointments" | "revenue" | "activity";
  filters: ReportFilter;
  metrics: string[];
  visualization: "table" | "line" | "bar" | "pie" | "area";
  user_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

// Analytics State
export interface AnalyticsState {
  dashboard: {
    metrics: DashboardMetrics | null;
    loading: boolean;
    error: string | null;
    lastUpdated: string | null;
  };
  reports: {
    list: CustomReport[];
    current: CustomReport | null;
    data: any;
    loading: boolean;
    error: string | null;
  };
  activity: {
    logs: ActivityLog[];
    loading: boolean;
    error: string | null;
  };
  goals: {
    list: Goal[];
    loading: boolean;
    error: string | null;
  };
  charts: {
    [key: string]: ChartData;
  };
}

// Leads State
export interface LeadsState {
  byId: { [id: string]: LeadWithExtras };
  allIds: string[];
  filteredIds: string[];
  loading: boolean;
  error: string | null;
  filters: {
    status: string[];
    source: string[];
    dateRange: { start: string | null; end: string | null };
  };
  searchQuery: string;
  sortOrder: {
    field: string;
    direction: "asc" | "desc";
  };
  selectedIds: string[];
  lastUpdated: string | null;
  operations: {
    creating: boolean;
    updating: { [id: string]: boolean };
    deleting: { [id: string]: boolean };
    bulkOperating: boolean;
    importing: boolean;
    exporting: boolean;
  };
}

// Appointments State
export interface AppointmentsState {
  byId: { [id: string]: AppointmentWithExtras };
  allIds: string[];
  filteredIds: string[];
  loading: boolean;
  error: string | null;
  filters: {
    dateRange: { start: string | null; end: string | null };
    status: string[];
    agents: string[];
  };
  calendarView: "month" | "week" | "day" | "agenda";
  selectedDate: string | null;
  selectedIds: string[];
  lastUpdated: string | null;
  operations: {
    creating: boolean;
    updating: { [id: string]: boolean };
    deleting: { [id: string]: boolean };
    bulkOperating: boolean;
    sendingReminder: { [id: string]: boolean };
  };
}

// Bulk operation types
export interface BulkOperation {
  type: "update" | "delete" | "assign";
  ids: string[];
  data?: any;
}

export interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  errors: string[];
}
