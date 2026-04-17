import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const AuthProviderSchema = z.enum(["google","credentials"]);

export class AuthProvider {

    constructor(
        private value: string,
    ){
        AuthProvider.validate(value);
    }

    static validate(value: string ): AuthProvider {
        parseSchema(AuthProviderSchema, value);
        return new AuthProvider(value);
    }

    static createGoogle(): AuthProvider {
        return new AuthProvider("google");
    }

    static createCredentials(): AuthProvider {
        return new AuthProvider("credentials");
    }

    
    getValue(): string {
        return this.value;
    }

    isGoogle(): boolean {
        return this.value === "google";
    }

    isCredentials(): boolean {
        return this.value === "credentials";
    }



}