import { timingSafeEqual } from "crypto";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { AuthLoginOtpRepository } from "../domain/AuthLoginOtpRepository";
import { hashLoginOtp } from "../domain/utils/hashLoginOtp";

export class VerifyLoginOtpUseCase {
  constructor(private readonly otpRepository: AuthLoginOtpRepository) {}

  async execute(authId: string, plainOtp: string): Promise<void> {
    const trimmed = plainOtp.trim();
    if (!/^\d{6}$/.test(trimmed)) {
      throw new ValidateDomainError("Código inválido");
    }

    const row = await this.otpRepository.findLatestPending(authId);
    if (!row) {
      throw new ValidateDomainError("Código incorrecto o expirado");
    }

    const candidate = hashLoginOtp(trimmed);
    if (candidate.length !== row.codeHash.length) {
      throw new ValidateDomainError("Código incorrecto o expirado");
    }
    try {
      if (
        !timingSafeEqual(
          Buffer.from(candidate, "utf8"),
          Buffer.from(row.codeHash, "utf8")
        )
      ) {
        throw new ValidateDomainError("Código incorrecto o expirado");
      }
    } catch {
      throw new ValidateDomainError("Código incorrecto o expirado");
    }

    await this.otpRepository.markConsumed(row.idOtp);
  }
}
