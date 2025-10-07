import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay,
} from "redux-saga/effects";
import { LEADS_ACTION_TYPES, leadsActions } from "./actions";
import { LeadWithExtras, BulkOperation, ImportResult } from "../../types";

// Action interface for typing
interface ReduxAction<T = any> {
  type: string;
  payload: T;
}

// API functions
const api = {
  async getLeads(): Promise<LeadWithExtras[]> {
    const response = await fetch("/api/leads");
    if (!response.ok) {
      throw new Error("Failed to fetch leads");
    }
    return response.json();
  },

  async getLead(id: string): Promise<LeadWithExtras> {
    const response = await fetch(`/api/leads/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch lead");
    }
    return response.json();
  },

  async createLead(leadData: Partial<LeadWithExtras>): Promise<LeadWithExtras> {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create lead");
    }
    return response.json();
  },

  async updateLead(
    id: string,
    updates: Partial<LeadWithExtras>
  ): Promise<LeadWithExtras> {
    const response = await fetch(`/api/leads/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update lead");
    }
    return response.json();
  },

  async deleteLead(id: string): Promise<void> {
    const response = await fetch(`/api/leads/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete lead");
    }
  },

  async bulkOperation(operation: BulkOperation): Promise<any> {
    const response = await fetch("/api/leads/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(operation),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Bulk operation failed");
    }
    return response.json();
  },

  async importLeads(file: File): Promise<ImportResult> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/leads/import", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Import failed");
    }
    return response.json();
  },
};

// Sagas
function* fetchLeadsSaga(action: ReduxAction<{ filters?: any }>) {
  try {
    const leads: LeadWithExtras[] = yield call(api.getLeads);
    yield put(leadsActions.fetchLeadsSuccess(leads));
  } catch (error: any) {
    yield put(leadsActions.fetchLeadsFailure(error.message));
  }
}

function* fetchLeadSaga(action: ReduxAction<{ id: string }>) {
  try {
    const { id } = action.payload;
    const lead: LeadWithExtras = yield call(api.getLead, id);
    yield put(leadsActions.fetchLeadSuccess(lead));
  } catch (error: any) {
    yield put(leadsActions.fetchLeadFailure(error.message));
  }
}

function* createLeadSaga(
  action: ReduxAction<{ leadData: Partial<LeadWithExtras> }>
) {
  try {
    const { leadData } = action.payload;
    const lead: LeadWithExtras = yield call(api.createLead, leadData);
    yield put(leadsActions.createLeadSuccess(lead));

    // Show success message (you can integrate with toast/notification system)
    console.log("Lead created successfully:", lead.name);
  } catch (error: any) {
    yield put(leadsActions.createLeadFailure(error.message));
  }
}

function* updateLeadSaga(
  action: ReduxAction<{ id: string; updates: Partial<LeadWithExtras> }>
) {
  try {
    const { id, updates } = action.payload;
    const lead: LeadWithExtras = yield call(api.updateLead, id, updates);
    yield put(leadsActions.updateLeadSuccess(lead));

    console.log("Lead updated successfully:", lead.name);
  } catch (error: any) {
    yield put(leadsActions.updateLeadFailure(error.message));
  }
}

function* deleteLeadSaga(action: ReduxAction<{ id: string }>) {
  try {
    const { id } = action.payload;
    yield call(api.deleteLead, id);
    yield put(leadsActions.deleteLeadSuccess(id));

    console.log("Lead deleted successfully");
  } catch (error: any) {
    yield put(leadsActions.deleteLeadFailure(error.message));
  }
}

function* bulkOperationSaga(
  action: ReduxAction<{ operation: BulkOperation }>
): Generator {
  try {
    const { operation } = action.payload;

    // Show progress for large operations
    if (operation.ids.length > 10) {
      console.log(
        `Processing ${operation.type} operation for ${operation.ids.length} leads...`
      );
    }

    const result: any = yield call(api.bulkOperation, operation);
    yield put(leadsActions.bulkOperationSuccess(operation, result));

    console.log(`Bulk ${operation.type} completed successfully`);

    // If it's a delete operation, we don't need to refetch
    // The reducer handles the state update
    if (operation.type !== "delete") {
      // For update operations, we might want to refetch to ensure consistency
      yield put(leadsActions.fetchLeadsRequest());
    }
  } catch (error: any) {
    yield put(leadsActions.bulkOperationFailure(error.message));
  }
}

function* importLeadsSaga(action: ReduxAction<{ file: File }>) {
  try {
    const { file } = action.payload;
    console.log("Starting lead import...");

    const result: ImportResult = yield call(api.importLeads, file);
    yield put(leadsActions.importLeadsSuccess(result));

    console.log(
      `Import completed: ${result.successful}/${result.total} leads imported`
    );

    // Refetch leads to show imported data
    yield put(leadsActions.fetchLeadsRequest());
  } catch (error: any) {
    yield put(leadsActions.importLeadsFailure(error.message));
  }
}

// Optimistic update saga - for real-time UI updates
function* optimisticUpdateLeadSaga(
  action: ReduxAction<{ id: string; updates: Partial<LeadWithExtras> }>
) {
  try {
    const { id, updates } = action.payload;

    // First, update the UI optimistically
    const currentLead: LeadWithExtras | undefined = yield select(
      (state: any) => state.leads.byId[id]
    );

    if (currentLead) {
      const optimisticLead = { ...currentLead, ...updates };
      yield put(leadsActions.updateLeadSuccess(optimisticLead));
    }

    // Then make the API call
    const lead: LeadWithExtras = yield call(api.updateLead, id, updates);

    // Update with real data from server
    yield put(leadsActions.updateLeadSuccess(lead));
  } catch (error: any) {
    // On error, revert optimistic update by refetching
    yield put(leadsActions.fetchLeadRequest(action.payload.id));
    yield put(leadsActions.updateLeadFailure(error.message));
  }
}

// Auto-refresh saga - refresh leads every 5 minutes
function* autoRefreshSaga() {
  while (true) {
    yield delay(5 * 60 * 1000); // 5 minutes

    // Only refresh if there are no ongoing operations
    const isLoading: boolean = yield select(
      (state: any) => state.leads.loading
    );
    if (!isLoading) {
      yield put(leadsActions.fetchLeadsRequest());
    }
  }
}

// Root leads saga
export function* leadsSaga() {
  yield takeLatest(LEADS_ACTION_TYPES.FETCH_LEADS_REQUEST, fetchLeadsSaga);
  yield takeEvery(LEADS_ACTION_TYPES.FETCH_LEAD_REQUEST, fetchLeadSaga);
  yield takeEvery(LEADS_ACTION_TYPES.CREATE_LEAD_REQUEST, createLeadSaga);
  yield takeEvery(LEADS_ACTION_TYPES.UPDATE_LEAD_REQUEST, updateLeadSaga);
  yield takeEvery(LEADS_ACTION_TYPES.DELETE_LEAD_REQUEST, deleteLeadSaga);
  yield takeEvery(LEADS_ACTION_TYPES.BULK_OPERATION_REQUEST, bulkOperationSaga);
  yield takeEvery(LEADS_ACTION_TYPES.IMPORT_LEADS_REQUEST, importLeadsSaga);

  // Start auto-refresh
  // yield fork(autoRefreshSaga);
}
