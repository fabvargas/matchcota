import type { CardMascotaProps } from "@/frontend/components/Cardmascota";

export default function InformeTablaMascotas({
  mascotas,
  emptyMessage,
}: {
  mascotas: CardMascotaProps[];
  emptyMessage: string;
}) {
  if (mascotas.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-6 text-center border rounded-xl bg-muted/30">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-left border-b">
            <th className="p-3 font-medium">Nombre</th>
            <th className="p-3 font-medium">Raza</th>
            <th className="p-3 font-medium">Tipo</th>
            <th className="p-3 font-medium">Comuna</th>
            <th className="p-3 font-medium">Edad</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr
              key={m.id}
              className="border-b last:border-0 hover:bg-muted/20"
            >
              <td className="p-3 font-medium">{m.nombre}</td>
              <td className="p-3">{m.raza}</td>
              <td className="p-3">{m.tipo}</td>
              <td className="p-3 text-muted-foreground">{m.comuna}</td>
              <td className="p-3">{m.edad} años</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
