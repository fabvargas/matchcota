import { parseSchema } from "@/backend/utils/parseSchema";
import z from "zod";


const AuthVerifiedSchema = z.object({
    verified: z.boolean()
});

export type AuthVerifiedType = z.infer<typeof AuthVerifiedSchema>;

export class AuthVerified {

    constructor(
        private readonly value:AuthVerifiedType
    ){
       AuthVerified.validate(value);
    }

    static async validate(data: unknown): Promise<void> {
        await parseSchema(AuthVerifiedSchema, data);
        
    }

    static create(): AuthVerified {
        return new AuthVerified({ verified: false });
    }

    static verify(): AuthVerified {
        return new AuthVerified({ verified: true });
    }

    isVerified(): boolean {
        return this.value.verified;
    }


    getValue(): boolean {
        return this.value.verified;
    }

    

}