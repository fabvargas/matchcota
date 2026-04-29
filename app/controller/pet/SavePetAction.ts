"use server"
import { parseSchema } from "@/app/controller/Shared/parseSchema"
import { z } from "zod";
import { ResponseType } from "@/app/controller/Shared/type"
import { auth } from "@/auth";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SavePetUseCase } from "@/backend/context/Pet/app/SavePetUseCase";
import { SupabasePetRepository } from "@/backend/context/Pet/infra/SupabasePetRepository";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";


const SavePetSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  breed: z.string().min(1, "La raza es requerida"),
  age: z.number().min(0, "La edad debe ser un número positivo"),
  type: z.string().min(1, "El tipo de mascota es requerido"),
  genre: z.string().min(1, "El género de la mascota es requerido"),
  comuna: z.string().min(1, "La comuna es requerida"),
  caracter: z.string().min(1, "El carácter de la mascota es requerido"),
  energy_level: z.string().min(1, "El nivel de energía es requerido"),
  size: z.string().min(1, "El tamaño de la mascota es requerido"),
  health_description: z.string().min(1, "La descripción de la salud es requerida"),
  description: z.string().min(1, "La descripción es requerida"),
});

export async function SavePetAction(
  prevState: ResponseType<void>,
  formData: FormData
): Promise<ResponseType<void>> {

  const data = {
    name: formData.get("name") as string,
    breed: formData.get("breed") as string,
    age: Number(formData.get("age")),
    type: formData.get("type") as string,
    genre: formData.get("genre") as string,
    comuna: formData.get("comuna") as string,
    caracter: formData.get("caracter") as string,
    energy_level: formData.get("energy") as string,
    size: formData.get("size") as string,
    health_description: formData.get("health_description") as string,
    description: formData.get("description") as string,
  };




  try {
    const dbClient = SupabaseService.getInstance().getAdminClient();
  const petRepository = new SupabasePetRepository(dbClient);
  const refugioRepository = new SupabaseRefugioRepository(dbClient);
  const useCase = new SavePetUseCase(petRepository, refugioRepository);
    const parsedData = await parseSchema(SavePetSchema, data);
    const session = await auth()
    if (!session) {
      return {
        error: true,
        message: "Usuario no autenticado"
      };
    }
    const files = (formData.getAll("images") as File[])
  .filter(file => {
    return (
      file instanceof File &&
      file.size > 0 &&
      file.name !== "blob"
    );
  });
    console.log("Archivos recibidos:", files);
    const imagesData = files.map(file => file.name);

    await useCase.execute({
      ...parsedData,
      images: imagesData.length === 0 ? undefined : imagesData,
    }, 
    session.user.id
);

    return {
      error: false,
      message: "Mascota guardada exitosamente"
    };

  } catch (error) {
    console.error("Error al guardar la mascota:", error);
    return {
      error: true,
      message: "Error al guardar la mascota"
    };
  }
}