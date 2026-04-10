import {z} from "zod";

export const DateSchema = z.date({message: "Invalid date"});
export type DateType = z.infer<typeof DateSchema>;