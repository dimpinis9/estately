import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ANALYTICS_ACTION_TYPES, analyticsActions } from "./actions";
import {
  DashboardMetrics,
  CustomReport,
  ActivityLog,
  Goal,
  ChartData,
} from "../../types";

// Action interface for typing
interface ReduxAction<T = any> {
  type: string;
  payload: T;
}

// API functions
const api = {
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await fetch("/api/analytics/dashboard");
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard metrics");
    }
    return response.json();
  },

  async trackActivity(
    activityData: Partial<ActivityLog>
  ): Promise<ActivityLog> {
    const response = await fetch("/api/analytics/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activityData),
    });
    if (!response.ok) {
      throw new Error("Failed to track activity");
    }
    return response.json();
  },

  async getActivityLogs(filters?: any): Promise<ActivityLog[]> {
    const params = new URLSearchParams(filters);
    const response = await fetch(`/api/analytics/activity?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch activity logs");
    }
    return response.json();
  },

  async getReports(): Promise<CustomReport[]> {
    const response = await fetch("/api/analytics/reports");
    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }
    return response.json();
  },

  async createReport(reportData: Partial<CustomReport>): Promise<CustomReport> {
    const response = await fetch("/api/analytics/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportData),
    });
    if (!response.ok) {
      throw new Error("Failed to create report");
    }
    return response.json();
  },

  async generateReport(reportId: string, filters?: any): Promise<any> {
    const response = await fetch(
      `/api/analytics/reports/${reportId}/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to generate report");
    }
    return response.json();
  },

  async deleteReport(reportId: string): Promise<void> {
    const response = await fetch(`/api/analytics/reports/${reportId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete report");
    }
  },

  async getGoals(): Promise<Goal[]> {
    const response = await fetch("/api/analytics/goals");
    if (!response.ok) {
      throw new Error("Failed to fetch goals");
    }
    return response.json();
  },

  async createGoal(goalData: Partial<Goal>): Promise<Goal> {
    const response = await fetch("/api/analytics/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goalData),
    });
    if (!response.ok) {
      throw new Error("Failed to create goal");
    }
    return response.json();
  },

  async updateGoal(goalId: string, updates: Partial<Goal>): Promise<Goal> {
    const response = await fetch(`/api/analytics/goals/${goalId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      throw new Error("Failed to update goal");
    }
    return response.json();
  },

  async deleteGoal(goalId: string): Promise<void> {
    const response = await fetch(`/api/analytics/goals/${goalId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete goal");
    }
  },

  async getChartData(chartType: string, filters?: any): Promise<ChartData> {
    const params = new URLSearchParams({ chartType, ...filters });
    const response = await fetch(`/api/analytics/charts?${params}`);
    if (!response.ok) {
      throw new Error("Failed to fetch chart data");
    }
    return response.json();
  },
};

// Sagas
function* fetchDashboardMetricsSaga(): Generator {
  try {
    const metrics: DashboardMetrics = yield call(api.getDashboardMetrics);
    yield put(analyticsActions.fetchDashboardMetricsSuccess(metrics));
  } catch (error: any) {
    yield put(analyticsActions.fetchDashboardMetricsFailure(error.message));
  }
}

function* trackActivitySaga(
  action: ReduxAction<{ activityData: Partial<ActivityLog> }>
): Generator {
  try {
    const { activityData } = action.payload;
    const activity: ActivityLog = yield call(api.trackActivity, activityData);
    yield put(analyticsActions.trackActivitySuccess(activity));
  } catch (error: any) {
    yield put(analyticsActions.trackActivityFailure(error.message));
  }
}

function* fetchActivityLogsSaga(
  action: ReduxAction<{ filters?: any }>
): Generator {
  try {
    const { filters } = action.payload;
    const logs: ActivityLog[] = yield call(api.getActivityLogs, filters);
    yield put(analyticsActions.fetchActivityLogsSuccess(logs));
  } catch (error: any) {
    yield put(analyticsActions.fetchActivityLogsFailure(error.message));
  }
}

function* fetchReportsSaga(): Generator {
  try {
    const reports: CustomReport[] = yield call(api.getReports);
    yield put(analyticsActions.fetchReportsSuccess(reports));
  } catch (error: any) {
    yield put(analyticsActions.fetchReportsFailure(error.message));
  }
}

function* createReportSaga(
  action: ReduxAction<{ reportData: Partial<CustomReport> }>
): Generator {
  try {
    const { reportData } = action.payload;
    const report: CustomReport = yield call(api.createReport, reportData);
    yield put(analyticsActions.createReportSuccess(report));
  } catch (error: any) {
    yield put(analyticsActions.createReportFailure(error.message));
  }
}

function* generateReportSaga(
  action: ReduxAction<{ reportId: string; filters?: any }>
): Generator {
  try {
    const { reportId, filters } = action.payload;
    const data: any = yield call(api.generateReport, reportId, filters);
    yield put(analyticsActions.generateReportSuccess(reportId, data));
  } catch (error: any) {
    yield put(analyticsActions.generateReportFailure(error.message));
  }
}

function* deleteReportSaga(
  action: ReduxAction<{ reportId: string }>
): Generator {
  try {
    const { reportId } = action.payload;
    yield call(api.deleteReport, reportId);
    yield put(analyticsActions.deleteReportSuccess(reportId));
  } catch (error: any) {
    yield put(analyticsActions.deleteReportFailure(error.message));
  }
}

function* fetchGoalsSaga(): Generator {
  try {
    const goals: Goal[] = yield call(api.getGoals);
    yield put(analyticsActions.fetchGoalsSuccess(goals));
  } catch (error: any) {
    yield put(analyticsActions.fetchGoalsFailure(error.message));
  }
}

function* createGoalSaga(
  action: ReduxAction<{ goalData: Partial<Goal> }>
): Generator {
  try {
    const { goalData } = action.payload;
    const goal: Goal = yield call(api.createGoal, goalData);
    yield put(analyticsActions.createGoalSuccess(goal));
  } catch (error: any) {
    yield put(analyticsActions.createGoalFailure(error.message));
  }
}

function* updateGoalSaga(
  action: ReduxAction<{ goalId: string; updates: Partial<Goal> }>
): Generator {
  try {
    const { goalId, updates } = action.payload;
    const goal: Goal = yield call(api.updateGoal, goalId, updates);
    yield put(analyticsActions.updateGoalSuccess(goal));
  } catch (error: any) {
    yield put(analyticsActions.updateGoalFailure(error.message));
  }
}

function* deleteGoalSaga(action: ReduxAction<{ goalId: string }>): Generator {
  try {
    const { goalId } = action.payload;
    yield call(api.deleteGoal, goalId);
    yield put(analyticsActions.deleteGoalSuccess(goalId));
  } catch (error: any) {
    yield put(analyticsActions.deleteGoalFailure(error.message));
  }
}

function* fetchChartDataSaga(
  action: ReduxAction<{ chartType: string; filters?: any }>
): Generator {
  try {
    const { chartType, filters } = action.payload;
    const data: ChartData = yield call(api.getChartData, chartType, filters);
    yield put(analyticsActions.fetchChartDataSuccess(chartType, data));
  } catch (error: any) {
    yield put(analyticsActions.fetchChartDataFailure(error.message));
  }
}

// Root analytics saga
export function* analyticsSaga() {
  yield takeLatest(
    ANALYTICS_ACTION_TYPES.FETCH_DASHBOARD_METRICS_REQUEST,
    fetchDashboardMetricsSaga
  );
  yield takeEvery(
    ANALYTICS_ACTION_TYPES.TRACK_ACTIVITY_REQUEST,
    trackActivitySaga
  );
  yield takeEvery(
    ANALYTICS_ACTION_TYPES.FETCH_ACTIVITY_LOGS_REQUEST,
    fetchActivityLogsSaga
  );
  yield takeLatest(
    ANALYTICS_ACTION_TYPES.FETCH_REPORTS_REQUEST,
    fetchReportsSaga
  );
  yield takeEvery(
    ANALYTICS_ACTION_TYPES.CREATE_REPORT_REQUEST,
    createReportSaga
  );
  yield takeEvery(
    ANALYTICS_ACTION_TYPES.GENERATE_REPORT_REQUEST,
    generateReportSaga
  );
  yield takeEvery(
    ANALYTICS_ACTION_TYPES.DELETE_REPORT_REQUEST,
    deleteReportSaga
  );
  yield takeLatest(ANALYTICS_ACTION_TYPES.FETCH_GOALS_REQUEST, fetchGoalsSaga);
  yield takeEvery(ANALYTICS_ACTION_TYPES.CREATE_GOAL_REQUEST, createGoalSaga);
  yield takeEvery(ANALYTICS_ACTION_TYPES.UPDATE_GOAL_REQUEST, updateGoalSaga);
  yield takeEvery(ANALYTICS_ACTION_TYPES.DELETE_GOAL_REQUEST, deleteGoalSaga);
  yield takeEvery(
    ANALYTICS_ACTION_TYPES.FETCH_CHART_DATA_REQUEST,
    fetchChartDataSaga
  );
}
