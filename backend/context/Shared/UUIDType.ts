import { z } from "zod";

export const UUIDSchema = z
.uuid({message: "Invalid UUID"}).
min(1, {message: 'UUID is required'}).
max(36, {message: 'UUID must be at most 36 characters'});

export type UUIDType = z.infer<typeof UUIDSchema>;