import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetGenreSchema = z.enum(["Macho", "Hembra"], {message: "Invalid Genre"});

export type PetGenreType = z.infer<typeof PetGenreSchema>;

export class PetGenre{
    constructor(
        private readonly value: PetGenreType,
    ){

        PetGenre.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetGenreSchema, value);
        
    }

    static createMale(): PetGenre {
        return new PetGenre("Macho");
    }

    static createFemale(): PetGenre {
        return new PetGenre("Hembra");
    }

    getValue(): PetGenreType {
        return this.value;
    }

    isMale(): boolean {
        return this.value === "Macho";
    }

    isFemale(): boolean {
        return this.value === "Hembra";
    }
    
}