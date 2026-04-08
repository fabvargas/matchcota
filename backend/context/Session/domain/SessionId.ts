import { generateUUID } from "@/backend/utils/generateUUID";
import { parseSchema } from "@/backend/utils/parseSchema";
import z from "zod";

const AuthIdSchema = z.uuid();
export type AuthIdType = z.infer<typeof AuthIdSchema>;


export class SessionId {

    constructor(
        private readonly value: string
    ){}

    static async validate(value: string): Promise<void> {
         await parseSchema(AuthIdSchema, value);

    }

    static create(): SessionId {
        const id = generateUUID();
        return new SessionId(id);
    }

    getValue(): string {
        return this.value;
    }
    
}