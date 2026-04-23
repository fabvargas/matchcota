"use server";

import { z } from "zod";
import { parseSchema } from "../Shared/parseSchema";
import { ValidateError } from "../Shared/ValidateError";
import { ResponseType, LoginActionData } from "../Shared/type";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { signIn } from "@/auth";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { SupabaseAuthLoginOtpRepository } from "@/backend/context/Auth/infra/SupabaseAuthLoginOtpRepository";
import { VerifyCredentialUseCase } from "@/backend/context/Auth/app/VerifyCredentialUseCase";
import { StartLoginOtpUseCase } from "@/backend/context/Auth/app/StartLoginOtpUseCase";
import { sendLoginOtpEmail } from "@/backend/context/Auth/infra/sendLoginOtpEmail";

const LoginResponseSchema = z.object({
  email: z
    .email({ message: "Email inválido" })
    .trim()
    .max(255, "Email debe tener máximo 255 caracteres"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(255, "La contraseña debe tener máximo 255 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(
      /[@$!%*?&]/,
      "La contraseña debe contener al menos un carácter especial (@$!%*?&)"
    ),
});

const VerifyOtpSchema = z.object({
  email: z
    .email({ message: "Email inválido" })
    .trim()
    .max(255, "Email debe tener máximo 255 caracteres"),
  otp: z
    .string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d{6}$/, "El código debe ser numérico"),
  login_ticket: z.string().min(20, "Sesión de verificación inválida"),
});

export default async function LogInAction(
  prevState: ResponseType<LoginActionData>,
  formData: FormData
): Promise<ResponseType<LoginActionData>> {
  const step = formData.get("step")?.toString() ?? "";

  try {
    if (step === "verify_otp") {
      const raw = {
        email: formData.get("email") as string,
        otp: formData.get("otp") as string,
        login_ticket: formData.get("login_ticket") as string,
      };
      const parsed = await parseSchema(VerifyOtpSchema, raw);

      try {
        await signIn("credentials", {
          username: parsed.email,
          password: "__OTP_STEP__",
          loginTicket: parsed.login_ticket,
          otp: parsed.otp,
          redirect: false,
        });
      } catch {
        return {
          error: true,
          message: "Código incorrecto o expirado",
          data: {
            requiresOtp: true,
            loginTicket: parsed.login_ticket,
            email: parsed.email,
          },
        };
      }

      return {
        error: false,
        message: "Inicio de sesión exitoso",
      };
    }

    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const parsedData = await parseSchema(LoginResponseSchema, data);
    const clientDb = SupabaseService.getInstance().getAdminClient();
    const authRepository = new SupabaseAuthRepository(clientDb);
    const useCase = new VerifyCredentialUseCase(authRepository);
    const auth = await useCase.execute(parsedData.email, parsedData.password);

    if (auth.isTwoFactorEnabled()) {
      const otpRepository = new SupabaseAuthLoginOtpRepository(clientDb);
      const startOtp = new StartLoginOtpUseCase(
        otpRepository,
        sendLoginOtpEmail
      );
      const { loginTicket } = await startOtp.execute(auth);

      return {
        error: false,
        message: "Te enviamos un código a tu correo",
        data: {
          requiresOtp: true,
          loginTicket,
          email: parsedData.email,
        },
      };
    }

    await signIn("credentials", {
      username: parsedData.email,
      password: parsedData.password,
      redirect: false,
    });

    return {
      error: false,
      message: "Inicio de sesión exitoso",
    };
  } catch (error) {
    if (error instanceof ValidateError) {
      return {
        error: true,
        message: error.message,
      };
    }
    if (error instanceof ValidateDomainError) {
      return {
        error: true,
        message: error.message,
      };
    }
    return {
      error: true,
      message:
        "Error inesperado intente nuevamente" +
        (error instanceof Error ? ": " + error.message : ""),
    };
  }
}
