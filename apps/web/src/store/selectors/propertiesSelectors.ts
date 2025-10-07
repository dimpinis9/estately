import { createSelector } from "reselect";
import { PropertiesState, PropertyWithExtras } from "../types";

// Base selectors
const getPropertiesState = (state: any): PropertiesState => state.properties;

// Simple selectors
export const getPropertiesById = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.byId
);

export const getAllPropertyIds = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.allIds
);

export const getFilteredPropertyIds = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.filteredIds
);

export const getPropertiesLoading = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.loading
);

export const getPropertiesError = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.error
);

export const getPropertiesFilters = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.filters
);

export const getPropertiesSearchQuery = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.searchQuery
);

export const getPropertiesSortOrder = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.sortOrder
);

export const getSelectedPropertyIds = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.selectedIds
);

export const getPropertiesViewMode = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.viewMode
);

export const getPropertiesOperations = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.operations
);

// Computed selectors
export const getAllProperties = createSelector(
  [getPropertiesById, getAllPropertyIds],
  (propertiesById, allIds) =>
    allIds.map((id: string) => propertiesById[id]).filter(Boolean)
);

export const getFilteredProperties = createSelector(
  [getPropertiesById, getFilteredPropertyIds],
  (propertiesById, filteredIds) =>
    filteredIds.map((id: string) => propertiesById[id]).filter(Boolean)
);

export const getSelectedProperties = createSelector(
  [getPropertiesById, getSelectedPropertyIds],
  (propertiesById, selectedIds) =>
    selectedIds.map((id: string) => propertiesById[id]).filter(Boolean)
);

// Get property by ID selector factory
export const makeGetPropertyById = () =>
  createSelector(
    [getPropertiesById, (_: any, propertyId: string) => propertyId],
    (propertiesById, propertyId) => propertiesById[propertyId]
  );

// Statistics selectors
export const getPropertiesStats = createSelector(
  [getAllProperties],
  (properties) => {
    const stats = {
      total: properties.length,
      active: 0,
      pending: 0,
      sold: 0,
      rented: 0,
      withdrawn: 0,
      totalValue: 0,
      averagePrice: 0,
    };

    properties.forEach((property: PropertyWithExtras) => {
      const status = property.status?.toLowerCase();
      const price = property.price || 0;

      stats.totalValue += price;

      switch (status) {
        case "active":
        case "available":
          stats.active++;
          break;
        case "pending":
          stats.pending++;
          break;
        case "sold":
          stats.sold++;
          break;
        case "rented":
          stats.rented++;
          break;
        case "withdrawn":
          stats.withdrawn++;
          break;
      }
    });

    stats.averagePrice = stats.total > 0 ? stats.totalValue / stats.total : 0;

    return stats;
  }
);

export const getPropertiesByStatus = createSelector(
  [getAllProperties],
  (properties) => {
    return properties.reduce(
      (
        acc: { [status: string]: PropertyWithExtras[] },
        property: PropertyWithExtras
      ) => {
        const status = property.status || "unknown";
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(property);
        return acc;
      },
      {}
    );
  }
);

export const getPropertiesByType = createSelector(
  [getAllProperties],
  (properties) => {
    return properties.reduce(
      (
        acc: { [type: string]: PropertyWithExtras[] },
        property: PropertyWithExtras
      ) => {
        const type = property.type || "unknown";
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(property);
        return acc;
      },
      {}
    );
  }
);

export const getPropertiesByPriceRange = createSelector(
  [getAllProperties],
  (properties) => {
    const ranges = {
      "under-100k": [] as PropertyWithExtras[],
      "100k-300k": [] as PropertyWithExtras[],
      "300k-500k": [] as PropertyWithExtras[],
      "500k-1m": [] as PropertyWithExtras[],
      "over-1m": [] as PropertyWithExtras[],
    };

    properties.forEach((property: PropertyWithExtras) => {
      const price = property.price || 0;

      if (price < 100000) {
        ranges["under-100k"].push(property);
      } else if (price < 300000) {
        ranges["100k-300k"].push(property);
      } else if (price < 500000) {
        ranges["300k-500k"].push(property);
      } else if (price < 1000000) {
        ranges["500k-1m"].push(property);
      } else {
        ranges["over-1m"].push(property);
      }
    });

    return ranges;
  }
);

export const getRecentProperties = createSelector(
  [getAllProperties],
  (properties) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return properties
      .filter(
        (property: PropertyWithExtras) =>
          new Date(property.created_at || "") >= thirtyDaysAgo
      )
      .sort(
        (a: PropertyWithExtras, b: PropertyWithExtras) =>
          new Date(b.created_at || "").getTime() -
          new Date(a.created_at || "").getTime()
      )
      .slice(0, 10);
  }
);

// Filtered results with search
export const getSearchResults = createSelector(
  [getFilteredProperties, getPropertiesSearchQuery],
  (filteredProperties, searchQuery) => {
    if (!searchQuery.trim()) {
      return filteredProperties;
    }

    const query = searchQuery.toLowerCase();
    return filteredProperties.filter(
      (property: PropertyWithExtras) =>
        property.title?.toLowerCase().includes(query) ||
        property.description?.toLowerCase().includes(query) ||
        property.address?.toLowerCase().includes(query) ||
        property.city?.toLowerCase().includes(query) ||
        property.state?.toLowerCase().includes(query) ||
        property.neighborhood?.toLowerCase().includes(query)
    );
  }
);

// Operation status selectors
export const getIsCreatingProperty = createSelector(
  [getPropertiesOperations],
  (operations) => operations.creating
);

export const getIsUpdatingProperty = (propertyId: string) =>
  createSelector(
    [getPropertiesOperations],
    (operations) => operations.updating[propertyId] || false
  );

export const getIsDeletingProperty = (propertyId: string) =>
  createSelector(
    [getPropertiesOperations],
    (operations) => operations.deleting[propertyId] || false
  );

export const getIsBulkOperating = createSelector(
  [getPropertiesOperations],
  (operations) => operations.bulkOperating
);

export const getIsImporting = createSelector(
  [getPropertiesOperations],
  (operations) => operations.importing
);

export const getIsExporting = createSelector(
  [getPropertiesOperations],
  (operations) => operations.exporting
);

// Pagination selector
export const getPaginatedProperties = createSelector(
  [
    getFilteredProperties,
    (_: any, page: number = 1, limit: number = 20) => ({ page, limit }),
  ],
  (properties, { page, limit }) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: properties.slice(startIndex, endIndex),
      total: properties.length,
      page,
      limit,
      hasMore: endIndex < properties.length,
      totalPages: Math.ceil(properties.length / limit),
    };
  }
);

// Active filters count
export const getActiveFiltersCount = createSelector(
  [getPropertiesFilters, getPropertiesSearchQuery],
  (filters, searchQuery) => {
    let count = 0;

    if (searchQuery.trim()) count++;
    if (filters.status.length > 0) count++;
    if (filters.type.length > 0) count++;
    if (filters.priceRange.min !== null || filters.priceRange.max !== null)
      count++;
    if (
      filters.bedroomsRange.min !== null ||
      filters.bedroomsRange.max !== null
    )
      count++;
    if (
      filters.bathroomsRange.min !== null ||
      filters.bathroomsRange.max !== null
    )
      count++;
    if (filters.location.length > 0) count++;
    if (filters.features.length > 0) count++;

    return count;
  }
);

// Map data for property locations
export const getPropertiesForMap = createSelector(
  [getFilteredProperties],
  (properties) => {
    return properties
      .filter(
        (property: PropertyWithExtras) => property.address && property.city
      )
      .map((property: PropertyWithExtras) => ({
        id: property.id,
        title: property.title,
        price: property.price,
        address: property.address,
        city: property.city,
        state: property.state,
        status: property.status,
        type: property.type,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        image_url: property.image_url,
        // Add coordinates if available
        // lat: property.lat,
        // lng: property.lng,
      }));
  }
);

// Has any properties
export const getHasProperties = createSelector(
  [getAllPropertyIds],
  (allIds) => allIds.length > 0
);

// Has filtered results
export const getHasFilteredResults = createSelector(
  [getFilteredPropertyIds],
  (filteredIds) => filteredIds.length > 0
);

// Last updated timestamp
export const getLastUpdated = createSelector(
  [getPropertiesState],
  (propertiesState) => propertiesState.lastUpdated
);
