
import { Card, CardContent } from "@/frontend/components/ui/card";
import { Button } from "@/frontend/components/ui/button";
import { Badge } from "@/frontend/components/ui/badge";
import { GetAdopcionByAuth } from "@/app/controller/solicitud/GetAdopcionByAuth";
import SolicitudCard from "@/frontend/components/SolicitudCard";

export default async function Procesos() {
  const solicitudes = await GetAdopcionByAuth();
console.log("Solicitudes recibidas en el componente:", solicitudes);
  return (
    
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-[#4CAF7A]">
          📩 Solicitudes de adopción
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gestiona las solicitudes enviadas .
        </p>
      </div>

      {/* LISTA */}
        <SolicitudCard solicitudes={solicitudes || []} />
    </div>
  );
}