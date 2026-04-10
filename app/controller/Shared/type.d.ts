export type ResponseType<T> = {
  error : boolean
  message: string;
  data?: T;
};