import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/onboarding" || location.pathname === "/login" || location.pathname === "/signup";

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col w-full">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 md:hidden">
            <SidebarTrigger />
            <span className="font-display font-bold text-primary">SignTales</span>
          </header>
          <main className="flex-1 w-full max-w-7xl mx-auto md:p-6 lg:p-8">
            <Outlet />
          </main>
          <div className="md:hidden h-20">
            <BottomNav />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
