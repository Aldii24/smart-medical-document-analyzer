import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AppSidebar } from "./_components/AppSidebar";
import NavbarDashboard from "./_components/NavbarDashboard";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center">
          <SidebarTrigger />
          <NavbarDashboard />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
