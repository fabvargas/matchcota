"use server";
import{ResponseType } from "@/app/controller/Shared/type";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { ValidateError } from "../Shared/ValidateError";
import { RegisterAdoptanteUseCase } from "@/backend/context/Auth/app/RegisterAdoptanteUseCase";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { RegisterRefugioUseCase } from "@/backend/context/Auth/app/RegisterRefugioUseCase";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { SupabaseUserProfileRepository } from "@/backend/context/UserProfile/infra/SupabaseUserProfileRepository";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";


const RegisterSchema = z.object({
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
  .max(255, "El nombre debe tener máximo 255 caracteres"),
  rol:
  z.enum(["Adoptante", "Fundacion"], {message: "Rol inválido"})
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});



export async function RegisterAction(
    prevState: ResponseType<void>,
  formData: FormData
): Promise<ResponseType<void>>{

    const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    name: formData.get("name") as string,
    rol: formData.get("rol") as string,
  };

    try{
        const parsedData = await parseSchema(RegisterSchema, data);
        const dbClient = SupabaseService.getInstance().getAdminClient();
        const authRepository = new SupabaseAuthRepository(dbClient);
        const userProfileRepository = new SupabaseUserProfileRepository(dbClient);
        const refugioRepository = new SupabaseRefugioRepository(dbClient);
        
        const useCases = {
            Adoptante: new RegisterAdoptanteUseCase(
              authRepository,
              userProfileRepository
            ),
        Fundacion: new RegisterRefugioUseCase(
            authRepository,
            refugioRepository
        ),
        } as const;

        const useCase = useCases[parsedData.rol];

        if (!useCase) {
           return {
                error: true,
                message: "Rol inválido"
            };
        }

        const auth = await useCase.execute(
        parsedData.email,
        parsedData.password,
        parsedData.confirmPassword,
        parsedData.name
        );

        console.log(auth)

        return {
            error: false,
            message: `${parsedData.rol} registrado exitosamente`
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
            message: "Error inesperado: " + (error instanceof Error ? error.message : String(error))
        }
    }

  
}
