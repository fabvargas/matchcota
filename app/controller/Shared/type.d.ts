export type ResponseType<T> = {
  error : boolean
  message: string;
  data?: T;
};

/** Respuesta extendida del login (2FA por correo). */
export type LoginActionData = {
  requiresOtp?: boolean;
  loginTicket?: string;
  email?: string;
};

export type UserProfileType = {
  id: string;
  authId: string;
  name: string;
  img_url?: string;
  address?: string;
  telephone?: string;
  description?: string;
  comuna?: ComunaType;
  region?: string;
};

export type RefugioType = {
  id: string,
  authId: string,
  name: string,
  img_url: string | undefined,
  address: string | undefined,
  telephone: string | undefined,
  description: string | undefined,
  comuna: ComunaType | undefined,
  region: string | undefined,
  codigoPostal: string | undefined
}