import { randomInt } from "crypto";

/** Código numérico de 6 dígitos para login temporal. */
export function generateLoginOtpCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}
