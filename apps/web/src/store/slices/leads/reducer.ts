import { LeadWithExtras, LeadFilters } from "../../types";
import { LEADS_ACTION_TYPES, LeadsActionTypes } from "./actions";

export interface LeadsState {
  items: LeadWithExtras[];
  byId: Record<string, LeadWithExtras>;
  allIds: string[];
  filters: LeadFilters;
  selectedIds: string[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
}

const initialFilters: LeadFilters = {
  search: "",
  status: [],
  source: [],
  dateRange: {},
  sortBy: "created_at",
  sortOrder: "desc",
};

const initialState: LeadsState = {
  items: [],
  byId: {},
  allIds: [],
  filters: initialFilters,
  selectedIds: [],
  loading: false,
  error: null,
  lastFetch: null,
  totalCount: 0,
  currentPage: 1,
  hasMore: true,
};

export const leadsReducer = (
  state = initialState,
  action: LeadsActionTypes
): LeadsState => {
  switch (action.type) {
    // Fetch leads
    case LEADS_ACTION_TYPES.FETCH_LEADS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LEADS_ACTION_TYPES.FETCH_LEADS_SUCCESS: {
      const { leads } = action.payload;
      const byId: Record<string, LeadWithExtras> = {};
      const allIds: string[] = [];

      leads.forEach((lead) => {
        byId[lead.id] = lead;
        allIds.push(lead.id);
      });

      return {
        ...state,
        items: leads,
        byId,
        allIds,
        loading: false,
        error: null,
        lastFetch: Date.now(),
        totalCount: leads.length,
      };
    }

    case LEADS_ACTION_TYPES.FETCH_LEADS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Fetch single lead
    case LEADS_ACTION_TYPES.FETCH_LEAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LEADS_ACTION_TYPES.FETCH_LEAD_SUCCESS: {
      const { lead } = action.payload;
      const exists = state.allIds.includes(lead.id);

      return {
        ...state,
        byId: {
          ...state.byId,
          [lead.id]: lead,
        },
        allIds: exists ? state.allIds : [...state.allIds, lead.id],
        items: exists
          ? state.items.map((item) => (item.id === lead.id ? lead : item))
          : [...state.items, lead],
        loading: false,
        error: null,
      };
    }

    case LEADS_ACTION_TYPES.FETCH_LEAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Create lead
    case LEADS_ACTION_TYPES.CREATE_LEAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LEADS_ACTION_TYPES.CREATE_LEAD_SUCCESS: {
      const { lead } = action.payload;

      return {
        ...state,
        items: [lead, ...state.items],
        byId: {
          ...state.byId,
          [lead.id]: lead,
        },
        allIds: [lead.id, ...state.allIds],
        loading: false,
        error: null,
        totalCount: state.totalCount + 1,
      };
    }

    case LEADS_ACTION_TYPES.CREATE_LEAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Update lead
    case LEADS_ACTION_TYPES.UPDATE_LEAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LEADS_ACTION_TYPES.UPDATE_LEAD_SUCCESS: {
      const { lead } = action.payload;

      return {
        ...state,
        items: state.items.map((item) => (item.id === lead.id ? lead : item)),
        byId: {
          ...state.byId,
          [lead.id]: lead,
        },
        loading: false,
        error: null,
      };
    }

    case LEADS_ACTION_TYPES.UPDATE_LEAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Delete lead
    case LEADS_ACTION_TYPES.DELETE_LEAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LEADS_ACTION_TYPES.DELETE_LEAD_SUCCESS: {
      const { id } = action.payload;
      const { [id]: deleted, ...remainingById } = state.byId;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
        byId: remainingById,
        allIds: state.allIds.filter((leadId) => leadId !== id),
        selectedIds: state.selectedIds.filter((leadId) => leadId !== id),
        loading: false,
        error: null,
        totalCount: Math.max(0, state.totalCount - 1),
      };
    }

    case LEADS_ACTION_TYPES.DELETE_LEAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Bulk operations
    case LEADS_ACTION_TYPES.BULK_OPERATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LEADS_ACTION_TYPES.BULK_OPERATION_SUCCESS: {
      const { operation } = action.payload;

      if (operation.type === "delete") {
        const idsToDelete = new Set(operation.ids);
        const remainingById = Object.fromEntries(
          Object.entries(state.byId).filter(([id]) => !idsToDelete.has(id))
        );

        return {
          ...state,
          items: state.items.filter((item) => !idsToDelete.has(item.id)),
          byId: remainingById,
          allIds: state.allIds.filter((id) => !idsToDelete.has(id)),
          selectedIds: [],
          loading: false,
          error: null,
          totalCount: Math.max(0, state.totalCount - operation.ids.length),
        };
      }

      if (operation.type === "update") {
        const updatedItems = state.items.map((item) =>
          operation.ids.includes(item.id)
            ? { ...item, ...operation.data }
            : item
        );

        const updatedById = { ...state.byId };
        operation.ids.forEach((id) => {
          if (updatedById[id]) {
            updatedById[id] = { ...updatedById[id], ...operation.data };
          }
        });

        return {
          ...state,
          items: updatedItems,
          byId: updatedById,
          selectedIds: [],
          loading: false,
          error: null,
        };
      }

      return {
        ...state,
        loading: false,
        error: null,
        selectedIds: [],
      };
    }

    case LEADS_ACTION_TYPES.BULK_OPERATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Import leads
    case LEADS_ACTION_TYPES.IMPORT_LEADS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LEADS_ACTION_TYPES.IMPORT_LEADS_SUCCESS:
      // Refresh leads after import
      return {
        ...state,
        loading: false,
        error: null,
      };

    case LEADS_ACTION_TYPES.IMPORT_LEADS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Filters and UI
    case LEADS_ACTION_TYPES.SET_LEADS_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };

    case LEADS_ACTION_TYPES.CLEAR_LEADS_FILTERS:
      return {
        ...state,
        filters: initialFilters,
      };

    case LEADS_ACTION_TYPES.SET_SELECTED_LEADS:
      return {
        ...state,
        selectedIds: action.payload.ids,
      };

    case LEADS_ACTION_TYPES.CLEAR_SELECTED_LEADS:
      return {
        ...state,
        selectedIds: [],
      };

    // Real-time updates
    case LEADS_ACTION_TYPES.LEAD_UPDATED_REALTIME: {
      const { lead } = action.payload;
      const exists = state.allIds.includes(lead.id);

      if (!exists) {
        return state; // Don't add new leads from real-time updates
      }

      return {
        ...state,
        items: state.items.map((item) => (item.id === lead.id ? lead : item)),
        byId: {
          ...state.byId,
          [lead.id]: lead,
        },
      };
    }

    case LEADS_ACTION_TYPES.LEAD_DELETED_REALTIME: {
      const { id } = action.payload;
      const { [id]: deleted, ...remainingById } = state.byId;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
        byId: remainingById,
        allIds: state.allIds.filter((leadId) => leadId !== id),
        selectedIds: state.selectedIds.filter((leadId) => leadId !== id),
        totalCount: Math.max(0, state.totalCount - 1),
      };
    }

    default:
      return state;
  }
};
