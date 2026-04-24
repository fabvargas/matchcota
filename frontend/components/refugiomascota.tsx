import Cardmascota from "./Cardmascota";
export default function MisMascotas() {
  return <div>
    <h2 className="text-2xl font-semibold mb-4">Mis Mascotas</h2>
    <p>Aquí podrás ver y gestionar las mascotas que has registrado en el refugio.</p>
      <Cardmascota />
    </div>;
}