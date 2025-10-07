"use client";
import Link from "next/link";

export default function NewLeadButton() {
  return (
    <Link
      href="/dashboard/leads/new"
      className="btn-shine px-3 py-1 rounded-md"
    >
      New Lead
    </Link>
  );
}
