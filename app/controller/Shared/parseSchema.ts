import {z} from "zod";
import { ValidateError } from "./ValidateError";

export const parseSchema = async <T>(schema: z.ZodSchema<T>, data: unknown): Promise<T> => {
  const result = await schema.safeParseAsync(data);
  if (!result.success) {
    throw new ValidateError(result.error.issues.map(issue => issue.message).join(", "));
  }
  return result.data;
};
