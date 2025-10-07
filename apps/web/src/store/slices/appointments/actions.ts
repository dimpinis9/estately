import {
  AppointmentWithExtras,
  BulkOperation,
  ImportResult,
} from "../../types";

// Action types
export const APPOINTMENTS_ACTION_TYPES = {
  // Fetch appointments
  FETCH_APPOINTMENTS_REQUEST: "FETCH_APPOINTMENTS_REQUEST",
  FETCH_APPOINTMENTS_SUCCESS: "FETCH_APPOINTMENTS_SUCCESS",
  FETCH_APPOINTMENTS_FAILURE: "FETCH_APPOINTMENTS_FAILURE",

  // Fetch single appointment
  FETCH_APPOINTMENT_REQUEST: "FETCH_APPOINTMENT_REQUEST",
  FETCH_APPOINTMENT_SUCCESS: "FETCH_APPOINTMENT_SUCCESS",
  FETCH_APPOINTMENT_FAILURE: "FETCH_APPOINTMENT_FAILURE",

  // Create appointment
  CREATE_APPOINTMENT_REQUEST: "CREATE_APPOINTMENT_REQUEST",
  CREATE_APPOINTMENT_SUCCESS: "CREATE_APPOINTMENT_SUCCESS",
  CREATE_APPOINTMENT_FAILURE: "CREATE_APPOINTMENT_FAILURE",

  // Update appointment
  UPDATE_APPOINTMENT_REQUEST: "UPDATE_APPOINTMENT_REQUEST",
  UPDATE_APPOINTMENT_SUCCESS: "UPDATE_APPOINTMENT_SUCCESS",
  UPDATE_APPOINTMENT_FAILURE: "UPDATE_APPOINTMENT_FAILURE",

  // Delete appointment
  DELETE_APPOINTMENT_REQUEST: "DELETE_APPOINTMENT_REQUEST",
  DELETE_APPOINTMENT_SUCCESS: "DELETE_APPOINTMENT_SUCCESS",
  DELETE_APPOINTMENT_FAILURE: "DELETE_APPOINTMENT_FAILURE",

  // Bulk operations
  BULK_OPERATION_REQUEST: "APPOINTMENTS_BULK_OPERATION_REQUEST",
  BULK_OPERATION_SUCCESS: "APPOINTMENTS_BULK_OPERATION_SUCCESS",
  BULK_OPERATION_FAILURE: "APPOINTMENTS_BULK_OPERATION_FAILURE",

  // Calendar specific actions
  FETCH_CALENDAR_APPOINTMENTS_REQUEST: "FETCH_CALENDAR_APPOINTMENTS_REQUEST",
  FETCH_CALENDAR_APPOINTMENTS_SUCCESS: "FETCH_CALENDAR_APPOINTMENTS_SUCCESS",
  FETCH_CALENDAR_APPOINTMENTS_FAILURE: "FETCH_CALENDAR_APPOINTMENTS_FAILURE",

  // Filters and view
  SET_DATE_RANGE: "SET_APPOINTMENTS_DATE_RANGE",
  SET_STATUS_FILTER: "SET_APPOINTMENTS_STATUS_FILTER",
  SET_AGENT_FILTER: "SET_APPOINTMENTS_AGENT_FILTER",
  SET_CALENDAR_VIEW: "SET_CALENDAR_VIEW",
  CLEAR_FILTERS: "CLEAR_APPOINTMENTS_FILTERS",

  // UI state
  SET_SELECTED_APPOINTMENTS: "SET_SELECTED_APPOINTMENTS",
  TOGGLE_APPOINTMENT_SELECTION: "TOGGLE_APPOINTMENT_SELECTION",
  CLEAR_SELECTION: "CLEAR_APPOINTMENTS_SELECTION",
  SET_SELECTED_DATE: "SET_SELECTED_DATE",

  // Real-time updates
  APPOINTMENT_UPDATED: "APPOINTMENT_UPDATED_REALTIME",
  APPOINTMENT_CREATED: "APPOINTMENT_CREATED_REALTIME",
  APPOINTMENT_DELETED: "APPOINTMENT_DELETED_REALTIME",

  // Optimistic updates
  OPTIMISTIC_UPDATE_APPOINTMENT: "OPTIMISTIC_UPDATE_APPOINTMENT",

  // Reminders
  SEND_REMINDER_REQUEST: "SEND_REMINDER_REQUEST",
  SEND_REMINDER_SUCCESS: "SEND_REMINDER_SUCCESS",
  SEND_REMINDER_FAILURE: "SEND_REMINDER_FAILURE",
} as const;

// Action creators
export const appointmentsActions = {
  // Fetch appointments
  fetchAppointmentsRequest: (filters?: any) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_APPOINTMENTS_REQUEST,
    payload: { filters },
  }),

  fetchAppointmentsSuccess: (appointments: AppointmentWithExtras[]) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_APPOINTMENTS_SUCCESS,
    payload: { appointments },
  }),

  fetchAppointmentsFailure: (error: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_APPOINTMENTS_FAILURE,
    payload: { error },
  }),

  // Fetch single appointment
  fetchAppointmentRequest: (id: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_APPOINTMENT_REQUEST,
    payload: { id },
  }),

  fetchAppointmentSuccess: (appointment: AppointmentWithExtras) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_APPOINTMENT_SUCCESS,
    payload: { appointment },
  }),

  fetchAppointmentFailure: (error: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_APPOINTMENT_FAILURE,
    payload: { error },
  }),

  // Create appointment
  createAppointmentRequest: (
    appointmentData: Partial<AppointmentWithExtras>
  ) => ({
    type: APPOINTMENTS_ACTION_TYPES.CREATE_APPOINTMENT_REQUEST,
    payload: { appointmentData },
  }),

  createAppointmentSuccess: (appointment: AppointmentWithExtras) => ({
    type: APPOINTMENTS_ACTION_TYPES.CREATE_APPOINTMENT_SUCCESS,
    payload: { appointment },
  }),

  createAppointmentFailure: (error: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.CREATE_APPOINTMENT_FAILURE,
    payload: { error },
  }),

  // Update appointment
  updateAppointmentRequest: (
    id: string,
    updates: Partial<AppointmentWithExtras>
  ) => ({
    type: APPOINTMENTS_ACTION_TYPES.UPDATE_APPOINTMENT_REQUEST,
    payload: { id, updates },
  }),

  updateAppointmentSuccess: (appointment: AppointmentWithExtras) => ({
    type: APPOINTMENTS_ACTION_TYPES.UPDATE_APPOINTMENT_SUCCESS,
    payload: { appointment },
  }),

  updateAppointmentFailure: (error: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.UPDATE_APPOINTMENT_FAILURE,
    payload: { error },
  }),

  // Delete appointment
  deleteAppointmentRequest: (id: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.DELETE_APPOINTMENT_REQUEST,
    payload: { id },
  }),

  deleteAppointmentSuccess: (id: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.DELETE_APPOINTMENT_SUCCESS,
    payload: { id },
  }),

  deleteAppointmentFailure: (error: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.DELETE_APPOINTMENT_FAILURE,
    payload: { error },
  }),

  // Bulk operations
  bulkOperationRequest: (operation: BulkOperation) => ({
    type: APPOINTMENTS_ACTION_TYPES.BULK_OPERATION_REQUEST,
    payload: { operation },
  }),

  bulkOperationSuccess: (operation: BulkOperation, result: any) => ({
    type: APPOINTMENTS_ACTION_TYPES.BULK_OPERATION_SUCCESS,
    payload: { operation, result },
  }),

  bulkOperationFailure: (error: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.BULK_OPERATION_FAILURE,
    payload: { error },
  }),

  // Calendar specific actions
  fetchCalendarAppointmentsRequest: (startDate: string, endDate: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_CALENDAR_APPOINTMENTS_REQUEST,
    payload: { startDate, endDate },
  }),

  fetchCalendarAppointmentsSuccess: (
    appointments: AppointmentWithExtras[]
  ) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_CALENDAR_APPOINTMENTS_SUCCESS,
    payload: { appointments },
  }),

  fetchCalendarAppointmentsFailure: (error: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.FETCH_CALENDAR_APPOINTMENTS_FAILURE,
    payload: { error },
  }),

  // Filters and view
  setDateRange: (startDate: string, endDate: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.SET_DATE_RANGE,
    payload: { startDate, endDate },
  }),

  setStatusFilter: (statuses: string[]) => ({
    type: APPOINTMENTS_ACTION_TYPES.SET_STATUS_FILTER,
    payload: { statuses },
  }),

  setAgentFilter: (agents: string[]) => ({
    type: APPOINTMENTS_ACTION_TYPES.SET_AGENT_FILTER,
    payload: { agents },
  }),

  setCalendarView: (view: "month" | "week" | "day" | "agenda") => ({
    type: APPOINTMENTS_ACTION_TYPES.SET_CALENDAR_VIEW,
    payload: { view },
  }),

  clearFilters: () => ({
    type: APPOINTMENTS_ACTION_TYPES.CLEAR_FILTERS,
  }),

  // UI state
  setSelectedAppointments: (ids: string[]) => ({
    type: APPOINTMENTS_ACTION_TYPES.SET_SELECTED_APPOINTMENTS,
    payload: { ids },
  }),

  toggleAppointmentSelection: (id: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.TOGGLE_APPOINTMENT_SELECTION,
    payload: { id },
  }),

  clearSelection: () => ({
    type: APPOINTMENTS_ACTION_TYPES.CLEAR_SELECTION,
  }),

  setSelectedDate: (date: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.SET_SELECTED_DATE,
    payload: { date },
  }),

  // Real-time updates
  appointmentUpdated: (appointment: AppointmentWithExtras) => ({
    type: APPOINTMENTS_ACTION_TYPES.APPOINTMENT_UPDATED,
    payload: { appointment },
  }),

  appointmentCreated: (appointment: AppointmentWithExtras) => ({
    type: APPOINTMENTS_ACTION_TYPES.APPOINTMENT_CREATED,
    payload: { appointment },
  }),

  appointmentDeleted: (id: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.APPOINTMENT_DELETED,
    payload: { id },
  }),

  // Optimistic updates
  optimisticUpdateAppointment: (
    id: string,
    updates: Partial<AppointmentWithExtras>
  ) => ({
    type: APPOINTMENTS_ACTION_TYPES.OPTIMISTIC_UPDATE_APPOINTMENT,
    payload: { id, updates },
  }),

  // Reminders
  sendReminderRequest: (
    appointmentId: string,
    reminderType: "email" | "sms"
  ) => ({
    type: APPOINTMENTS_ACTION_TYPES.SEND_REMINDER_REQUEST,
    payload: { appointmentId, reminderType },
  }),

  sendReminderSuccess: (appointmentId: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.SEND_REMINDER_SUCCESS,
    payload: { appointmentId },
  }),

  sendReminderFailure: (error: string) => ({
    type: APPOINTMENTS_ACTION_TYPES.SEND_REMINDER_FAILURE,
    payload: { error },
  }),
};

// Action type for the reducer
export type AppointmentsAction = ReturnType<
  (typeof appointmentsActions)[keyof typeof appointmentsActions]
>;
