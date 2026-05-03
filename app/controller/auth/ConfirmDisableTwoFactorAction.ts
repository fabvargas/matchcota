"use server";

import { auth } from "@/auth";
import { parseSchema } from "../Shared/parseSchema";
import { twoFactorOtpConfirmSchema } from "./twoFactorOtpConfirmSchema";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { SupabaseAuthLoginOtpRepository } from "@/backend/context/Auth/infra/SupabaseAuthLoginOtpRepository";
import { ConfirmDisableTwoFactorUseCase } from "@/backend/context/Auth/app/ConfirmDisableTwoFactorUseCase";
import { ResponseType } from "../Shared/type";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { ValidateError } from "../Shared/ValidateError";

export default async function ConfirmDisableTwoFactorAction(
  prevState: ResponseType<void>,
  formData: FormData
): Promise<ResponseType<void>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado",
      };
    }

    const raw = {
      setupTicket: formData.get("setupTicket") as string,
      otp: formData.get("otp") as string,
    };
    const parsed = await parseSchema(twoFactorOtpConfirmSchema, raw);

    const secret = process.env.BETTER_AUTH_SECRET;
    if (!secret) {
      return {
        error: true,
        message: "Configuración del servidor incompleta",
      };
    }

    const db = SupabaseService.getInstance().getAdminClient();
    const authRepository = new SupabaseAuthRepository(db);
    const otpRepository = new SupabaseAuthLoginOtpRepository(db);
    const useCase = new ConfirmDisableTwoFactorUseCase(
      authRepository,
      otpRepository
    );

    await useCase.execute(
      session.user.id,
      parsed.setupTicket,
      parsed.otp,
      secret
    );

    return {
      error: false,
      message: "Verificación en dos pasos desactivada correctamente",
    };
  } catch (error) {
    if (error instanceof ValidateError) {
      return { error: true, message: error.message };
    }
    if (error instanceof ValidateDomainError) {
      return { error: true, message: error.message };
    }
    return {
      error: true,
      message:
        error instanceof Error
          ? error.message
          : "No se pudo desactivar la verificación en dos pasos",
    };
  }
}
