"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { analyticsActions } from "@/store/slices/analytics/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Home,
  DollarSign,
  Target,
  Activity,
  Calendar,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import {
  RevenueChart,
  LeadSourcesChart,
  ConversionChart,
  PropertyMetricsChart,
} from "./AnalyticsCharts";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
}) => {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className={`inline-flex items-center ${trendColor}`}>
            <TrendIcon className="h-3 w-3 mr-1" />
            {change}
          </span>{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  );
};

const QuickStats: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Leads"
        value="1,234"
        change="+12.5%"
        trend="up"
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        title="Active Properties"
        value="56"
        change="+8.2%"
        trend="up"
        icon={<Home className="h-4 w-4" />}
      />
      <MetricCard
        title="Monthly Revenue"
        value="$89,400"
        change="+15.3%"
        trend="up"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        title="Conversion Rate"
        value="24.5%"
        change="-2.1%"
        trend="down"
        icon={<Target className="h-4 w-4" />}
      />
    </div>
  );
};

const KPISummary: React.FC = () => {
  const { dashboard } = useSelector((state: RootState) => state.analytics);
  const { metrics, loading } = dashboard;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">New Leads</span>
              <span className="font-medium">
                {loading ? "..." : metrics?.leads?.new_this_month || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Appointments
              </span>
              <span className="font-medium">
                {loading ? "..." : metrics?.appointments?.upcoming || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Active Properties
              </span>
              <span className="font-medium">
                {loading ? "..." : metrics?.properties?.active || 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Completed Deals
              </span>
              <span className="font-medium">
                {loading ? "..." : metrics?.appointments?.completed || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Revenue MTD</span>
              <span className="font-medium">
                $
                {loading
                  ? "..."
                  : (metrics?.revenue?.mtd || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Properties Sold
              </span>
              <span className="font-medium">
                {loading ? "..." : metrics?.properties?.sold_this_month || 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Leads</span>
                <span>75/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Revenue Target</span>
                <span>$89K/$100K</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: "89%" }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function AnalyticsDashboardWithCharts() {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state: RootState) => state.analytics);
  const { metrics, loading, error } = dashboard;

  useEffect(() => {
    dispatch(analyticsActions.fetchDashboardMetricsRequest());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(analyticsActions.fetchDashboardMetricsRequest());
  };

  // Sample chart data - in real app this would come from Redux state
  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [65000, 59000, 80000, 81000, 56000, 89000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
      },
    ],
  };

  const leadSourcesData = {
    labels: ["Website", "Referrals", "Social Media", "Direct", "Advertising"],
    datasets: [
      {
        data: [45, 30, 15, 10, 8],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#8B5CF6",
          "#EF4444",
        ],
        borderColor: ["#2563EB", "#059669", "#D97706", "#7C3AED", "#DC2626"],
        borderWidth: 1,
      },
    ],
  };

  const conversionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Conversion Rate (%)",
        data: [22, 25, 28, 24, 26, 24.5],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
      },
    ],
  };

  const propertyMetricsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Properties Listed",
        data: [12, 19, 15, 17, 14, 20],
        borderColor: "rgb(245, 158, 11)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
      },
      {
        label: "Properties Sold",
        data: [8, 12, 10, 14, 9, 15],
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">
          Error loading analytics: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your real estate business performance and insights.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* KPI Summary */}
      <KPISummary />

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <RevenueChart data={revenueChartData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LeadSourcesChart data={leadSourcesData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ConversionChart data={conversionData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PropertyMetricsChart data={propertyMetricsData} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">
                  New lead: John Smith contacted about downtown property
                </span>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">
                  Property listed: 123 Main St for $425,000
                </span>
              </div>
              <span className="text-xs text-muted-foreground">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">
                  Appointment scheduled with Sarah Wilson
                </span>
              </div>
              <span className="text-xs text-muted-foreground">6 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">
                  Deal closed: $325,000 commission earned
                </span>
              </div>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
