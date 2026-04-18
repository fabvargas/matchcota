import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";


const IntegerIdSchema = z.number().int().positive({ message: "ID must be a positive integer" });

export type IntegerIdType = z.infer<typeof IntegerIdSchema>;

export class IntegerId {
    constructor(
        private readonly value: number,
    ){
       IntegerId.validate(value);
    }

    static validate(data: unknown): void {
        parseSchema(IntegerIdSchema, data);
    }

    getValue(): number {
        return this.value;
    }
}