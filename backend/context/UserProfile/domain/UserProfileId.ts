import { parseSchema } from "@/backend/utils/parseSchema";
import { generateUUID } from "@/backend/utils/generateUUID";
import { z } from "zod";

export const UserProfileIdSchema = z.string().uuid();

export type UserProfileIdType = z.infer<typeof UserProfileIdSchema>;

export class UserProfileId {

    private constructor(private readonly value: string) {
        UserProfileIdSchema.parse(value);
    }

    static async validate(id: string): Promise<UserProfileId> {
        const parsed = await parseSchema(UserProfileIdSchema, id);
        return new UserProfileId(parsed);
    }

    static create(): UserProfileId {
        return new UserProfileId(generateUUID());
    }

    getValue(): string {
        return this.value;
    }
}