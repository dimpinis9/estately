import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { leadsReducer } from "./slices/leads/reducer";
import { propertiesReducer } from "./slices/properties/reducer";
import { analyticsReducer } from "./slices/analytics/reducer";
import { leadsSaga } from "./slices/leads/sagas";
import { propertiesSaga } from "./slices/properties/sagas";
import { analyticsSaga } from "./slices/analytics/sagas";
import { LeadsActionTypes } from "./slices/leads/actions";
import { PropertiesAction } from "./slices/properties/actions";
import { AnalyticsAction } from "./slices/analytics/actions";

// Union of all action types
export type RootAction = LeadsActionTypes | PropertiesAction | AnalyticsAction;

// Root reducer
export const rootReducer = combineReducers({
  leads: leadsReducer,
  properties: propertiesReducer,
  analytics: analyticsReducer,
  // appointments: appointmentsReducer, // Will add this next
});

// Root saga
export function* rootSaga() {
  yield all([
    fork(leadsSaga),
    fork(propertiesSaga),
    fork(analyticsSaga),
    // fork(appointmentsSaga), // Will add this next
  ]);
}

// Root state type
export type RootState = ReturnType<typeof rootReducer>;
