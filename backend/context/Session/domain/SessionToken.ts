import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";
import { randomBytes } from "crypto";
const SessionTokenSchema = z
  .string()
  .trim()
  .regex(/^[a-f0-9]+$/, "Invalid token format") 
  .min(64) 
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

    static create(): SessionToken {
        const tokenValue = randomBytes(32).toString("hex");
        return new SessionToken(tokenValue);
    }

    getValue(): string {
        return this.value;
    }
    
}