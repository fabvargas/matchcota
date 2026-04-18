import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetStateSchema = z.enum(["Disponible", "Pendiente", "Adoptado"], {message: "Invalid State"});

export type PetStateType = z.infer<typeof PetStateSchema>;

export class PetState{
    constructor(
        private readonly value: PetStateType,
    ){

        PetState.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetStateSchema, value);
        
    }

    static createAvailable(): PetState {
        return new PetState("Disponible");
    }

    static createAdopted(): PetState {
        return new PetState("Adoptado");
    }

    static createPending(): PetState {
        return new PetState("Pendiente");
    }

    getValue(): PetStateType {
        return this.value;
    }

    isAvailable(): boolean {
        return this.value === "Disponible";
    }

    isAdopted(): boolean {
        return this.value === "Adoptado";
    }

    isPending(): boolean {
        return this.value === "Pendiente";
    }
    
}