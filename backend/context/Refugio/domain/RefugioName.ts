import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const RefugioNameSchema = z
.string({message: "Invalid Name"})
.trim()
.min(1, {message: 'Name is required'})
.max(100, {message: 'Name must be less than 100 characters'});

export type RefugioNameType = z.infer<typeof RefugioNameSchema>;

export class RefugioName    {
    constructor(
        private readonly value: RefugioNameType,
    ){
        RefugioName.validate(value);
    }

    static validate(value: string): void {
       parseSchema(RefugioNameSchema, value);
        
    }

    getValue(): RefugioNameType {
        return this.value;
    }

    
}