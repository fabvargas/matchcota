import { GetMascotasByRefugio } from "@/app/controller/pet/GetMascotaByRefugio";
import { GetAdopcionByRefugio } from "@/app/controller/solicitud/GetAdopcionByRefugio";
import GetProfile from "@/app/controller/profile/GetProfile";
import PanelRefugio from "@/frontend/components/panelrefugio";
import type { RefugioInformePdfProfile } from "@/frontend/lib/informePdf";

export const dynamic = "force-dynamic";

export default async function GestionarMascotaPage() {
  const [response, solicitudes, profile] = await Promise.all([
    GetMascotasByRefugio(),
    GetAdopcionByRefugio(),
    GetProfile(),
  ]);

  if (response.error || !solicitudes) {
    return <div>Error: {response.message}</div>;
  }

  const refugioInforme: RefugioInformePdfProfile =
    !profile.error && profile.data
      ? {
          name: profile.data.name ?? "Refugio",
          email: profile.data.email,
          telephone: profile.data.telephone,
          address: profile.data.address,
          comuna:
            typeof profile.data.comuna === "string"
              ? profile.data.comuna
              : undefined,
          region:
            typeof profile.data.region === "string"
              ? profile.data.region
              : undefined,
        }
      : { name: "Refugio" };

  return (
    <div>
      <PanelRefugio
        mascotas={response.data || []}
        solicitudes={solicitudes || []}
        refugioInforme={refugioInforme}
      />
    </div>
  );
}