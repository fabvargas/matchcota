"use server";

import { z } from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { ValidateError } from "../Shared/ValidateError";
import { ResponseType } from "../Shared/type";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { signIn } from "@/auth";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { VerifyCredentialUseCase } from "@/backend/context/Auth/app/VerifyCredentialUseCase";



const LoginResponseSchema = z.object({
    email:z.email({message: "Email inválido"}).trim().max(255, "Email debe tener máximo 255 caracteres"),
    password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(255, "La contraseña debe tener máximo 255 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(/[@$!%*?&]/, "La contraseña debe contener al menos un carácter especial (@$!%*?&)")
});

export default async function LogInAction(
    prevState: ResponseType<void>,
    formData: FormData
): Promise<ResponseType<void>> {

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    
    try {
        const parsedData = await parseSchema(LoginResponseSchema, data);
        const clientDb = SupabaseService.getInstance().getClient();
        const authRepository = new SupabaseAuthRepository(clientDb);
        const useCase = new VerifyCredentialUseCase(authRepository);
        await useCase.execute(parsedData.email, parsedData.password);

        await signIn("credentials", {
            username: parsedData.email,
            password: parsedData.password,
            redirect: false,
        })

        return {
            error: false,
            message: "Inicio de sesión exitoso"
        }
    } catch (error) {
        if (error instanceof ValidateError) {
            return {
                error: true,
                message: error.message
            };
        }
           if (error instanceof ValidateDomainError) {
                    return {
                        error: true,
                        message: error.message
                    };
                }
        return {
            error: true,
            message: "Error inesperado intente nuevamente"  + (error instanceof Error ? ": " + error.message : "")
        };
    }
}