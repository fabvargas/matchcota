import {z} from "zod";

export const RegionSchema = z.enum([
    'Metropolitana',
'Valparaíso',
'Biobío',
'Los Lagos'
]);

export type RegionType = z.infer<typeof RegionSchema>;
