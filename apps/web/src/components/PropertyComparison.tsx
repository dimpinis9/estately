"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { X } from "lucide-react";

interface PropertyComparisonProps {
  properties: any[];
  onClose: () => void;
}

export default function PropertyComparison({
  properties,
  onClose,
}: PropertyComparisonProps) {
  const [selectedProperties, setSelectedProperties] = useState(
    properties.slice(0, 3)
  );

  const parseExtendedData = (description: string | null) => {
    if (!description) return null;
    try {
      return JSON.parse(description);
    } catch {
      return null;
    }
  };

  const getPropertyData = (property: any) => {
    const extendedData = parseExtendedData(property.description);
    const isExtended = extendedData && typeof extendedData === "object";

    return {
      id: property.id,
      title: property.title,
      price: property.price,
      image: property.image_url,
      description: isExtended ? extendedData.description : property.description,
      address: isExtended ? extendedData.address : "",
      city: isExtended ? extendedData.city : "",
      state: isExtended ? extendedData.state : "",
      bedrooms: isExtended ? extendedData.bedrooms : null,
      bathrooms: isExtended ? extendedData.bathrooms : null,
      squareFootage: isExtended ? extendedData.squareFootage : null,
      propertyType: isExtended ? extendedData.propertyType : "",
      status: isExtended ? extendedData.status : "available",
    };
  };

  const comparisonFeatures = [
    {
      key: "price",
      label: "Price",
      format: (value: any) => (value ? `$${value.toLocaleString()}` : "N/A"),
    },
    {
      key: "bedrooms",
      label: "Bedrooms",
      format: (value: any) => value || "N/A",
    },
    {
      key: "bathrooms",
      label: "Bathrooms",
      format: (value: any) => value || "N/A",
    },
    {
      key: "squareFootage",
      label: "Square Footage",
      format: (value: any) =>
        value ? `${value.toLocaleString()} sq ft` : "N/A",
    },
    {
      key: "propertyType",
      label: "Property Type",
      format: (value: any) => value || "N/A",
    },
    {
      key: "status",
      label: "Status",
      format: (value: any) => value || "Available",
    },
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Property Comparison</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Compare up to 3 properties side by side
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedProperties.map((property, index) => {
            const propertyData = getPropertyData(property);

            return (
              <Card key={propertyData.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
                    {propertyData.image ? (
                      <img
                        src={propertyData.image}
                        alt={propertyData.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-12 h-12"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10 2v8L8 8l2-2V2h6l-2 2 2 2v8l-2-2 2 2v8h-6v-6H4v6H2V2h8z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-lg line-clamp-2">
                    {propertyData.title}
                  </CardTitle>

                  {(propertyData.address || propertyData.city) && (
                    <p className="text-sm text-muted-foreground">
                      {[
                        propertyData.address,
                        propertyData.city,
                        propertyData.state,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  )}

                  <Badge
                    className={`w-fit ${
                      propertyData.status === "available"
                        ? "bg-green-100 text-green-800"
                        : propertyData.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : propertyData.status === "sold"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {propertyData.status.charAt(0).toUpperCase() +
                      propertyData.status.slice(1)}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-3">
                  {comparisonFeatures.map((feature) => (
                    <div
                      key={feature.key}
                      className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                    >
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {feature.label}:
                      </span>
                      <span className="text-sm font-semibold">
                        {feature.format(
                          propertyData[feature.key as keyof typeof propertyData]
                        )}
                      </span>
                    </div>
                  ))}

                  {propertyData.description && (
                    <div className="pt-2">
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                        {propertyData.description}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Summary */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h4 className="font-semibold mb-3">Quick Comparison</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Price Range:
              </span>
              <p className="font-medium">
                {Math.min(
                  ...selectedProperties.map(
                    (p) => getPropertyData(p).price || 0
                  )
                ).toLocaleString()}{" "}
                - $
                {Math.max(
                  ...selectedProperties.map(
                    (p) => getPropertyData(p).price || 0
                  )
                ).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Avg. Bedrooms:
              </span>
              <p className="font-medium">
                {(
                  selectedProperties.reduce(
                    (sum, p) => sum + (getPropertyData(p).bedrooms || 0),
                    0
                  ) / selectedProperties.length
                ).toFixed(1)}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Avg. Bathrooms:
              </span>
              <p className="font-medium">
                {(
                  selectedProperties.reduce(
                    (sum, p) => sum + (getPropertyData(p).bathrooms || 0),
                    0
                  ) / selectedProperties.length
                ).toFixed(1)}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">
                Avg. Sq Ft:
              </span>
              <p className="font-medium">
                {(
                  selectedProperties.reduce(
                    (sum, p) => sum + (getPropertyData(p).squareFootage || 0),
                    0
                  ) / selectedProperties.length
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close Comparison
          </Button>
          <Button onClick={() => window.print()}>Print Comparison</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
