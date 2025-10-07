"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, Home, TrendingUp } from "lucide-react";
import SimpleCalendar from "@/components/SimpleCalendar";
import DashboardLayout from "@/components/DashboardLayout";

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

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (response.ok) {
        const data = await response.json();
        const transformedData = data.map((apt: any) => ({
          ...apt,
          start: new Date(apt.start),
          end: new Date(apt.end),
        }));
        setAppointments(transformedData);
      }
    } catch (error) {
      console.error("Error loading appointments:", error);
      // Load mock data for demo
      setAppointments(getMockAppointments());
    } finally {
      setLoading(false);
    }
  };

  const getMockAppointments = (): Appointment[] => {
    const today = new Date();
    return [
      {
        id: "1",
        title: "Property Viewing - Modern House",
        description: "Showing modern house to the Johnson family",
        start: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
          10,
          0
        ),
        end: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1,
          11,
          0
        ),
        location: "123 Main St, Downtown",
        property_id: "prop1",
        propertyTitle: "Modern Family Home",
      },
      {
        id: "2",
        title: "Lead Meeting - Sarah Connor",
        description: "Initial consultation with potential buyer",
        start: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 2,
          14,
          0
        ),
        end: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 2,
          15,
          0
        ),
        location: "Office",
        lead_id: "lead1",
        leadName: "Sarah Connor",
      },
      {
        id: "3",
        title: "Property Photography",
        description: "Professional photos for new listing",
        start: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 3,
          9,
          0
        ),
        end: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 3,
          12,
          0
        ),
        location: "456 Oak Ave",
        property_id: "prop2",
        propertyTitle: "Luxury Condo",
      },
      {
        id: "4",
        title: "Follow-up Call",
        description: "Check in with interested buyer",
        start: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 5,
          16,
          0
        ),
        end: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 5,
          16,
          30
        ),
        lead_id: "lead2",
        leadName: "Mike Johnson",
      },
    ];
  };

  const handleCreateAppointment = async (
    appointment: Omit<Appointment, "id">
  ) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
      });

      if (response.ok) {
        const newAppointment = await response.json();
        setAppointments([
          ...appointments,
          {
            ...newAppointment,
            start: new Date(newAppointment.start_at),
            end: new Date(newAppointment.end_at),
          },
        ]);
      } else {
        // Mock creation for demo
        const newAppointment: Appointment = {
          ...appointment,
          id: Date.now().toString(),
        };
        setAppointments([...appointments, newAppointment]);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Mock creation for demo
      const newAppointment: Appointment = {
        ...appointment,
        id: Date.now().toString(),
      };
      setAppointments([...appointments, newAppointment]);
    }
  };

  const handleUpdateAppointment = async (
    id: string,
    updates: Partial<Appointment>
  ) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setAppointments(
          appointments.map((apt) =>
            apt.id === id ? { ...apt, ...updates } : apt
          )
        );
      } else {
        // Mock update for demo
        setAppointments(
          appointments.map((apt) =>
            apt.id === id ? { ...apt, ...updates } : apt
          )
        );
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      // Mock update for demo
      setAppointments(
        appointments.map((apt) =>
          apt.id === id ? { ...apt, ...updates } : apt
        )
      );
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "DELETE",
      });

      if (response.ok || !response.ok) {
        // Accept both success and error for demo
        setAppointments(appointments.filter((apt) => apt.id !== id));
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      // Mock delete for demo
      setAppointments(appointments.filter((apt) => apt.id !== id));
    }
  };

  // Calculate stats
  const today = new Date();
  const thisWeek = appointments.filter((apt) => {
    const diffTime = apt.start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  const propertyViewings = appointments.filter((apt) => apt.property_id).length;
  const leadMeetings = appointments.filter((apt) => apt.lead_id).length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>Loading calendar...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Calendar Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold">{thisWeek.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Appointments
                  </p>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Property Viewings
                  </p>
                  <p className="text-2xl font-bold">{propertyViewings}</p>
                </div>
                <Home className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Lead Meetings
                  </p>
                  <p className="text-2xl font-bold">{leadMeetings}</p>
                </div>
                <User className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {thisWeek.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                      w-3 h-3 rounded-full
                      ${
                        appointment.lead_id
                          ? "bg-green-500"
                          : appointment.property_id
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }
                    `}
                    />
                    <div>
                      <h4 className="font-medium">{appointment.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.start.toLocaleDateString()} at{" "}
                          {appointment.start.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {appointment.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {appointment.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {appointment.leadName && (
                      <Badge variant="secondary">
                        <User className="w-3 h-3 mr-1" />
                        {appointment.leadName}
                      </Badge>
                    )}
                    {appointment.propertyTitle && (
                      <Badge variant="secondary">
                        <Home className="w-3 h-3 mr-1" />
                        {appointment.propertyTitle}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              {thisWeek.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No upcoming appointments this week
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Calendar Component */}
        <SimpleCalendar
          appointments={appointments}
          onCreateAppointment={handleCreateAppointment}
          onUpdateAppointment={handleUpdateAppointment}
          onDeleteAppointment={handleDeleteAppointment}
        />
      </div>
    </DashboardLayout>
  );
}
