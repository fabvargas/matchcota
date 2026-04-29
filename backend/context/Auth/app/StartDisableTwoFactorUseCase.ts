import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { AuthRepository } from "../domain/AuthRepository";
import { AuthId } from "../domain/AuthId";
import { StartLoginOtpUseCase } from "./StartLoginOtpUseCase";
import { AuthLoginOtpRepository } from "../domain/AuthLoginOtpRepository";

type SendOtp = (to: string, code: string) => Promise<void>;

/**
 * Inicia el flujo de desactivación de 2FA enviando OTP
 * al correo del usuario autenticado.
 */
export class StartDisableTwoFactorUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly otpRepository: AuthLoginOtpRepository,
    private readonly sendEmail: SendOtp
  ) {}

  async execute(authId: string): Promise<{ loginTicket: string }> {
    const auth = await this.authRepository.findById(new AuthId(authId));

    if (!auth) {
      throw new ValidateDomainError("Usuario no encontrado");
    }

    if (!auth.isTwoFactorEnabled()) {
      throw new ValidateDomainError(
        "La verificación en dos pasos no está activada"
      );
    }

    const startOtp = new StartLoginOtpUseCase(
      this.otpRepository,
      this.sendEmail
    );

    return startOtp.execute(auth);
  }
}
