
import { parseSchema } from "@/backend/utils/parseSchema";
import {z} from "zod";

export const UserProfileNameSchema = z.string({message: "Invalid name"}).trim().min(1, "Name must be at least 1 character long").max(100, "Name must be at most 100 characters long");

export type UserProfileNameType = z.infer<typeof UserProfileNameSchema>;

export class UserProfileName {

    public constructor(private readonly value: string) {
        UserProfileName.validate(value);
    }

    static validate(name: string): void {
        parseSchema(UserProfileNameSchema, name);
    }


    getValue(): string {
        return this.value;
    }
}