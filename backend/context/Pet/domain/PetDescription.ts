import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetDescriptionSchema = z.string({message: "Invalid Description"}).trim().min(1, {message: 'Description is required'}).max(500, {message: 'Description must be less than 500 characters'});

export type PetDescriptionType = z.infer<typeof PetDescriptionSchema>;

export class PetDescription{
    constructor(
        private readonly value: PetDescriptionType,
    ){

        PetDescription.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetDescriptionSchema, value);
        
    }

    getValue(): PetDescriptionType {
        return this.value;
    }

    
}   

