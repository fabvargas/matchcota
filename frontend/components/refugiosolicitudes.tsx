"use client";

import { Card, CardContent } from "@/frontend/components/ui/card";
import { Button } from "@/frontend/components/ui/button";
import { Badge } from "@/frontend/components/ui/badge";
import { UpdateAprobado } from "@/app/controller/solicitud/UpdateAprobado";
import { UpdateRechazar } from "@/app/controller/solicitud/UpdateRechazar";

export default function Solicitudes({ solicitudes }: { solicitudes: any[] }) {
  
console.log("Solicitudes recibidas en el componente:", solicitudes);

const handleAccept = async (id: string) => {
  return await UpdateAprobado(id);
}

const handleReject = async (id: string) => {
  return await UpdateRechazar(id);
}


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

                {s.state === "Aprobado" && (
                  <Badge className="bg-green-50 text-green-600 border border-green-200">
                    Aprobada
                  </Badge>
                )}

                {s.state === "Rechazado" && (
                  <Badge className="bg-red-50 text-red-600 border border-red-200">
                    Rechazado
                  </Badge>
                )}

              </div>

              {/* ACCIONES — solo mientras está pendiente */}
            
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    className="bg-[#4CAF7A] hover:bg-[#3d9c66]"
                    onClick={() => handleAccept(s.id)}
                  >
                    Aceptar
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-500 hover:bg-red-50"
                    onClick={() => handleReject(s.id)}
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

