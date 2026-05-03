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
              <div className="flex items-center justify-between">
                <div>
                <p className="text-xs text-muted-foreground">
                  {s.fecha}
                </p>

                <p className="text-sm font-semibold text-[#2F2F2F]">
                  {s.nombreUsuario} quiere adoptar a {s.nombreMascota}
                </p>
                </div>
                {
                    s.state === "Aprobado" && (
                        <span className="text-green-600 font-semibold flex items-center gap-1 mr-10">  
                        <Badge  className="text-green-600">
              
                        </Badge>
                          Aprobado
                        </span>
                    )
                }
                {
                    s.state === "Rechazado" && (
                      <span className="text-red-600 font-semibold flex items-center gap-1 mr-10"> 
                      <Badge className="text-red-600">
                   
                      </Badge>
                           Rechazado
                      </span>
                    )

                }
                {
                    s.state === "Pendiente" && (
                      <span className="text-yellow-600 font-semibold flex items-center gap-1 mr-10"> 
                      <Badge className="text-yellow-600">
                  
                      </Badge>
                            Pendiente
                      </span>
                    )
                }

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
