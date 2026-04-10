import{ResponseType } from "@/app/controller/Shared/type";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { ValidateError } from "../Shared/ValidateError";
import { RegisterAdoptanteUseCase } from "@/backend/context/Auth/app/RegisterAdoptanteUseCase";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";

const RegisterAdoptanteSchema = z.object({
  email: 
  z.email({message: "Email inválido"})
  .trim()
  .max(255,"Email debe tener máximo 255 caracteres"),
  password: 
  z.string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .max(255, "La contraseña debe tener máximo 255 caracteres")
  .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
  .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
  .regex(/[0-9]/, "La contraseña debe contener al menos un número")
  .regex(/[@$!%*?&]/, "La contraseña debe contener al menos un carácter especial (@$!%*?&)"),
  confirmPassword:
  z.string(),
  name: 
  z.string()
  .trim()
  .min(1, "El nombre es obligatorio")
  .max(255, "El nombre debe tener máximo 255 caracteres")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});



export default async function RegisterAdoptante(email:string,password:string,confirmPassword:string,name:string): Promise<ResponseType<void>>{

    try{
        const parsedData = await parseSchema(RegisterAdoptanteSchema, {email,password,confirmPassword,name});

        const useCase = new RegisterAdoptanteUseCase();
        
        const auth = await useCase.execute(parsedData.email, parsedData.password, parsedData.confirmPassword, parsedData.name);

        console.log(auth)

        return {
            error: false,
            message: "Adoptante registrado exitosamente"
        }

    }catch(error){
        if( error instanceof ValidateError){
            return {
                error: true,
                message: error.message
            }
        }
           if (error instanceof ValidateDomainError) {
                    return {
                        error: true,
                        message: error.message
                    };
                }
        return {
            error: true,
            message: "Error inesperado, intente nuevamente"
        }
    }

  
}
