"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PropertyFiltersProps {
  onFilterChange: (filters: any) => void;
  onBulkAction: (action: string, selectedIds: string[]) => void;
  onCompareProperties: (propertyIds: string[]) => void;
  selectedProperties: string[];
  totalProperties: number;
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "pending", label: "Pending" },
  { value: "sold", label: "Sold" },
  { value: "off-market", label: "Off Market" },
];

const propertyTypeOptions = [
  { value: "all", label: "All Types" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
];

export default function PropertyFilters({
  onFilterChange,
  onBulkAction,
  onCompareProperties,
  selectedProperties,
  totalProperties,
}: PropertyFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    propertyType: "all",
    priceMin: "",
    priceMax: "",
    bedroomsMin: "",
    bedroomsMax: "",
    bathroomsMin: "",
    bathroomsMax: "",
    sqftMin: "",
    sqftMax: "",
    city: "",
    state: "",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: "",
      status: "all",
      propertyType: "all",
      priceMin: "",
      priceMax: "",
      bedroomsMin: "",
      bedroomsMax: "",
      bathroomsMin: "",
      bathroomsMax: "",
      sqftMin: "",
      sqftMax: "",
      city: "",
      state: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleBulkStatusChange = (newStatus: string) => {
    if (selectedProperties.length > 0) {
      onBulkAction("updateStatus", selectedProperties);
    }
  };

  const handleCompareClick = () => {
    if (selectedProperties.length >= 2) {
      onCompareProperties(selectedProperties);
    }
  };

  return (
    <div className="space-y-4">
      {/* Basic Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
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
            className="pl-12"
            placeholder="Search by title, location, or features..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.propertyType}
            onValueChange={(value) => handleFilterChange("propertyType", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10,18H14V16H10V18M3,6V8H21V6H3M6,13H18V11H6V13Z" />
            </svg>
            {showAdvancedFilters ? "Hide Filters" : "More Filters"}
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
            <CardDescription>
              Refine your property search with detailed criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Price Range
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="Min Price"
                    type="number"
                    value={filters.priceMin}
                    onChange={(e) =>
                      handleFilterChange("priceMin", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Input
                    placeholder="Max Price"
                    type="number"
                    value={filters.priceMax}
                    onChange={(e) =>
                      handleFilterChange("priceMax", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Bedrooms
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={filters.bedroomsMin}
                    onChange={(e) =>
                      handleFilterChange("bedroomsMin", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={filters.bedroomsMax}
                    onChange={(e) =>
                      handleFilterChange("bedroomsMax", e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Bathrooms
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={filters.bathroomsMin}
                    onChange={(e) =>
                      handleFilterChange("bathroomsMin", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={filters.bathroomsMax}
                    onChange={(e) =>
                      handleFilterChange("bathroomsMax", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Square Footage */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Square Footage
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Min Sq Ft"
                  type="number"
                  value={filters.sqftMin}
                  onChange={(e) =>
                    handleFilterChange("sqftMin", e.target.value)
                  }
                />
                <Input
                  placeholder="Max Sq Ft"
                  type="number"
                  value={filters.sqftMax}
                  onChange={(e) =>
                    handleFilterChange("sqftMax", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">City</Label>
                <Input
                  placeholder="Enter city"
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">State</Label>
                <Input
                  placeholder="Enter state"
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bulk Actions and Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-card-light dark:bg-card-dark rounded-lg border">
        <div className="flex items-center gap-4">
          {selectedProperties.length > 0 && (
            <>
              <Badge variant="secondary" className="px-3 py-1">
                {selectedProperties.length} of {totalProperties} selected
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bulk Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleBulkStatusChange("available")}
                  >
                    Mark as Available
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleBulkStatusChange("pending")}
                  >
                    Mark as Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleBulkStatusChange("sold")}
                  >
                    Mark as Sold
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onBulkAction("delete", selectedProperties)}
                  >
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {selectedProperties.length >= 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCompareClick}
                  className="flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9,5V9H21V7.5L19,5.5L21,3.5V2H9V5M9,10V14H21V12.5L19,10.5L21,8.5V7H9V10M9,15V19H21V17.5L19,15.5L21,13.5V12H9V15M9,20V22H21V20H9M5,2V4H7V22H5V20H3V18H5V14H3V12H5V10H3V8H5V4H3V2H5Z" />
                  </svg>
                  Compare ({selectedProperties.length})
                </Button>
              )}
            </>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
            </svg>
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
