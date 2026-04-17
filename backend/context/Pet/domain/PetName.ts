import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetNameSchema = z.string({message: "Invalid Name"}).min(1, {message: "Name cannot be empty"}).max(50, {message: "Name must be less than 50 characters"});

export type PetNameType = z.infer<typeof PetNameSchema>;

export class PetName{
    constructor(
        private readonly value: PetNameType,
    ){

        PetName.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetNameSchema, value);
        
    }

    getValue(): PetNameType {
        return this.value;
    }

    
}