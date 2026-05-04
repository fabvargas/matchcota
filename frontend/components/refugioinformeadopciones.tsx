"use client";

import type { CardMascotaProps } from "@/frontend/components/Cardmascota";
import InformeSection from "@/frontend/components/informe-section";
import InformeTablaMascotas from "@/frontend/components/informe-tabla-mascotas";
import InformeTablaSolicitudes, {
  type InformeSolicitudRow,
} from "@/frontend/components/informe-tabla-solicitudes";
import {
  generarYAbrirInformePdf,
  type RefugioInformePdfProfile,
} from "@/frontend/lib/informePdf";

export default function RefugioInformeAdopciones({
  mascotas,
  solicitudes,
  refugio,
}: {
  mascotas: CardMascotaProps[];
  solicitudes: InformeSolicitudRow[];
  refugio: RefugioInformePdfProfile;
}) {
  const list = solicitudes ?? [];
  const mascotasList = mascotas ?? [];

  const pendientes = list.filter((s) => s.state === "Pendiente");
  const rechazadas = list.filter((s) => s.state === "Rechazado");
  const aprobadas = list.filter((s) => s.state === "Aprobado");

  const ejecutarInforme = async (fn: () => Promise<void>) => {
    try {
      await fn();
    } catch (e) {
      console.error(e);
      window.alert(
        e instanceof Error ? e.message : "No se pudo generar el informe PDF."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#4CAF7A]">
          Informe de adopciones
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Consulta mascotas en adopción y el estado de las solicitudes de tu
          refugio.
        </p>
      </div>

      <InformeSection
        title="Adopciones en espera"
        description="Mascotas publicadas por este refugio y visibles para los adoptantes."
        onGenerarInforme={() =>
          ejecutarInforme(() =>
            generarYAbrirInformePdf({
              titulo: "Adopciones en espera (mascotas publicadas)",
              refugio,
              modo: "mascotas",
              mascotas: mascotasList,
            })
          )
        }
      >
        <InformeTablaMascotas
          mascotas={mascotasList}
          emptyMessage="No hay mascotas publicadas en este momento."
        />
      </InformeSection>

      <InformeSection
        title="Adopciones pendientes"
        description="Solicitudes de adopción que aún no han sido respondidas."
        onGenerarInforme={() =>
          ejecutarInforme(() =>
            generarYAbrirInformePdf({
              titulo: "Adopciones pendientes",
              refugio,
              modo: "solicitudes",
              solicitudes: pendientes,
            })
          )
        }
      >
        <InformeTablaSolicitudes
          rows={pendientes}
          emptyMessage="No hay solicitudes pendientes."
          badgeKey="pendiente"
        />
      </InformeSection>

      <InformeSection
        title="Adopciones rechazadas"
        description="Solicitudes que fueron rechazadas por tu refugio."
        onGenerarInforme={() =>
          ejecutarInforme(() =>
            generarYAbrirInformePdf({
              titulo: "Adopciones rechazadas",
              refugio,
              modo: "solicitudes",
              solicitudes: rechazadas,
            })
          )
        }
      >
        <InformeTablaSolicitudes
          rows={rechazadas}
          emptyMessage="No hay solicitudes rechazadas."
          badgeKey="rechazado"
        />
      </InformeSection>

      <InformeSection
        title="Adopciones aprobadas"
        description="Solicitudes aceptadas y adopciones concretadas."
        onGenerarInforme={() =>
          ejecutarInforme(() =>
            generarYAbrirInformePdf({
              titulo: "Adopciones aprobadas",
              refugio,
              modo: "solicitudes",
              solicitudes: aprobadas,
            })
          )
        }
      >
        <InformeTablaSolicitudes
          rows={aprobadas}
          emptyMessage="Aún no hay adopciones aprobadas registradas."
          badgeKey="aprobado"
        />
      </InformeSection>
    </div>
  );
}
