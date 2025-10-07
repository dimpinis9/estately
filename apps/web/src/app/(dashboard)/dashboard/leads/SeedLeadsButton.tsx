"use client";
import { useState } from "react";
import { toast } from "sonner";

export default function SeedLeadsButton() {
  const [loading, setLoading] = useState(false);
  const handleSeed = async () => {
    setLoading(true);
    const res = await fetch("/api/dev/seed-leads", { method: "POST" });
    setLoading(false);
    if (res.ok) {
      toast.success("Fake leads seeded!");
    } else {
      toast.error("Failed to seed leads");
    }
  };
  return (
    <button
      onClick={handleSeed}
      disabled={loading}
      className="btn-shine px-3 py-1 rounded-md"
    >
      {loading ? "Seeding..." : "Seed Leads (dev)"}
    </button>
  );
}
