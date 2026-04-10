import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const SessionTokenSchema = z.string().trim().min(1).max(255);
export type SessionTokenType = z.infer<typeof SessionTokenSchema>;



export class SessionToken {

    constructor(
        private readonly value: string
    ){
        SessionToken.validate(value);
    }

    static validate(value: string): void {
         parseSchema(SessionTokenSchema, value);

    }

    getValue(): string {
        return this.value;
    }
    
}