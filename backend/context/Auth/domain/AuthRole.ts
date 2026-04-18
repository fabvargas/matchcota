import { parseSchema } from "@/backend/utils/parseSchema";
import z from "zod";

const AuthRoleSchema = z.enum(["adoptante", "refugio"], { message: "Role must be either 'adoptante' or 'refugio'" });



export type AuthRoleType = z.infer<typeof AuthRoleSchema>;

export class AuthRole {

    constructor(
        private readonly value: AuthRoleType
    ){
       AuthRole.validate(value);
    }

    static  validate(data: unknown): void   {
         parseSchema(AuthRoleSchema, data);
        
    }

    static createAdoptante(): AuthRole {
        return new AuthRole("adoptante" );
    }

    static createRefugio(): AuthRole {
        return new AuthRole("refugio" );
    }


    getValue(): string {
        return this.value;
    }

    isAdoptante(): boolean {
        return this.value === "adoptante";
    }

    isRefugio(): boolean {
        return this.value === "refugio";
    }

    

}