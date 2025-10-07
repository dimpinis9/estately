"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { analyticsActions } from "@/store/slices/analytics/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Users,
  Home,
  DollarSign,
} from "lucide-react";

interface ReportFilter {
  dateRange: {
    start: string;
    end: string;
  };
  leadStatus?: string[];
  propertyStatus?: string[];
  agents?: string[];
  sources?: string[];
}

interface CustomReport {
  id: string;
  name: string;
  description: string;
  type: "leads" | "properties" | "appointments" | "revenue" | "activity";
  filters: ReportFilter;
  metrics: string[];
  visualization: "table" | "line" | "bar" | "pie" | "area";
  user_id: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const CreateReportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (report: Partial<CustomReport>) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "leads" as const,
    metrics: [] as string[],
    visualization: "table" as const,
    filters: {
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        end: new Date().toISOString().split("T")[0],
      },
    },
  });

  const reportTypes = [
    { value: "leads", label: "Leads Report", icon: Users },
    { value: "properties", label: "Properties Report", icon: Home },
    { value: "appointments", label: "Appointments Report", icon: Calendar },
    { value: "revenue", label: "Revenue Report", icon: DollarSign },
    { value: "activity", label: "Activity Report", icon: TrendingUp },
  ];

  const visualizationTypes = [
    { value: "table", label: "Table" },
    { value: "line", label: "Line Chart" },
    { value: "bar", label: "Bar Chart" },
    { value: "pie", label: "Pie Chart" },
    { value: "area", label: "Area Chart" },
  ];

  const getMetricsForType = (type: string) => {
    switch (type) {
      case "leads":
        return [
          "total_count",
          "conversion_rate",
          "response_time",
          "source_breakdown",
          "status_distribution",
        ];
      case "properties":
        return [
          "total_listings",
          "active_listings",
          "avg_price",
          "days_on_market",
          "property_types",
        ];
      case "appointments":
        return [
          "total_scheduled",
          "completion_rate",
          "no_show_rate",
          "avg_duration",
          "booking_sources",
        ];
      case "revenue":
        return [
          "total_revenue",
          "commission_earned",
          "deal_count",
          "avg_deal_size",
          "monthly_trend",
        ];
      case "activity":
        return [
          "page_views",
          "user_actions",
          "peak_hours",
          "feature_usage",
          "engagement_rate",
        ];
      default:
        return [];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Custom Report</h2>
          <Button variant="outline" onClick={onClose}>
            ×
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Report Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Monthly Lead Performance"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Report Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as any,
                    metrics: [], // Reset metrics when type changes
                  })
                }
                className="w-full border rounded-md p-2"
              >
                {reportTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed analysis of lead generation and conversion..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.filters.dateRange.start}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    filters: {
                      ...formData.filters,
                      dateRange: {
                        ...formData.filters.dateRange,
                        start: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.filters.dateRange.end}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    filters: {
                      ...formData.filters,
                      dateRange: {
                        ...formData.filters.dateRange,
                        end: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>

          <div>
            <Label>Metrics to Include</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {getMetricsForType(formData.type).map((metric) => (
                <label key={metric} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.metrics.includes(metric)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          metrics: [...formData.metrics, metric],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          metrics: formData.metrics.filter((m) => m !== metric),
                        });
                      }
                    }}
                  />
                  <span className="text-sm">
                    {metric
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="visualization">Visualization Type</Label>
            <select
              id="visualization"
              value={formData.visualization}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visualization: e.target.value as any,
                })
              }
              className="w-full border rounded-md p-2"
            >
              {visualizationTypes.map((viz) => (
                <option key={viz.value} value={viz.value}>
                  {viz.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Report</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function CustomReports() {
  const dispatch = useDispatch();
  const { reports } = useSelector((state: RootState) => state.analytics);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(analyticsActions.fetchReportsRequest());
  }, [dispatch]);

  const handleCreateReport = (reportData: Partial<CustomReport>) => {
    dispatch(analyticsActions.createReportRequest(reportData as any));
  };

  const handleDeleteReport = (reportId: string) => {
    if (confirm("Are you sure you want to delete this report?")) {
      dispatch(analyticsActions.deleteReportRequest(reportId));
    }
  };

  const handleGenerateReport = (reportId: string) => {
    dispatch(analyticsActions.generateReportRequest(reportId));
  };

  const filteredReports = reports.list.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getVisualizationIcon = (type: string) => {
    switch (type) {
      case "line":
      case "area":
        return TrendingUp;
      case "bar":
        return BarChart3;
      case "pie":
        return PieChart;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Custom Reports</h1>
          <p className="text-muted-foreground">
            Create and manage custom analytics reports for your business.
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Report
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="min-w-[150px]">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="all">All Types</option>
                <option value="leads">Leads</option>
                <option value="properties">Properties</option>
                <option value="appointments">Appointments</option>
                <option value="revenue">Revenue</option>
                <option value="activity">Activity</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => {
          const VisualizationIcon = getVisualizationIcon(report.visualization);

          return (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{report.type}</Badge>
                      <Badge variant="outline">
                        <VisualizationIcon className="h-3 w-3 mr-1" />
                        {report.visualization}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteReport(report.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {report.description}
                </p>
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(report.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Metrics: {report.metrics.length} selected
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={() => handleGenerateReport(report.id)}
                    className="flex-1"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Generate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterType !== "all"
                ? "Try adjusting your search or filters."
                : "Create your first custom report to get started."}
            </p>
            {!searchQuery && filterType === "all" && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Report
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateReport}
      />
    </div>
  );
}
