import { AuthEmail } from "./AuthEmail";
import { AuthId } from "./AuthId";
import { AuthPassword } from "./AuthPassword";
import { AuthVerified } from "./AuthVerified";
import { AuthDateCreated } from "./AuthDateCreated";
import { AuthPasswordHashed } from "./AuthPasswordHashed";
import { AuthTwoFactor } from "./AuthTwoFactor";
import { AuthProvider } from "./AuthProvider";
import { AuthUpdatedDate } from "./AuthUpdatedDate";
import { ProviderId } from "@/backend/context/Provider/domain/ProviderId";
import { RolId } from "@/backend/context/Rol/RolId";

export class Auth{

    private constructor(
        private readonly id:AuthId,
        private readonly email:AuthEmail,
        private readonly passwordHashed:AuthPasswordHashed,
        private  verified:AuthVerified,
        private readonly two_factor:AuthTwoFactor,
        private readonly providerId:ProviderId,
        private readonly date_created:AuthDateCreated,     
        private readonly updated_at:AuthUpdatedDate ,
        private readonly roleId:RolId,
    ){
      
    }

    static  async createAdoptante(
        email:AuthEmail,
        plainPassword:AuthPassword,
        roleId: RolId,
        providerId: ProviderId
    ): Promise<Auth> {
        const id = AuthId.create();
        const verified = AuthVerified.create();
        const date_created = AuthDateCreated.create();
        const passwordHashed = await AuthPasswordHashed.create(plainPassword);
        const two_factor = new AuthTwoFactor(false);
        const updated_at = new AuthUpdatedDate(date_created.getValue());
        return new Auth(id, email, passwordHashed, verified, two_factor, providerId, date_created, updated_at, roleId);    
    }

    static  async createRefugio(
        email:AuthEmail,
        plainPassword:AuthPassword,
        roleId: RolId,
        providerId: ProviderId
    ): Promise<Auth> {
        const id = AuthId.create();
        const verified = AuthVerified.create();
        const date_created = AuthDateCreated.create();
        const passwordHashed = await AuthPasswordHashed.create(plainPassword);
        const two_factor = new AuthTwoFactor(false);
        const updated_at = new AuthUpdatedDate(date_created.getValue());
        return new Auth(id, email, passwordHashed, verified, two_factor, providerId, date_created, updated_at, roleId);    
    }


    toPrimitives() {
        return {
            id: this.id.getValue(),
            email: this.email.getValue(),
            password: this.passwordHashed.getValue(),
            roleId: this.roleId.getValue(),
            verified: this.verified.getValue(),
            date_created: this.date_created.getValue(),
            updated_at: this.updated_at.getValue(),
            two_factor: this.two_factor.getValue(),
            providerId: this.providerId.getValue()

        }
    }

    static fromPrimitives(primitives: {
        id: string,
        email: string,
        password: string,
        roleId: number,
        verified: boolean,
        date_created: Date,
        updated_at: Date,
        two_factor: boolean,
        providerId: number
    }): Auth {
        return new Auth(
            new AuthId(primitives.id),
            new AuthEmail(primitives.email),
            new AuthPasswordHashed(primitives.password),
            new AuthVerified(primitives.verified),
            new AuthTwoFactor(primitives.two_factor),
            new ProviderId(primitives.providerId),
            new AuthDateCreated(primitives.date_created),
            new AuthUpdatedDate(primitives.updated_at),
            new RolId(primitives.roleId)
        )
    }


    //  methods to update the auth

    isVerified(): boolean {
        return this.verified.isVerified();
    }

    verify(): void {
        this.verified = AuthVerified.verify();
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

    getTwoFactor(): AuthTwoFactor {
        return this.two_factor;
    }

    getProviderId(): ProviderId {
        return this.providerId;
    }

    getDateCreated(): AuthDateCreated {
        return this.date_created;
    }
    
    getUpdatedAt(): AuthUpdatedDate {
        return this.updated_at;
    }

    getHashPassword(): AuthPasswordHashed {
        return this.passwordHashed;
    }

    getRoleId(): RolId {
        return this.roleId;
    }

    comparePassword(plainPassword: AuthPassword): Promise<boolean> {
        return AuthPasswordHashed.compare(plainPassword, this.passwordHashed);
    }

    static async hashPassword(plainPassword: AuthPassword ): Promise<AuthPasswordHashed> {
        return await AuthPasswordHashed.create(plainPassword);
    }
}