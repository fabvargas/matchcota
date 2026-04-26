
import { auth } from "@/auth"
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { GetPetByRefugioIdUseCase } from "@/backend/context/Pet/app/GetPetByRefugioIdUseCase";
import { SupabasePetRepository } from "@/backend/context/Pet/infra/SupabasePetRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { ResponseType } from "../Shared/type";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";

type CardMascotaProps = {
    id: string;
    nombre: string;
    raza: string;
    edad: number;
    tipo: string;
    sexo: string;
    comuna: string;
    nivel_energia: number;
    size: string;
    caracter: string;
    img: string;
    descripcion: string;
    health_description: string;
}

export async function GetMascotasByRefugio():Promise<ResponseType<CardMascotaProps[]>> {
const  session  = await auth()

if (!session) {
    return {
        error: true,
        message: "Usuario no autenticado"
    };
}
    const dbClient =  SupabaseService.getInstance().getClient();
    const petRepository = new SupabasePetRepository(dbClient);
    const authRepository = new SupabaseAuthRepository(dbClient);
    const refugioRepository = new SupabaseRefugioRepository(dbClient);
    const useCase = new GetPetByRefugioIdUseCase(petRepository, authRepository, refugioRepository);

    const pets = await useCase.execute(session.user.id);
    const cardPets: CardMascotaProps[] = pets.map(pet => ({
        id: pet.id,
        nombre: pet.name,
        raza: pet.raza,
        edad: pet.age,
        tipo: pet.tipo,
        sexo: pet.genre,
        comuna: pet.comuna,
        caracter: pet.personality,
        size: pet.size,
        nivel_energia: pet.energy_level,
        descripcion: pet.description,
        health_description: pet.health_description,

        img: pet.images && pet.images.length > 0 ? pet.images[0] : "/placeholder.png",
    }));
    return {
        error: false,
        message: "Mascotas obtenidas exitosamente",
        data: cardPets
    };
}