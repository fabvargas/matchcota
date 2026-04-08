import { z } from "zod";

export const UserProfileAddressSchema = z.string().min(1).max(200);

export type UserProfileAddressType = z.infer<typeof UserProfileAddressSchema>;

export class UserProfileAddress {

    private constructor(private readonly value: string) {
        UserProfileAddressSchema.parse(value);
    }

    static async validate(address: string): Promise<UserProfileAddress> {
        const parsed = await UserProfileAddressSchema.parseAsync(address);
        return new UserProfileAddress(parsed);
    }

    getValue(): string {
        return this.value;
    }
}