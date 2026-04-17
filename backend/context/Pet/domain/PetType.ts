import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetTypeSchema = z.enum(["Perro", "Gato"], {message: "Invalid Pet Type"});

export type PetTypeType = z.infer<typeof PetTypeSchema>;

export class PetType{
    constructor(
        private readonly value: PetTypeType,
    ){

        PetType.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetTypeSchema, value);
        
    }

    static createDog(): PetType {
        return new PetType("Perro");
    }

    static createCat(): PetType {
        return new PetType("Gato");
    }

    getValue(): PetTypeType {
        return this.value;
    }

    isDog(): boolean {
        return this.value === "Perro";
    }

    isCat(): boolean {
        return this.value === "Gato";
    }
    
}