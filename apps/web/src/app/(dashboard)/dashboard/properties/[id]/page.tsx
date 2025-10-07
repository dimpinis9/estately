import { getProperty } from "@/data/properties";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;

  // Try to get the actual property data
  let property: any = null;
  try {
    property = await getProperty(id);
  } catch (error) {
    console.error("Error fetching property:", error);
  }

  // Mock property data για demo purposes - replace this when we have actual data
  const mockProperty = {
    id: id,
    title: property?.title || "Modern Family Home",
    description:
      property?.description ||
      "This stunning property features a spacious layout with modern amenities, perfect for family living. Located in a desirable neighborhood, it offers both comfort and convenience.",
    image:
      property?.image_url ||
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    price: property?.price || 450000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    lotSize: "0.5 acres",
    yearBuilt: 2015,
    parking: "2-car garage",
    heating: "Forced air",
    cooling: "Central AC",
    totalLeads: 120,
    interestedLeads: 45,
    convertedLeads: 15,
    conversionRate: 12.5,
    conversionChange: 2.5,
  };

  // Parse extended data if property exists
  let extendedData = null;
  if (property?.description) {
    try {
      extendedData = JSON.parse(property.description);
      if (extendedData && typeof extendedData === "object") {
        mockProperty.bedrooms = extendedData.bedrooms || mockProperty.bedrooms;
        mockProperty.bathrooms =
          extendedData.bathrooms || mockProperty.bathrooms;
        mockProperty.sqft = extendedData.squareFootage || mockProperty.sqft;
      }
    } catch {
      // Keep mock data if parsing fails
    }
  }

  return (
    <DashboardLayout>
      <main className="p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold">Property Details</h1>
                <p className="text-muted-light dark:text-muted-dark mt-2">
                  View and manage detailed information about this property.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link href="/dashboard/properties">← Back to Properties</Link>
                </Button>
                <Button asChild>
                  <Link href={`/dashboard/properties/${id}/edit`}>
                    Edit Property
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Property Card */}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                  style={{ backgroundImage: `url("${mockProperty.image}")` }}
                ></div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl font-bold tracking-tight">
                  {mockProperty.title}
                </h2>
                <p className="text-muted-light dark:text-muted-dark text-lg mt-1">
                  {mockProperty.bedrooms} beds · {mockProperty.bathrooms} baths
                  · {mockProperty.sqft.toLocaleString()} sq ft
                </p>
                {mockProperty.price && (
                  <p className="text-3xl font-bold text-primary mt-2">
                    ${mockProperty.price.toLocaleString()}
                  </p>
                )}
                <Button
                  asChild
                  className="mt-4 flex max-w-xs items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-medium shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all"
                >
                  <Link href={`/dashboard/properties/${id}/edit`}>
                    <span>Edit Property</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Property Overview */}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 mb-8 shadow-lg">
            <h3 className="text-2xl font-bold tracking-tight mb-4">
              Property Overview
            </h3>
            <p className="text-muted-light dark:text-muted-dark leading-relaxed">
              {mockProperty.description}
            </p>
          </div>

          {/* Key Features and Lead Generation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Key Features */}
            <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold tracking-tight mb-6">
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="border-t border-card-border-light dark:border-card-border-dark pt-4">
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Bedrooms
                  </p>
                  <p className="font-semibold mt-1">{mockProperty.bedrooms}</p>
                </div>
                <div className="border-t border-card-border-light dark:border-card-border-dark pt-4">
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Bathrooms
                  </p>
                  <p className="font-semibold mt-1">{mockProperty.bathrooms}</p>
                </div>
                <div className="border-t border-card-border-light dark:border-card-border-dark pt-4">
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Square Footage
                  </p>
                  <p className="font-semibold mt-1">
                    {mockProperty.sqft.toLocaleString()} sq ft
                  </p>
                </div>
                <div className="border-t border-card-border-light dark:border-card-border-dark pt-4">
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Lot Size
                  </p>
                  <p className="font-semibold mt-1">{mockProperty.lotSize}</p>
                </div>
                <div className="border-t border-card-border-light dark:border-card-border-dark pt-4">
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Year Built
                  </p>
                  <p className="font-semibold mt-1">{mockProperty.yearBuilt}</p>
                </div>
                <div className="border-t border-card-border-light dark:border-card-border-dark pt-4">
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Parking
                  </p>
                  <p className="font-semibold mt-1">{mockProperty.parking}</p>
                </div>
                <div className="border-t border-card-border-light dark:border-card-border-dark pt-4">
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Heating
                  </p>
                  <p className="font-semibold mt-1">{mockProperty.heating}</p>
                </div>
                <div className="border-t border-card-border-light dark:border-card-border-dark pt-4">
                  <p className="text-sm text-muted-light dark:text-muted-dark">
                    Cooling
                  </p>
                  <p className="font-semibold mt-1">{mockProperty.cooling}</p>
                </div>
              </div>
            </div>

            {/* Lead Generation */}
            <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold tracking-tight mb-6">
                Lead Generation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg text-center">
                  <p className="text-base font-medium">Total Leads</p>
                  <p className="text-3xl font-bold mt-1">
                    {mockProperty.totalLeads}
                  </p>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg text-center">
                  <p className="text-base font-medium">Interested</p>
                  <p className="text-3xl font-bold mt-1">
                    {mockProperty.interestedLeads}
                  </p>
                </div>
                <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg text-center">
                  <p className="text-base font-medium">Converted</p>
                  <p className="text-3xl font-bold mt-1">
                    {mockProperty.convertedLeads}
                  </p>
                </div>
              </div>
              <div className="mt-6 border-t border-card-border-light dark:border-card-border-dark pt-6">
                <p className="font-medium">Lead Conversion Rate</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-4xl font-bold">
                    {mockProperty.conversionRate}%
                  </p>
                  <p className="text-green-500 font-medium text-base">
                    +{mockProperty.conversionChange}%
                  </p>
                </div>
                <p className="text-muted-light dark:text-muted-dark text-sm">
                  Last 30 Days
                </p>

                {/* Simple Chart */}
                <div className="h-40 mt-4">
                  <svg
                    fill="none"
                    height="100%"
                    preserveAspectRatio="none"
                    viewBox="0 0 472 150"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        gradientUnits="userSpaceOnUse"
                        id="chartGradient"
                        x1="236"
                        x2="236"
                        y1="0"
                        y2="150"
                      >
                        <stop stopColor="#7f13ec" stopOpacity="0.3"></stop>
                        <stop
                          offset="1"
                          stopColor="#7f13ec"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V150H0V109Z"
                      fill="url(#chartGradient)"
                    ></path>
                    <path
                      d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                      stroke="#7f13ec"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></path>
                  </svg>
                </div>
                <div className="flex justify-around text-xs text-muted-light dark:text-muted-dark font-medium">
                  <p>Week 1</p>
                  <p>Week 2</p>
                  <p>Week 3</p>
                  <p>Week 4</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold tracking-tight mb-6">
              Recent Activity
            </h3>
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-card-border-light dark:bg-card-border-dark"></div>

              <div className="relative flex items-start gap-6 pb-8">
                <div className="absolute left-[-11px] top-1.5 size-6 rounded-full bg-primary/20 flex items-center justify-center ring-8 ring-background-light dark:ring-background-dark">
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">New Inquiry from Jane Doe</p>
                  <p className="text-muted-light dark:text-muted-dark text-sm mt-1">
                    Requested a showing for this weekend.
                  </p>
                </div>
                <p className="text-sm text-muted-light dark:text-muted-dark ml-auto whitespace-nowrap">
                  2 hours ago
                </p>
              </div>

              <div className="relative flex items-start gap-6 pb-8">
                <div className="absolute left-[-11px] top-1.5 size-6 rounded-full bg-primary/20 flex items-center justify-center ring-8 ring-background-light dark:ring-background-dark">
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Price Change</p>
                  <p className="text-muted-light dark:text-muted-dark text-sm mt-1">
                    Price decreased by $10,000.
                  </p>
                </div>
                <p className="text-sm text-muted-light dark:text-muted-dark ml-auto whitespace-nowrap">
                  1 day ago
                </p>
              </div>

              <div className="relative flex items-start gap-6 pb-8">
                <div className="absolute left-[-11px] top-1.5 size-6 rounded-full bg-primary/20 flex items-center justify-center ring-8 ring-background-light dark:ring-background-dark">
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Open House Scheduled</p>
                  <p className="text-muted-light dark:text-muted-dark text-sm mt-1">
                    Sunday, 2 PM - 4 PM.
                  </p>
                </div>
                <p className="text-sm text-muted-light dark:text-muted-dark ml-auto whitespace-nowrap">
                  3 days ago
                </p>
              </div>

              <div className="relative flex items-start gap-6">
                <div className="absolute left-[-11px] top-1.5 size-6 rounded-full bg-primary/20 flex items-center justify-center ring-8 ring-background-light dark:ring-background-dark">
                  <div className="size-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="font-medium">Property Listed</p>
                  <p className="text-muted-light dark:text-muted-dark text-sm mt-1">
                    Initial listing on the market.
                  </p>
                </div>
                <p className="text-sm text-muted-light dark:text-muted-dark ml-auto whitespace-nowrap">
                  1 week ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
