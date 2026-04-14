
import { UserProfileType, ResponseType, RefugioProfileType } from "../Shared/type";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { UpdateRefugioProfileUseCase } from "@/backend/context/Refugio/app/UpdateRefugioProfile";
import { UpdateUserProfileUseCase } from "@/backend/context/UserProfile/app/UpdateUserProfileUseCase";

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
  comuna: z
  .string()
  .max(100, "La comuna debe tener máximo 100 caracteres").optional(),
});


export default async function UpdateRefugioProfile(
    name: string,
    address?: string,
    telephone?: string,
    comuna?: string,
   
):Promise<ResponseType<Omit<UserProfileType, "id">>> {

    try{
    const parsedData = await parseSchema(
        RefufioProfileSchema, 
        { 
        name, 
        address, 
        telephone, 
        comuna, 
    });

    const useCase = new UpdateUserProfileUseCase();

    const userProfile = await useCase.execute(
        parsedData.name,
        parsedData.address,
        parsedData.telephone,
        parsedData.comuna
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
