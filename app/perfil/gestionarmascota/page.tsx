import { GetMascotasByRefugio } from "@/app/controller/pet/GetMascotaByRefugio";
import PanelRefugio from "@/frontend/components/panelrefugio";
export const dynamic = "force-dynamic";

export default async function GestionarMascotaPage() {
  
  const response = await GetMascotasByRefugio();
  console.log("Response del controlador:"); 

  if (response.error) {
    return <div>Error: {response.message}</div>;
  }

  return (
    <div>
      <PanelRefugio mascotas={response.data || []} />
    </div>
  );
}