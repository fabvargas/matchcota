import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetImageUrlSchema = z.url({message: "Invalid URL format"});

export type PetImageUrlType = z.infer<typeof PetImageUrlSchema>;

export class PetImageUrl{
    constructor(
        private readonly value: PetImageUrlType,
    ){

        PetImageUrl.validate(value);
    }

    static validate(value: string): void {
       parseSchema(PetImageUrlSchema, value);
        
    }

    getValue(): PetImageUrlType {
        return this.value;
    }

    
}