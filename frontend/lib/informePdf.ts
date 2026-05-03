
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { CardMascotaProps } from "@/frontend/components/Cardmascota";
import type { InformeSolicitudRow } from "@/frontend/components/informe-tabla-solicitudes";

export type RefugioInformePdfProfile = {
  name: string;
  email?: string;
  telephone?: string;
  address?: string;
  comuna?: string;
  region?: string;
};

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch("/images/Logomc_icon.png");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function addRefugioBlock(
  doc: jsPDF,
  refugio: RefugioInformePdfProfile,
  startY: number
): number {
  const line = 5;
  let y = startY;
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "bold");
  doc.text("Datos del refugio", 14, y);
  y += line + 1;
  doc.setFont("helvetica", "normal");

  const rows: [string, string][] = [
    ["Nombre", refugio.name || "—"],
    ["Correo", refugio.email ?? "—"],
    ["Telefono", refugio.telephone ?? "—"],
    ["Direccion", refugio.address ?? "—"],
    ["Comuna", refugio.comuna ?? "—"],
    ["Region", refugio.region ?? "—"],
  ];

  for (const [label, value] of rows) {
    doc.text(`${label}: ${value}`, 14, y);
    y += line;
  }

  doc.setTextColor(0, 0, 0);
  return y + 4;
}

type JsPdfWithTable = jsPDF & {
  lastAutoTable?: { finalY: number };
};

export async function generarYAbrirInformePdf(params: {
  titulo: string;
  refugio: RefugioInformePdfProfile;
  modo: "mascotas" | "solicitudes";
  mascotas?: CardMascotaProps[];
  solicitudes?: InformeSolicitudRow[];
}): Promise<void> {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  const logo = await loadLogoDataUrl();
  if (logo) {
    try {
      doc.addImage(logo, "PNG", 14, 10, 12, 12);
    } catch {
      /* ignore logo errors */
    }
  }

  doc.setFontSize(15);
  doc.setTextColor(47, 47, 47);
  doc.setFont("helvetica", "bold");
  doc.text("MatchCota", logo ? 28 : 14, 17);

  doc.setFontSize(12);
  doc.setTextColor(76, 175, 122);
  doc.text(params.titulo, 14, 28);

  let cursorY = addRefugioBlock(doc, params.refugio, 34);

  if (params.modo === "mascotas") {
    const mascotas = params.mascotas ?? [];
    const body =
      mascotas.length === 0
        ? [["-", "-", "-", "-", "Sin registros"]]
        : mascotas.map((m) => [
            m.nombre,
            m.raza,
            m.tipo,
            m.comuna,
            `${m.edad} años`,
          ]);

    autoTable(doc as JsPdfWithTable, {
      startY: cursorY,
      head: [["Nombre", "Raza", "Tipo", "Comuna", "Edad"]],
      body,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [76, 175, 122], textColor: 255 },
      margin: { left: 14, right: 14 },
    });
  } else {
    const solicitudes = params.solicitudes ?? [];
    const estadoLabel = (s: string) => {
      if (s === "Pendiente") return "Pendiente";
      if (s === "Rechazado") return "Rechazado";
      if (s === "Aprobado") return "Aprobada";
      return s;
    };

    const body =
      solicitudes.length === 0
        ? [["-", "-", "-", "-", "Sin registros"]]
        : solicitudes.map((s) => [
            s.fecha
              ? new Date(s.fecha).toLocaleDateString("es-CL")
              : "—",
            s.nombreUsuario ?? "—",
            s.nombreMascota ?? "—",
            s.userEmail ?? "—",
            estadoLabel(s.state),
          ]);

    autoTable(doc as JsPdfWithTable, {
      startY: cursorY,
      head: [["Fecha", "Adoptante", "Mascota", "Contacto", "Estado"]],
      body,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [76, 175, 122], textColor: 255 },
      margin: { left: 14, right: 14 },
    });
  }

  const d = doc as JsPdfWithTable;
  const pageH = doc.internal.pageSize.getHeight();
  const footY = Math.min((d.lastAutoTable?.finalY ?? cursorY) + 10, pageH - 20);

  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  const footer =
    `MatchCota — Informe generado el ${new Date().toLocaleString("es-CL")} — Uso interno del refugio.`;
  const splitFooter = doc.splitTextToSize(footer, pageW - 28);
  doc.text(splitFooter, 14, footY);

  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) {
    URL.revokeObjectURL(url);
    throw new Error(
      "El navegador bloqueo la nueva pestaña. Permite ventanas emergentes para ver el PDF."
    );
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 120_000);
}
