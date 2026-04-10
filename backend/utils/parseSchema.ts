import  { ZodType } from "zod";
import { IllegalArgument } from "../error/IllegalArgument";


export const parseSchema = <T>(schema: ZodType<T>, data: unknown): T => {
  const result =  schema.safeParse(data);
  if (!result.success) {
    throw new IllegalArgument(`${result.error.message}`);
  }
  return result.data;
};