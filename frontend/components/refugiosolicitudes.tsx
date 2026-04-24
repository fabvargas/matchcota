"use client";

import { Card, CardContent } from "@/frontend/components/ui/card";
import { Button } from "@/frontend/components/ui/button";
import { Badge } from "@/frontend/components/ui/badge";

export default function Solicitudes() {
  const solicitudes = [
    {
      id: 1,
      adoptante: "Juan Pérez",
      descripcion: "Amante de los animales, con experiencia en cuidado de perros y gatos. Siempre dispuesto a brindar un hogar amoroso a las mascotas que lo necesiten.",
      mascota: "Zeus",
      fecha: "2026-04-20",
      estado: "Pendiente",
    },
    {
      id: 2,
      adoptante: "Ana López",
      descripcion: "Vivo en un departamento amplio y me encantan los animales. He adoptado antes y siempre he brindado un hogar feliz y saludable a mis mascotas.",
      mascota: "Pelusa",
      fecha: "2026-04-18",
      estado: "Pendiente",
    },
    {
      id: 3,
      adoptante: "Carlos Díaz",
      descripcion: "Vivo en una casa con jardín y tengo experiencia cuidando perros grandes. Me encantaría darle un hogar a una mascota que necesite amor y atención.",
      mascota: "Valki",
      fecha: "2026-04-15",
      estado: "Pendiente",
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#4CAF7A]">
          📩 Solicitudes de adopción
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona las solicitudes enviadas a tu refugio.
        </p>
      </div>

      {/* LISTA */}
      <div className="space-y-4">

        {solicitudes.map((s) => (
          <Card
            key={s.id}
            className="border-none shadow-sm hover:shadow-md transition rounded-2xl"
          >
            <CardContent className="flex flex-col gap-4 p-5">

              {/* HEADER */}
              <div>
                <p className="text-xs text-muted-foreground">
                  {s.fecha}
                </p>

                <p className="text-sm font-semibold text-[#2F2F2F]">
                  {s.adoptante} quiere adoptar a {s.mascota}
                </p>
              </div>

              {/* INFO ADOPTANTE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Adoptante</p>
                  <p className="font-medium">{s.adoptante}</p>
                </div>

                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Mascota</p>
                  <p className="font-medium">{s.mascota}</p>
                </div>

                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Contacto</p>
                  <p className="font-medium">+56 9 1234 5678</p>
                </div>

                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Descripcion</p>
                  <p className="font-medium">
                    {s.descripcion}
                  </p>
                </div>

              </div>

              {/* ESTADO */}
              <div className="flex items-center gap-2">

                {s.estado === "Pendiente" && (
                  <Badge className="bg-yellow-50 text-yellow-600 border border-yellow-200">
                    Pendiente
                  </Badge>
                )}

                {s.estado === "Aprobada" && (
                  <Badge className="bg-green-50 text-green-600 border border-green-200">
                    Aprobada
                  </Badge>
                )}

                {s.estado === "Rechazada" && (
                  <Badge className="bg-red-50 text-red-600 border border-red-200">
                    Rechazada
                  </Badge>
                )}

              </div>

              {/* ACCIONES */}
              <div className="flex flex-col sm:flex-row gap-2">

                <Button
                  size="sm"
                  className="bg-[#4CAF7A] hover:bg-[#3d9c66]"
                >
                  Aceptar
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-500 hover:bg-red-50"
                >
                  Rechazar
                </Button>

              </div>

            </CardContent>
          </Card>
        ))}

      </div>
    </div>
  );
}