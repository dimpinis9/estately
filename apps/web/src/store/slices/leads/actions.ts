import {
  LeadWithExtras,
  LeadFilters,
  BulkOperation,
  ImportResult,
  ApiResponse,
} from "../../types";

// Action Types
export const LEADS_ACTION_TYPES = {
  // Fetch leads
  FETCH_LEADS_REQUEST: "leads/FETCH_LEADS_REQUEST",
  FETCH_LEADS_SUCCESS: "leads/FETCH_LEADS_SUCCESS",
  FETCH_LEADS_FAILURE: "leads/FETCH_LEADS_FAILURE",

  // Fetch single lead
  FETCH_LEAD_REQUEST: "leads/FETCH_LEAD_REQUEST",
  FETCH_LEAD_SUCCESS: "leads/FETCH_LEAD_SUCCESS",
  FETCH_LEAD_FAILURE: "leads/FETCH_LEAD_FAILURE",

  // Create lead
  CREATE_LEAD_REQUEST: "leads/CREATE_LEAD_REQUEST",
  CREATE_LEAD_SUCCESS: "leads/CREATE_LEAD_SUCCESS",
  CREATE_LEAD_FAILURE: "leads/CREATE_LEAD_FAILURE",

  // Update lead
  UPDATE_LEAD_REQUEST: "leads/UPDATE_LEAD_REQUEST",
  UPDATE_LEAD_SUCCESS: "leads/UPDATE_LEAD_SUCCESS",
  UPDATE_LEAD_FAILURE: "leads/UPDATE_LEAD_FAILURE",

  // Delete lead
  DELETE_LEAD_REQUEST: "leads/DELETE_LEAD_REQUEST",
  DELETE_LEAD_SUCCESS: "leads/DELETE_LEAD_SUCCESS",
  DELETE_LEAD_FAILURE: "leads/DELETE_LEAD_FAILURE",

  // Bulk operations
  BULK_OPERATION_REQUEST: "leads/BULK_OPERATION_REQUEST",
  BULK_OPERATION_SUCCESS: "leads/BULK_OPERATION_SUCCESS",
  BULK_OPERATION_FAILURE: "leads/BULK_OPERATION_FAILURE",

  // Import leads
  IMPORT_LEADS_REQUEST: "leads/IMPORT_LEADS_REQUEST",
  IMPORT_LEADS_SUCCESS: "leads/IMPORT_LEADS_SUCCESS",
  IMPORT_LEADS_FAILURE: "leads/IMPORT_LEADS_FAILURE",

  // Filters and UI
  SET_LEADS_FILTERS: "leads/SET_LEADS_FILTERS",
  CLEAR_LEADS_FILTERS: "leads/CLEAR_LEADS_FILTERS",
  SET_SELECTED_LEADS: "leads/SET_SELECTED_LEADS",
  CLEAR_SELECTED_LEADS: "leads/CLEAR_SELECTED_LEADS",

  // Real-time updates
  LEAD_UPDATED_REALTIME: "leads/LEAD_UPDATED_REALTIME",
  LEAD_DELETED_REALTIME: "leads/LEAD_DELETED_REALTIME",
} as const;

// Action Creators
export const leadsActions = {
  // Fetch leads
  fetchLeadsRequest: (filters?: Partial<LeadFilters>) => ({
    type: LEADS_ACTION_TYPES.FETCH_LEADS_REQUEST,
    payload: { filters },
  }),
  fetchLeadsSuccess: (leads: LeadWithExtras[]) => ({
    type: LEADS_ACTION_TYPES.FETCH_LEADS_SUCCESS,
    payload: { leads },
  }),
  fetchLeadsFailure: (error: string) => ({
    type: LEADS_ACTION_TYPES.FETCH_LEADS_FAILURE,
    payload: { error },
  }),

  // Fetch single lead
  fetchLeadRequest: (id: string) => ({
    type: LEADS_ACTION_TYPES.FETCH_LEAD_REQUEST,
    payload: { id },
  }),
  fetchLeadSuccess: (lead: LeadWithExtras) => ({
    type: LEADS_ACTION_TYPES.FETCH_LEAD_SUCCESS,
    payload: { lead },
  }),
  fetchLeadFailure: (error: string) => ({
    type: LEADS_ACTION_TYPES.FETCH_LEAD_FAILURE,
    payload: { error },
  }),

  // Create lead
  createLeadRequest: (leadData: Partial<LeadWithExtras>) => ({
    type: LEADS_ACTION_TYPES.CREATE_LEAD_REQUEST,
    payload: { leadData },
  }),
  createLeadSuccess: (lead: LeadWithExtras) => ({
    type: LEADS_ACTION_TYPES.CREATE_LEAD_SUCCESS,
    payload: { lead },
  }),
  createLeadFailure: (error: string) => ({
    type: LEADS_ACTION_TYPES.CREATE_LEAD_FAILURE,
    payload: { error },
  }),

  // Update lead
  updateLeadRequest: (id: string, updates: Partial<LeadWithExtras>) => ({
    type: LEADS_ACTION_TYPES.UPDATE_LEAD_REQUEST,
    payload: { id, updates },
  }),
  updateLeadSuccess: (lead: LeadWithExtras) => ({
    type: LEADS_ACTION_TYPES.UPDATE_LEAD_SUCCESS,
    payload: { lead },
  }),
  updateLeadFailure: (error: string) => ({
    type: LEADS_ACTION_TYPES.UPDATE_LEAD_FAILURE,
    payload: { error },
  }),

  // Delete lead
  deleteLeadRequest: (id: string) => ({
    type: LEADS_ACTION_TYPES.DELETE_LEAD_REQUEST,
    payload: { id },
  }),
  deleteLeadSuccess: (id: string) => ({
    type: LEADS_ACTION_TYPES.DELETE_LEAD_SUCCESS,
    payload: { id },
  }),
  deleteLeadFailure: (error: string) => ({
    type: LEADS_ACTION_TYPES.DELETE_LEAD_FAILURE,
    payload: { error },
  }),

  // Bulk operations
  bulkOperationRequest: (operation: BulkOperation) => ({
    type: LEADS_ACTION_TYPES.BULK_OPERATION_REQUEST,
    payload: { operation },
  }),
  bulkOperationSuccess: (operation: BulkOperation, result: any) => ({
    type: LEADS_ACTION_TYPES.BULK_OPERATION_SUCCESS,
    payload: { operation, result },
  }),
  bulkOperationFailure: (error: string) => ({
    type: LEADS_ACTION_TYPES.BULK_OPERATION_FAILURE,
    payload: { error },
  }),

  // Import leads
  importLeadsRequest: (file: File) => ({
    type: LEADS_ACTION_TYPES.IMPORT_LEADS_REQUEST,
    payload: { file },
  }),
  importLeadsSuccess: (result: ImportResult) => ({
    type: LEADS_ACTION_TYPES.IMPORT_LEADS_SUCCESS,
    payload: { result },
  }),
  importLeadsFailure: (error: string) => ({
    type: LEADS_ACTION_TYPES.IMPORT_LEADS_FAILURE,
    payload: { error },
  }),

  // Filters and UI
  setLeadsFilters: (filters: Partial<LeadFilters>) => ({
    type: LEADS_ACTION_TYPES.SET_LEADS_FILTERS,
    payload: { filters },
  }),
  clearLeadsFilters: () => ({
    type: LEADS_ACTION_TYPES.CLEAR_LEADS_FILTERS,
  }),
  setSelectedLeads: (ids: string[]) => ({
    type: LEADS_ACTION_TYPES.SET_SELECTED_LEADS,
    payload: { ids },
  }),
  clearSelectedLeads: () => ({
    type: LEADS_ACTION_TYPES.CLEAR_SELECTED_LEADS,
  }),

  // Real-time updates
  leadUpdatedRealtime: (lead: LeadWithExtras) => ({
    type: LEADS_ACTION_TYPES.LEAD_UPDATED_REALTIME,
    payload: { lead },
  }),
  leadDeletedRealtime: (id: string) => ({
    type: LEADS_ACTION_TYPES.LEAD_DELETED_REALTIME,
    payload: { id },
  }),
};

// Type for all lead actions
export type LeadsActionTypes = ReturnType<
  (typeof leadsActions)[keyof typeof leadsActions]
>;
