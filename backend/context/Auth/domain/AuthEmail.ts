import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const AuthEmailSchema = z.object({
    email: z.email()
});

export type AuthEmailType = z.infer<typeof AuthEmailSchema>;


export class AuthEmail {

    constructor(
        private readonly value:AuthEmailType
    ){
        AuthEmail.validate(value);
    }

    static async validate(value: unknown): Promise<void> {
        await parseSchema(AuthEmailSchema, value);
        
    }

    getValue(): string {
        return this.value.email;
    }

}