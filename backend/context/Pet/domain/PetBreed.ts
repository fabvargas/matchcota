import { z } from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetBreedSchema = z.enum([
  "Labrador", 
  "Bulldog",
  "Beagle", 
  "Poodle", 
  "Chihuahua", 
  "Schnauzer", 
  "Dachshund", 
  "Boxer", 
  "Rottweiler", 
  "Yorkshire Terrier",
  "Golden Retriever",
  "Shih Tzu",
  "Doberman",
  "Great Dane",
  "Siberian Husky",
  "Cocker Spaniel",
  "Bichon Frise",
  "Mastiff",
  "Pug",
  "Border Collie",
  "Mestizo"
], { message: "Invalid Breed" });

export type PetBreedType = z.infer<typeof PetBreedSchema>;

export class PetBreed {
   constructor(
    private readonly value: PetBreedType,
  ) {}

  static create(value: string): PetBreed {
    const parsed = parseSchema(PetBreedSchema, value);
    return new PetBreed(parsed);
  }

  getValue(): PetBreedType {
    return this.value;
  }
}