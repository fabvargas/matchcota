import { z } from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";


export const ComunaNameSchema = z.enum([
  "Santiago",
  "Providencia",
  "Ñuñoa",
  "Maipú",
  "Las Condes",
  "La Florida",
  "Puente Alto",
  "San Bernardo",
  "Recoleta",
  "Independencia"
]);

export type ComunaType = z.infer<typeof ComunaNameSchema>;

export class ComunaName {

    constructor(
        private readonly value: ComunaType
    ){
        ComunaName.validate(value);
    }

    static validate(data: unknown): void {
        parseSchema(ComunaNameSchema, data);
    }

    getValue(): ComunaType {
        return this.value;
    }
}