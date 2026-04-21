
import { parseSchema } from "@/backend/utils/parseSchema";
import { ComunaSchema } from "@/backend/context/Shared/ComunaType";
import { z } from "zod";

const UserProfileComunaSchema = ComunaSchema;
export type UserProfileComunaType = z.infer<typeof UserProfileComunaSchema>;

export class UserProfileComuna {

    public constructor(private readonly value: UserProfileComunaType) {
        UserProfileComuna.validate(value);
    }

    static validate(comuna: string): void {
        parseSchema(UserProfileComunaSchema, comuna);
    }

    getComunas(): string[] {
        return ComunaSchema.options;
    }

    isComuna(value: string): boolean {
        return ComunaSchema.options.includes(value as any);
    }

    getValue(): UserProfileComunaType {
        return this.value;
    }
}