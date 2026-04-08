
import { parseSchema } from "@/backend/utils/parseSchema";
import z from "zod";

const SessionUserIdSchema = z.uuid();
export type SessionUserIdType = z.infer<typeof SessionUserIdSchema>;


export class SessionUserId {

    constructor(
        private readonly value: string
    ){
        SessionUserId.validate(value);
    }

    static async validate(value: string): Promise<void> {
         await parseSchema(SessionUserIdSchema, value);
         
    }

    getValue(): string {
        return this.value;
    }
    
}