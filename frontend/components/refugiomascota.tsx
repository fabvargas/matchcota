

import Cardmascota, { CardMascotaProps } from "./Cardmascota";

type MisMascotasProps = {
  mascotas: CardMascotaProps[];
};

export default function MisMascotas({ mascotas }: MisMascotasProps) {

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Mis Mascotas</h2>
      <p>Aquí podrás ver y gestionar las mascotas que has registrado en el refugio.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

        {mascotas.length === 0 && (
          <div className="col-span-full text-center py-10">
            <h3 className="text-lg font-semibold">
              No hay mascotas en adopción
            </h3>
          </div>
        )}

        {mascotas.map((mascota) => (
          <Cardmascota key={mascota.id} {...mascota} />
        ))}

      </div>
    </div>
  );
}