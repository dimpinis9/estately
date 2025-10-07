"use client";

import { useState, useEffect } from "react";
import { getLeadsBrowser } from "@/lib/supabaseBrowser";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DashboardLayout from "@/components/DashboardLayout";
import LeadFilters from "@/components/LeadFilters";
import StatusDropdown from "@/components/StatusDropdown";
import Link from "next/link";
import type { Database } from "@/types/supabase";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const avatarColors = [
  "from-pink-400 via-purple-400 to-indigo-500",
  "from-green-400 via-cyan-400 to-blue-500",
  "from-yellow-400 via-red-400 to-pink-500",
  "from-red-500 via-pink-500 to-purple-600",
  "from-indigo-400 via-purple-500 to-pink-500",
  "from-sky-400 via-blue-500 to-indigo-600",
];

function getAvatarColor(name: string) {
  const hash = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
}

export default function EnhancedLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const data = await getLeadsBrowser();
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...leads];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name?.toLowerCase().includes(searchTerm) ||
          lead.email?.toLowerCase().includes(searchTerm) ||
          (Array.isArray(lead.tags)
            ? lead.tags.join(" ").toLowerCase()
            : (lead.tags || "").toString().toLowerCase()
          ).includes(searchTerm)
      );
    }

    // Status filter
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }

    // Source filter
    if (filters.source && filters.source !== "all") {
      filtered = filtered.filter((lead) => lead.source === filters.source);
    }

    // Date filters
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (lead) =>
          lead.created_at &&
          new Date(lead.created_at) >= new Date(filters.dateFrom)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(
        (lead) =>
          lead.created_at &&
          new Date(lead.created_at) <= new Date(filters.dateTo + "T23:59:59")
      );
    }

    setFilteredLeads(filtered);
  };

  const handleLeadSelection = (leadId: string, checked: boolean) => {
    if (checked) {
      setSelectedLeads([...selectedLeads, leadId]);
    } else {
      setSelectedLeads(selectedLeads.filter((id) => id !== leadId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLeads(filteredLeads.map((lead) => lead.id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleBulkAction = async (action: string, leadIds: string[]) => {
    try {
      let requestData = { action, leadIds, data: {} };

      switch (action) {
        case "updateStatus":
          requestData.data = { status: "contacted" }; // Default to contacted
          break;
        case "addNote":
          requestData.data = { note: "Bulk note added" }; // This would come from dialog
          break;
      }

      const response = await fetch("/api/leads/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        await loadLeads(); // Reload data
        setSelectedLeads([]); // Clear selection
      } else {
        alert("Error performing bulk action");
      }
    } catch (error) {
      console.error("Bulk action error:", error);
      alert("Error performing bulk action");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <main className="p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">Loading leads...</div>
          </div>
        </main>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main className="p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark">
              Lead Management
            </h1>
            <Button
              asChild
              className="flex items-center justify-center gap-2 bg-primary text-white font-medium px-5 py-3 rounded-lg shadow-lg shadow-primary/30 hover:bg-opacity-90 transition-all mt-4 md:mt-0"
            >
              <Link href="/dashboard/leads/new">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm40,112H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path>
                </svg>
                <span>Add New Lead</span>
              </Link>
            </Button>
          </div>

          {/* Advanced Filters */}
          <LeadFilters
            onFilterChange={handleFilterChange}
            onBulkAction={handleBulkAction}
            selectedLeads={selectedLeads}
            totalLeads={filteredLeads.length}
          />

          {/* Leads Table */}
          <div className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden border border-card-border-light dark:border-card-border-dark mt-6">
            <table className="w-full text-left">
              <thead className="bg-subtle-light dark:bg-subtle-dark">
                <tr>
                  <th className="p-4 w-12">
                    <Checkbox
                      checked={
                        selectedLeads.length === filteredLeads.length &&
                        filteredLeads.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-4 w-1/4 text-sm font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                    Name
                  </th>
                  <th className="p-4 w-1/4 text-sm font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-sm font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                    Source
                  </th>
                  <th className="p-4 text-sm font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="p-4 text-right text-sm font-semibold text-muted-light dark:text-muted-dark uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-card-border-light dark:border-card-border-dark hover:bg-subtle-light dark:hover:bg-subtle-dark transition-colors"
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={(checked: boolean) =>
                          handleLeadSelection(lead.id, checked)
                        }
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback
                            className={`bg-gradient-to-br ${getAvatarColor(
                              lead.name || "Unknown"
                            )} text-white font-semibold`}
                          >
                            {(lead.name || "U")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground-light dark:text-foreground-dark">
                            {lead.name}
                          </p>
                          <p className="text-sm text-muted-light dark:text-muted-dark">
                            {lead.email}
                          </p>
                          {lead.phone && (
                            <p className="text-xs text-muted-light dark:text-muted-dark">
                              {lead.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <StatusDropdown
                        currentStatus={lead.status || "new"}
                        leadId={lead.id}
                        onStatusChange={() => loadLeads()}
                      />
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className="bg-subtle-light dark:bg-subtle-dark text-muted-light dark:text-muted-dark border-card-border-light dark:border-card-border-dark"
                      >
                        {lead.source || "Unknown"}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-light dark:text-muted-dark">
                      {lead.created_at
                        ? new Date(lead.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year:
                                new Date(lead.created_at).getFullYear() !==
                                new Date().getFullYear()
                                  ? "numeric"
                                  : undefined,
                            }
                          )
                        : "-"}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-muted-light dark:text-muted-dark hover:text-primary"
                        >
                          <Link href={`/dashboard/leads/${lead.id}`}>View</Link>
                        </Button>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-primary font-semibold hover:underline"
                        >
                          <Link href={`/dashboard/leads/${lead.id}/edit`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLeads.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                {leads.length === 0
                  ? "No leads found. Try adding some leads first."
                  : "No leads match your filters. Try adjusting your search criteria."}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredLeads.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-muted-light dark:text-muted-dark">
                Showing {filteredLeads.length} of {leads.length} leads
                {selectedLeads.length > 0 && (
                  <span className="ml-2 text-primary font-medium">
                    ({selectedLeads.length} selected)
                  </span>
                )}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="px-4 py-2 border border-card-border-light dark:border-card-border-dark rounded-lg text-foreground-light dark:text-foreground-dark font-medium hover:bg-subtle-light dark:hover:bg-subtle-dark transition-colors"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-2 border border-card-border-light dark:border-card-border-dark rounded-lg text-foreground-light dark:text-foreground-dark font-medium hover:bg-subtle-light dark:hover:bg-subtle-dark transition-colors"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
