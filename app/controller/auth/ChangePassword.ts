"use server";
import {z} from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { ValidateError } from "../Shared/ValidateError";
import { ResponseType } from "../Shared/type";

const ChangePasswordSchema = z.object({
  email: 
  z.email({message: "Email inválido"})
  .trim()
  .max(255,"Email debe tener máximo 255 caracteres"),
  currentPassword: 
  z.string()
  .min(6, "La contraseña debe tener al menos 6 caracteres")
  .max(255, "La contraseña debe tener máximo 255 caracteres")
  .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
  .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
  .regex(/[0-9]/, "La contraseña debe contener al menos un número")
  .regex(/[@$!%*?&]/, "La contraseña debe contener al menos un carácter especial (@$!%*?&)"),
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

export default async function ChangePassword(email:string,currentPassword:string,newPassword:string,confirmNewPassword:string): Promise<ResponseType<void>>{
    try{
        const parsedData = parseSchema(ChangePasswordSchema, {email,currentPassword,newPassword,confirmNewPassword});
        console.log(parsedData);
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
        return {
            error: true,
            message: "Error inesperado, intente nuevamente"
        };
    }

}