"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export type AppSidebarUser = {
  displayName: string;
  roleLabel: string;
  initials: string;
};

export function AppSidebar({
  displayName,
  roleLabel,
  initials,
}: AppSidebarUser) {
  const pathname = usePathname();
  const {data: session} = useSession();

  const menu = [
    {
      name: "Perfil",
      href: "/perfil",
      icon: User,
    },
    {
      name: "Mascota",
      href: "mascota",
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
    }

  ];

  return (
    <Sidebar className="w-64 border-r bg-white">

      {/* HEADER */}
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

      {/* MENU */}
      <SidebarContent>
        <SidebarGroup className="p-2 flex flex-col gap-1">

          {menu.map((item) => {
            const isActive = pathname === item.href;
            if(item.name === "Gestionar mascotas" && session?.user?.role !== "refugio"){
              return null; // No renderizar este item si el usuario no es admin
            }
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

      {/* FOOTER */}
      <SidebarFooter className="p-4 border-t">
        <Button className="bg-white flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition" onClick={() => signOut()}>
          <LogOut size={16} />
          Cerrar sesión
        </Button>
      </SidebarFooter>

    </Sidebar>
  );
}