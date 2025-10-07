import { getProperties } from "@/data/properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import type { Database } from "@/types/supabase";

type Property = Database["public"]["Tables"]["properties"]["Row"];

export default async function PropertiesPage() {
  const properties = await getProperties();

  const parseExtendedData = (description: string | null) => {
    if (!description) return null;
    try {
      return JSON.parse(description);
    } catch {
      return null;
    }
  };

  return (
    <DashboardLayout>
      <main className="p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground-light dark:text-foreground-dark">
              Properties
            </h1>
            <Button
              asChild
              className="flex items-center justify-center gap-2 bg-primary text-white font-medium px-5 py-3 rounded-lg shadow-lg shadow-primary/30 hover:bg-opacity-90 transition-all mt-4 md:mt-0"
            >
              <Link href="/dashboard/properties/new">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm40,112H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32a8,8,0,0,1,0,16Z"></path>
                </svg>
                <span>Add New Property</span>
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-light dark:text-muted-dark"
                fill="currentColor"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M228.24,219.76l-51.38-51.38a86.15,86.15,0,1,0-8.48,8.48l51.38,51.38a6,6,0,0,0,8.48-8.48ZM38,112a74,74,0,1,1,74,74A74.09,74.09,0,0,1,38,112Z"></path>
              </svg>
              <Input
                className="w-full bg-card-light dark:bg-card-dark border border-card-border-light dark:border-card-border-dark text-foreground-light dark:text-foreground-dark placeholder:text-muted-light dark:placeholder:text-muted-dark rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Search by title, location, or price..."
                type="text"
              />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties && properties.length > 0 ? (
              properties.map((property: Property) => {
                const extendedData = parseExtendedData(property.description);
                const isExtended =
                  extendedData && typeof extendedData === "object";
                const displayDescription = isExtended
                  ? extendedData.description || property.description
                  : property.description;

                return (
                  <Card
                    key={property.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                      {property.image_url ? (
                        <img
                          src={property.image_url}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-light dark:text-muted-dark">
                          <svg
                            className="w-12 h-12"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M10 2v8L8 8l2-2V2h6l-2 2 2 2v8l-2-2 2 2v8h-6v-6H4v6H2V2h8z" />
                          </svg>
                        </div>
                      )}
                      {isExtended && extendedData.status && (
                        <Badge
                          className={`absolute top-3 left-3 ${
                            extendedData.status === "available"
                              ? "bg-green-100 text-green-800"
                              : extendedData.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : extendedData.status === "sold"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {extendedData.status.charAt(0).toUpperCase() +
                            extendedData.status.slice(1)}
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="line-clamp-2">
                          {property.title}
                        </CardTitle>
                        {property.price && (
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                              ${property.price.toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {isExtended &&
                        (extendedData.address || extendedData.city) && (
                          <div className="flex items-center gap-2 text-muted-light dark:text-muted-dark mb-3">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            <span className="text-sm">
                              {[
                                extendedData.address,
                                extendedData.city,
                                extendedData.state,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </div>
                        )}

                      {isExtended &&
                        (extendedData.bedrooms ||
                          extendedData.bathrooms ||
                          extendedData.squareFootage) && (
                          <div className="flex items-center gap-4 text-sm text-muted-light dark:text-muted-dark mb-3">
                            {extendedData.bedrooms && (
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M19 7h-3V6a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v1H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM10 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V6zm8 12H6V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v9z" />
                                </svg>
                                {extendedData.bedrooms} bed
                              </span>
                            )}
                            {extendedData.bathrooms && (
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                {extendedData.bathrooms} bath
                              </span>
                            )}
                            {extendedData.squareFootage && (
                              <span className="flex items-center gap-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                {extendedData.squareFootage.toLocaleString()}{" "}
                                sqft
                              </span>
                            )}
                          </div>
                        )}

                      {displayDescription && (
                        <p className="text-muted-light dark:text-muted-dark text-sm line-clamp-2 mb-4">
                          {displayDescription}
                        </p>
                      )}

                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-muted-light dark:text-muted-dark hover:text-primary"
                        >
                          <Link href={`/dashboard/properties/${property.id}`}>
                            View
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-primary font-semibold hover:underline"
                        >
                          <Link
                            href={`/dashboard/properties/${property.id}/edit`}
                          >
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-light dark:text-muted-dark">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 2v8L8 8l2-2V2h6l-2 2 2 2v8l-2-2 2 2v8h-6v-6H4v6H2V2h8z" />
                  </svg>
                  <h3 className="text-lg font-semibold mb-2">
                    No properties found
                  </h3>
                  <p className="mb-4">
                    Get started by adding your first property.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/properties/new">Add Property</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
