export type ResponseType<T> = {
  error : boolean
  message: string;
  data?: T;
};

export type UserProfileType={
  id: string;
  name: string;
  telephone?: string;
  address?: string;
  comuna?: string;
}

export type RefugioProfileType={
  id: string;
  name: string;
  address?: string;
  telephone?: string;
  description?: string;
  comuna?: string;
  codigoPostal?: string;
}