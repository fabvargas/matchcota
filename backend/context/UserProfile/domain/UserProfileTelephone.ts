import { parseSchema } from "@/backend/utils/parseSchema";
import {z} from "zod";

export const UserProfileTelephoneSchema = z.
string().trim().
min(7, "Telephone must be at least 7 characters long").
max(15, "Telephone must be at most 15 characters long").
regex(/^\+?[0-9\s\-]+$/, "Telephone must contain only numbers, spaces, dashes, and an optional leading +")
;

export type UserProfileTelephoneType = z.infer<typeof UserProfileTelephoneSchema>;

export class UserProfileTelephone {

    public constructor(private readonly value: UserProfileTelephoneType) {
        UserProfileTelephone.validate(value);
    }

    static validate(telephone: string): void {
        parseSchema(UserProfileTelephoneSchema, telephone);
    }

    getValue(): UserProfileTelephoneType {
        return this.value;
    }
}