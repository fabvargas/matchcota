import { parseSchema } from "@/backend/utils/parseSchema";
import z from "zod";

const AuthRoleSchema = z.object({
    role: z.enum(["adoptante", "refugio"])
});

export type AuthRoleType = z.infer<typeof AuthRoleSchema>;

export class AuthRole {

    constructor(
        private readonly value: AuthRoleType
    ){
       AuthRole.validate(value);
    }

    static async validate(data: unknown): Promise<void> {
        await parseSchema(AuthRoleSchema, data);
        
    }

    static createAdoptante(): AuthRole {
        return new AuthRole({ role: "adoptante" });
    }

    static createRefugio(): AuthRole {
        return new AuthRole({ role: "refugio" });
    }


    getValue(): string {
        return this.value.role;
    }

    isAdoptante(): boolean {
        return this.value.role === "adoptante";
    }

    isRefugio(): boolean {
        return this.value.role === "refugio";
    }

    

}