import {
  SidebarProvider,
  SidebarInset,
} from "@/frontend/components/ui/sidebar";

import { AppSidebar } from "@/frontend/components/app-sidebar";
import { SessionProvider } from "next-auth/react";


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