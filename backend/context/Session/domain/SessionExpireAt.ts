import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const SessionExpireAtSchema = z.date();
export type SessionExpireAtType = z.infer<typeof SessionExpireAtSchema>;

export class SessionExpireAt {

    constructor(
        private readonly value: Date
    ){
         SessionExpireAt.validate(value);
    }

    static validate(value: Date): void {
          parseSchema(SessionExpireAtSchema, value);
    }

    static createExpireAtOneDay(): SessionExpireAt {
        const now = new Date();
        const expireAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); 
        return new SessionExpireAt(expireAt);
    }

    getValue(): Date {
        return this.value;
    }
    
}