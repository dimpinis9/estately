"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Target,
  FileText,
  Activity,
  TrendingUp,
  Users,
  Home,
  Calendar,
  DollarSign,
} from "lucide-react";

import AnalyticsDashboard from "./AnalyticsDashboardWithCharts";
import CustomReports from "./CustomReports";
import GoalManagement from "./GoalManagement";
import ActivityTracking from "./ActivityTracking";

type AnalyticsTab = "dashboard" | "reports" | "goals" | "activity";

interface TabData {
  id: AnalyticsTab;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  component: React.ComponentType;
}

const tabs: TabData[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    description: "Overview of your business metrics and KPIs",
    component: AnalyticsDashboard,
  },
  {
    id: "reports",
    label: "Custom Reports",
    icon: FileText,
    description: "Create and manage custom analytics reports",
    component: CustomReports,
  },
  {
    id: "goals",
    label: "Goals",
    icon: Target,
    description: "Set and track your business goals",
    component: GoalManagement,
  },
  {
    id: "activity",
    label: "Activity",
    icon: Activity,
    description: "Monitor real-time user activities and system events",
    component: ActivityTracking,
  },
];

const QuickActions: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="grid gap-2 md:grid-cols-4">
          <Button variant="outline" className="justify-start gap-2" size="sm">
            <Users className="h-4 w-4" />
            View Leads Report
          </Button>
          <Button variant="outline" className="justify-start gap-2" size="sm">
            <Home className="h-4 w-4" />
            Property Performance
          </Button>
          <Button variant="outline" className="justify-start gap-2" size="sm">
            <DollarSign className="h-4 w-4" />
            Revenue Analysis
          </Button>
          <Button variant="outline" className="justify-start gap-2" size="sm">
            <Calendar className="h-4 w-4" />
            Appointment Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AnalyticsHub() {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("dashboard");

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || AnalyticsDashboard;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics & Insights</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics tools to track performance, set goals, and
          generate insights.
        </p>
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center gap-3 p-4 text-left transition-colors hover:bg-gray-50 ${
                    isActive
                      ? "border-b-2 border-blue-500 bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <IconComponent
                    className={`h-5 w-5 ${
                      isActive ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  <div>
                    <div
                      className={`font-medium ${
                        isActive ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {tab.label}
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {tab.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for Dashboard */}
      {activeTab === "dashboard" && <QuickActions />}

      {/* Active Component */}
      <ActiveComponent />
    </div>
  );
}
