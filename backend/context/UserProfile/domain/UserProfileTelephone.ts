import z from "zod";

export const UserProfileTelephoneSchema = z.string().min(7).max(15);

export type UserProfileTelephoneType = z.infer<typeof UserProfileTelephoneSchema>;

export class UserProfileTelephone {

    private constructor(private readonly value: string) {
        UserProfileTelephoneSchema.parse(value);
    }

    static async validate(telephone: string): Promise<UserProfileTelephone> {
        const parsed = await UserProfileTelephoneSchema.parseAsync(telephone);
        return new UserProfileTelephone(parsed);
    }

    getValue(): string {
        return this.value;
    }
}