import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const AuthPasswordSchema = z.object({
    password: z.string().min(8).max(100)
});

export type AuthPasswordType = z.infer<typeof AuthPasswordSchema>;

export class AuthPassword {

    constructor(
        private readonly value:AuthPasswordType
    ){
        AuthPassword.validate(value);
    }

    static async validate(value: unknown): Promise<void> {
        await parseSchema(AuthPasswordSchema, value);
        
    }

    getValue(): string {
        return this.value.password;
    }   

}