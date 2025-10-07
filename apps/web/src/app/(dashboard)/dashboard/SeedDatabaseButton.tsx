"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SeedDatabaseButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    setResult(null);

    try {
      const response = await fetch("/api/dev/seed-data", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ Success: ${data.message}`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Failed to seed database: ${error}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const checkCounts = async () => {
    try {
      const response = await fetch("/api/dev/seed-data");
      const data = await response.json();

      if (response.ok) {
        setResult(`📊 Current data counts:
✅ Profiles: ${data.profiles}
✅ Leads: ${data.leads}  
✅ Properties: ${data.properties}
✅ Appointments: ${data.appointments}
✅ Activity Log: ${data.activityLog}

🎉 Your database already has data! Navigate to different sections to explore:
• Leads management
• Properties listings  
• Analytics dashboard
• Activity tracking`);
      } else {
        setResult(`❌ Error getting counts: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Failed to get counts: ${error}`);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Database Seeding Tools</h3>

      <div className="flex gap-2">
        <Button onClick={handleSeed} disabled={isSeeding} variant="outline">
          {isSeeding ? "Seeding..." : "🌱 Seed Database"}
        </Button>

        <Button onClick={checkCounts} variant="outline">
          📊 Check Data Counts
        </Button>
      </div>

      {result && (
        <div className="mt-4 p-3 bg-muted rounded-md whitespace-pre-line">
          {result}
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Manual seeding:</strong> Run the SQL migration file directly:
        </p>
        <code className="block mt-1 p-2 bg-muted rounded">
          supabase/migrations/20251007_seed_data.sql
        </code>
      </div>
    </div>
  );
}
