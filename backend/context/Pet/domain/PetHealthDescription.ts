import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetHealthDescriptionSchema = z.string({message: "Invalid Health Description"}).max(500, {message: "Health Description must be less than 500 characters"});

export type PetHealthDescriptionType = z.infer<typeof PetHealthDescriptionSchema>;

export class PetHealthDescription{
    constructor(
        private readonly value: PetHealthDescriptionType,
    ){

        PetHealthDescription.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetHealthDescriptionSchema, value);
        
    }

    getValue(): PetHealthDescriptionType {
        return this.value;
    }

    
}