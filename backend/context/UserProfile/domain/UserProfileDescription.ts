import {z} from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";
import { RefugioDescription, RefugioDescriptionSchema, RefugioDescriptionType } from "../../Refugio/domain/RefugioDescription";

export const UserProfileDescriptionSchema = z.
string({message: "Invalid Description"}).
trim().
min(1, {message: 'Description is required'}).
max(300, {message: 'Description must be less than 300 characters'});

export type UserProfileDescriptionType = z.infer<typeof UserProfileDescriptionSchema>;

export class UserProfileDescription{
    constructor(
        private readonly value: UserProfileDescriptionType,
    ){

        UserProfileDescription.validate(value);
    }

    static validate(value: string): void {
       parseSchema(UserProfileDescriptionSchema, value);
        
    }

    getValue(): UserProfileDescriptionType {
        return this.value;
    }

    
}