"use client";
import dynamic from "next/dynamic";

// Dynamic import with no SSR to prevent hydration issues
const ThemeToggleClient = dynamic(() => import("./ThemeToggleClient"), {
  ssr: false,
  loading: () => (
    <div className="w-8 h-8 rounded px-2 py-1 border border-gray-300 bg-white flex items-center justify-center">
      <span className="text-sm">☀️</span>
    </div>
  ),
});

export default function ThemeToggle() {
  return <ThemeToggleClient />;
}
