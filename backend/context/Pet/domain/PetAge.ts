import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetAgeSchema = z.number({message: "Invalid Age"}).int().positive().max(30, {message: 'Age must be less than 30 years'});

export type PetAgeType = z.infer<typeof PetAgeSchema>;

export class PetAge{
    constructor(
         readonly value: PetAgeType,
    ){

        PetAge.validate(value);
    }

    static validate(value: number): void {
       parseSchema(PetAgeSchema, value);
        
    }

    getValue(): PetAgeType {
        return this.value;
    }

    
}