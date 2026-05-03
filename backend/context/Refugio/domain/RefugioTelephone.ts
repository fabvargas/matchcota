import {z} from "zod"
import { parseSchema } from "@/backend/utils/parseSchema";
import { generateUUID } from "@/backend/utils/generateUUID";

export const RefugioTelephoneSchema = z
.string({message: "Invalid Telephone"})
.trim()
.min(0, {message: 'Telephone is required'})
.max(20, {message: 'Telephone must be less than 20 characters'});

export type RefugioTelephoneType = z.infer<typeof RefugioTelephoneSchema>;

export class RefugioTelephone    {
    constructor(
        private readonly value: RefugioTelephoneType,
    ){
        RefugioTelephone.validate(value);
    }

    static validate(value: RefugioTelephoneType): void {
       parseSchema(RefugioTelephoneSchema, value);
        
    }


    getValue(): RefugioTelephoneType {
        return this.value;
    }

    
}   