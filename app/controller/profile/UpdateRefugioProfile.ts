
import { RefugioProfileType, ResponseType } from "../Shared/type";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { UpdateRefugioProfileUseCase } from "@/backend/context/Refugio/app/UpdateRefugioProfile";

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
  codigoPostal: z
  .string()
  .max(20, "El código postal debe tener máximo 20 caracteres").optional(),
});


export default async function UpdateRefugioProfile(
    name: string,
    address?: string,
    telephone?: string,
    description?: string,
    comuna?: string,
    codigoPostal?: string
):Promise<ResponseType<Omit<RefugioProfileType, "id">>> {

    try{
    const parsedData = await parseSchema(
        RefufioProfileSchema, 
        { 
        name, 
        address, 
        telephone, 
        description, 
        comuna, 
        codigoPostal 
    });

    const useCase = new UpdateRefugioProfileUseCase();

    const refugioProfile = await useCase.execute(
        parsedData.name,
        parsedData.address,
        parsedData.telephone,
        parsedData.description,
        parsedData.comuna,
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
