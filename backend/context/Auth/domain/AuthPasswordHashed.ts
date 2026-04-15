import { AuthPassword } from "./AuthPassword";
import comparePassword from "./utils/comparePassword";
import hashPassword from "./utils/hashPassword";



export class AuthPasswordHashed {

     constructor(
        private readonly value:string
    ){}

    static async create(plainPassword:AuthPassword): Promise<AuthPasswordHashed> {
        const hashedPassword = await hashPassword(plainPassword.getValue());
        return new AuthPasswordHashed(hashedPassword);
    }

    static async compare(plainPassword:AuthPassword, hashedPassword:AuthPasswordHashed): Promise<boolean> {
        const compared = await comparePassword(plainPassword.getValue(), hashedPassword.getValue());
        return compared;
    }
   

    getValue(): string {
        return this.value;
    }

  
}