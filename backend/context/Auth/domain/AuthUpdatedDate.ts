import { DateType, DateSchema } from "../../Shared/DateType";

export const AuthUpdatedDateSchema = DateSchema;
export type AuthUpdatedDateType = DateType;

export class AuthUpdatedDate {

    constructor(
        private value: AuthUpdatedDateType,
    ){
        AuthUpdatedDate.validate(value);
    }

    static validate(value: AuthUpdatedDateType): AuthUpdatedDate {
        return new AuthUpdatedDate(value);
    }

    getValue(): AuthUpdatedDateType {
        return this.value;
    }

    update(): void {
        this.value = new Date();
    }
}