import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";


const AuthPasswordSchema = z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(255, "La contraseña debe tener máximo 255 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(/[@$!%*?&]/, "La contraseña debe contener al menos un carácter especial (@$!%*?&)")

  


export type AuthPasswordType = z.infer<typeof AuthPasswordSchema>;

export class AuthPassword {

     constructor(
        private readonly value:AuthPasswordType
    ){
        AuthPassword.validate(value);
    }

    static  validate(value: unknown): void {
         parseSchema(AuthPasswordSchema, value);
        
    }

    getValue(): string {
        return this.value;
    }   

}