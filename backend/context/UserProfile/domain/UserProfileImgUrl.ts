import z from "zod"

import { parseSchema } from "@/backend/utils/parseSchema";

const UserProfileImgUrlSchema = z.url().optional();

type UserProfileImgUrlType = z.infer<typeof UserProfileImgUrlSchema>;

export class UserProfileImgUrl {
    constructor(
        private readonly value: UserProfileImgUrlType
    ) {
        UserProfileImgUrl.validate(value);
    }

    static validate(value: UserProfileImgUrlType): void {
        parseSchema(UserProfileImgUrlSchema, value);
    }

    getValue(): UserProfileImgUrlType {
        return this.value;
    }
}