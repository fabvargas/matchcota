import z from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

const SessionCreatedAtSchema = z.date();
export type SessionCreatedAtType = z.infer<typeof SessionCreatedAtSchema>;

export class SessionCreatedAt {

    constructor(
        private readonly value: Date
    ){
        SessionCreatedAt.validate(value);
    }

    static validate(value: Date): void {
          parseSchema(SessionCreatedAtSchema, value);
    }

    static create(): SessionCreatedAt {
        const createdAt = new Date();
        return new SessionCreatedAt(createdAt);
    }

    getValue(): Date {
        return this.value;
    }
    
}