"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Home,
  Calendar,
  DollarSign,
  Target,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import { analyticsActions } from "@/store/slices/analytics/actions";
import { RootState } from "@/store";

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: React.ReactNode;
  className?: string;
}

const MetricCard = ({
  title,
  value,
  description,
  trend,
  trendValue,
  icon,
  className = "",
}: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && trendValue && (
          <div className={`flex items-center text-xs mt-2 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="ml-1">{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Quick Stats Component
const QuickStats = ({ metrics }: { metrics: any }) => {
  if (!metrics) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Leads"
        value={metrics.leads.total}
        description={`${metrics.leads.new_this_month} new this month`}
        trend="up"
        trendValue="12% from last month"
        icon={<Users className="h-4 w-4" />}
      />

      <MetricCard
        title="Active Properties"
        value={metrics.properties.active}
        description={`${metrics.properties.sold_this_month} sold this month`}
        trend="up"
        trendValue="8% from last month"
        icon={<Home className="h-4 w-4" />}
      />

      <MetricCard
        title="Appointments"
        value={metrics.appointments.total_this_month}
        description={`${metrics.appointments.upcoming} upcoming`}
        trend="neutral"
        icon={<Calendar className="h-4 w-4" />}
      />

      <MetricCard
        title="Revenue MTD"
        value={`$${metrics.revenue.mtd.toLocaleString()}`}
        description={`${metrics.revenue.target_progress}% of target`}
        trend={metrics.revenue.target_progress > 80 ? "up" : "down"}
        trendValue={`Target: $100,000`}
        icon={<DollarSign className="h-4 w-4" />}
      />
    </div>
  );
};

// KPI Summary Component
const KPISummary = ({ metrics }: { metrics: any }) => {
  if (!metrics) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Lead Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.leads.conversion_rate}%
          </div>
          <div className="text-xs text-muted-foreground">
            Average response time: {metrics.leads.avg_response_time}h
          </div>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-1">Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${Math.min(metrics.leads.conversion_rate, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Property Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.properties.avg_days_on_market}
          </div>
          <div className="text-xs text-muted-foreground">
            Average days on market
          </div>
          <div className="mt-4">
            <Badge
              variant={
                metrics.properties.avg_days_on_market < 60
                  ? "default"
                  : "secondary"
              }
            >
              {metrics.properties.avg_days_on_market < 60
                ? "Good"
                : "Needs Attention"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Appointment Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.appointments.total_this_month > 0
              ? Math.round(
                  (metrics.appointments.completed /
                    metrics.appointments.total_this_month) *
                    100
                )
              : 0}
            %
          </div>
          <div className="text-xs text-muted-foreground">
            {metrics.appointments.completed} of{" "}
            {metrics.appointments.total_this_month} completed
          </div>
          <div className="mt-2 text-xs">
            <span className="text-red-600">
              No-shows: {metrics.appointments.no_shows}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Analytics Dashboard Component
export default function AnalyticsDashboard() {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    dispatch(analyticsActions.fetchDashboardMetricsRequest());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(analyticsActions.fetchDashboardMetricsRequest());
  };

  if (dashboard.loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (dashboard.error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                Failed to load analytics
              </h3>
              <p className="text-sm">{dashboard.error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your real estate business performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Set Goals
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats metrics={dashboard.metrics} />

      {/* KPI Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Key Performance Indicators
        </h2>
        <KPISummary metrics={dashboard.metrics} />
      </div>

      {/* Last Updated */}
      {dashboard.lastUpdated && (
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {new Date(dashboard.lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  );
}
