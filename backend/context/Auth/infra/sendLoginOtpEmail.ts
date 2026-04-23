import nodemailer from "nodemailer";

function hasSmtpEnv(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM
  );
}

/**
 * Envía el código por SMTP (p. ej. Gmail con contraseña de aplicación).
 * Si faltan variables SMTP, en desarrollo solo registra el código en consola.
 */
export async function sendLoginOtpEmail(
  to: string,
  code: string
): Promise<void> {
  if (!hasSmtpEnv()) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[login OTP] SMTP no configurado; código para ${to}: ${code}`
      );
      return;
    }
    throw new Error(
      "SMTP no configurado: defina SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM"
    );
  }

  const port = Number(process.env.SMTP_PORT ?? "465");
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: "Código de verificación — Matchcota",
    text: `Tu código de verificación es: ${code}\n\nVence en 10 minutos. Si no fuiste tú, ignora este mensaje.`,
  });
}
