import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { getLeads } from "@/data/leads";
import SeedDatabaseButton from "./SeedDatabaseButton";
import Link from "next/link";
import type { Database } from "@/types/supabase";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const statusConfig = {
  new: {
    label: "New",
    className:
      "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300",
  },
  contacted: {
    label: "Contacted",
    className:
      "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300",
  },
  qualified: {
    label: "Qualified",
    className:
      "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300",
  },
  negotiating: {
    label: "Negotiating",
    className:
      "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300",
  },
  closed: {
    label: "Closed",
    className:
      "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300",
  },
};

const avatarColors = [
  "from-pink-400 to-purple-500",
  "from-green-400 to-blue-500",
  "from-yellow-400 to-orange-500",
  "from-teal-400 to-cyan-500",
  "from-red-400 to-rose-500",
  "from-indigo-400 to-purple-500",
  "from-blue-400 to-indigo-500",
];

function getAvatarColor(name: string) {
  const hash = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
}

export default async function DashboardPage() {
  const leads = await getLeads();
  const recentLeads = leads.slice(0, 5); // Show only first 5 leads

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Database Seeding Tools - Development Only */}
        <SeedDatabaseButton />

        {/* Hero Section */}
        <div
          className="relative rounded-xl overflow-hidden min-h-[300px] flex items-end p-8 bg-cover bg-center text-white"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80")`,
          }}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Welcome back, Sarah!
            </h2>
            <p className="mt-2 text-lg text-gray-200">
              Your real estate journey continues. Explore new leads, manage
              properties, and analyze performance.
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-background-light dark:bg-background-dark border-primary/20 dark:border-primary/30 shadow-sm hover:shadow-lg hover:border-primary transition-all">
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Total Leads
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {leads.length}
                </p>
                <p className="text-green-500 font-semibold mt-1">
                  +{Math.round(leads.length * 0.08)}%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background-light dark:bg-background-dark border-primary/20 dark:border-primary/30 shadow-sm hover:shadow-lg hover:border-primary transition-all">
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Active Properties
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  42
                </p>
                <p className="text-green-500 font-semibold mt-1">+5%</p>
              </CardContent>
            </Card>

            <Card className="bg-background-light dark:bg-background-dark border-primary/20 dark:border-primary/30 shadow-sm hover:shadow-lg hover:border-primary transition-all">
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Conversion Rate
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  15%
                </p>
                <p className="text-orange-500 font-semibold mt-1">-2%</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/leads">
              <Button
                className="w-full h-20 flex flex-col gap-2"
                variant="outline"
              >
                <span className="text-2xl">📞</span>
                <span>Manage Leads</span>
              </Button>
            </Link>
            <Link href="/dashboard/properties">
              <Button
                className="w-full h-20 flex flex-col gap-2"
                variant="outline"
              >
                <span className="text-2xl">🏠</span>
                <span>View Properties</span>
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button
                className="w-full h-20 flex flex-col gap-2"
                variant="outline"
              >
                <span className="text-2xl">📊</span>
                <span>Analytics Hub</span>
              </Button>
            </Link>
            <Button
              className="w-full h-20 flex flex-col gap-2"
              variant="outline"
            >
              <span className="text-2xl">📅</span>
              <span>Appointments</span>
            </Button>
          </div>
        </div>

        {/* Recent Leads */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Leads
          </h3>
          <div className="overflow-x-auto bg-background-light dark:bg-background-dark rounded-xl border border-primary/20 dark:border-primary/30">
            <table className="w-full text-left">
              <thead className="bg-background-light dark:bg-background-dark/50">
                <tr>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">
                    Name
                  </th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">
                    Email
                  </th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 hidden md:table-cell">
                    Phone
                  </th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                    Source
                  </th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/20 dark:divide-primary/30">
                {recentLeads.map((lead: Lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <Avatar className="size-10 flex-shrink-0">
                        <AvatarFallback
                          className={`bg-gradient-to-br ${getAvatarColor(
                            lead.name
                          )} text-white`}
                        >
                          {lead.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {lead.name}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      {lead.email}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                      {lead.phone || "-"}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400 hidden lg:table-cell">
                      {lead.source || "-"}
                    </td>
                    <td className="p-4">
                      <Badge
                        className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          statusConfig[lead.status as keyof typeof statusConfig]
                            ?.className || statusConfig.new.className
                        }`}
                      >
                        {statusConfig[lead.status as keyof typeof statusConfig]
                          ?.label || "New"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentLeads.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No leads found. Try adding some leads first.
              </div>
            )}
          </div>

          {/* Pagination - show only if there are leads */}
          {recentLeads.length > 0 && (
            <div className="flex items-center justify-center mt-6">
              <button className="flex size-10 items-center justify-center rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 text-gray-600 dark:text-gray-400 transition-colors">
                <svg
                  fill="currentColor"
                  height="18px"
                  viewBox="0 0 256 256"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                </svg>
              </button>
              <button className="text-sm font-bold flex size-10 items-center justify-center text-white rounded-full bg-primary">
                1
              </button>
              <button className="text-sm font-medium flex size-10 items-center justify-center text-gray-600 dark:text-gray-400 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                2
              </button>
              <button className="text-sm font-medium flex size-10 items-center justify-center text-gray-600 dark:text-gray-400 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                3
              </button>
              <span className="text-sm font-medium flex size-10 items-center justify-center text-gray-500 dark:text-gray-400">
                ...
              </span>
              <button className="text-sm font-medium flex size-10 items-center justify-center text-gray-600 dark:text-gray-400 rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                10
              </button>
              <button className="flex size-10 items-center justify-center rounded-full hover:bg-primary/20 dark:hover:bg-primary/30 text-gray-600 dark:text-gray-400 transition-colors">
                <svg
                  fill="currentColor"
                  height="18px"
                  viewBox="0 0 256 256"
                  width="18px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
