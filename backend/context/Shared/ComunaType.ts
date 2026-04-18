import { z } from "zod";

export const ComunaSchema = z.enum([
    "Santiago",
    "Valparaíso",
    "Concepción",
    "La Serena",
    "Antofagasta",
    "Temuco",
    "Rancagua",
    "Iquique",
    "Talca",
    "Puerto Montt"
    ]).refine((value) => value.trim().length > 0, {
        message: "Comuna cannot be empty",
    });

export type ComunaType = z.infer<typeof ComunaSchema>;