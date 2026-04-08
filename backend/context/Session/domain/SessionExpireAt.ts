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

    static async validate(value: Date): Promise<void> {
         await parseSchema(SessionExpireAtSchema, value);
    }

    getValue(): Date {
        return this.value;
    }
    
}