"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
} from "@/frontend/components/ui/sidebar";

import {
  User,
  PawPrint,
  Shield,
  LogOut,
  BookCheck,
  HeartHandshake,
  Bookmark,
  BarChart3,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export type AppSidebarUser = {
  displayName: string;
  roleLabel: string;
  initials: string;
  /** Rol desde el servidor */
  role: string;
};

const menu = [
  {
    name: "Perfil",
    href: "/perfil",
    icon: User,
  },
  {
    name: "Mascota",
    href: "/mascota",
    icon: PawPrint,
  },
  {
    name: "Seguridad",
    href: "/perfil/seguridad",
    icon: Shield,
  },
  {
    name: "Test MatchCota",
    href: "/inforazas",
    icon: BookCheck,
  },
  {
    name: "Procesos de adopción",
    href: "/perfil/procesos",
    icon: HeartHandshake,
  },

  {
    name: "Favoritos",
    href: "/perfil/favoritos",
    icon: Bookmark,
  },

  {
    name: "Gestionar mascotas",
    href: "/perfil/gestionarmascota",
    icon: PawPrint,
    refugioOnly: true,
  },
  {
    name: "Informe de adopciones",
    href: "/perfil/gestionarmascota?tab=informe",
    icon: BarChart3,
    refugioOnly: true,
  },
];

function isMenuItemActive(
  pathname: string,
  tab: string,
  item: (typeof menu)[number]
) {
  if (item.name === "Informe de adopciones") {
    return pathname === "/perfil/gestionarmascota" && tab === "informe";
  }
  if (item.name === "Gestionar mascotas") {
    return pathname === "/perfil/gestionarmascota" && tab !== "informe";
  }
  const base = item.href.split("?")[0];
  return pathname === base;
}

function AppSidebarMenu({
  displayName,
  roleLabel,
  initials,
  role,
}: AppSidebarUser) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "general";
  const isRefugio = role.toLowerCase() === "refugio";

  return (
    <Sidebar className="w-64 border-r bg-white">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{displayName}</p>
            <p className="text-xs text-gray-500">{roleLabel}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="p-2 flex flex-col gap-1">
          {menu.map((item) => {
            if ("refugioOnly" in item && item.refugioOnly && !isRefugio) {
              return null;
            }
            if (item.name === "Mascota" && isRefugio) {
              return null;
            }

            const isActive = isMenuItemActive(pathname, tab, item);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <Button
          className="bg-white flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition"
          onClick={() => signOut()}
        >
          <LogOut size={16} />
          Cerrar sesión
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AppSidebar(props: AppSidebarUser) {
  return (
    <Suspense
      fallback={
        <Sidebar className="w-64 border-r bg-white">
          <SidebarHeader className="p-4 border-b h-[72px]" />
          <SidebarContent className="p-2 min-h-[200px]" />
        </Sidebar>
      }
    >
      <AppSidebarMenu {...props} />
    </Suspense>
  );
}
