import { AuthEmail } from "./AuthEmail";
import { AuthId } from "./AuthId";
import { AuthPassword } from "./AuthPassword";
import { AuthRole } from "./AuthRole";
import { AuthVerified } from "./AuthVerified";
import { AuthDateCreated } from "./AuthDateCreated";
import { AuthPasswordHashed } from "./AuthPasswordHashed";


export class Auth{

    private constructor(
        private readonly id:AuthId,
        private readonly email:AuthEmail,
        private readonly passwordHashed:AuthPasswordHashed,
        private readonly role:AuthRole,
        private  verified:AuthVerified,
        private readonly date_created:AuthDateCreated,     
    ){
      
    }

    static  createAdoptante(
        email:AuthEmail,
        passwordHashed:AuthPasswordHashed,
    ): Auth {
        const id = AuthId.create();
        const verified = AuthVerified.create();
        const date_created = AuthDateCreated.create();
        const role = AuthRole.createAdoptante();
        return new Auth(id, email, passwordHashed, role, verified, date_created);    
    }

    static  createRefugio(
        email:AuthEmail,
        passwordHashed:AuthPasswordHashed,
    ): Auth {
        const id = AuthId.create();
        const verified = AuthVerified.create();
        const date_created = AuthDateCreated.create();
        const role = AuthRole.createRefugio();
        return new Auth(id, email, passwordHashed, role, verified, date_created);    
    }


    toPrimitives() {
        return {
            id: this.id.getValue(),
            email: this.email.getValue(),
            password: this.passwordHashed.getValue(),
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
            new AuthId(primitives.id),
            new AuthEmail(primitives.email),
            AuthPasswordHashed.create(primitives.password),
            new AuthRole(primitives.role),
            new AuthVerified(primitives.verified),
            new AuthDateCreated(primitives.date_created)
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
    
    getId(): AuthId {
        return this.id;
    }

    getPasswordHashed(): AuthPasswordHashed {
        return this.passwordHashed;
    }

    getEmail(): AuthEmail {
        return this.email;
    }

    getRole(): AuthRole {
        return this.role;
    }
}