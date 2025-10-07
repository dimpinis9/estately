"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

const statusConfig = {
  new: {
    label: "New",
    className:
      "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300",
  },
  contacted: {
    label: "Contacted",
    className:
      "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300",
  },
  qualified: {
    label: "Qualified",
    className:
      "bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300",
  },
  negotiating: {
    label: "Negotiating",
    className:
      "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300",
  },
  converted: {
    label: "Converted",
    className:
      "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300",
  },
  lost: {
    label: "Lost",
    className: "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300",
  },
};

export default function LeadDetailPage() {
  const router = useRouter();
  const params = useParams();
  const leadId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState<any>(null);

  useEffect(() => {
    fetchLead();
  }, [leadId]);

  const fetchLead = async () => {
    try {
      const response = await fetch(`/api/leads/${leadId}`);
      if (!response.ok) throw new Error("Failed to fetch lead");

      const leadData = await response.json();
      setLead(leadData);
    } catch (error: any) {
      toast.error(error.message);
      router.push("/dashboard/leads");
    } finally {
      setLoading(false);
    }
  };

  const getAvatarColor = (name: string) => {
    const avatarColors = [
      "from-red-400 to-red-600",
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-yellow-400 to-yellow-600",
      "from-purple-400 to-purple-600",
      "from-pink-400 to-pink-600",
      "from-indigo-400 to-indigo-600",
      "from-teal-400 to-teal-600",
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!lead) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Lead not found</h1>
            <Button asChild>
              <Link href="/dashboard/leads">Back to Leads</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const statusInfo =
    statusConfig[lead.status as keyof typeof statusConfig] || statusConfig.new;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="p-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 12H5m7-7l-7 7 7 7" />
                </svg>
              </Button>
              <h1 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark">
                Lead Details
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link href={`/dashboard/leads/${leadId}/edit`}>Edit Lead</Link>
              </Button>
            </div>
          </div>

          {/* Lead Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback
                    className={`bg-gradient-to-tr ${getAvatarColor(
                      lead.name
                    )} text-white text-lg font-semibold`}
                  >
                    {lead.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{lead.name}</CardTitle>
                    <Badge className={statusInfo.className}>
                      {statusInfo.label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-muted-light dark:text-muted-dark">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.53 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                      </svg>
                      {lead.email}
                    </span>
                    {lead.phone && (
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        {lead.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Source</h3>
                  <p className="text-muted-light dark:text-muted-dark">
                    {lead.source || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Created</h3>
                  <p className="text-muted-light dark:text-muted-dark">
                    {lead.created_at
                      ? new Date(lead.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </p>
                </div>
                {lead.tags &&
                  Array.isArray(lead.tags) &&
                  lead.tags.length > 0 && (
                    <div className="md:col-span-2">
                      <h3 className="font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {lead.tags.map((tag: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-primary/10 text-primary border-primary/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                {lead.notes && (
                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-2">Notes</h3>
                    <p className="text-muted-light dark:text-muted-dark whitespace-pre-wrap">
                      {lead.notes}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline - Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-light dark:text-muted-dark">
                <svg
                  className="w-12 h-12 mx-auto mb-4 opacity-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 3c3.9 0 7 3.1 7 7 0 2.8-1.6 5.2-4 6.3V21h-6v-4.7c-2.4-1.1-4-3.5-4-6.3 0-3.9 3.1-7 7-7m0-2C8.6 1 5 4.6 5 9c0 3.8 2.4 7.1 6 8.4V23h4v-5.6c3.6-1.3 6-4.6 6-8.4 0-4.4-3.6-8-8-8z" />
                </svg>
                <p>Activity timeline will be implemented in the next phase</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
