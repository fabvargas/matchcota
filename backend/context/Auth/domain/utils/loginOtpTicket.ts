import { createHmac, timingSafeEqual } from "crypto";

const SEP = ".";

type TicketPayload = {
  authId: string;
  email: string;
  exp: number;
};

export function signLoginOtpTicket(
  payload: TicketPayload,
  secret: string
): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url"
  );
  const sig = createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}${SEP}${sig}`;
}

export function verifyLoginOtpTicket(
  token: string,
  secret: string
): { authId: string; email: string } | null {
  const idx = token.lastIndexOf(SEP);
  if (idx <= 0) return null;
  const body = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = createHmac("sha256", secret).update(body).digest("base64url");
  if (expected.length !== sig.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null;
  } catch {
    return null;
  }
  let parsed: TicketPayload;
  try {
    parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (
    typeof parsed.exp !== "number" ||
    parsed.exp < Date.now() ||
    !parsed.authId ||
    !parsed.email
  ) {
    return null;
  }
  return { authId: parsed.authId, email: parsed.email };
}
