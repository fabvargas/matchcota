import { GetMascotaById } from "@/app/controller/pet/GetMascotaById";
import Fichamascota from "@/frontend/components/Fichamascota";

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function MascotaDetalle({ params }: Props) {
  const { id } = await params; // ✅ sin await

  const pet = await GetMascotaById(id);

  if (!pet) {
  return <div>No encontrada</div>;
}

const mascota = {
  id: pet.id,
  nombre: pet.name,
  raza: pet.raza,
  edad: pet.age,
  tipo: pet.tipo, // 🔥 antes tipoMascota
  sexo: pet.genre,
  comuna: pet.comuna,
  caracter: pet.personality, // 🔥 antes caracteristicas
  descripcion: pet.description,
  salud: pet.health_description, // 🔥 faltaba
  refugio: pet.refugioName ?? "Refugio", // 🔥 faltaba
  niveldeenergia: pet.energy_level, // 🔥 faltaba
  estado: pet.estado, // 🔥 antes estadoMascota
  images: pet.images ?? [], // 🔥 antes imagenes + undefined fix

  // extras (estos sí coinciden)
  refugioName: pet.refugioName,
  refugioComunas: pet.refugioComunas,
  refugioCodigoPostal: pet.refugioCodigoPostal,
  refugioId: pet.RefugioId, // 🔥 antes RefugioId
};



  return (
    <div>
      <Fichamascota mascota={mascota} />
    </div>
  );
}