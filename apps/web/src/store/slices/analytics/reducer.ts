import { AnalyticsState } from "../../types";
import { ANALYTICS_ACTION_TYPES, AnalyticsAction } from "./actions";

// Initial state
const initialState: AnalyticsState = {
  dashboard: {
    metrics: null,
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reports: {
    list: [],
    current: null,
    data: null,
    loading: false,
    error: null,
  },
  activity: {
    logs: [],
    loading: false,
    error: null,
  },
  goals: {
    list: [],
    loading: false,
    error: null,
  },
  charts: {},
};

// Analytics reducer
export const analyticsReducer = (
  state: AnalyticsState = initialState,
  action: AnalyticsAction
): AnalyticsState => {
  switch (action.type) {
    // Dashboard metrics
    case ANALYTICS_ACTION_TYPES.FETCH_DASHBOARD_METRICS_REQUEST:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          loading: true,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.FETCH_DASHBOARD_METRICS_SUCCESS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          metrics: action.payload.metrics,
          loading: false,
          error: null,
          lastUpdated: new Date().toISOString(),
        },
      };

    case ANALYTICS_ACTION_TYPES.FETCH_DASHBOARD_METRICS_FAILURE:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          loading: false,
          error: action.payload.error,
        },
      };

    // Activity logs
    case ANALYTICS_ACTION_TYPES.FETCH_ACTIVITY_LOGS_REQUEST:
      return {
        ...state,
        activity: {
          ...state.activity,
          loading: true,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.FETCH_ACTIVITY_LOGS_SUCCESS:
      return {
        ...state,
        activity: {
          ...state.activity,
          logs: action.payload.logs,
          loading: false,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.FETCH_ACTIVITY_LOGS_FAILURE:
      return {
        ...state,
        activity: {
          ...state.activity,
          loading: false,
          error: action.payload.error,
        },
      };

    case ANALYTICS_ACTION_TYPES.TRACK_ACTIVITY_SUCCESS:
      return {
        ...state,
        activity: {
          ...state.activity,
          logs: [action.payload.activity, ...state.activity.logs.slice(0, 99)], // Keep last 100 logs
        },
      };

    // Reports
    case ANALYTICS_ACTION_TYPES.FETCH_REPORTS_REQUEST:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.FETCH_REPORTS_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          list: action.payload.reports,
          loading: false,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.FETCH_REPORTS_FAILURE:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload.error,
        },
      };

    case ANALYTICS_ACTION_TYPES.CREATE_REPORT_REQUEST:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.CREATE_REPORT_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          list: [...state.reports.list, action.payload.report],
          loading: false,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.CREATE_REPORT_FAILURE:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload.error,
        },
      };

    case ANALYTICS_ACTION_TYPES.GENERATE_REPORT_REQUEST:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: true,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.GENERATE_REPORT_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          data: action.payload.data,
          loading: false,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.GENERATE_REPORT_FAILURE:
      return {
        ...state,
        reports: {
          ...state.reports,
          loading: false,
          error: action.payload.error,
        },
      };

    case ANALYTICS_ACTION_TYPES.DELETE_REPORT_SUCCESS:
      return {
        ...state,
        reports: {
          ...state.reports,
          list: state.reports.list.filter(
            (report) => report.id !== action.payload.reportId
          ),
        },
      };

    // Goals
    case ANALYTICS_ACTION_TYPES.FETCH_GOALS_REQUEST:
      return {
        ...state,
        goals: {
          ...state.goals,
          loading: true,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.FETCH_GOALS_SUCCESS:
      return {
        ...state,
        goals: {
          ...state.goals,
          list: action.payload.goals,
          loading: false,
          error: null,
        },
      };

    case ANALYTICS_ACTION_TYPES.FETCH_GOALS_FAILURE:
      return {
        ...state,
        goals: {
          ...state.goals,
          loading: false,
          error: action.payload.error,
        },
      };

    case ANALYTICS_ACTION_TYPES.CREATE_GOAL_SUCCESS:
      return {
        ...state,
        goals: {
          ...state.goals,
          list: [...state.goals.list, action.payload.goal],
        },
      };

    case ANALYTICS_ACTION_TYPES.UPDATE_GOAL_SUCCESS:
      return {
        ...state,
        goals: {
          ...state.goals,
          list: state.goals.list.map((goal) =>
            goal.id === action.payload.goal.id ? action.payload.goal : goal
          ),
        },
      };

    case ANALYTICS_ACTION_TYPES.DELETE_GOAL_SUCCESS:
      return {
        ...state,
        goals: {
          ...state.goals,
          list: state.goals.list.filter(
            (goal) => goal.id !== action.payload.goalId
          ),
        },
      };

    // Charts
    case ANALYTICS_ACTION_TYPES.FETCH_CHART_DATA_SUCCESS:
      return {
        ...state,
        charts: {
          ...state.charts,
          [action.payload.chartType]: action.payload.data,
        },
      };

    default:
      return state;
  }
};
