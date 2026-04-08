import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const SessionTokenSchema = z.string().min(1);
export type SessionTokenType = z.infer<typeof SessionTokenSchema>;



export class SessionToken {

    constructor(
        private readonly value: string
    ){
        SessionToken.validate(value);
    }

    static async validate(value: string): Promise<void> {
         await parseSchema(SessionTokenSchema, value);

    }

    getValue(): string {
        return this.value;
    }
    
}