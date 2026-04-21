import {
  SidebarProvider,
  SidebarInset,
} from "@/frontend/components/ui/sidebar";

import { AppSidebar } from "@/frontend/components/app-sidebar";

export default function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <SidebarProvider>

      <AppSidebar />

      <SidebarInset>
        <div className="p-6 ">
          {children}
        </div>
      </SidebarInset>

    </SidebarProvider>
  );
}