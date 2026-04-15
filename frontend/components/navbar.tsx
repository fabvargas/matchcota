"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/frontend/components/ui/button";
import { LogIn, UserPlus, } from "lucide-react";

export function Navbar() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-xl font-bold text-[#2F2F2F] flex items-center gap-2">

            <Image
            src="/images/Logomc_icon.png"
            alt="MatchCota Logo"
            width={40}
            height={40}
            />
          MatchCota
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/" className="hover:text-[#4CAF7A]">
            Adoptar
          </Link>
          <Link href="/" className="hover:text-[#4CAF7A]">
            Publicar mascota
          </Link>
          <Link href="/" className="hover:text-[#4CAF7A]">
            Test de compatibilidad
          </Link>
        </nav>

        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="customgreen"> <LogIn className="w-4 h-4" /> Inicio de sesión</Button>
          </Link>
          <Link href="/registro">
            <Button variant="customorange"> <UserPlus className="w-4 h-4" /> Registrarse</Button>
          </Link>
        </div>

      </div>
    </header>
  );
}