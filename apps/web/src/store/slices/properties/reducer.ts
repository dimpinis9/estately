import { PropertyWithExtras, PropertiesState } from "../../types";
import { PROPERTIES_ACTION_TYPES, PropertiesAction } from "./actions";

// Initial state
const initialState: PropertiesState = {
  byId: {},
  allIds: [],
  filteredIds: [],
  loading: false,
  error: null,
  filters: {
    status: [],
    type: [],
    priceRange: { min: null, max: null },
    bedroomsRange: { min: null, max: null },
    bathroomsRange: { min: null, max: null },
    location: [],
    features: [],
  },
  searchQuery: "",
  sortOrder: {
    field: "created_at",
    direction: "desc",
  },
  selectedIds: [],
  viewMode: "list",
  lastUpdated: null,
  operations: {
    creating: false,
    updating: {},
    deleting: {},
    bulkOperating: false,
    importing: false,
    exporting: false,
  },
};

// Helper functions
const normalizeProperties = (properties: PropertyWithExtras[]) => {
  const byId: { [id: string]: PropertyWithExtras } = {};
  const allIds: string[] = [];

  properties.forEach((property) => {
    byId[property.id] = property;
    allIds.push(property.id);
  });

  return { byId, allIds };
};

const applyFilters = (
  byId: { [id: string]: PropertyWithExtras },
  allIds: string[],
  filters: PropertiesState["filters"],
  searchQuery: string
): string[] => {
  return allIds.filter((id) => {
    const property = byId[id];

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        property.title,
        property.description,
        property.address,
        property.city,
        property.state,
        property.neighborhood,
      ].filter(Boolean);

      const matchesSearch = searchFields.some((field) =>
        field?.toLowerCase().includes(query)
      );

      if (!matchesSearch) return false;
    }

    // Status filter
    if (
      filters.status.length > 0 &&
      property.status &&
      !filters.status.includes(property.status)
    ) {
      return false;
    }

    // Type filter
    if (
      filters.type.length > 0 &&
      property.type &&
      !filters.type.includes(property.type)
    ) {
      return false;
    }

    // Price range filter
    if (
      filters.priceRange.min !== null &&
      property.price !== null &&
      property.price < filters.priceRange.min
    ) {
      return false;
    }
    if (
      filters.priceRange.max !== null &&
      property.price !== null &&
      property.price > filters.priceRange.max
    ) {
      return false;
    }

    // Bedrooms range filter
    if (
      filters.bedroomsRange.min !== null &&
      property.bedrooms !== undefined &&
      property.bedrooms < filters.bedroomsRange.min
    ) {
      return false;
    }
    if (
      filters.bedroomsRange.max !== null &&
      property.bedrooms !== undefined &&
      property.bedrooms > filters.bedroomsRange.max
    ) {
      return false;
    }

    // Bathrooms range filter
    if (
      filters.bathroomsRange.min !== null &&
      property.bathrooms !== undefined &&
      property.bathrooms < filters.bathroomsRange.min
    ) {
      return false;
    }
    if (
      filters.bathroomsRange.max !== null &&
      property.bathrooms !== undefined &&
      property.bathrooms > filters.bathroomsRange.max
    ) {
      return false;
    }

    // Location filter
    if (filters.location.length > 0) {
      const propertyLocation = [
        property.city,
        property.state,
        property.neighborhood,
      ].filter(Boolean);
      const matchesLocation = filters.location.some((location) =>
        propertyLocation.some((loc) =>
          loc?.toLowerCase().includes(location.toLowerCase())
        )
      );
      if (!matchesLocation) return false;
    }

    // Features filter
    if (filters.features.length > 0) {
      const propertyFeatures = property.features || [];
      const hasAllFeatures = filters.features.every((feature) =>
        propertyFeatures.includes(feature)
      );
      if (!hasAllFeatures) return false;
    }

    return true;
  });
};

const applySorting = (
  byId: { [id: string]: PropertyWithExtras },
  ids: string[],
  sortOrder: PropertiesState["sortOrder"]
): string[] => {
  return [...ids].sort((a, b) => {
    const propertyA = byId[a];
    const propertyB = byId[b];

    let valueA: any;
    let valueB: any;

    switch (sortOrder.field) {
      case "price":
        valueA = propertyA.price;
        valueB = propertyB.price;
        break;
      case "bedrooms":
        valueA = propertyA.bedrooms;
        valueB = propertyB.bedrooms;
        break;
      case "bathrooms":
        valueA = propertyA.bathrooms;
        valueB = propertyB.bathrooms;
        break;
      case "square_feet":
        valueA = propertyA.square_feet;
        valueB = propertyB.square_feet;
        break;
      case "created_at":
        valueA = propertyA.created_at
          ? new Date(propertyA.created_at)
          : new Date(0);
        valueB = propertyB.created_at
          ? new Date(propertyB.created_at)
          : new Date(0);
        break;
      case "title":
        valueA = propertyA.title?.toLowerCase() || "";
        valueB = propertyB.title?.toLowerCase() || "";
        break;
      case "address":
        valueA = propertyA.address?.toLowerCase() || "";
        valueB = propertyB.address?.toLowerCase() || "";
        break;
      default:
        valueA = propertyA.created_at;
        valueB = propertyB.created_at;
    }

    if (valueA < valueB) {
      return sortOrder.direction === "asc" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};

// Reducer
export const propertiesReducer = (
  state: PropertiesState = initialState,
  action: PropertiesAction
): PropertiesState => {
  switch (action.type) {
    // Fetch properties
    case PROPERTIES_ACTION_TYPES.FETCH_PROPERTIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PROPERTIES_ACTION_TYPES.FETCH_PROPERTIES_SUCCESS: {
      const { properties } = action.payload;
      const { byId, allIds } = normalizeProperties(properties);
      const filteredIds = applyFilters(
        byId,
        allIds,
        state.filters,
        state.searchQuery
      );
      const sortedIds = applySorting(byId, filteredIds, state.sortOrder);

      return {
        ...state,
        byId,
        allIds,
        filteredIds: sortedIds,
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString(),
      };
    }

    case PROPERTIES_ACTION_TYPES.FETCH_PROPERTIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Fetch single property
    case PROPERTIES_ACTION_TYPES.FETCH_PROPERTY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PROPERTIES_ACTION_TYPES.FETCH_PROPERTY_SUCCESS: {
      const { property } = action.payload;
      const byId = { ...state.byId, [property.id]: property };
      const allIds = state.allIds.includes(property.id)
        ? state.allIds
        : [...state.allIds, property.id];

      const filteredIds = applyFilters(
        byId,
        allIds,
        state.filters,
        state.searchQuery
      );
      const sortedIds = applySorting(byId, filteredIds, state.sortOrder);

      return {
        ...state,
        byId,
        allIds,
        filteredIds: sortedIds,
        loading: false,
        error: null,
      };
    }

    case PROPERTIES_ACTION_TYPES.FETCH_PROPERTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    // Create property
    case PROPERTIES_ACTION_TYPES.CREATE_PROPERTY_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          creating: true,
        },
        error: null,
      };

    case PROPERTIES_ACTION_TYPES.CREATE_PROPERTY_SUCCESS: {
      const { property } = action.payload;
      const byId = { ...state.byId, [property.id]: property };
      const allIds = [...state.allIds, property.id];
      const filteredIds = applyFilters(
        byId,
        allIds,
        state.filters,
        state.searchQuery
      );
      const sortedIds = applySorting(byId, filteredIds, state.sortOrder);

      return {
        ...state,
        byId,
        allIds,
        filteredIds: sortedIds,
        operations: {
          ...state.operations,
          creating: false,
        },
        error: null,
      };
    }

    case PROPERTIES_ACTION_TYPES.CREATE_PROPERTY_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          creating: false,
        },
        error: action.payload.error,
      };

    // Update property
    case PROPERTIES_ACTION_TYPES.UPDATE_PROPERTY_REQUEST: {
      const { id } = action.payload;
      return {
        ...state,
        operations: {
          ...state.operations,
          updating: { ...state.operations.updating, [id]: true },
        },
        error: null,
      };
    }

    case PROPERTIES_ACTION_TYPES.UPDATE_PROPERTY_SUCCESS: {
      const { property } = action.payload;
      const byId = { ...state.byId, [property.id]: property };
      const filteredIds = applyFilters(
        byId,
        state.allIds,
        state.filters,
        state.searchQuery
      );
      const sortedIds = applySorting(byId, filteredIds, state.sortOrder);

      const { [property.id]: _, ...updatingWithoutCurrent } =
        state.operations.updating;

      return {
        ...state,
        byId,
        filteredIds: sortedIds,
        operations: {
          ...state.operations,
          updating: updatingWithoutCurrent,
        },
        error: null,
      };
    }

    case PROPERTIES_ACTION_TYPES.UPDATE_PROPERTY_FAILURE: {
      // Note: We don't have the ID in the failure action, so we clear all updating states
      return {
        ...state,
        operations: {
          ...state.operations,
          updating: {},
        },
        error: action.payload.error,
      };
    }

    // Delete property
    case PROPERTIES_ACTION_TYPES.DELETE_PROPERTY_REQUEST: {
      const { id } = action.payload;
      return {
        ...state,
        operations: {
          ...state.operations,
          deleting: { ...state.operations.deleting, [id]: true },
        },
        error: null,
      };
    }

    case PROPERTIES_ACTION_TYPES.DELETE_PROPERTY_SUCCESS: {
      const { id } = action.payload;
      const { [id]: deletedProperty, ...byId } = state.byId;
      const allIds = state.allIds.filter((propertyId) => propertyId !== id);
      const filteredIds = state.filteredIds.filter(
        (propertyId) => propertyId !== id
      );
      const selectedIds = state.selectedIds.filter(
        (propertyId) => propertyId !== id
      );

      const { [id]: _, ...deletingWithoutCurrent } = state.operations.deleting;

      return {
        ...state,
        byId,
        allIds,
        filteredIds,
        selectedIds,
        operations: {
          ...state.operations,
          deleting: deletingWithoutCurrent,
        },
        error: null,
      };
    }

    case PROPERTIES_ACTION_TYPES.DELETE_PROPERTY_FAILURE: {
      return {
        ...state,
        operations: {
          ...state.operations,
          deleting: {},
        },
        error: action.payload.error,
      };
    }

    // Bulk operations
    case PROPERTIES_ACTION_TYPES.BULK_OPERATION_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          bulkOperating: true,
        },
        error: null,
      };

    case PROPERTIES_ACTION_TYPES.BULK_OPERATION_SUCCESS: {
      const { operation } = action.payload;
      let newState = { ...state };

      if (operation.type === "delete") {
        // Remove deleted properties
        const { byId, allIds, filteredIds, selectedIds } = operation.ids.reduce(
          (acc, id) => {
            const { [id]: deleted, ...remainingById } = acc.byId;
            return {
              byId: remainingById,
              allIds: acc.allIds.filter((propertyId) => propertyId !== id),
              filteredIds: acc.filteredIds.filter(
                (propertyId) => propertyId !== id
              ),
              selectedIds: acc.selectedIds.filter(
                (propertyId) => propertyId !== id
              ),
            };
          },
          {
            byId: newState.byId,
            allIds: newState.allIds,
            filteredIds: newState.filteredIds,
            selectedIds: newState.selectedIds,
          }
        );

        newState = { ...newState, byId, allIds, filteredIds, selectedIds };
      }

      return {
        ...newState,
        operations: {
          ...newState.operations,
          bulkOperating: false,
        },
        error: null,
      };
    }

    case PROPERTIES_ACTION_TYPES.BULK_OPERATION_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          bulkOperating: false,
        },
        error: action.payload.error,
      };

    // Import properties
    case PROPERTIES_ACTION_TYPES.IMPORT_PROPERTIES_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          importing: true,
        },
        error: null,
      };

    case PROPERTIES_ACTION_TYPES.IMPORT_PROPERTIES_SUCCESS:
      return {
        ...state,
        operations: {
          ...state.operations,
          importing: false,
        },
        error: null,
      };

    case PROPERTIES_ACTION_TYPES.IMPORT_PROPERTIES_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          importing: false,
        },
        error: action.payload.error,
      };

    // Export properties
    case PROPERTIES_ACTION_TYPES.EXPORT_PROPERTIES_REQUEST:
      return {
        ...state,
        operations: {
          ...state.operations,
          exporting: true,
        },
        error: null,
      };

    case PROPERTIES_ACTION_TYPES.EXPORT_PROPERTIES_SUCCESS:
      return {
        ...state,
        operations: {
          ...state.operations,
          exporting: false,
        },
        error: null,
      };

    case PROPERTIES_ACTION_TYPES.EXPORT_PROPERTIES_FAILURE:
      return {
        ...state,
        operations: {
          ...state.operations,
          exporting: false,
        },
        error: action.payload.error,
      };

    // Filters
    case PROPERTIES_ACTION_TYPES.SET_FILTER: {
      const { filterType, value } = action.payload;
      const filters = { ...state.filters, [filterType]: value };
      const filteredIds = applyFilters(
        state.byId,
        state.allIds,
        filters,
        state.searchQuery
      );
      const sortedIds = applySorting(state.byId, filteredIds, state.sortOrder);

      return {
        ...state,
        filters,
        filteredIds: sortedIds,
      };
    }

    case PROPERTIES_ACTION_TYPES.CLEAR_FILTERS: {
      const filteredIds = applyFilters(
        state.byId,
        state.allIds,
        initialState.filters,
        state.searchQuery
      );
      const sortedIds = applySorting(state.byId, filteredIds, state.sortOrder);

      return {
        ...state,
        filters: initialState.filters,
        filteredIds: sortedIds,
      };
    }

    case PROPERTIES_ACTION_TYPES.SET_SEARCH_QUERY: {
      const { query } = action.payload;
      const filteredIds = applyFilters(
        state.byId,
        state.allIds,
        state.filters,
        query
      );
      const sortedIds = applySorting(state.byId, filteredIds, state.sortOrder);

      return {
        ...state,
        searchQuery: query,
        filteredIds: sortedIds,
      };
    }

    case PROPERTIES_ACTION_TYPES.SET_SORT_ORDER: {
      const { field, direction } = action.payload;
      const sortOrder = { field, direction };
      const sortedIds = applySorting(state.byId, state.filteredIds, sortOrder);

      return {
        ...state,
        sortOrder,
        filteredIds: sortedIds,
      };
    }

    // UI state
    case PROPERTIES_ACTION_TYPES.SET_SELECTED_PROPERTIES:
      return {
        ...state,
        selectedIds: action.payload.ids,
      };

    case PROPERTIES_ACTION_TYPES.TOGGLE_PROPERTY_SELECTION: {
      const { id } = action.payload;
      const selectedIds = state.selectedIds.includes(id)
        ? state.selectedIds.filter((propertyId) => propertyId !== id)
        : [...state.selectedIds, id];

      return {
        ...state,
        selectedIds,
      };
    }

    case PROPERTIES_ACTION_TYPES.CLEAR_SELECTION:
      return {
        ...state,
        selectedIds: [],
      };

    case PROPERTIES_ACTION_TYPES.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload.mode,
      };

    // Real-time updates
    case PROPERTIES_ACTION_TYPES.PROPERTY_UPDATED: {
      const { property } = action.payload;
      const byId = { ...state.byId, [property.id]: property };
      const filteredIds = applyFilters(
        byId,
        state.allIds,
        state.filters,
        state.searchQuery
      );
      const sortedIds = applySorting(byId, filteredIds, state.sortOrder);

      return {
        ...state,
        byId,
        filteredIds: sortedIds,
      };
    }

    case PROPERTIES_ACTION_TYPES.PROPERTY_CREATED: {
      const { property } = action.payload;
      const byId = { ...state.byId, [property.id]: property };
      const allIds = state.allIds.includes(property.id)
        ? state.allIds
        : [...state.allIds, property.id];
      const filteredIds = applyFilters(
        byId,
        allIds,
        state.filters,
        state.searchQuery
      );
      const sortedIds = applySorting(byId, filteredIds, state.sortOrder);

      return {
        ...state,
        byId,
        allIds,
        filteredIds: sortedIds,
      };
    }

    case PROPERTIES_ACTION_TYPES.PROPERTY_DELETED: {
      const { id } = action.payload;
      const { [id]: deletedProperty, ...byId } = state.byId;
      const allIds = state.allIds.filter((propertyId) => propertyId !== id);
      const filteredIds = state.filteredIds.filter(
        (propertyId) => propertyId !== id
      );
      const selectedIds = state.selectedIds.filter(
        (propertyId) => propertyId !== id
      );

      return {
        ...state,
        byId,
        allIds,
        filteredIds,
        selectedIds,
      };
    }

    default:
      return state;
  }
};
