"use server"
import { UserProfileType, ResponseType } from "../Shared/type";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { UpdateUserProfileUseCase } from "@/backend/context/UserProfile/app/UpdateUserProfileUseCase";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseUserProfileRepository } from "@/backend/context/UserProfile/infra/SupabaseUserProfileRepository";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";



const UserProfileSchema = z.object({
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
  comuna: z
  .string()
  .max(100, "La comuna debe tener máximo 100 caracteres").optional(),
  description: z
  .string()
  .max(500, "La descripción debe tener máximo 500 caracteres").optional(),
  region: z
  .string()
  .max(100, "La región debe tener máximo 100 caracteres").optional(),

});


export default async function UpdateUserProfileAction(
  prevState: ResponseType<Omit<UserProfileType, "id">>,
  formData: FormData
): Promise<ResponseType<Omit<UserProfileType, "id">>> {

    const data = {
name: formData.get("name")?.toString() ?? "",
region: formData.get("region")?.toString() ?? "",
comuna: formData.get("comuna")?.toString() ?? "",
address: formData.get("address")?.toString() ?? "",
telephone: formData.get("telephone")?.toString() ?? "",
description: formData.get("description")?.toString() ?? "",
    }

    console.log("Data recibida en UpdateUserProfileAction:", data);

    try{
    const parsedData = await parseSchema(
        UserProfileSchema, 
        data);  
  
    const dbClient = SupabaseService.getInstance().getAdminClient();
    const userProfileRepository = new SupabaseUserProfileRepository(dbClient);
    const useCase = new UpdateUserProfileUseCase(userProfileRepository);

    const session =  await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado"
      };
    }

    const idAuth = session.user.id;



    const userProfile = await useCase.execute(
        idAuth,
        parsedData.name,
        undefined, // img_url no se actualiza en este formulario
        parsedData.address,
        parsedData.telephone,
        parsedData.comuna,
        parsedData.description,
        parsedData.region
    );

     
    revalidatePath("/profile");

    return {
        error: false,
        message: "Perfil de usuario actualizado exitosamente",
        data: userProfile    
    }

    }catch(error){
    return {
        error: true,
        message: error instanceof Error ? error.message : "Error inesperado"
    }

        
    }

       
    
}
