import {
  DashboardMetrics,
  CustomReport,
  ActivityLog,
  Goal,
  ChartData,
  ReportFilter,
} from "../../types";

// Action types
export const ANALYTICS_ACTION_TYPES = {
  // Dashboard metrics
  FETCH_DASHBOARD_METRICS_REQUEST: "FETCH_DASHBOARD_METRICS_REQUEST",
  FETCH_DASHBOARD_METRICS_SUCCESS: "FETCH_DASHBOARD_METRICS_SUCCESS",
  FETCH_DASHBOARD_METRICS_FAILURE: "FETCH_DASHBOARD_METRICS_FAILURE",

  // Activity logs
  FETCH_ACTIVITY_LOGS_REQUEST: "FETCH_ACTIVITY_LOGS_REQUEST",
  FETCH_ACTIVITY_LOGS_SUCCESS: "FETCH_ACTIVITY_LOGS_SUCCESS",
  FETCH_ACTIVITY_LOGS_FAILURE: "FETCH_ACTIVITY_LOGS_FAILURE",

  // Track activity
  TRACK_ACTIVITY_REQUEST: "TRACK_ACTIVITY_REQUEST",
  TRACK_ACTIVITY_SUCCESS: "TRACK_ACTIVITY_SUCCESS",
  TRACK_ACTIVITY_FAILURE: "TRACK_ACTIVITY_FAILURE",

  // Reports
  FETCH_REPORTS_REQUEST: "FETCH_REPORTS_REQUEST",
  FETCH_REPORTS_SUCCESS: "FETCH_REPORTS_SUCCESS",
  FETCH_REPORTS_FAILURE: "FETCH_REPORTS_FAILURE",

  CREATE_REPORT_REQUEST: "CREATE_REPORT_REQUEST",
  CREATE_REPORT_SUCCESS: "CREATE_REPORT_SUCCESS",
  CREATE_REPORT_FAILURE: "CREATE_REPORT_FAILURE",

  GENERATE_REPORT_REQUEST: "GENERATE_REPORT_REQUEST",
  GENERATE_REPORT_SUCCESS: "GENERATE_REPORT_SUCCESS",
  GENERATE_REPORT_FAILURE: "GENERATE_REPORT_FAILURE",

  DELETE_REPORT_REQUEST: "DELETE_REPORT_REQUEST",
  DELETE_REPORT_SUCCESS: "DELETE_REPORT_SUCCESS",
  DELETE_REPORT_FAILURE: "DELETE_REPORT_FAILURE",

  // Goals
  FETCH_GOALS_REQUEST: "FETCH_GOALS_REQUEST",
  FETCH_GOALS_SUCCESS: "FETCH_GOALS_SUCCESS",
  FETCH_GOALS_FAILURE: "FETCH_GOALS_FAILURE",

  CREATE_GOAL_REQUEST: "CREATE_GOAL_REQUEST",
  CREATE_GOAL_SUCCESS: "CREATE_GOAL_SUCCESS",
  CREATE_GOAL_FAILURE: "CREATE_GOAL_FAILURE",

  UPDATE_GOAL_REQUEST: "UPDATE_GOAL_REQUEST",
  UPDATE_GOAL_SUCCESS: "UPDATE_GOAL_SUCCESS",
  UPDATE_GOAL_FAILURE: "UPDATE_GOAL_FAILURE",

  DELETE_GOAL_REQUEST: "DELETE_GOAL_REQUEST",
  DELETE_GOAL_SUCCESS: "DELETE_GOAL_SUCCESS",
  DELETE_GOAL_FAILURE: "DELETE_GOAL_FAILURE",

  // Charts
  FETCH_CHART_DATA_REQUEST: "FETCH_CHART_DATA_REQUEST",
  FETCH_CHART_DATA_SUCCESS: "FETCH_CHART_DATA_SUCCESS",
  FETCH_CHART_DATA_FAILURE: "FETCH_CHART_DATA_FAILURE",

  // KPI Snapshots
  CREATE_KPI_SNAPSHOT_REQUEST: "CREATE_KPI_SNAPSHOT_REQUEST",
  CREATE_KPI_SNAPSHOT_SUCCESS: "CREATE_KPI_SNAPSHOT_SUCCESS",
  CREATE_KPI_SNAPSHOT_FAILURE: "CREATE_KPI_SNAPSHOT_FAILURE",
} as const;

// Action creators
export const analyticsActions = {
  // Dashboard metrics
  fetchDashboardMetricsRequest: () => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_DASHBOARD_METRICS_REQUEST,
  }),

  fetchDashboardMetricsSuccess: (metrics: DashboardMetrics) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_DASHBOARD_METRICS_SUCCESS,
    payload: { metrics },
  }),

  fetchDashboardMetricsFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_DASHBOARD_METRICS_FAILURE,
    payload: { error },
  }),

  // Activity logs
  fetchActivityLogsRequest: (filters?: any) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_ACTIVITY_LOGS_REQUEST,
    payload: { filters },
  }),

  fetchActivityLogsSuccess: (logs: ActivityLog[]) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_ACTIVITY_LOGS_SUCCESS,
    payload: { logs },
  }),

  fetchActivityLogsFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_ACTIVITY_LOGS_FAILURE,
    payload: { error },
  }),

  // Track activity
  trackActivityRequest: (activityData: Partial<ActivityLog>) => ({
    type: ANALYTICS_ACTION_TYPES.TRACK_ACTIVITY_REQUEST,
    payload: { activityData },
  }),

  trackActivitySuccess: (activity: ActivityLog) => ({
    type: ANALYTICS_ACTION_TYPES.TRACK_ACTIVITY_SUCCESS,
    payload: { activity },
  }),

  trackActivityFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.TRACK_ACTIVITY_FAILURE,
    payload: { error },
  }),

  // Reports
  fetchReportsRequest: () => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_REPORTS_REQUEST,
  }),

  fetchReportsSuccess: (reports: CustomReport[]) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_REPORTS_SUCCESS,
    payload: { reports },
  }),

  fetchReportsFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_REPORTS_FAILURE,
    payload: { error },
  }),

  createReportRequest: (reportData: Partial<CustomReport>) => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_REPORT_REQUEST,
    payload: { reportData },
  }),

  createReportSuccess: (report: CustomReport) => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_REPORT_SUCCESS,
    payload: { report },
  }),

  createReportFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_REPORT_FAILURE,
    payload: { error },
  }),

  generateReportRequest: (reportId: string, filters?: ReportFilter) => ({
    type: ANALYTICS_ACTION_TYPES.GENERATE_REPORT_REQUEST,
    payload: { reportId, filters },
  }),

  generateReportSuccess: (reportId: string, data: any) => ({
    type: ANALYTICS_ACTION_TYPES.GENERATE_REPORT_SUCCESS,
    payload: { reportId, data },
  }),

  generateReportFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.GENERATE_REPORT_FAILURE,
    payload: { error },
  }),

  deleteReportRequest: (reportId: string) => ({
    type: ANALYTICS_ACTION_TYPES.DELETE_REPORT_REQUEST,
    payload: { reportId },
  }),

  deleteReportSuccess: (reportId: string) => ({
    type: ANALYTICS_ACTION_TYPES.DELETE_REPORT_SUCCESS,
    payload: { reportId },
  }),

  deleteReportFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.DELETE_REPORT_FAILURE,
    payload: { error },
  }),

  // Goals
  fetchGoalsRequest: () => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_GOALS_REQUEST,
  }),

  fetchGoalsSuccess: (goals: Goal[]) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_GOALS_SUCCESS,
    payload: { goals },
  }),

  fetchGoalsFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_GOALS_FAILURE,
    payload: { error },
  }),

  createGoalRequest: (goalData: Partial<Goal>) => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_GOAL_REQUEST,
    payload: { goalData },
  }),

  createGoalSuccess: (goal: Goal) => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_GOAL_SUCCESS,
    payload: { goal },
  }),

  createGoalFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_GOAL_FAILURE,
    payload: { error },
  }),

  updateGoalRequest: (goalId: string, updates: Partial<Goal>) => ({
    type: ANALYTICS_ACTION_TYPES.UPDATE_GOAL_REQUEST,
    payload: { goalId, updates },
  }),

  updateGoalSuccess: (goal: Goal) => ({
    type: ANALYTICS_ACTION_TYPES.UPDATE_GOAL_SUCCESS,
    payload: { goal },
  }),

  updateGoalFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.UPDATE_GOAL_FAILURE,
    payload: { error },
  }),

  deleteGoalRequest: (goalId: string) => ({
    type: ANALYTICS_ACTION_TYPES.DELETE_GOAL_REQUEST,
    payload: { goalId },
  }),

  deleteGoalSuccess: (goalId: string) => ({
    type: ANALYTICS_ACTION_TYPES.DELETE_GOAL_SUCCESS,
    payload: { goalId },
  }),

  deleteGoalFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.DELETE_GOAL_FAILURE,
    payload: { error },
  }),

  // Charts
  fetchChartDataRequest: (chartType: string, filters?: any) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_CHART_DATA_REQUEST,
    payload: { chartType, filters },
  }),

  fetchChartDataSuccess: (chartType: string, data: ChartData) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_CHART_DATA_SUCCESS,
    payload: { chartType, data },
  }),

  fetchChartDataFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.FETCH_CHART_DATA_FAILURE,
    payload: { error },
  }),

  // KPI Snapshots
  createKPISnapshotRequest: () => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_KPI_SNAPSHOT_REQUEST,
  }),

  createKPISnapshotSuccess: () => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_KPI_SNAPSHOT_SUCCESS,
  }),

  createKPISnapshotFailure: (error: string) => ({
    type: ANALYTICS_ACTION_TYPES.CREATE_KPI_SNAPSHOT_FAILURE,
    payload: { error },
  }),
};

// Action type for the reducer
export type AnalyticsAction = ReturnType<
  (typeof analyticsActions)[keyof typeof analyticsActions]
>;
