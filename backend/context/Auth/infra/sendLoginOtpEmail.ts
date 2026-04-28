import nodemailer from "nodemailer";

const EMAIL_THEME = {
  bgPage: "#FFF6F0",
  accent: "#4CAF7A",
  accentDark: "#3d9666",
  text: "#1f2937",
  textMuted: "#6b7280",
  cardBg: "#ffffff",
  border: "#e5e7eb",
  codeBg: "#f3f4f6",
} as const;

const OTP_VALID_MINUTES = 10;

function hasSmtpEnv(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildLoginOtpPlainText(code: string): string {
  return [
    "Matchcota — Verificación en dos pasos",
    "",
    `Tu código es: ${code}`,
    "",
    `Este código vence en ${OTP_VALID_MINUTES} minutos.`,
    "",
    "Si no intentaste iniciar sesión, ignora este correo.",
  ].join("\n");
}

/**
 * HTML transaccional tablas + estilos en línea 
 * Logo opcional necsita variable de entorno EMAIL_LOGO_URL (https, absoluta) 
 * para que se muestre en el email
 */
function buildLoginOtpHtml(code: string): string {
  const safeCode = escapeHtml(code);
  const logoUrl = process.env.EMAIL_LOGO_URL?.trim();
  const showLogo = Boolean(logoUrl && /^https:\/\//i.test(logoUrl));

  const { bgPage, accent, text, textMuted, cardBg, border, codeBg } =
    EMAIL_THEME;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Verificación Matchcota</title>
</head>
<body style="margin:0;padding:0;background-color:${bgPage};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${bgPage};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 20px 0;text-align:center;">
              ${
                showLogo
                  ? `<img src="${escapeHtml(
                      logoUrl!
                    )}" alt="Matchcota" width="140" height="auto" style="display:inline-block;max-width:140px;height:auto;border:0;" />`
                  : `<span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:700;color:${accent};letter-spacing:-0.02em;">Matchcota</span>`
              }
            </td>
          </tr>
          <tr>
            <td style="background-color:${cardBg};border-radius:12px;border:1px solid ${border};padding:28px 24px;box-shadow:0 1px 2px rgba(0,0,0,0.04);">
              <p style="margin:0 0 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:600;color:${text};line-height:1.4;">
                Verifica tu inicio de sesión
              </p>
              <p style="margin:0 0 24px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${textMuted};line-height:1.5;">
                Usa este código para continuar. No lo compartas con nadie.
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding:16px 20px;background-color:${codeBg};border-radius:8px;border:1px solid ${border};">
                    <span style="font-family:'Courier New',Courier,monospace;font-size:28px;font-weight:700;letter-spacing:0.35em;color:${text};">${safeCode}</span>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:13px;color:${textMuted};line-height:1.5;">
                Caduca en <strong style="color:${text};">${OTP_VALID_MINUTES} minutos</strong>. Si no fuiste tú, puedes ignorar este mensaje.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 8px 0 8px;text-align:center;">
              <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;font-size:12px;color:${textMuted};line-height:1.5;">
                Mensaje automático de Matchcota · Adopción responsable
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Envía el código por SMTP (p. ej. Gmail con contraseña de aplicación).
 * Si faltan variables SMTP, en desarrollo solo registra el código en consola.
 *
 * Opcional: `EMAIL_LOGO_URL` con storage para imagenes PENDIENTE***
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
    text: buildLoginOtpPlainText(code),
    html: buildLoginOtpHtml(code),
  });
}
