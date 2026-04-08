import { AuthEmail } from "./AuthEmail";
import { AuthId } from "./AuthId";
import { AuthPassword } from "./AuthPassword";
import { AuthRole } from "./AuthRole";

import { AuthVerified } from "./AuthVerified";
import { AuthDateCreated } from "./AuthDateCreated";


export class Auth{

    constructor(
        private readonly id:AuthId,
        private readonly email:AuthEmail,
        private readonly password:AuthPassword,
        private readonly role:AuthRole,
        private  verified:AuthVerified,
        private readonly date_created:AuthDateCreated,     
    ){
      
    }

    static async createAdoptante(
        email:AuthEmail,
        password:AuthPassword,
    ): Promise<Auth> {
        const id = AuthId.create();
        const verified = AuthVerified.create();
        const date_created = AuthDateCreated.create();
        const role = AuthRole.createAdoptante();
        return new Auth(id, email, password, role, verified, date_created);    
    }

    static async createRefugio(
        email:AuthEmail,
        password:AuthPassword,
    ): Promise<Auth> {
        const id = AuthId.create();
        const verified = AuthVerified.create();
        const date_created = AuthDateCreated.create();
        const role = AuthRole.createRefugio();
        return new Auth(id, email, password, role, verified, date_created);    
    }


    toPrimitives() {
        return {
            id: this.id.getValue(),
            email: this.email.getValue(),
            password: this.password.getValue(),
            role: this.role.getValue(),
            verified: this.verified.getValue(),
            date_created: this.date_created.getValue()
        }
    }

    static fromPrimitives(primitives: {
        id: string,
        email: string,
        password: string,
        role: "adoptante" | "refugio",
        verified: boolean,
        date_created: Date,
        date_banned: Date | null
    }): Auth {
        return new Auth(
            new AuthId({ id: primitives.id }),
            new AuthEmail({ email: primitives.email }),
            new AuthPassword({ password: primitives.password }),
            new AuthRole({ role: primitives.role }),
            new AuthVerified({ verified: primitives.verified }),
            new AuthDateCreated({ date_created: primitives.date_created })
        )
    }


    //  methods to update the auth

    isVerified(): boolean {
        return this.verified.isVerified();
    }

    verify(): void {
        this.verified = AuthVerified.verify();
    }

    isAdoptante(): boolean {
        return this.role.isAdoptante();
    }

    isRefugio(): boolean {
        return this.role.isRefugio();
    }
    
  
}