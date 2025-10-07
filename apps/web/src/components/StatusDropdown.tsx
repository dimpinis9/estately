"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StatusDropdownProps {
  currentStatus: string;
  leadId: string;
  onStatusChange?: (leadId: string, newStatus: string) => void;
}

const statusConfig = {
  new: {
    label: "New",
    className:
      "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300",
    color: "blue",
  },
  contacted: {
    label: "Contacted",
    className:
      "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300",
    color: "orange",
  },
  qualified: {
    label: "Qualified",
    className:
      "bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300",
    color: "teal",
  },
  nurturing: {
    label: "Nurturing",
    className:
      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300",
    color: "yellow",
  },
  closed: {
    label: "Closed",
    className:
      "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300",
    color: "green",
  },
};

const statusFlow = {
  new: ["contacted", "qualified"],
  contacted: ["qualified", "nurturing"],
  qualified: ["nurturing", "closed"],
  nurturing: ["closed", "qualified"],
  closed: ["nurturing"], // Can reopen if needed
};

export default function StatusDropdown({
  currentStatus,
  leadId,
  onStatusChange,
}: StatusDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (response.ok) {
        onStatusChange?.(leadId, newStatus);
        // Optionally refresh the page or update state
        window.location.reload();
      } else {
        alert("Error updating status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setIsUpdating(false);
    }
  };

  const currentConfig =
    statusConfig[currentStatus as keyof typeof statusConfig];
  const nextStatuses =
    statusFlow[currentStatus as keyof typeof statusFlow] || [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          className={`${currentConfig?.className} cursor-pointer hover:opacity-80 transition-opacity`}
          variant="secondary"
        >
          {isUpdating ? "Updating..." : currentConfig?.label || currentStatus}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {nextStatuses.map((status) => {
          const statusConf = statusConfig[status as keyof typeof statusConfig];
          return (
            <DropdownMenuItem
              key={status}
              onClick={() => handleStatusChange(status)}
              className="flex items-center gap-2"
            >
              <div
                className={`w-2 h-2 rounded-full bg-${statusConf.color}-500`}
              ></div>
              Move to {statusConf.label}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuItem
          onClick={() => handleStatusChange(currentStatus)}
          className="text-muted-foreground"
          disabled
        >
          Current: {currentConfig?.label}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
