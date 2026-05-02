import { GetMascotasByRefugio } from "@/app/controller/pet/GetMascotaByRefugio";
import { GetAdopcionByRefugio } from "@/app/controller/solicitud/GetAdopcionByRefugio";
import PanelRefugio from "@/frontend/components/panelrefugio";
export const dynamic = "force-dynamic";

export default async function GestionarMascotaPage() {
  
  const response = await GetMascotasByRefugio();

    const solicitudes = await GetAdopcionByRefugio();



  if (response.error || !solicitudes) {
    return <div>Error: {response.message}</div>;
  }

  return (
    <div>
      <PanelRefugio mascotas={response.data || []} solicitudes={solicitudes || []} />
    </div>
  );
}