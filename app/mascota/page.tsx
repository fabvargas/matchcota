import Listamascota from "@/frontend/components/listamascota";
import { GetMascotasByRefugio } from "../controller/pet/GetMascotaByRefugio";
import { GetAllMascotas } from "../controller/pet/GetAllMascota";

export default async function Mascota() {
    const data = await GetAllMascotas(); // Reemplaza con la función real para obtener las mascotas
  
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#4CAF7A]">
                Catálogo de Mascotas
            </h1>
            <p className="text-gray-600 text-lg mb-6">
                Descubre a tu compañero perfecto esperando un hogar
            </p>
            <Listamascota mascotas={data.data || []} />
        </div>

        
    );
}