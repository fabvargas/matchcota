import z from "zod";

export const UserProfileComunaSchema = z.enum([
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
    ]);

export type UserProfileComunaType = z.infer<typeof UserProfileComunaSchema>;

export class UserProfileComuna {

    private constructor(private readonly value: string) {
        UserProfileComunaSchema.parse(value);
    }

    static async validate(comuna: string): Promise<UserProfileComuna> {
        const parsed = await UserProfileComunaSchema.parseAsync(comuna);
        return new UserProfileComuna(parsed);
    }

    getComunas(): string[] {
        return UserProfileComunaSchema.options;
    }

    isComuna(value: string): boolean {
        return UserProfileComunaSchema.options.includes(value as any);
    }

    getValue(): string {
        return this.value;
    }
}