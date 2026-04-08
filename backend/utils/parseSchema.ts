import  { ZodType } from "zod";
import { IllegalArgument } from "../error/IllegalArgument";


export const parseSchema = async <T>(schema: ZodType<T>, data: unknown): Promise<T> => {
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    throw new IllegalArgument(`${result.error.message}`);
  }
  return result.data;
};