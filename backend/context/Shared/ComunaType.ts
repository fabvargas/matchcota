import { z } from "zod";

export const ComunaSchema = z.enum([
  "Santiago",
  "Maipú",
  "Puente Alto",
  "La Florida",
  "Valparaíso",
  "Viña del Mar",
  "Quilpué",
  "Concepción",
  "Chillán",
  "Coronel",
  "Hualpén",
  "Puerto Montt",
  "Puerto Varas",
  "Castro",
  "Ancud",
]).refine((value) => value.trim().length > 0, {
        message: "Comuna cannot be empty",
    });

export type ComunaType = z.infer<typeof ComunaSchema>;