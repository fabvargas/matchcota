"use client";

import { Badge } from "@/frontend/components/ui/badge";

export type InformeSolicitudRow = {
  id: string;
  state: string;
  fecha?: string;
  nombreUsuario?: string;
  nombreMascota?: string;
  userEmail?: string;
};

const BADGE: Record<
  "pendiente" | "rechazado" | "aprobado",
  { label: string; className: string }
> = {
  pendiente: {
    label: "Pendiente",
    className: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  },
  rechazado: {
    label: "Rechazado",
    className: "bg-red-50 text-red-600 border border-red-200",
  },
  aprobado: {
    label: "Aprobada",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
};

export default function InformeTablaSolicitudes({
  rows,
  emptyMessage,
  badgeKey,
}: {
  rows: InformeSolicitudRow[];
  emptyMessage: string;
  badgeKey: keyof typeof BADGE;
}) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-6 text-center border rounded-xl bg-muted/30">
        {emptyMessage}
      </p>
    );
  }

  const b = BADGE[badgeKey];

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-left border-b">
            <th className="p-3 font-medium">Fecha</th>
            <th className="p-3 font-medium">Adoptante</th>
            <th className="p-3 font-medium">Mascota</th>
            <th className="p-3 font-medium">Contacto</th>
            <th className="p-3 font-medium">Estado</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr
              key={s.id}
              className="border-b last:border-0 hover:bg-muted/20"
            >
              <td className="p-3 whitespace-nowrap text-muted-foreground">
                {s.fecha
                  ? new Date(s.fecha).toLocaleDateString("es-CL")
                  : "—"}
              </td>
              <td className="p-3 font-medium">{s.nombreUsuario ?? "—"}</td>
              <td className="p-3">{s.nombreMascota ?? "—"}</td>
              <td className="p-3 text-muted-foreground break-all max-w-[200px]">
                {s.userEmail ?? "—"}
              </td>
              <td className="p-3">
                <Badge className={b.className}>{b.label}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
