"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiLogout, HiPhotograph, HiCalendar, HiUsers } from "react-icons/hi";

type Tab = "activities" | "gallery" | "members";

export default function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<Tab>("activities");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out");
    router.push("/admin/login");
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "activities", label: "Activities", icon: <HiCalendar size={20} /> },
    { key: "gallery", label: "Gallery", icon: <HiPhotograph size={20} /> },
    { key: "members", label: "Members", icon: <HiUsers size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-dark pt-20">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display font-bold text-white">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 bg-dark-200 rounded-lg hover:bg-dark-300 transition-colors"
          >
            <HiLogout size={18} />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === key
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "text-gray-400 hover:bg-dark-200 hover:text-white"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Tab content placeholder */}
        <div className="bg-dark-100 border border-white/10 rounded-2xl p-8">
          <p className="text-gray-400 text-center">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} management panel.
            <br />
            <span className="text-sm text-gray-500">
              CRUD operations for {activeTab} will be rendered here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
