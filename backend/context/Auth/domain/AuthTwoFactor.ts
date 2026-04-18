import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const AuthTwoFactorSchema = z.boolean("El campo two_factor debe ser un booleano");

export class AuthTwoFactor {

    constructor(
        private value: boolean,
    ){
        AuthTwoFactor.validate(value);
    }

    static validate(value: boolean): void {
        parseSchema(AuthTwoFactorSchema, value);
        
    }

    getValue(): boolean {
        return this.value;
    }

    isTwoFactorEnabled(): boolean {
        return this.value;
    }

    enableTwoFactor(): void {
        this.value = true;
    }

    disableTwoFactor(): void {
        this.value = false;
    }
}