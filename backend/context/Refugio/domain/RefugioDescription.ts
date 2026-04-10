import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const RefugioDescriptionSchema = z.
string({message: "Invalid Description"}).
trim().
min(1, {message: 'Description is required'}).
max(300, {message: 'Description must be less than 300 characters'});

export type RefugioDescriptionType = z.infer<typeof RefugioDescriptionSchema>;

export class RefugioDescription{
    constructor(
        private readonly value: RefugioDescriptionType,
    ){

        RefugioDescription.validate(value);
    }

    static validate(value: string): void {
       parseSchema(RefugioDescriptionSchema, value);
        
    }

    getValue(): RefugioDescriptionType {
        return this.value;
    }

    
}