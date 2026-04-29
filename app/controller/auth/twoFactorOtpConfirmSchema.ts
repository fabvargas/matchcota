import { z } from "zod";

export const twoFactorOtpConfirmSchema = z.object({
  setupTicket: z.string().min(20, "Sesión de verificación inválida"),
  otp: z
    .string()
    .length(6, "El código debe tener 6 dígitos")
    .regex(/^\d{6}$/, "El código debe ser numérico"),
});
