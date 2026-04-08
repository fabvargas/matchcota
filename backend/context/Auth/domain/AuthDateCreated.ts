import { parseSchema } from "@/backend/utils/parseSchema";
import z from "zod";

const AuthDateCreatedSchema = z.object({
    date_created: z.date()
});

export type AuthDateCreatedType = z.infer<typeof AuthDateCreatedSchema>;

export class AuthDateCreated {

    constructor(
        private readonly value:AuthDateCreatedType
    ){
       AuthDateCreated.validate(value);
    }

    static async validate(data: unknown): Promise<void> {
        await parseSchema(AuthDateCreatedSchema, data);
        
    }

    static create(): AuthDateCreated {
        return new AuthDateCreated({ date_created: new Date() });
    }

    getValue(): Date  {
        return this.value.date_created;
    }

    

}