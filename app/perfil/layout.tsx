import {
  SidebarProvider,
  SidebarInset,
} from "@/frontend/components/ui/sidebar";

import { AppSidebar } from "@/frontend/components/app-sidebar";
import GetProfile from "../controller/profile/GetProfile";
import { auth } from "@/auth";




function formatRoleLabel(role: string | undefined): string {
  if (!role) return "—";
  const r = role.toLowerCase();
  if (r === "adoptante") return "Adoptante";
  if (r === "refugio") return "Refugio";
  return role;
}

function initialsFromDisplayName(name: string): string {
  const t = name.trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return t.slice(0, 2).toUpperCase();
}

export default async function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, session] = await Promise.all([GetProfile(), auth()]);

  const displayName =
    (!profile.error && profile.data?.name?.trim()) ||
    session?.user?.name?.trim() ||
    session?.user?.email ||
    "Usuario";

  const rawRole =
    (!profile.error && profile.data?.role) || session?.user?.role || "";
  const roleLabel = formatRoleLabel(rawRole);
  const initials = initialsFromDisplayName(displayName);

  return (
   
    <SidebarProvider>

      <AppSidebar
        displayName={displayName}
        roleLabel={roleLabel}
        initials={initials}
      />

      <SidebarInset>
        <div className="p-6 ">
          {children}
        </div>
      </SidebarInset>

    </SidebarProvider>
  
  );
}