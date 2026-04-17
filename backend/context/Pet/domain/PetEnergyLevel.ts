import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetEnergyLevelSchema = z.number({message: "Invalid Energy Level"}).int().min(0, {message: 'Energy Level must be at least 0'}).max(100, {message: 'Energy Level must be at most 100'});

export type PetEnergyLevelType = z.infer<typeof PetEnergyLevelSchema>;

export class PetEnergyLevel{
    constructor(
        private readonly value: PetEnergyLevelType,
    ){

        PetEnergyLevel.validate(value);
    }

    static validate(value: number): void {
       parseSchema(PetEnergyLevelSchema, value);
        
    }

    getValue(): PetEnergyLevelType {
        return this.value;
    }

    
}