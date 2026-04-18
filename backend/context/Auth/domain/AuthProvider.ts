import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const AuthProviderSchema = z.enum(["google","email"]);

export class AuthProvider {

    constructor(
        private value: string,
    ){
        AuthProvider.validate(value);
    }

    static validate(value: string ): void {
        parseSchema(AuthProviderSchema, value);
        
    }

    static createGoogle(): AuthProvider {
        return new AuthProvider("google");
    }

    static createEmail(): AuthProvider {
        return new AuthProvider("email");
    }

    
    getValue(): string {
        return this.value;
    }

    isGoogle(): boolean {
        return this.value === "google";
    }

    isEmail(): boolean {
        return this.value === "email";
    }



}