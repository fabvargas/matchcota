"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { LayoutDashboard, PawPrint, Inbox } from "lucide-react";
import Tab from "@/frontend/components/Tab";
import General from "@/frontend/components/refugiogeneral";
import MisMascotas from "@/frontend/components/refugiomascota";
import Solicitudes from "@/frontend/components/refugiosolicitudes";
import { CardMascotaProps } from "./Cardmascota";


type PanelRefugioProps = {
  mascotas: CardMascotaProps[];
  solicitudes: any[];
};
  

export default function PanelRefugio({ mascotas, solicitudes }: { mascotas: CardMascotaProps[]; solicitudes: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("tab") || "general";

  const changeTab = (tab: string) => {
    router.push(`?tab=${tab}`);
  };


  return (
    <div className="max-w-6xl px-4 md:px-6 py-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#4CAF7A]">
          Panel de Refugio
        </h1>
        <p className="text-muted-foreground">
          Gestiona tus mascotas y solicitudes de adopción.
        </p>
      </div>

      <div className="flex gap-2 border-b mb-6 overflow-x-auto">

        <Tab
          active={activeTab === "general"}
          onClick={() => changeTab("general")}
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="General"
        />

        <Tab
          active={activeTab === "mascotas"}
          onClick={() => changeTab("mascotas")}
          icon={<PawPrint className="w-4 h-4" />}
          label="Mis mascotas"
        />

        <Tab
          active={activeTab === "solicitudes"}
          onClick={() => changeTab("solicitudes")}
          icon={<Inbox className="w-4 h-4" />}
          label="Solicitudes"
        />

      </div>

      <div className="min-h-[300px]">
        {activeTab === "general" && <General />}
        {activeTab === "mascotas" && <MisMascotas mascotas={mascotas} />}
        {activeTab === "solicitudes" && <Solicitudes solicitudes={solicitudes} />}
      </div>

    </div>
  );
}