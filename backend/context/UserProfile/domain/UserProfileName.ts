
import z from "zod";

export const UserProfileNameSchema = z.string().min(1).max(100);

export type UserProfileNameType = z.infer<typeof UserProfileNameSchema>;

export class UserProfileName {

    private constructor(private readonly value: string) {
        UserProfileNameSchema.parse(value);
    }

    static async validate(name: string): Promise<UserProfileName> {
        const parsed = await UserProfileNameSchema.parseAsync(name);
        return new UserProfileName(parsed);
    }

    getValue(): string {
        return this.value;
    }
}