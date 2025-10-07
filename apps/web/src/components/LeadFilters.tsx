"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface LeadFiltersProps {
  onFilterChange: (filters: any) => void;
  onBulkAction: (action: string, selectedIds: string[]) => void;
  selectedLeads: string[];
  totalLeads: number;
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "nurturing", label: "Nurturing" },
  { value: "closed", label: "Closed" },
];

const sourceOptions = [
  { value: "all", label: "All Sources" },
  { value: "website", label: "Website" },
  { value: "referral", label: "Referral" },
  { value: "social_media", label: "Social Media" },
  { value: "advertisement", label: "Advertisement" },
  { value: "cold_call", label: "Cold Call" },
];

export default function LeadFilters({
  onFilterChange,
  onBulkAction,
  selectedLeads,
  totalLeads,
}: LeadFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    source: "all",
    dateFrom: "",
    dateTo: "",
  });

  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importData, setImportData] = useState("");
  const [bulkNoteDialog, setBulkNoteDialog] = useState(false);
  const [bulkNote, setBulkNote] = useState("");

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBulkStatusChange = (newStatus: string) => {
    if (selectedLeads.length > 0) {
      onBulkAction("updateStatus", selectedLeads);
    }
  };

  const handleImportLeads = async () => {
    try {
      // Parse CSV data (simple implementation)
      const lines = importData.trim().split("\n");
      const leads = [];

      for (let i = 1; i < lines.length; i++) {
        // Skip header
        const [name, email, phone, source] = lines[i].split(",");
        if (name && email) {
          leads.push({
            name: name.trim(),
            email: email.trim(),
            phone: phone?.trim() || "",
            source: source?.trim() || "import",
          });
        }
      }

      // Send to API
      const response = await fetch("/api/leads/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leads }),
      });

      if (response.ok) {
        setImportData("");
        setShowImportDialog(false);
        window.location.reload(); // Refresh to show new leads
      } else {
        alert("Error importing leads");
      }
    } catch (error) {
      console.error("Import error:", error);
      alert("Error importing leads");
    }
  };

  const handleAddBulkNote = async () => {
    if (selectedLeads.length > 0 && bulkNote.trim()) {
      await onBulkAction("addNote", selectedLeads);
      setBulkNote("");
      setBulkNoteDialog(false);
    }
  };

  const handleExportLeads = () => {
    // Simple CSV export - in real app, this would call an API
    const csvContent = "Name,Email,Phone,Status,Source,Created\n";
    // Would fetch actual lead data and format as CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Search and Basic Filters */}
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
            placeholder="Search by name, email, or tag..."
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
            value={filters.source}
            onValueChange={(value) => handleFilterChange("source", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {sourceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="dateFrom" className="text-sm font-medium">
            From Date
          </Label>
          <Input
            id="dateFrom"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="dateTo" className="text-sm font-medium">
            To Date
          </Label>
          <Input
            id="dateTo"
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      {/* Bulk Actions and Import/Export */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-card-light dark:bg-card-dark rounded-lg border">
        <div className="flex items-center gap-4">
          {selectedLeads.length > 0 && (
            <>
              <Badge variant="secondary" className="px-3 py-1">
                {selectedLeads.length} of {totalLeads} selected
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bulk Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => handleBulkStatusChange("contacted")}
                  >
                    Mark as Contacted
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleBulkStatusChange("qualified")}
                  >
                    Mark as Qualified
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setBulkNoteDialog(true)}>
                    Add Note
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onBulkAction("delete", selectedLeads)}
                  >
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {/* Import Dialog */}
          <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Leads</DialogTitle>
                <DialogDescription>
                  Paste CSV data with columns: Name, Email, Phone, Source
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Name,Email,Phone,Source&#10;John Doe,john@example.com,555-1234,website&#10;Jane Smith,jane@example.com,555-5678,referral"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  rows={8}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowImportDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleImportLeads}>Import Leads</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" onClick={handleExportLeads}>
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

      {/* Bulk Note Dialog */}
      <Dialog open={bulkNoteDialog} onOpenChange={setBulkNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note to Selected Leads</DialogTitle>
            <DialogDescription>
              This note will be added to all {selectedLeads.length} selected
              leads.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter your note here..."
              value={bulkNote}
              onChange={(e) => setBulkNote(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkNoteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBulkNote}>Add Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
