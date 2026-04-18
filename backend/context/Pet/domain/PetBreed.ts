import { z } from "zod";
import {PetType} from "@/backend/context/Pet/domain/PetType";
import { parseSchema } from "@/backend/utils/parseSchema";

export const PetBreedSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  typeId: z.number().int().positive(),
});

export type PetBreedType = z.infer<typeof PetBreedSchema>;

export class PetBreed {
  private constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly type: PetType,
  ) {
    PetBreed.validate({ id, name, typeId: type.getValue() });
  }

  static validate(data: unknown): void {
    parseSchema(PetBreedSchema, data);
  }

  static create(data: PetBreedType, type: PetType): PetBreed {
    return new PetBreed(data.id, data.name, type);
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): PetType {
    return this.type;
  }
}