"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/frontend/components/navbar";
import { Footer } from "@/frontend/components/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout = pathname.startsWith("/perfil");

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}