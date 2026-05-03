"use server";

import { auth } from "@/auth";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { SupabaseAuthLoginOtpRepository } from "@/backend/context/Auth/infra/SupabaseAuthLoginOtpRepository";
import { StartEnableTwoFactorUseCase } from "@/backend/context/Auth/app/StartEnableTwoFactorUseCase";
import { sendLoginOtpEmail } from "@/backend/context/Auth/infra/sendLoginOtpEmail";
import { ResponseType } from "../Shared/type";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";

export type EnableTwoFactorStartData = {
  setupTicket: string;
};

export default async function StartEnableTwoFactorAction(): Promise<
  ResponseType<EnableTwoFactorStartData>
> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado",
      };
    }

    const db = SupabaseService.getInstance().getAdminClient();
    const authRepository = new SupabaseAuthRepository(db);
    const otpRepository = new SupabaseAuthLoginOtpRepository(db);
    const useCase = new StartEnableTwoFactorUseCase(
      authRepository,
      otpRepository,
      sendLoginOtpEmail
    );

    const { loginTicket } = await useCase.execute(session.user.id);

    return {
      error: false,
      message: "Te enviamos un código a tu correo",
      data: { setupTicket: loginTicket },
    };
  } catch (error) {
    if (error instanceof ValidateDomainError) {
      return { error: true, message: error.message };
    }
    return {
      error: true,
      message:
        error instanceof Error
          ? error.message
          : "Error al iniciar la verificación",
    };
  }
}
