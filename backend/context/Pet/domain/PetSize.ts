import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetSizeSchema = z.enum(["pequeño", "Mediano", "Grande"], {message: "Invalid Size"});
export type PetSizeType = z.infer<typeof PetSizeSchema>;

export class PetSize{
    constructor(
        private readonly value: PetSizeType,
    ){

        PetSize.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetSizeSchema, value);
        
    }

    getValue(): PetSizeType {
        return this.value;
    }

    
}