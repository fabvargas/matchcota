import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { AuthRepository } from "../domain/AuthRepository";
import { AuthId } from "../domain/AuthId";
import { AuthLoginOtpRepository } from "../domain/AuthLoginOtpRepository";
import { VerifyLoginOtpUseCase } from "./VerifyLoginOtpUseCase";
import { verifyLoginOtpTicket } from "../domain/utils/loginOtpTicket";

/**
 * Verifica el OTP y activa 
 * two_factor_enabled para el usuario de la sesión.
 */
export class ConfirmEnableTwoFactorUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly otpRepository: AuthLoginOtpRepository
  ) {}

  async execute(
    sessionAuthId: string,
    setupTicket: string,
    plainOtp: string,
    secret: string
  ): Promise<void> {
    const payload = verifyLoginOtpTicket(setupTicket, secret);
    if (!payload) {
      throw new ValidateDomainError("Enlace de verificación inválido o expirado");
    }

    if (payload.authId !== sessionAuthId) {
      throw new ValidateDomainError("Sesión no válida para esta verificación");
    }

    const auth = await this.authRepository.findById(new AuthId(sessionAuthId));
    if (!auth) {
      throw new ValidateDomainError("Usuario no encontrado");
    }

    if (auth.isTwoFactorEnabled()) {
      throw new ValidateDomainError(
        "La verificación en dos pasos ya está activada"
      );
    }

    const verifyOtp = new VerifyLoginOtpUseCase(this.otpRepository);
    await verifyOtp.execute(sessionAuthId, plainOtp);

    await this.authRepository.updateTwoFactorEnabled(
      new AuthId(sessionAuthId),
      true
    );
  }
}
