import { createSelector } from "reselect";
import { LeadsState, LeadWithExtras } from "../types";

// Base selectors
const getLeadsState = (state: any): LeadsState => state.leads;

// Simple selectors
export const getLeadsById = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.byId
);

export const getAllLeadIds = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.allIds
);

export const getFilteredLeadIds = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.filteredIds
);

export const getLeadsLoading = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.loading
);

export const getLeadsError = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.error
);

export const getLeadsFilters = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.filters
);

export const getLeadsSearchQuery = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.searchQuery
);

export const getLeadsSortOrder = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.sortOrder
);

export const getSelectedLeadIds = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.selectedIds
);

export const getLeadsOperations = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.operations
);

// Computed selectors
export const getAllLeads = createSelector(
  [getLeadsById, getAllLeadIds],
  (leadsById, allIds) => allIds.map((id) => leadsById[id]).filter(Boolean)
);

export const getFilteredLeads = createSelector(
  [getLeadsById, getFilteredLeadIds],
  (leadsById, filteredIds) =>
    filteredIds.map((id) => leadsById[id]).filter(Boolean)
);

export const getSelectedLeads = createSelector(
  [getLeadsById, getSelectedLeadIds],
  (leadsById, selectedIds) =>
    selectedIds.map((id) => leadsById[id]).filter(Boolean)
);

// Get lead by ID selector factory
export const makeGetLeadById = () =>
  createSelector(
    [getLeadsById, (_: any, leadId: string) => leadId],
    (leadsById, leadId) => leadsById[leadId]
  );

// Statistics selectors
export const getLeadsStats = createSelector([getAllLeads], (leads) => {
  const stats = {
    total: leads.length,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0,
  };

  leads.forEach((lead) => {
    const status = lead.status?.toLowerCase();
    switch (status) {
      case "new":
        stats.new++;
        break;
      case "contacted":
        stats.contacted++;
        break;
      case "qualified":
        stats.qualified++;
        break;
      case "converted":
        stats.converted++;
        break;
      case "lost":
        stats.lost++;
        break;
    }
  });

  return stats;
});

export const getLeadsByStatus = createSelector([getAllLeads], (leads) => {
  return leads.reduce((acc, lead) => {
    const status = lead.status || "unknown";
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(lead);
    return acc;
  }, {} as { [status: string]: LeadWithExtras[] });
});

export const getLeadsBySource = createSelector([getAllLeads], (leads) => {
  return leads.reduce((acc, lead) => {
    const source = lead.source || "unknown";
    if (!acc[source]) {
      acc[source] = [];
    }
    acc[source].push(lead);
    return acc;
  }, {} as { [source: string]: LeadWithExtras[] });
});

export const getRecentLeads = createSelector([getAllLeads], (leads) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return leads
    .filter((lead) => new Date(lead.created_at || "") >= thirtyDaysAgo)
    .sort(
      (a, b) =>
        new Date(b.created_at || "").getTime() -
        new Date(a.created_at || "").getTime()
    )
    .slice(0, 10);
});

// Filtered results with search
export const getSearchResults = createSelector(
  [getFilteredLeads, getLeadsSearchQuery],
  (filteredLeads, searchQuery) => {
    if (!searchQuery.trim()) {
      return filteredLeads;
    }

    const query = searchQuery.toLowerCase();
    return filteredLeads.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(query) ||
        lead.email?.toLowerCase().includes(query) ||
        lead.phone?.includes(query) ||
        lead.notes?.toLowerCase().includes(query)
    );
  }
);

// Operation status selectors
export const getIsCreatingLead = createSelector(
  [getLeadsOperations],
  (operations) => operations.creating
);

export const getIsUpdatingLead = (leadId: string) =>
  createSelector(
    [getLeadsOperations],
    (operations) => operations.updating[leadId] || false
  );

export const getIsDeletingLead = (leadId: string) =>
  createSelector(
    [getLeadsOperations],
    (operations) => operations.deleting[leadId] || false
  );

export const getIsBulkOperating = createSelector(
  [getLeadsOperations],
  (operations) => operations.bulkOperating
);

export const getIsImporting = createSelector(
  [getLeadsOperations],
  (operations) => operations.importing
);

export const getIsExporting = createSelector(
  [getLeadsOperations],
  (operations) => operations.exporting
);

// Pagination selector
export const getPaginatedLeads = createSelector(
  [
    getFilteredLeads,
    (_: any, page: number = 1, limit: number = 20) => ({ page, limit }),
  ],
  (leads, { page, limit }) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: leads.slice(startIndex, endIndex),
      total: leads.length,
      page,
      limit,
      hasMore: endIndex < leads.length,
      totalPages: Math.ceil(leads.length / limit),
    };
  }
);

// Active filters count
export const getActiveFiltersCount = createSelector(
  [getLeadsFilters, getLeadsSearchQuery],
  (filters, searchQuery) => {
    let count = 0;

    if (searchQuery.trim()) count++;
    if (filters.status.length > 0) count++;
    if (filters.source.length > 0) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;

    return count;
  }
);

// Has any leads
export const getHasLeads = createSelector(
  [getAllLeadIds],
  (allIds) => allIds.length > 0
);

// Has filtered results
export const getHasFilteredResults = createSelector(
  [getFilteredLeadIds],
  (filteredIds) => filteredIds.length > 0
);

// Last updated timestamp
export const getLastUpdated = createSelector(
  [getLeadsState],
  (leadsState) => leadsState.lastUpdated
);
