import { parseSchema } from "@/backend/utils/parseSchema";
import z from "zod";


const AuthVerifiedSchema = z.boolean()

export type AuthVerifiedType = z.infer<typeof AuthVerifiedSchema>;

export class AuthVerified {

    constructor(
        private readonly value:AuthVerifiedType
    ){
       AuthVerified.validate(value);
    }

    static  validate(data: unknown): void {
         parseSchema(AuthVerifiedSchema, data);
        
    }

    static create(): AuthVerified {
        return new AuthVerified(false );
    }

    static verify(): AuthVerified {
        return new AuthVerified( true );
    }

    isVerified(): boolean {
        return this.value;
    }


    getValue(): boolean {
        return this.value;
    }

    

}