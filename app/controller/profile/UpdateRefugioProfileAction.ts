"use server";
import { RefugioType, ResponseType, UserProfileType } from "../Shared/type";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { UpdateRefugioProfileUseCase } from "@/backend/context/Refugio/app/UpdateRefugioProfile";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { auth } from "@/auth";

const RefufioProfileSchema = z.object({
  name: z
  .string()
  .min(1, "El nombre es requerido")
  .max(255, "El nombre debe tener máximo 255 caracteres"),
  address: z
  .string()
  .max(255, "La dirección debe tener máximo 255 caracteres").optional(),
  telephone: z
  .string()
  .max(20, "El teléfono debe tener máximo 20 caracteres")
  .optional(),
  description: z
  .string()
  .max(500, "La descripción debe tener máximo 500 caracteres").optional(),
  comuna: z
  .string()
  .max(100, "La comuna debe tener máximo 100 caracteres").optional(),
  region: z
  .string()
  .max(100, "La región debe tener máximo 100 caracteres").optional(),
  codigoPostal: z
  .string()
  .max(20, "El código postal debe tener máximo 20 caracteres").optional(),
});

export default async function UpdateRefugioProfileAction(
  prevState: ResponseType<Omit<RefugioType, "id">>,
  formData: FormData
): Promise<ResponseType<Omit<RefugioType, "id">>> {

    const data = {
       name: formData.get("name")?.toString() ?? "",
region: formData.get("region")?.toString() ?? "",
comuna: formData.get("comuna")?.toString() ?? "",
address: formData.get("address")?.toString() ?? "",
telephone: formData.get("telephone")?.toString() ?? "",
description: formData.get("description")?.toString() ?? "",
        codigoPostal: formData.get("codigoPostal")?.toString() ?? "",
    }

    try{
    const parsedData = await parseSchema(
        RefufioProfileSchema, 
        data
    );

    const dbClient = SupabaseService.getInstance().getClient();
    const refugioRepository = new SupabaseRefugioRepository(dbClient);
    const useCase = new UpdateRefugioProfileUseCase(refugioRepository);
    const session =  await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado"
      };
    }

    const idAuth = session.user.id;

    const refugioProfile = await useCase.execute(
     idAuth,
     parsedData.name,
     parsedData.address,
     parsedData.telephone,
     parsedData.description,
        undefined,
     parsedData.comuna,
     parsedData.region,
     parsedData.codigoPostal
    );
    
    return {
        error: false,
        message: "Perfil de refugio actualizado exitosamente",
        data: refugioProfile    
    }

    }catch(error){
    return {
        error: true,
        message: error instanceof Error ? error.message : "Error inesperado"
    }
    }

    
}
