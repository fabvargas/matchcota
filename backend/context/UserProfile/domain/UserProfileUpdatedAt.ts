import { DateSchema,DateType } from "../../Shared/DateType";
import { parseSchema } from "@/backend/utils/parseSchema";

export const UserProfileUpdatedAtSchema = DateSchema;

export type UserProfileUpdatedAtType = DateType;

export class UserProfileUpdatedAt {
    constructor(
        private readonly value: UserProfileUpdatedAtType
    ) {
        UserProfileUpdatedAt.validate(value);
    }

    static validate(value: UserProfileUpdatedAtType): void {
        parseSchema(UserProfileUpdatedAtSchema, value);
    }

    getValue(): UserProfileUpdatedAtType {
        return this.value;
    }
}