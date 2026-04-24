"use client";

import { Card, CardContent } from "@/frontend/components/ui/card";
import { PawPrint, Inbox, CheckCircle, Eye } from "lucide-react";
import { Button } from "./ui/button";
import PublicarMascota from "./FormMascota";
import FormMascota from "./FormMascota";

export default function General() {
  const stats = [
    {
      title: "Mascotas publicadas",
      value: 12,
      icon: PawPrint,
    },
    {
      title: "Solicitudes",
      value: 5,
      icon: Inbox,
    },
    {
      title: "Adopciones",
      value: 3,
      icon: CheckCircle,
    },
    {
      title: "Visitas",
      value: 150,
      icon: Eye,
    },
  ];

const solicitudes = [
  {
    fecha: "2026-04-01",
    adoptante: "Juan Pérez",
    mascota: "Zeus",
    estado: "Pendiente",
  },
  {
    fecha: "2026-04-03",
    adoptante: "Ana López",
    mascota: "Luna",
    estado: "Aprobada",
  },
    {
    fecha: "2026-04-05",
    adoptante: "Carlos Gómez",
    mascota: "Rocky",
    estado: "Rechazada",
  },
];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Estadísticas */}
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <Card
            key={index}
            className="border-none shadow-sm bg-white hover:shadow-lg transition-all duration-300 rounded-2xl"
          >
            <CardContent className="p-5 flex items-center justify-between">

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>

                <p className="text-3xl font-bold text-[#2F2F2F]">
                  {stat.value}
                </p>
              </div>

              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#4CAF7A]/10">
                <Icon className="w-6 h-6 text-[#4CAF7A]" />
              </div>

            </CardContent>
          </Card>
        );
      })}

      {/* Publicar Mascota */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <FormMascota/>
      </div>
        
       {/* Actividad reciente */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <Card className="bg-[#4CAF7A]/10 border-none mt-4">
          <CardContent>
            <h3 className="text-lg font-semibold text-[#4CAF7A] mb-2">
              Actividad reciente
            </h3>
            <p className="text-gray-600 text-sm">
              Últimas solicitudes de adopción.
            </p>

            <div className="mt-4 border-t pt-4 space-y-3">
            {solicitudes.map((s, index) => (
                <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition"
                >

                {/* INFO */}
                <div>
                    <p className="text-sm text-gray-500">
                    {s.fecha}
                    </p>

                    <p className="text-md font-medium text-[#2F2F2F]">
                    {s.adoptante} quiere adoptar a {s.mascota}
                    </p>
                </div>

                {/* ESTADO */}
                <div className="flex items-center gap-2">
                    <span
                    className={`w-2 h-2 rounded-full ${
                        s.estado === "Aprobada"
                        ? "bg-green-500"
                        : s.estado === "Pendiente"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    />

                    <p
                    className={`text-sm ${
                        s.estado === "Aprobada"
                        ? "text-green-600"
                        : s.estado === "Pendiente"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                    >
                    {s.estado}
                    </p>
                </div>

                </div>
            ))}
            </div>

          </CardContent>
        </Card>
      </div>


    </div>
  );
}