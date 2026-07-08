"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import {
  DashboardSidebarDesktop,
  DashboardSidebarMobile,
  DashboardMobileNav,
} from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-dash-bg">
      <DashboardSidebarDesktop />
      <DashboardSidebarMobile open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar onMenuClick={() => setSidebarOpen(true)} />
        <DashboardMobileNav />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
