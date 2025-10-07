"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  MapPin,
  User,
  Home,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { el } from "date-fns/locale";
import AppointmentForm from "./AppointmentForm";

interface Appointment {
  id: string;
  title: string;
  description?: string;
  start_at: string;
  end_at: string;
  location?: string;
  leads?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  properties?: {
    id: string;
    title: string;
    description?: string;
    price?: number;
  };
}

interface CalendarViewProps {
  initialAppointments: Appointment[];
}

type ViewMode = "month" | "week" | "day";

export default function CalendarView({
  initialAppointments,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  // Get calendar days for current view
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  // Get appointments for a specific date
  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((appointment) =>
      isSameDay(new Date(appointment.start_at), date)
    );
  };

  // Navigation handlers
  const navigatePrevious = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const navigateNext = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Appointment handlers
  const handleNewAppointment = (date?: Date) => {
    setSelectedDate(date || new Date());
    setSelectedAppointment(null);
    setIsFormOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsFormOpen(true);
  };

  const handleAppointmentSaved = (appointment: Appointment) => {
    if (selectedAppointment) {
      // Update existing
      setAppointments((prev) =>
        prev.map((a) => (a.id === appointment.id ? appointment : a))
      );
    } else {
      // Add new
      setAppointments((prev) => [...prev, appointment]);
    }
    setIsFormOpen(false);
    setSelectedAppointment(null);
  };

  // Time slots for day/week view
  const timeSlots = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-2xl">
                {format(currentDate, "MMMM yyyy", { locale: el })}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={navigatePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={navigateNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* View Mode Buttons */}
              <div className="flex rounded-lg border">
                {(["month", "week", "day"] as ViewMode[]).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </Button>
                ))}
              </div>

              <Button onClick={() => handleNewAppointment()}>
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Grid - Month View */}
      {viewMode === "month" && (
        <Card>
          <CardContent className="p-0">
            {/* Days of week header */}
            <div className="grid grid-cols-7 border-b">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="p-4 text-center font-semibold border-r last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day);
                const isCurrentMonth =
                  day.getMonth() === currentDate.getMonth();
                const isDayToday = isToday(day);

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border-r border-b last:border-r-0 ${
                      !isCurrentMonth ? "bg-gray-50 dark:bg-gray-900" : ""
                    } ${isDayToday ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-sm font-medium ${
                          !isCurrentMonth ? "text-gray-400" : ""
                        } ${
                          isDayToday ? "text-blue-600 dark:text-blue-400" : ""
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                      {isCurrentMonth && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleNewAppointment(day)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>

                    {/* Appointments for this day */}
                    <div className="space-y-1">
                      {dayAppointments.slice(0, 3).map((appointment) => (
                        <div
                          key={appointment.id}
                          className="text-xs p-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          <div className="font-medium truncate">
                            {appointment.title}
                          </div>
                          <div className="text-blue-600 dark:text-blue-300">
                            {format(new Date(appointment.start_at), "HH:mm")}
                          </div>
                        </div>
                      ))}
                      {dayAppointments.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{dayAppointments.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Week View */}
      {viewMode === "week" && (
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Week view coming soon...
            </div>
          </CardContent>
        </Card>
      )}

      {/* Day View */}
      {viewMode === "day" && (
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Day view coming soon...
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Appointments Sidebar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appointments
            .filter(
              (appointment) => new Date(appointment.start_at) >= new Date()
            )
            .slice(0, 5)
            .map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
                onClick={() => handleEditAppointment(appointment)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{appointment.title}</h4>
                    {appointment.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {appointment.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {format(new Date(appointment.start_at), "MMM d, HH:mm")}
                      </div>

                      {appointment.location && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {appointment.location}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mt-2">
                      {appointment.leads && (
                        <Badge variant="secondary" className="text-xs">
                          <User className="h-3 w-3 mr-1" />
                          {appointment.leads.name}
                        </Badge>
                      )}

                      {appointment.properties && (
                        <Badge variant="outline" className="text-xs">
                          <Home className="h-3 w-3 mr-1" />
                          {appointment.properties.title}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {appointments.filter(
            (appointment) => new Date(appointment.start_at) >= new Date()
          ).length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
              No upcoming appointments
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appointment Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedAppointment ? "Edit Appointment" : "New Appointment"}
            </DialogTitle>
            <DialogDescription>
              {selectedAppointment
                ? "Update the appointment details"
                : "Create a new appointment"}
            </DialogDescription>
          </DialogHeader>

          <AppointmentForm
            appointment={selectedAppointment}
            defaultDate={selectedDate}
            onSave={handleAppointmentSaved}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
