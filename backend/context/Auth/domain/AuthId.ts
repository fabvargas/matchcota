
import { generateUUID } from "@/backend/utils/generateUUID";
import { parseSchema } from "@/backend/utils/parseSchema";
import z from "zod";

const AuthIdSchema = z.object({
    id: z.uuid()
});

export type AuthIdType = z.infer<typeof AuthIdSchema>;

export class AuthId {
 
    constructor(
        private readonly value:AuthIdType
    ){
       AuthId.validate(value);
    }

    static async validate(value: unknown): Promise<void> {
        await parseSchema(AuthIdSchema, value);
        
    }

    static create(): AuthId {
        const id = generateUUID();
        return new AuthId({ id });
    }

    getValue(): string {
        return this.value.id;
    }

    

}