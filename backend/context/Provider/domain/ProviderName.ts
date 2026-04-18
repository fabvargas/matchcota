import {z} from "zod";
import {parseSchema} from "@/backend/utils/parseSchema";
export const ProviderNameSchema = z.enum(["google", "email"]);

export type ProviderNameType = z.infer<typeof ProviderNameSchema>; 

export class ProviderName {
    private constructor(private readonly value: ProviderNameType) {
        ProviderName.validate(value);
    }

    static validate(value: string): void {
         parseSchema(ProviderNameSchema, value);
    }
}