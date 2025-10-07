"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropertyStatusDropdownProps {
  currentStatus: string;
  propertyId: string;
  onStatusChange?: (propertyId: string, newStatus: string) => void;
}

const statusConfig = {
  available: {
    label: "Available",
    className:
      "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300",
    color: "green",
  },
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300",
    color: "yellow",
  },
  sold: {
    label: "Sold",
    className: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300",
    color: "red",
  },
  "off-market": {
    label: "Off Market",
    className:
      "bg-gray-100 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300",
    color: "gray",
  },
};

const statusFlow = {
  available: ["pending", "sold", "off-market"],
  pending: ["available", "sold", "off-market"],
  sold: ["available", "off-market"], // Can be relisted
  "off-market": ["available", "pending"],
};

export default function PropertyStatusDropdown({
  currentStatus,
  propertyId,
  onStatusChange,
}: PropertyStatusDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (response.ok) {
        onStatusChange?.(propertyId, newStatus);
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
