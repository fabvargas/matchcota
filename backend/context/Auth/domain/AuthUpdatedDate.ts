import { DateType, DateSchema } from "../../Shared/DateType";
import { parseSchema } from "@/backend/utils/parseSchema";

export const AuthUpdatedDateSchema = DateSchema;
export type AuthUpdatedDateType = DateType;

export class AuthUpdatedDate {

    constructor(
        private value: AuthUpdatedDateType,
    ){
        AuthUpdatedDate.validate(value);
    }

    static validate(value: AuthUpdatedDateType): void {
        parseSchema(AuthUpdatedDateSchema, value);
    }

    getValue(): AuthUpdatedDateType {
        return this.value;
    }

    update(): void {
        this.value = new Date();
    }
}