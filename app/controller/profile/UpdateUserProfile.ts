
import { UserProfileType, ResponseType } from "../Shared/type";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { UpdateUserProfileUseCase } from "@/backend/context/UserProfile/app/UpdateUserProfileUseCase";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseUserProfileRepository } from "@/backend/context/UserProfile/infra/SupabaseUserProfileRepository";
import { auth } from "@/auth";

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
});


export default async function UpdateUserProfile(
    name: string,
    address?: string,
    telephone?: string,
    comuna?: string,
   
):Promise<ResponseType<Omit<UserProfileType, "id">>> {

    try{
    const parsedData = await parseSchema(
        UserProfileSchema, 
        { 
        name, 
        address, 
        telephone, 
        comuna, 
    });
    const dbClient = SupabaseService.getInstance().getClient();
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
        undefined,
        parsedData.address,
        parsedData.telephone,
        parsedData.comuna,
        undefined
    );
    
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
