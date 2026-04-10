import { z } from "zod";
import { parseSchema } from "@/backend/utils/parseSchema";

export const UserProfileAddressSchema = z
.string().trim()
.min(1, "Address must be at least 1 character long")
.max(200, "Address must be at most 200 characters long")


export type UserProfileAddressType = z.infer<typeof UserProfileAddressSchema>;

export class UserProfileAddress {

    public constructor(private readonly value: UserProfileAddressType) {
        UserProfileAddress.validate(value);
    }

    static  validate(address: UserProfileAddressType): void {
         parseSchema(UserProfileAddressSchema, address);
         
    }

    getValue(): UserProfileAddressType {
        return this.value;
    }
}