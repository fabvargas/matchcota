"use client"

import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from 'lucide-react';
import { Button } from './ui/button';
import EliminarSolicitud from '@/app/controller/solicitud/EliminarSolicitud';

export default function SolicitudCard({ solicitudes }: { solicitudes: any[] }) {
    const [solicitudesState, setSolicitudesState] = useState(solicitudes);

    const deleteSolicitud = async (id: string) => {
      setSolicitudesState((prev) => prev.filter((s) => s.id !== id));
      await EliminarSolicitud(id);
    };
  return (
  <div className="space-y-4">

        {
        !solicitudesState || solicitudesState.length === 0 ? (
          <p>No tienes solicitudes de adopción en este momento.</p>
        ) : (
        solicitudesState.map((s) => (
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
                  {s.nombreUsuario} quiere adoptar a {s.nombreMascota}
                </p>
              </div>

              {/* INFO ADOPTANTE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Adoptante</p>
                  <p className="font-medium">{s.nombreUsuario}</p>
                </div>

                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Mascota</p>
                  <p className="font-medium">{s.nombreMascota}</p>
                </div>

                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Contacto</p>
                  <p className="font-medium">{s.userEmail || "No se proporcionó un contacto."}</p>
                </div>

                <div className="p-3 rounded-xl bg-muted/40">
                  <p className="text-xs text-muted-foreground">Descripcion</p>
                  <p className="font-medium">
                    {s.mensaje || "No se proporcionó una descripción adicional."}
                  </p>
                </div>

              </div>

              {/* ESTADO */}
              <div className="flex items-center gap-2">

                {s.state === "Pendiente" && (
                  <Badge className="bg-yellow-50 text-yellow-600 border border-yellow-200">
                    Pendiente
                  </Badge>
                )}

                {s.state === "Aprobada" && (
                  <Badge className="bg-green-50 text-green-600 border border-green-200">
                    Aprobada
                  </Badge>
                )}

                {s.state === "Rechazada" && (
                  <Badge className="bg-red-50 text-red-600 border border-red-200">
                    Rechazada
                  </Badge>
                )}

              </div>

              {/* ACCIONES */}
              <div className="flex flex-col sm:flex-row gap-2">

            

                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-300 text-red-500 hover:bg-red-50"
                    onClick={() => deleteSolicitud(s.id)}
                >
                  Eliminar solicitud
                </Button>

              </div>

            </CardContent>
          </Card>)
        ))}

      </div>
  )
}
