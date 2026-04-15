import * as React from "react";
import { Header } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden min-h-screen">
        <Header />
        <main className="flex-1 overflow-auto p-4 lg:p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
