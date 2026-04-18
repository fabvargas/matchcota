import { parseSchema } from "@/app/controller/Shared/parseSchema";
import { DateType, DateSchema } from "../../Shared/DateType";

export const AuthUpdatedDateSchema = DateSchema;
export type AuthUpdatedDateType = DateType;

export class AuthUpdatedDate {

    constructor(
        private value: Date,
    ){
        AuthUpdatedDate.validate(value);
    }

    static validate(value: Date): void {
        parseSchema(AuthUpdatedDateSchema, value);
    }

    getValue(): Date {
        return this.value;
    }

    update(): void {
        this.value = new Date();
    }
}