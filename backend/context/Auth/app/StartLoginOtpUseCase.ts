import { Auth } from "../domain/Auth";
import { AuthLoginOtpRepository } from "../domain/AuthLoginOtpRepository";
import { generateLoginOtpCode } from "../domain/utils/generateLoginOtpCode";
import { hashLoginOtp } from "../domain/utils/hashLoginOtp";
import { signLoginOtpTicket } from "../domain/utils/loginOtpTicket";

const OTP_TTL_MS = 10 * 60 * 1000;

export class StartLoginOtpUseCase {
  constructor(
    private readonly otpRepository: AuthLoginOtpRepository,
    private readonly sendEmail: (to: string, code: string) => Promise<void>
  ) {}

  async execute(auth: Auth): Promise<{ loginTicket: string }> {
    const secret = process.env.BETTER_AUTH_SECRET;
    if (!secret) {
      throw new Error("BETTER_AUTH_SECRET no está definido");
    }

    const authId = auth.getId().getValue();
    const email = auth.getEmail().getValue();

    await this.otpRepository.deletePendingForAuth(authId);

    const code = generateLoginOtpCode();
    const codeHash = hashLoginOtp(code);
    const fechaExpiracion = new Date(Date.now() + OTP_TTL_MS);

    await this.otpRepository.insertPending(authId, codeHash, fechaExpiracion);

    await this.sendEmail(email, code);

    const loginTicket = signLoginOtpTicket(
      {
        authId,
        email,
        exp: Date.now() + OTP_TTL_MS,
      },
      secret
    );

    return { loginTicket };
  }
}
