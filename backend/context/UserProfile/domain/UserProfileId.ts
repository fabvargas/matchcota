import { parseSchema } from "@/backend/utils/parseSchema";
import { generateUUID } from "@/backend/utils/generateUUID";
import { z } from "zod";
import { UUIDSchema } from "../../Shared/UUIDType";

export const UserProfileIdSchema = UUIDSchema

export type UserProfileIdType = z.infer<typeof UserProfileIdSchema>;

export class UserProfileId {

    public constructor(public readonly value: string) {
        UserProfileId.validate(value);
    }

    static validate(id: string): void {
        parseSchema(UserProfileIdSchema, id);
    }

    static create(): UserProfileId {
        return new UserProfileId(generateUUID());
    }

    getValue(): string {
        return this.value;
    }
}