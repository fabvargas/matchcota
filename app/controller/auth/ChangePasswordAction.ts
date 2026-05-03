"use server";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { ValidateError } from "../Shared/ValidateError";
import { ResponseType } from "../Shared/type";
import { ChangePasswordUseCase } from "@/backend/context/Auth/app/ChangePasswordUseCase";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { auth } from "@/auth";

const ChangePasswordSchema = z.object({
  currentPassword: 
  z.string(),
  newPassword: 
  z.string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .max(255, "La contraseña debe tener máximo 255 caracteres")
  .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
  .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
  .regex(/[0-9]/, "La contraseña debe contener al menos un número")
  .regex(/[@$!%*?&]/, "La contraseña debe contener al menos un carácter especial (@$!%*?&)"),
    confirmNewPassword:
    z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmNewPassword"]
});

export default async function ChangePasswordAction(
    prevState: ResponseType<void>,
    formData: FormData
): Promise<ResponseType<void>>{

    const data = {
        currentPassword: formData.get("currentPassword"),
        newPassword: formData.get("newPassword"),
        confirmNewPassword: formData.get("confirmNewPassword")
    }
    try{
        const session = await auth();

    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado"
      };
    }
        const parsedData = await parseSchema(ChangePasswordSchema, data);
        const clienDb = SupabaseService.getInstance().getAdminClient();
        const authRepository = new SupabaseAuthRepository(clienDb);
        const useCase = new ChangePasswordUseCase(authRepository);
        await useCase.execute(
            parsedData.currentPassword, 
            parsedData.newPassword, 
            parsedData.confirmNewPassword,
            session.user.id
        );
        return {
            error: false,
            message: "Contraseña cambiada exitosamente"
        }
    } catch (error) {
        if (error instanceof ValidateError) {
            return {
                error: true,
                message: error.message
            };
        }
        if(error instanceof ValidateDomainError){
            return {
                error: true,
                message: error.message
            };
        }
        return {
            error: true,
            message: "Error inesperado intente nuevamente"
        };
    }

}