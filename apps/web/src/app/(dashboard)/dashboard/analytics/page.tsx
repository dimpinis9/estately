"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import DashboardLayout from "@/components/DashboardLayout";
import AnalyticsHub from "@/components/analytics/AnalyticsHub";

export default function AnalyticsPage() {
  return (
    <Provider store={store}>
      <DashboardLayout>
        <div className="container mx-auto py-6">
          <AnalyticsHub />
        </div>
      </DashboardLayout>
    </Provider>
  );
}
