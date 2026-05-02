import {z} from "zod";
import { parseSchema } from  "@/backend/utils/parseSchema";

export const ApplicationMessageSchema = z.object({
  message: z.string().min(1, "El mensaje no puede estar vacío"),
});

export type ApplicationMessageType = z.infer<typeof ApplicationMessageSchema>;

export class ApplicationMessage {

    constructor(
        private readonly value: string
    ) {

    }

    getValue() {
        return this.value;
    }

    static validate(value:string): void{
        parseSchema(ApplicationMessageSchema, { message: value });
    }
}

