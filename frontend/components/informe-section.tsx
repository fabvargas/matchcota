"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/frontend/components/ui/card";

export default function InformeSection({
  title,
  description,
  children,
  onGenerarInforme,
}: {
  title: string;
  description: string;
  children: ReactNode;
  onGenerarInforme?: () => void | Promise<void>;
}) {
  return (
    <Card className="border-none shadow-sm hover:shadow-md transition rounded-2xl">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#2F2F2F]">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <button
            type="button"
            className="group flex flex-col items-center gap-2 shrink-0 cursor-pointer bg-transparent p-0 border-0 shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF7A] focus-visible:ring-offset-2 rounded-md"
            onClick={() => void onGenerarInforme?.()}
          >
            <Image
              src="/images/informe.png"
              alt=""
              width={48}
              height={48}
              className="object-contain pointer-events-none"
            />
            <span className="inline-flex items-center justify-center rounded-md border border-[#4CAF7A] text-[#4CAF7A] px-4 py-2 text-sm font-medium transition-colors group-hover:bg-[#4CAF7A]/10">
              Generar informe
            </span>
          </button>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
