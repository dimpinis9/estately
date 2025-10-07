"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { analyticsActions } from "@/store/slices/analytics/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Search,
  Filter,
  Users,
  Home,
  Calendar,
  Phone,
  Mail,
  Eye,
  Edit,
  Plus,
  MessageSquare,
  Clock,
  User,
  MapPin,
  RefreshCw,
} from "lucide-react";

interface ActivityLog {
  id: string;
  user_id: string | null;
  action_type: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

const ActivityIcon: React.FC<{ actionType: string; entityType: string }> = ({
  actionType,
  entityType,
}) => {
  if (actionType === "create") {
    switch (entityType) {
      case "lead":
        return <Users className="h-4 w-4 text-green-500" />;
      case "property":
        return <Home className="h-4 w-4 text-blue-500" />;
      case "appointment":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Plus className="h-4 w-4 text-green-500" />;
    }
  }

  if (actionType === "update" || actionType === "edit") {
    return <Edit className="h-4 w-4 text-yellow-500" />;
  }

  if (actionType === "view") {
    return <Eye className="h-4 w-4 text-blue-400" />;
  }

  if (actionType === "call") {
    return <Phone className="h-4 w-4 text-green-600" />;
  }

  if (actionType === "email") {
    return <Mail className="h-4 w-4 text-blue-600" />;
  }

  if (actionType === "message") {
    return <MessageSquare className="h-4 w-4 text-purple-600" />;
  }

  return <Activity className="h-4 w-4 text-gray-500" />;
};

const ActivityItem: React.FC<{ activity: ActivityLog }> = ({ activity }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const getActionDescription = () => {
    const { action_type, entity_type, details } = activity;
    const entityName = details?.name || details?.title || entity_type;

    switch (action_type) {
      case "create":
        return `Created new ${entity_type}: ${entityName}`;
      case "update":
      case "edit":
        return `Updated ${entity_type}: ${entityName}`;
      case "delete":
        return `Deleted ${entity_type}: ${entityName}`;
      case "view":
        return `Viewed ${entity_type}: ${entityName}`;
      case "call":
        return `Called ${entityName}`;
      case "email":
        return `Sent email to ${entityName}`;
      case "message":
        return `Sent message to ${entityName}`;
      case "appointment_scheduled":
        return `Scheduled appointment with ${entityName}`;
      case "appointment_completed":
        return `Completed appointment with ${entityName}`;
      case "lead_status_change":
        return `Changed lead status: ${details?.from_status} → ${details?.to_status}`;
      case "property_status_change":
        return `Changed property status: ${details?.from_status} → ${details?.to_status}`;
      default:
        return `${action_type} ${entity_type}`;
    }
  };

  const getEntityBadgeColor = () => {
    switch (activity.entity_type) {
      case "lead":
        return "bg-green-100 text-green-800";
      case "property":
        return "bg-blue-100 text-blue-800";
      case "appointment":
        return "bg-purple-100 text-purple-800";
      case "user":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <div className="flex-shrink-0 mt-1">
        <ActivityIcon
          actionType={activity.action_type}
          entityType={activity.entity_type}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {getActionDescription()}
          </p>
          <Badge className={`text-xs ${getEntityBadgeColor()}`}>
            {activity.entity_type}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTime(activity.created_at)}
          </div>

          {activity.details?.user_name && (
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {activity.details.user_name}
            </div>
          )}

          {activity.ip_address && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {activity.ip_address}
            </div>
          )}
        </div>

        {activity.details?.notes && (
          <p className="text-xs text-gray-600 mt-1 italic">
            "{activity.details.notes}"
          </p>
        )}
      </div>
    </div>
  );
};

const ActivityStats: React.FC<{ activities: ActivityLog[] }> = ({
  activities,
}) => {
  const today = new Date().toISOString().split("T")[0];
  const todayActivities = activities.filter((a) =>
    a.created_at.startsWith(today)
  );

  const stats = {
    total: activities.length,
    today: todayActivities.length,
    leads: activities.filter((a) => a.entity_type === "lead").length,
    properties: activities.filter((a) => a.entity_type === "property").length,
    appointments: activities.filter((a) => a.entity_type === "appointment")
      .length,
  };

  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">
                Total Activities
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold">{stats.today}</div>
              <div className="text-sm text-muted-foreground">Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold">{stats.leads}</div>
              <div className="text-sm text-muted-foreground">
                Lead Activities
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Home className="h-8 w-8 text-orange-500" />
            <div>
              <div className="text-2xl font-bold">{stats.properties}</div>
              <div className="text-sm text-muted-foreground">
                Property Activities
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-red-500" />
            <div>
              <div className="text-2xl font-bold">{stats.appointments}</div>
              <div className="text-sm text-muted-foreground">Appointments</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function ActivityTracking() {
  const dispatch = useDispatch();
  const { activity } = useSelector((state: RootState) => state.analytics);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    dispatch(analyticsActions.fetchActivityLogsRequest());

    // Auto-refresh every 30 seconds if enabled
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        dispatch(analyticsActions.fetchActivityLogsRequest());
      }, 30000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [dispatch, autoRefresh]);

  const handleRefresh = () => {
    dispatch(analyticsActions.fetchActivityLogsRequest());
  };

  const filteredActivities = activity.logs.filter((log) => {
    const matchesSearch =
      log.action_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (log.details?.title || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || log.entity_type === filterType;
    const matchesAction =
      filterAction === "all" || log.action_type === filterAction;

    return matchesSearch && matchesType && matchesAction;
  });

  const entityTypes = ["all", "lead", "property", "appointment", "user"];
  const actionTypes = [
    "all",
    "create",
    "update",
    "view",
    "delete",
    "call",
    "email",
    "message",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Activity Tracking</h1>
          <p className="text-muted-foreground">
            Monitor all user activities and system events in real-time.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-green-50" : ""}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`}
            />
            Auto Refresh {autoRefresh ? "ON" : "OFF"}
          </Button>
          <Button onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ActivityStats activities={activity.logs} />

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="min-w-[120px]">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                {entityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all"
                      ? "All Types"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="min-w-[120px]">
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                {actionTypes.map((action) => (
                  <option key={action} value={action}>
                    {action === "all"
                      ? "All Actions"
                      : action.charAt(0).toUpperCase() + action.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Feed
            {autoRefresh && (
              <Badge variant="secondary" className="ml-2">
                Live
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {activity.loading ? (
            <div className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Loading activities...</p>
            </div>
          ) : filteredActivities.length > 0 ? (
            <div className="max-h-[600px] overflow-y-auto">
              {filteredActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No activities found</h3>
              <p className="text-gray-500">
                {searchQuery || filterType !== "all" || filterAction !== "all"
                  ? "Try adjusting your filters to see more activities."
                  : "Activities will appear here as users interact with the system."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {activity.error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600">
              <Activity className="h-5 w-5" />
              <span className="font-medium">Error loading activities:</span>
              <span>{activity.error}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
