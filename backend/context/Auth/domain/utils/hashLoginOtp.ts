import { createHash } from "crypto";

export function hashLoginOtp(plain: string): string {
  const pepper =
    process.env.LOGIN_OTP_PEPPER ??
    process.env.BETTER_AUTH_SECRET ??
    "matchcota-dev-otp-pepper";
  return createHash("sha256").update(pepper).update(":").update(plain).digest("hex");
}
