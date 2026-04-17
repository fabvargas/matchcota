import { AuthEmail } from "./AuthEmail";
import { AuthId } from "./AuthId";
import { AuthPassword } from "./AuthPassword";
import { AuthRole, AuthRoleType } from "./AuthRole";
import { AuthVerified } from "./AuthVerified";
import { AuthDateCreated } from "./AuthDateCreated";
import { AuthPasswordHashed } from "./AuthPasswordHashed";
import { AuthTwoFactor } from "./AuthTwoFactor";
import { AuthProvider } from "./AuthProvider";
import { AuthUpdatedDate } from "./AuthUpdatedDate";


export class Auth{

    private constructor(
        private readonly id:AuthId,
        private readonly email:AuthEmail,
        private readonly passwordHashed:AuthPasswordHashed,
        private  verified:AuthVerified,
        private readonly two_factor:AuthTwoFactor,
        private readonly provider:AuthProvider,
        private readonly date_created:AuthDateCreated,     
        private readonly updated_at:AuthUpdatedDate ,
        private readonly role:AuthRole,
    ){
      
    }

    static  async createAdoptante(
        email:AuthEmail,
        plainPassword:AuthPassword,
    ): Promise<Auth> {
        const id = AuthId.create();
        const verified = AuthVerified.create();
        const date_created = AuthDateCreated.create();
        const role = AuthRole.createAdoptante();
        const passwordHashed = await AuthPasswordHashed.create(plainPassword);
        const two_factor = new AuthTwoFactor(false);
        const provider = AuthProvider.createCredentials();
        const updated_at = new AuthUpdatedDate(date_created.getValue());
        return new Auth(id, email, passwordHashed, verified, two_factor, provider, date_created, updated_at, role);    
    }

    static  async createRefugio(
        email:AuthEmail,
        plainPassword:AuthPassword,
    ): Promise<Auth> {
        const id = AuthId.create();
        const verified = AuthVerified.create();
        const date_created = AuthDateCreated.create();
        const role = AuthRole.createRefugio();
        const passwordHashed = await AuthPasswordHashed.create(plainPassword);
        const two_factor = new AuthTwoFactor(false);
        const provider = AuthProvider.createCredentials();
        const updated_at = new AuthUpdatedDate(date_created.getValue());
        return new Auth(id, email, passwordHashed, verified, two_factor, provider, date_created, updated_at, role);    
    }


    toPrimitives() {
        return {
            id: this.id.getValue(),
            email: this.email.getValue(),
            password: this.passwordHashed.getValue(),
            role: this.role.getValue(),
            verified: this.verified.getValue(),
            date_created: this.date_created.getValue(),
            updated_at: this.updated_at.getValue(),
            two_factor: this.two_factor.getValue(),
            provider: this.provider.getValue()

        }
    }

    static fromPrimitives(primitives: {
        id: string,
        email: string,
        password: string,
        role: "adoptante" | "refugio",
        verified: boolean,
        date_created: Date,
        updated_at: Date,
        two_factor: boolean,
        provider: string
    }): Auth {
        return new Auth(
            new AuthId(primitives.id),
            new AuthEmail(primitives.email),
            new AuthPasswordHashed(primitives.password),
            new AuthVerified(primitives.verified),
            new AuthTwoFactor(primitives.two_factor),
            new AuthProvider(primitives.provider),
            new AuthDateCreated(primitives.date_created),
            new AuthUpdatedDate(primitives.updated_at),
            new AuthRole(primitives.role as AuthRoleType)
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

    comparePassword(plainPassword: AuthPassword): Promise<boolean> {
        return AuthPasswordHashed.compare(plainPassword, this.passwordHashed);
    }

    static async hashPassword(plainPassword: AuthPassword ): Promise<AuthPasswordHashed> {
        return await AuthPasswordHashed.create(plainPassword);
    }
}