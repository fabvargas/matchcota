"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/frontend/components/ui/button";
import { LogIn, UserPlus, Menu } from "lucide-react";
import { useState } from "react";


export function Navbar() {
  const [open, setOpen] = useState(false);


  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">

        {/* LOGO */}
        <Link href="/perfil" className="flex items-center gap-2 font-bold text-[#2F2F2F]">
          <Image
            src="/images/Logomc_icon.png"
            alt="MatchCota Logo"
            width={36}
            height={36}
          />
          <span className="text-lg md:text-xl">MatchCota</span>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/mascota" className="hover:text-[#4CAF7A]">
            Adoptar
          </Link>
          <Link href="/" className="hover:text-[#4CAF7A]">
            Publicar mascota
          </Link>
          <Link href="/" className="hover:text-[#4CAF7A]">
            Test
          </Link>
        </nav>

        {/* BOTONES DESKTOP */}
        <div className="hidden md:flex gap-3">
          <Link href="/login">
            <Button variant="customgreen" className="flex items-center gap-1">
              <LogIn className="w-4 h-4" />
              <span className="hidden lg:inline">Iniciar sesión</span>
            </Button>
          </Link>

          <Link href="/registro">
            <Button variant="customorange" className="flex items-center gap-1">
              <UserPlus className="w-4 h-4" />
              <span className="hidden lg:inline">Registrarse</span>
            </Button>
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border"
        >
          <Menu className="w-5 h-5" />
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t bg-white">

          <Link href="/mascota" onClick={() => setOpen(false)}>
            Adoptar
          </Link>

          <Link href="/" onClick={() => setOpen(false)}>
            Publicar mascota
          </Link>

          <Link href="/" onClick={() => setOpen(false)}>
            Test de compatibilidad
          </Link>

          <div className="flex flex-col gap-2 pt-2">
            <Link href="/login">
              <Button variant="customgreen" className="w-full">
                Iniciar sesión
              </Button>
            </Link>

            <Link href="/registro">
              <Button variant="customorange" className="w-full">
                Registrarse
              </Button>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}