"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Appointment {
  id: string;
  title: string;
  description?: string;
  start_at: string;
  end_at: string;
  location?: string;
  lead_id?: string;
  property_id?: string;
}

interface AppointmentFormProps {
  appointment?: Appointment | null;
  defaultDate?: Date | null;
  onSave: (appointment: Appointment) => void;
  onCancel: () => void;
}

export default function AppointmentForm({
  appointment,
  defaultDate,
  onSave,
  onCancel,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    location: "",
    lead_id: "",
    property_id: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (appointment) {
      const startDate = new Date(appointment.start_at);
      const endDate = new Date(appointment.end_at);

      setFormData({
        title: appointment.title,
        description: appointment.description || "",
        start_date: startDate.toISOString().split("T")[0],
        start_time: startDate.toTimeString().slice(0, 5),
        end_date: endDate.toISOString().split("T")[0],
        end_time: endDate.toTimeString().slice(0, 5),
        location: appointment.location || "",
        lead_id: appointment.lead_id || "",
        property_id: appointment.property_id || "",
      });
    } else if (defaultDate) {
      const defaultStart = new Date(defaultDate);
      defaultStart.setHours(9, 0, 0, 0); // 9:00 AM
      const defaultEnd = new Date(defaultDate);
      defaultEnd.setHours(10, 0, 0, 0); // 10:00 AM

      setFormData((prev) => ({
        ...prev,
        start_date: defaultStart.toISOString().split("T")[0],
        start_time: defaultStart.toTimeString().slice(0, 5),
        end_date: defaultEnd.toISOString().split("T")[0],
        end_time: defaultEnd.toTimeString().slice(0, 5),
      }));
    }
  }, [appointment, defaultDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Combine date and time
      const startDateTime = new Date(
        `${formData.start_date}T${formData.start_time}`
      );
      const endDateTime = new Date(`${formData.end_date}T${formData.end_time}`);

      const appointmentData: Appointment = {
        id: appointment?.id || crypto.randomUUID(),
        title: formData.title,
        description: formData.description || undefined,
        start_at: startDateTime.toISOString(),
        end_at: endDateTime.toISOString(),
        location: formData.location || undefined,
        lead_id: formData.lead_id || undefined,
        property_id: formData.property_id || undefined,
      };

      onSave(appointmentData);
    } catch (error) {
      console.error("Error saving appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="e.g., Property viewing with John"
          required
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Additional details about the appointment"
          rows={3}
        />
      </div>

      {/* Start Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_date">Start Date *</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange("start_date", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="start_time">Start Time *</Label>
          <Input
            id="start_time"
            type="time"
            value={formData.start_time}
            onChange={(e) => handleInputChange("start_time", e.target.value)}
            required
          />
        </div>
      </div>

      {/* End Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="end_date">End Date *</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange("end_date", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="end_time">End Time *</Label>
          <Input
            id="end_time"
            type="time"
            value={formData.end_time}
            onChange={(e) => handleInputChange("end_time", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          placeholder="e.g., 123 Main St, Office, Video call"
        />
      </div>

      {/* Lead & Property Selection (simplified for now) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lead_id">Lead (Optional)</Label>
          <Select
            onValueChange={(value) => handleInputChange("lead_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select lead" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No lead</SelectItem>
              {/* TODO: Load actual leads */}
              <SelectItem value="sample-lead-1">John Doe</SelectItem>
              <SelectItem value="sample-lead-2">Jane Smith</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="property_id">Property (Optional)</Label>
          <Select
            onValueChange={(value) => handleInputChange("property_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No property</SelectItem>
              {/* TODO: Load actual properties */}
              <SelectItem value="sample-property-1">Downtown Condo</SelectItem>
              <SelectItem value="sample-property-2">Suburban House</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : appointment ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}
