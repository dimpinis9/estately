"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { analyticsActions } from "@/store/slices/analytics/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Pause,
  Play,
  Calendar,
  DollarSign,
  Users,
  Home,
} from "lucide-react";

interface Goal {
  id: string;
  user_id: string;
  goal_type: string;
  target_value: number;
  current_value: number;
  period_start: string;
  period_end: string;
  status: "active" | "completed" | "paused";
  created_at: string;
  updated_at: string;
}

const CreateGoalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Partial<Goal>) => void;
  editingGoal?: Goal | null;
}> = ({ isOpen, onClose, onSave, editingGoal }) => {
  const [formData, setFormData] = useState({
    goal_type: "leads",
    target_value: 0,
    period_start: new Date().toISOString().split("T")[0],
    period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "active" as Goal["status"],
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        goal_type: editingGoal.goal_type,
        target_value: editingGoal.target_value,
        period_start: editingGoal.period_start.split("T")[0],
        period_end: editingGoal.period_end.split("T")[0],
        status: editingGoal.status,
      });
    }
  }, [editingGoal]);

  const goalTypes = [
    { value: "leads", label: "New Leads", icon: Users, unit: "leads" },
    { value: "revenue", label: "Revenue", icon: DollarSign, unit: "$" },
    {
      value: "properties",
      label: "Properties Listed",
      icon: Home,
      unit: "properties",
    },
    {
      value: "appointments",
      label: "Appointments",
      icon: Calendar,
      unit: "appointments",
    },
    {
      value: "conversion_rate",
      label: "Conversion Rate",
      icon: TrendingUp,
      unit: "%",
    },
  ];

  const periods = [
    { value: "week", label: "This Week", days: 7 },
    { value: "month", label: "This Month", days: 30 },
    { value: "quarter", label: "This Quarter", days: 90 },
    { value: "year", label: "This Year", days: 365 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    if (!editingGoal) {
      setFormData({
        goal_type: "leads",
        target_value: 0,
        period_start: new Date().toISOString().split("T")[0],
        period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        status: "active",
      });
    }
  };

  const handlePeriodChange = (days: number) => {
    const start = new Date();
    const end = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
    setFormData({
      ...formData,
      period_start: start.toISOString().split("T")[0],
      period_end: end.toISOString().split("T")[0],
    });
  };

  if (!isOpen) return null;

  const selectedGoalType = goalTypes.find(
    (gt) => gt.value === formData.goal_type
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {editingGoal ? "Edit Goal" : "Create New Goal"}
          </h2>
          <Button variant="outline" onClick={onClose}>
            ×
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="goal_type">Goal Type</Label>
            <select
              id="goal_type"
              value={formData.goal_type}
              onChange={(e) =>
                setFormData({ ...formData, goal_type: e.target.value })
              }
              className="w-full border rounded-md p-2"
            >
              {goalTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="target_value">
              Target Value ({selectedGoalType?.unit})
            </Label>
            <Input
              id="target_value"
              type="number"
              value={formData.target_value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  target_value: Number(e.target.value),
                })
              }
              placeholder="100"
              required
            />
          </div>

          <div>
            <Label>Quick Period Selection</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handlePeriodChange(period.days)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="period_start">Start Date</Label>
              <Input
                id="period_start"
                type="date"
                value={formData.period_start}
                onChange={(e) =>
                  setFormData({ ...formData, period_start: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="period_end">End Date</Label>
              <Input
                id="period_end"
                type="date"
                value={formData.period_end}
                onChange={(e) =>
                  setFormData({ ...formData, period_end: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {editingGoal ? "Update Goal" : "Create Goal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GoalCard: React.FC<{
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onToggleStatus: (goalId: string, status: Goal["status"]) => void;
}> = ({ goal, onEdit, onDelete, onToggleStatus }) => {
  const progress = Math.min(
    (goal.current_value / goal.target_value) * 100,
    100
  );
  const isOverdue =
    new Date(goal.period_end) < new Date() && goal.status === "active";
  const daysLeft = Math.ceil(
    (new Date(goal.period_end).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const goalTypes = {
    leads: { label: "New Leads", icon: Users, unit: "leads", color: "blue" },
    revenue: { label: "Revenue", icon: DollarSign, unit: "$", color: "green" },
    properties: {
      label: "Properties Listed",
      icon: Home,
      unit: "properties",
      color: "purple",
    },
    appointments: {
      label: "Appointments",
      icon: Calendar,
      unit: "appointments",
      color: "orange",
    },
    conversion_rate: {
      label: "Conversion Rate",
      icon: TrendingUp,
      unit: "%",
      color: "red",
    },
  };

  const goalType = goalTypes[goal.goal_type as keyof typeof goalTypes];
  const IconComponent = goalType?.icon || Target;

  const getStatusColor = () => {
    switch (goal.status) {
      case "completed":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "active":
        return isOverdue ? "bg-red-500" : "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressColor = () => {
    if (progress >= 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const formatValue = (value: number) => {
    if (goalType?.unit === "$") {
      return `$${value.toLocaleString()}`;
    }
    if (goalType?.unit === "%") {
      return `${value}%`;
    }
    return value.toString();
  };

  return (
    <Card
      className={`transition-all duration-200 hover:shadow-lg ${
        isOverdue ? "border-red-200" : ""
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg bg-${goalType?.color || "gray"}-100`}
            >
              <IconComponent
                className={`h-5 w-5 text-${goalType?.color || "gray"}-600`}
              />
            </div>
            <div>
              <CardTitle className="text-lg">
                {goalType?.label || goal.goal_type}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={goal.status === "active" ? "default" : "secondary"}
                  className={`${getStatusColor()} text-white`}
                >
                  {goal.status.toUpperCase()}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive" className="text-xs">
                    OVERDUE
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onToggleStatus(
                  goal.id,
                  goal.status === "active" ? "paused" : "active"
                )
              }
            >
              {goal.status === "active" ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(goal)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(goal.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {formatValue(goal.current_value)} /{" "}
                {formatValue(goal.target_value)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`${getProgressColor()} h-3 rounded-full transition-all duration-300`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold">{progress.toFixed(1)}%</span>
              {progress >= 100 && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </div>
          </div>

          <div className="text-sm text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>Period:</span>
              <span>
                {new Date(goal.period_start).toLocaleDateString()} -{" "}
                {new Date(goal.period_end).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Days left:</span>
              <span
                className={
                  daysLeft < 0
                    ? "text-red-500"
                    : daysLeft < 7
                    ? "text-yellow-500"
                    : ""
                }
              >
                {daysLeft < 0
                  ? `${Math.abs(daysLeft)} overdue`
                  : `${daysLeft} days`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function GoalManagement() {
  const dispatch = useDispatch();
  const { goals } = useSelector((state: RootState) => state.analytics);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    dispatch(analyticsActions.fetchGoalsRequest());
  }, [dispatch]);

  const handleCreateGoal = (goalData: Partial<Goal>) => {
    if (editingGoal) {
      dispatch(
        analyticsActions.updateGoalRequest(editingGoal.id, goalData as any)
      );
      setEditingGoal(null);
    } else {
      dispatch(analyticsActions.createGoalRequest(goalData as any));
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsCreateModalOpen(true);
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      dispatch(analyticsActions.deleteGoalRequest(goalId));
    }
  };

  const handleToggleStatus = (goalId: string, status: Goal["status"]) => {
    dispatch(analyticsActions.updateGoalRequest(goalId, { status } as any));
  };

  const filteredGoals = goals.list.filter((goal) => {
    if (filterStatus === "all") return true;
    return goal.status === filterStatus;
  });

  const stats = {
    total: goals.list.length,
    active: goals.list.filter((g) => g.status === "active").length,
    completed: goals.list.filter((g) => g.status === "completed").length,
    overdue: goals.list.filter(
      (g) => new Date(g.period_end) < new Date() && g.status === "active"
    ).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Goal Management</h1>
          <p className="text-muted-foreground">
            Set and track your business goals to stay motivated and focused.
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Goal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Goals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Play className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{stats.active}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingDown className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold">{stats.overdue}</div>
                <div className="text-sm text-muted-foreground">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            {["all", "active", "completed", "paused"].map((status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>

      {filteredGoals.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No goals found</h3>
            <p className="text-muted-foreground mb-4">
              {filterStatus !== "all"
                ? `No ${filterStatus} goals found.`
                : "Start by creating your first goal to track your progress."}
            </p>
            {filterStatus === "all" && (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Goal
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <CreateGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingGoal(null);
        }}
        onSave={handleCreateGoal}
        editingGoal={editingGoal}
      />
    </div>
  );
}
