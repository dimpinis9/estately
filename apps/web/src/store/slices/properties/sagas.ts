import {
  call,
  put,
  takeEvery,
  takeLatest,
  select,
  delay,
} from "redux-saga/effects";
import { PROPERTIES_ACTION_TYPES, propertiesActions } from "./actions";
import { PropertyWithExtras, BulkOperation, ImportResult } from "../../types";

// Action interface for typing
interface ReduxAction<T = any> {
  type: string;
  payload: T;
}

// API functions
const api = {
  async getProperties(): Promise<PropertyWithExtras[]> {
    const response = await fetch("/api/properties");
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  },

  async getProperty(id: string): Promise<PropertyWithExtras> {
    const response = await fetch(`/api/properties/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }
    return response.json();
  },

  async createProperty(
    propertyData: Partial<PropertyWithExtras>
  ): Promise<PropertyWithExtras> {
    const response = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create property");
    }
    return response.json();
  },

  async updateProperty(
    id: string,
    updates: Partial<PropertyWithExtras>
  ): Promise<PropertyWithExtras> {
    const response = await fetch(`/api/properties/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update property");
    }
    return response.json();
  },

  async deleteProperty(id: string): Promise<void> {
    const response = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete property");
    }
  },

  async bulkOperation(operation: BulkOperation): Promise<any> {
    const response = await fetch("/api/properties/bulk", {
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

  async importProperties(file: File): Promise<ImportResult> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/properties/import", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Import failed");
    }
    return response.json();
  },

  async exportProperties(
    format: "csv" | "excel",
    filters?: any
  ): Promise<string> {
    const response = await fetch("/api/properties/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ format, filters }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Export failed");
    }
    const result = await response.json();
    return result.downloadUrl;
  },
};

// Sagas
function* fetchPropertiesSaga(action: ReduxAction<{ filters?: any }>) {
  try {
    const properties: PropertyWithExtras[] = yield call(api.getProperties);
    yield put(propertiesActions.fetchPropertiesSuccess(properties));
  } catch (error: any) {
    yield put(propertiesActions.fetchPropertiesFailure(error.message));
  }
}

function* fetchPropertySaga(action: ReduxAction<{ id: string }>) {
  try {
    const { id } = action.payload;
    const property: PropertyWithExtras = yield call(api.getProperty, id);
    yield put(propertiesActions.fetchPropertySuccess(property));
  } catch (error: any) {
    yield put(propertiesActions.fetchPropertyFailure(error.message));
  }
}

function* createPropertySaga(
  action: ReduxAction<{ propertyData: Partial<PropertyWithExtras> }>
) {
  try {
    const { propertyData } = action.payload;
    const property: PropertyWithExtras = yield call(
      api.createProperty,
      propertyData
    );
    yield put(propertiesActions.createPropertySuccess(property));

    console.log("Property created successfully:", property.title);
  } catch (error: any) {
    yield put(propertiesActions.createPropertyFailure(error.message));
  }
}

function* updatePropertySaga(
  action: ReduxAction<{ id: string; updates: Partial<PropertyWithExtras> }>
) {
  try {
    const { id, updates } = action.payload;
    const property: PropertyWithExtras = yield call(
      api.updateProperty,
      id,
      updates
    );
    yield put(propertiesActions.updatePropertySuccess(property));

    console.log("Property updated successfully:", property.title);
  } catch (error: any) {
    yield put(propertiesActions.updatePropertyFailure(error.message));
  }
}

function* deletePropertySaga(action: ReduxAction<{ id: string }>) {
  try {
    const { id } = action.payload;
    yield call(api.deleteProperty, id);
    yield put(propertiesActions.deletePropertySuccess(id));

    console.log("Property deleted successfully");
  } catch (error: any) {
    yield put(propertiesActions.deletePropertyFailure(error.message));
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
        `Processing ${operation.type} operation for ${operation.ids.length} properties...`
      );
    }

    const result: any = yield call(api.bulkOperation, operation);
    yield put(propertiesActions.bulkOperationSuccess(operation, result));

    console.log(`Bulk ${operation.type} completed successfully`);

    // If it's a delete operation, we don't need to refetch
    // The reducer handles the state update
    if (operation.type !== "delete") {
      // For update operations, we might want to refetch to ensure consistency
      yield put(propertiesActions.fetchPropertiesRequest());
    }
  } catch (error: any) {
    yield put(propertiesActions.bulkOperationFailure(error.message));
  }
}

function* importPropertiesSaga(action: ReduxAction<{ file: File }>) {
  try {
    const { file } = action.payload;
    console.log("Starting property import...");

    const result: ImportResult = yield call(api.importProperties, file);
    yield put(propertiesActions.importPropertiesSuccess(result));

    console.log(
      `Import completed: ${result.successful}/${result.total} properties imported`
    );

    // Refetch properties to show imported data
    yield put(propertiesActions.fetchPropertiesRequest());
  } catch (error: any) {
    yield put(propertiesActions.importPropertiesFailure(error.message));
  }
}

function* exportPropertiesSaga(
  action: ReduxAction<{ format: "csv" | "excel"; filters?: any }>
) {
  try {
    const { format, filters } = action.payload;
    console.log(`Starting property export in ${format} format...`);

    const downloadUrl: string = yield call(
      api.exportProperties,
      format,
      filters
    );
    yield put(propertiesActions.exportPropertiesSuccess(downloadUrl));

    console.log("Export completed successfully");

    // Trigger download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `properties_export.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error: any) {
    yield put(propertiesActions.exportPropertiesFailure(error.message));
  }
}

// Optimistic update saga - for real-time UI updates
function* optimisticUpdatePropertySaga(
  action: ReduxAction<{ id: string; updates: Partial<PropertyWithExtras> }>
) {
  try {
    const { id, updates } = action.payload;

    // First, update the UI optimistically
    const currentProperty: PropertyWithExtras | undefined = yield select(
      (state: any) => state.properties.byId[id]
    );

    if (currentProperty) {
      const optimisticProperty = { ...currentProperty, ...updates };
      yield put(propertiesActions.updatePropertySuccess(optimisticProperty));
    }

    // Then make the API call
    const property: PropertyWithExtras = yield call(
      api.updateProperty,
      id,
      updates
    );

    // Update with real data from server
    yield put(propertiesActions.updatePropertySuccess(property));
  } catch (error: any) {
    // On error, revert optimistic update by refetching
    yield put(propertiesActions.fetchPropertyRequest(action.payload.id));
    yield put(propertiesActions.updatePropertyFailure(error.message));
  }
}

// Auto-refresh saga - refresh properties every 10 minutes
function* autoRefreshSaga() {
  while (true) {
    yield delay(10 * 60 * 1000); // 10 minutes

    // Only refresh if there are no ongoing operations
    const isLoading: boolean = yield select(
      (state: any) => state.properties.loading
    );
    const isBulkOperating: boolean = yield select(
      (state: any) => state.properties.operations.bulkOperating
    );

    if (!isLoading && !isBulkOperating) {
      yield put(propertiesActions.fetchPropertiesRequest());
    }
  }
}

// Root properties saga
export function* propertiesSaga() {
  yield takeLatest(
    PROPERTIES_ACTION_TYPES.FETCH_PROPERTIES_REQUEST,
    fetchPropertiesSaga
  );
  yield takeEvery(
    PROPERTIES_ACTION_TYPES.FETCH_PROPERTY_REQUEST,
    fetchPropertySaga
  );
  yield takeEvery(
    PROPERTIES_ACTION_TYPES.CREATE_PROPERTY_REQUEST,
    createPropertySaga
  );
  yield takeEvery(
    PROPERTIES_ACTION_TYPES.UPDATE_PROPERTY_REQUEST,
    updatePropertySaga
  );
  yield takeEvery(
    PROPERTIES_ACTION_TYPES.DELETE_PROPERTY_REQUEST,
    deletePropertySaga
  );
  yield takeEvery(
    PROPERTIES_ACTION_TYPES.BULK_OPERATION_REQUEST,
    bulkOperationSaga
  );
  yield takeEvery(
    PROPERTIES_ACTION_TYPES.IMPORT_PROPERTIES_REQUEST,
    importPropertiesSaga
  );
  yield takeEvery(
    PROPERTIES_ACTION_TYPES.EXPORT_PROPERTIES_REQUEST,
    exportPropertiesSaga
  );
  yield takeEvery(
    PROPERTIES_ACTION_TYPES.OPTIMISTIC_UPDATE_PROPERTY,
    optimisticUpdatePropertySaga
  );

  // Start auto-refresh (uncomment if needed)
  // yield fork(autoRefreshSaga);
}
