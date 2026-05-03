import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetPersonalitySchema= z.enum(["Amigable", "Juguetón", "Tranquilo", "Curioso", "Tímido", "Activo", "Cariñoso", "Protector", "Sociable"], {message: "Invalid Personality"});

export type PetPersonalityType = z.infer<typeof PetPersonalitySchema>;

export class PetPersonality{
    constructor(
        private readonly value: PetPersonalityType,
    ){

        PetPersonality.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetPersonalitySchema, value);
        
    }

    static create(value: PetPersonalityType): PetPersonality {
        return new PetPersonality(value);
    }

    getValue(): PetPersonalityType {
        return this.value;
    }

}