import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";
import { UUIDSchema, UUIDType } from "@/backend/context/Shared/UUIDType";
import { generateUUID } from "@/backend/utils/generateUUID";

const RefugioIdSchema = UUIDSchema;

export type RefugioIdType = z.infer<typeof RefugioIdSchema>;

export class RefugioId{
    constructor(
        private readonly value: RefugioIdType,
    ){

        RefugioId.validate(value);
    }

    static validate(value: string): void {
       parseSchema(RefugioIdSchema, value);
        
    }

    static create(): RefugioId {
        const id = generateUUID(); 
        return new RefugioId(id);
    }

    getValue(): RefugioIdType {
        return this.value;
    }


    
}
