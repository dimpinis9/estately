"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  Clock,
  MapPin,
  Plus,
  User,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Appointment {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  lead_id?: string;
  property_id?: string;
  leadName?: string;
  propertyTitle?: string;
}

interface SimpleCalendarProps {
  appointments: Appointment[];
  onCreateAppointment: (appointment: Omit<Appointment, "id">) => void;
  onUpdateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  onDeleteAppointment: (id: string) => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SimpleCalendar({
  appointments,
  onCreateAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
}: SimpleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    description: "",
    start: new Date(),
    end: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
    location: "",
    lead_id: "",
    property_id: "",
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [];

  // Previous month days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(
      year,
      month - 1,
      new Date(year, month, 0).getDate() - i
    );
    calendarDays.push({ date, isCurrentMonth: false });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    calendarDays.push({ date, isCurrentMonth: true });
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 weeks * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    calendarDays.push({ date, isCurrentMonth: false });
  }

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.start);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setNewAppointment({
      ...newAppointment,
      start: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        9,
        0
      ), // 9 AM
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0), // 10 AM
    });
    setIsCreateDialogOpen(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleCreateAppointment = () => {
    if (!newAppointment.title.trim()) {
      alert("Please enter a title");
      return;
    }

    onCreateAppointment({
      ...newAppointment,
      start: new Date(newAppointment.start),
      end: new Date(newAppointment.end),
    });

    setNewAppointment({
      title: "",
      description: "",
      start: new Date(),
      end: new Date(Date.now() + 60 * 60 * 1000),
      location: "",
      lead_id: "",
      property_id: "",
    });
    setIsCreateDialogOpen(false);
  };

  const handleUpdateAppointment = () => {
    if (!selectedAppointment) return;

    onUpdateAppointment(selectedAppointment.id, selectedAppointment);
    setIsEditDialogOpen(false);
  };

  const handleDeleteAppointment = () => {
    if (!selectedAppointment) return;

    onDeleteAppointment(selectedAppointment.id);
    setIsEditDialogOpen(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar & Appointments
            </CardTitle>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Appointment</DialogTitle>
                  <DialogDescription>
                    Schedule a new appointment with leads or for property
                    viewings.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAppointment.title}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          title: e.target.value,
                        })
                      }
                      placeholder="Meeting title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newAppointment.description}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          description: e.target.value,
                        })
                      }
                      placeholder="Meeting details"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start">Start Time</Label>
                      <Input
                        id="start"
                        type="datetime-local"
                        value={formatDateTime(newAppointment.start)}
                        onChange={(e) =>
                          setNewAppointment({
                            ...newAppointment,
                            start: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="end">End Time</Label>
                      <Input
                        id="end"
                        type="datetime-local"
                        value={formatDateTime(newAppointment.end)}
                        onChange={(e) =>
                          setNewAppointment({
                            ...newAppointment,
                            end: new Date(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newAppointment.location}
                      onChange={(e) =>
                        setNewAppointment({
                          ...newAppointment,
                          location: e.target.value,
                        })
                      }
                      placeholder="Meeting location"
                    />
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateAppointment}>
                      Create Appointment
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {MONTHS[month]} {year}
            </h2>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day Headers */}
            {DAYS.map((day) => (
              <div
                key={day}
                className="p-2 text-center font-medium text-sm text-gray-500"
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map(({ date, isCurrentMonth }, index) => {
              const dayAppointments = getAppointmentsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`
                    min-h-[100px] p-1 border border-gray-200 cursor-pointer hover:bg-gray-50
                    ${!isCurrentMonth ? "text-gray-400 bg-gray-50" : ""}
                    ${isToday ? "bg-blue-50 border-blue-200" : ""}
                  `}
                  onClick={() => handleDateClick(date)}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isToday ? "text-blue-600" : ""
                    }`}
                  >
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map((apt) => (
                      <div
                        key={apt.id}
                        className={`
                          text-xs p-1 rounded cursor-pointer truncate
                          ${
                            apt.lead_id
                              ? "bg-green-100 text-green-800"
                              : apt.property_id
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAppointment(apt);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <div className="font-medium">{apt.title}</div>
                        <div className="opacity-75">
                          {formatTime(apt.start)}
                        </div>
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayAppointments.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Appointment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View and edit appointment information.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={selectedAppointment.title}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedAppointment.description || ""}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-start">Start Time</Label>
                  <Input
                    id="edit-start"
                    type="datetime-local"
                    value={formatDateTime(selectedAppointment.start)}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        start: new Date(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="edit-end">End Time</Label>
                  <Input
                    id="edit-end"
                    type="datetime-local"
                    value={formatDateTime(selectedAppointment.end)}
                    onChange={(e) =>
                      setSelectedAppointment({
                        ...selectedAppointment,
                        end: new Date(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={selectedAppointment.location || ""}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              {/* Connection Info */}
              {(selectedAppointment.leadName ||
                selectedAppointment.propertyTitle) && (
                <div className="pt-2 border-t">
                  <Label>Connected to:</Label>
                  <div className="mt-2 space-y-2">
                    {selectedAppointment.leadName && (
                      <Badge variant="secondary" className="mr-2">
                        <User className="w-3 h-3 mr-1" />
                        {selectedAppointment.leadName}
                      </Badge>
                    )}
                    {selectedAppointment.propertyTitle && (
                      <Badge variant="secondary">
                        <Home className="w-3 h-3 mr-1" />
                        {selectedAppointment.propertyTitle}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <Button
                  variant="destructive"
                  onClick={handleDeleteAppointment}
                  size="sm"
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateAppointment}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
