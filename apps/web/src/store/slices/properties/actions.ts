import { PropertyWithExtras, BulkOperation, ImportResult } from "../../types";

// Action types
export const PROPERTIES_ACTION_TYPES = {
  // Fetch properties
  FETCH_PROPERTIES_REQUEST: "FETCH_PROPERTIES_REQUEST",
  FETCH_PROPERTIES_SUCCESS: "FETCH_PROPERTIES_SUCCESS",
  FETCH_PROPERTIES_FAILURE: "FETCH_PROPERTIES_FAILURE",

  // Fetch single property
  FETCH_PROPERTY_REQUEST: "FETCH_PROPERTY_REQUEST",
  FETCH_PROPERTY_SUCCESS: "FETCH_PROPERTY_SUCCESS",
  FETCH_PROPERTY_FAILURE: "FETCH_PROPERTY_FAILURE",

  // Create property
  CREATE_PROPERTY_REQUEST: "CREATE_PROPERTY_REQUEST",
  CREATE_PROPERTY_SUCCESS: "CREATE_PROPERTY_SUCCESS",
  CREATE_PROPERTY_FAILURE: "CREATE_PROPERTY_FAILURE",

  // Update property
  UPDATE_PROPERTY_REQUEST: "UPDATE_PROPERTY_REQUEST",
  UPDATE_PROPERTY_SUCCESS: "UPDATE_PROPERTY_SUCCESS",
  UPDATE_PROPERTY_FAILURE: "UPDATE_PROPERTY_FAILURE",

  // Delete property
  DELETE_PROPERTY_REQUEST: "DELETE_PROPERTY_REQUEST",
  DELETE_PROPERTY_SUCCESS: "DELETE_PROPERTY_SUCCESS",
  DELETE_PROPERTY_FAILURE: "DELETE_PROPERTY_FAILURE",

  // Bulk operations
  BULK_OPERATION_REQUEST: "PROPERTIES_BULK_OPERATION_REQUEST",
  BULK_OPERATION_SUCCESS: "PROPERTIES_BULK_OPERATION_SUCCESS",
  BULK_OPERATION_FAILURE: "PROPERTIES_BULK_OPERATION_FAILURE",

  // Import properties
  IMPORT_PROPERTIES_REQUEST: "IMPORT_PROPERTIES_REQUEST",
  IMPORT_PROPERTIES_SUCCESS: "IMPORT_PROPERTIES_SUCCESS",
  IMPORT_PROPERTIES_FAILURE: "IMPORT_PROPERTIES_FAILURE",

  // Export properties
  EXPORT_PROPERTIES_REQUEST: "EXPORT_PROPERTIES_REQUEST",
  EXPORT_PROPERTIES_SUCCESS: "EXPORT_PROPERTIES_SUCCESS",
  EXPORT_PROPERTIES_FAILURE: "EXPORT_PROPERTIES_FAILURE",

  // Filters
  SET_FILTER: "SET_PROPERTIES_FILTER",
  CLEAR_FILTERS: "CLEAR_PROPERTIES_FILTERS",
  SET_SEARCH_QUERY: "SET_PROPERTIES_SEARCH_QUERY",
  SET_SORT_ORDER: "SET_PROPERTIES_SORT_ORDER",

  // UI state
  SET_SELECTED_PROPERTIES: "SET_SELECTED_PROPERTIES",
  TOGGLE_PROPERTY_SELECTION: "TOGGLE_PROPERTY_SELECTION",
  CLEAR_SELECTION: "CLEAR_PROPERTIES_SELECTION",
  SET_VIEW_MODE: "SET_PROPERTIES_VIEW_MODE",

  // Real-time updates
  PROPERTY_UPDATED: "PROPERTY_UPDATED_REALTIME",
  PROPERTY_CREATED: "PROPERTY_CREATED_REALTIME",
  PROPERTY_DELETED: "PROPERTY_DELETED_REALTIME",

  // Optimistic updates
  OPTIMISTIC_UPDATE_PROPERTY: "OPTIMISTIC_UPDATE_PROPERTY",
} as const;

// Action creators
export const propertiesActions = {
  // Fetch properties
  fetchPropertiesRequest: (filters?: any) => ({
    type: PROPERTIES_ACTION_TYPES.FETCH_PROPERTIES_REQUEST,
    payload: { filters },
  }),

  fetchPropertiesSuccess: (properties: PropertyWithExtras[]) => ({
    type: PROPERTIES_ACTION_TYPES.FETCH_PROPERTIES_SUCCESS,
    payload: { properties },
  }),

  fetchPropertiesFailure: (error: string) => ({
    type: PROPERTIES_ACTION_TYPES.FETCH_PROPERTIES_FAILURE,
    payload: { error },
  }),

  // Fetch single property
  fetchPropertyRequest: (id: string) => ({
    type: PROPERTIES_ACTION_TYPES.FETCH_PROPERTY_REQUEST,
    payload: { id },
  }),

  fetchPropertySuccess: (property: PropertyWithExtras) => ({
    type: PROPERTIES_ACTION_TYPES.FETCH_PROPERTY_SUCCESS,
    payload: { property },
  }),

  fetchPropertyFailure: (error: string) => ({
    type: PROPERTIES_ACTION_TYPES.FETCH_PROPERTY_FAILURE,
    payload: { error },
  }),

  // Create property
  createPropertyRequest: (propertyData: Partial<PropertyWithExtras>) => ({
    type: PROPERTIES_ACTION_TYPES.CREATE_PROPERTY_REQUEST,
    payload: { propertyData },
  }),

  createPropertySuccess: (property: PropertyWithExtras) => ({
    type: PROPERTIES_ACTION_TYPES.CREATE_PROPERTY_SUCCESS,
    payload: { property },
  }),

  createPropertyFailure: (error: string) => ({
    type: PROPERTIES_ACTION_TYPES.CREATE_PROPERTY_FAILURE,
    payload: { error },
  }),

  // Update property
  updatePropertyRequest: (
    id: string,
    updates: Partial<PropertyWithExtras>
  ) => ({
    type: PROPERTIES_ACTION_TYPES.UPDATE_PROPERTY_REQUEST,
    payload: { id, updates },
  }),

  updatePropertySuccess: (property: PropertyWithExtras) => ({
    type: PROPERTIES_ACTION_TYPES.UPDATE_PROPERTY_SUCCESS,
    payload: { property },
  }),

  updatePropertyFailure: (error: string) => ({
    type: PROPERTIES_ACTION_TYPES.UPDATE_PROPERTY_FAILURE,
    payload: { error },
  }),

  // Delete property
  deletePropertyRequest: (id: string) => ({
    type: PROPERTIES_ACTION_TYPES.DELETE_PROPERTY_REQUEST,
    payload: { id },
  }),

  deletePropertySuccess: (id: string) => ({
    type: PROPERTIES_ACTION_TYPES.DELETE_PROPERTY_SUCCESS,
    payload: { id },
  }),

  deletePropertyFailure: (error: string) => ({
    type: PROPERTIES_ACTION_TYPES.DELETE_PROPERTY_FAILURE,
    payload: { error },
  }),

  // Bulk operations
  bulkOperationRequest: (operation: BulkOperation) => ({
    type: PROPERTIES_ACTION_TYPES.BULK_OPERATION_REQUEST,
    payload: { operation },
  }),

  bulkOperationSuccess: (operation: BulkOperation, result: any) => ({
    type: PROPERTIES_ACTION_TYPES.BULK_OPERATION_SUCCESS,
    payload: { operation, result },
  }),

  bulkOperationFailure: (error: string) => ({
    type: PROPERTIES_ACTION_TYPES.BULK_OPERATION_FAILURE,
    payload: { error },
  }),

  // Import properties
  importPropertiesRequest: (file: File) => ({
    type: PROPERTIES_ACTION_TYPES.IMPORT_PROPERTIES_REQUEST,
    payload: { file },
  }),

  importPropertiesSuccess: (result: ImportResult) => ({
    type: PROPERTIES_ACTION_TYPES.IMPORT_PROPERTIES_SUCCESS,
    payload: { result },
  }),

  importPropertiesFailure: (error: string) => ({
    type: PROPERTIES_ACTION_TYPES.IMPORT_PROPERTIES_FAILURE,
    payload: { error },
  }),

  // Export properties
  exportPropertiesRequest: (format: "csv" | "excel", filters?: any) => ({
    type: PROPERTIES_ACTION_TYPES.EXPORT_PROPERTIES_REQUEST,
    payload: { format, filters },
  }),

  exportPropertiesSuccess: (url: string) => ({
    type: PROPERTIES_ACTION_TYPES.EXPORT_PROPERTIES_SUCCESS,
    payload: { url },
  }),

  exportPropertiesFailure: (error: string) => ({
    type: PROPERTIES_ACTION_TYPES.EXPORT_PROPERTIES_FAILURE,
    payload: { error },
  }),

  // Filters
  setFilter: (filterType: string, value: any) => ({
    type: PROPERTIES_ACTION_TYPES.SET_FILTER,
    payload: { filterType, value },
  }),

  clearFilters: () => ({
    type: PROPERTIES_ACTION_TYPES.CLEAR_FILTERS,
  }),

  setSearchQuery: (query: string) => ({
    type: PROPERTIES_ACTION_TYPES.SET_SEARCH_QUERY,
    payload: { query },
  }),

  setSortOrder: (field: string, direction: "asc" | "desc") => ({
    type: PROPERTIES_ACTION_TYPES.SET_SORT_ORDER,
    payload: { field, direction },
  }),

  // UI state
  setSelectedProperties: (ids: string[]) => ({
    type: PROPERTIES_ACTION_TYPES.SET_SELECTED_PROPERTIES,
    payload: { ids },
  }),

  togglePropertySelection: (id: string) => ({
    type: PROPERTIES_ACTION_TYPES.TOGGLE_PROPERTY_SELECTION,
    payload: { id },
  }),

  clearSelection: () => ({
    type: PROPERTIES_ACTION_TYPES.CLEAR_SELECTION,
  }),

  setViewMode: (mode: "list" | "grid" | "map") => ({
    type: PROPERTIES_ACTION_TYPES.SET_VIEW_MODE,
    payload: { mode },
  }),

  // Real-time updates
  propertyUpdated: (property: PropertyWithExtras) => ({
    type: PROPERTIES_ACTION_TYPES.PROPERTY_UPDATED,
    payload: { property },
  }),

  propertyCreated: (property: PropertyWithExtras) => ({
    type: PROPERTIES_ACTION_TYPES.PROPERTY_CREATED,
    payload: { property },
  }),

  propertyDeleted: (id: string) => ({
    type: PROPERTIES_ACTION_TYPES.PROPERTY_DELETED,
    payload: { id },
  }),

  // Optimistic updates
  optimisticUpdateProperty: (
    id: string,
    updates: Partial<PropertyWithExtras>
  ) => ({
    type: PROPERTIES_ACTION_TYPES.OPTIMISTIC_UPDATE_PROPERTY,
    payload: { id, updates },
  }),
};

// Action type for the reducer
export type PropertiesAction = ReturnType<
  (typeof propertiesActions)[keyof typeof propertiesActions]
>;
