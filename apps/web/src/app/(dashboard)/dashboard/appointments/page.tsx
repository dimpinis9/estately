import { getAppointments } from "@/data/appointments";
import DashboardLayout from "@/components/DashboardLayout";
import CalendarView from "@/components/calendar/CalendarView";

export default async function AppointmentsPage() {
  let appointments: any[] = [];
  let error = null;

  try {
    appointments = await getAppointments();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Failed to load appointments:", err);
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📅 Appointments & Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your schedule and appointments with clients
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Database Setup Required
            </h2>
            <p className="text-red-700 mb-4">
              The appointments table doesn't exist yet. Please run the SQL
              script to create it.
            </p>
            <details className="text-sm text-red-600">
              <summary className="cursor-pointer font-medium">
                Error Details
              </summary>
              <pre className="mt-2 bg-red-100 p-2 rounded overflow-auto">
                {error}
              </pre>
            </details>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 font-medium">Next Steps:</p>
              <ol className="list-decimal list-inside text-yellow-700 mt-2 space-y-1">
                <li>Go to your Supabase project dashboard</li>
                <li>Navigate to the SQL Editor</li>
                <li>
                  Copy and paste the SQL from{" "}
                  <code>create_appointments_table_final.sql</code>
                </li>
                <li>Execute the script to create the table and sample data</li>
              </ol>
            </div>
          </div>
        ) : (
          <CalendarView initialAppointments={appointments} />
        )}
      </div>
    </DashboardLayout>
  );
}
