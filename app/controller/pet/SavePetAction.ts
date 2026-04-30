"use server";

import { parseSchema } from "@/app/controller/Shared/parseSchema";
import { z } from "zod";
import { ResponseType } from "@/app/controller/Shared/type";
import { auth } from "@/auth";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SavePetUseCase } from "@/backend/context/Pet/app/SavePetUseCase";
import { SupabasePetRepository } from "@/backend/context/Pet/infra/SupabasePetRepository";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";

const SavePetSchema = z.object({
  name: z.string().min(1),
  breed: z.string().min(1),
  age: z.number().min(0),
  type: z.string().min(1),
  genre: z.string().min(1),
  comuna: z.string().min(1),
  caracter: z.string().min(1),
  energy_level: z.string().min(1),
  size: z.string().min(1),
  health_description: z.string().min(1),
  description: z.string().min(1),

  // 🔥 IMPORTANTE
  urls: z.string().optional(), // Ahora esperamos un string con URLs separadas por comas
});

export async function SavePetAction(
  prevState: ResponseType<void>,
  formData: FormData
): Promise<ResponseType<void>> {
  try {

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

      // 👇 ahora vienen URLs desde el cliente
      urls: (formData.getAll("urls") as string[]).filter(Boolean).join(","), // Convertir array a string
    };
    console.log("Data recibida en SavePetAction:", data);

    const parsedData = await parseSchema(SavePetSchema, data);

    const session = await auth();
    if (!session) {
      return {
        error: true,
        message: "Usuario no autenticado",
      };
    }

    const dbClient = SupabaseService.getInstance().getClient();

    const petRepository = new SupabasePetRepository(dbClient);
    const refugioRepository = new SupabaseRefugioRepository(dbClient);
    const useCase = new SavePetUseCase(petRepository, refugioRepository);

    console.log("Parsed Data:", parsedData);

    await useCase.execute(
      {
        ...parsedData,
        images: parsedData.urls ? parsedData.urls.split(",") : undefined, // Convertir string a array
      },
      session.user.id
    );

    return {
      error: false,
      message: "Mascota guardada exitosamente",
    };
  } catch (error) {
    console.error("Error al guardar la mascota:", error);
    return {
      error: true,
      message: "Error al guardar la mascota",
    };
  }
}