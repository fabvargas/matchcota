export type ResponseType<T> = {
  error : boolean
  message: string;
  data?: T;
};

type UserProfileType = {
  id: string;
  authId: string;
  name: string;
  img_url?: string;
  address?: string;
  telephone?: string;
  description?: string;
  comuna?: ComunaType;
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
  codigoPostal: string | undefined
}