import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Auth } from "../domain/Auth";
import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { UserProfile } from "../../UserProfile/domain/UserProfile";
import { UserProfileName } from "../../UserProfile/domain/UserProfileName";
import hashPassword from "../infra/utils/hashPassword";
import { AuthPasswordHashed } from "../domain/AuthPasswordHashed";





export class RegisterAdoptanteUseCase {

    constructor(){

   }

   async execute(
    email:string,
    password:string,
    confirmPassword:string,
    name:string,
   ): Promise<void>{

    if(password !== confirmPassword){
        throw new ValidateDomainError("Las contraseñas no coinciden");
    }

    const passwordPlain = new AuthPassword(password);
    const passwordHashed = await hashPassword(passwordPlain.getValue());

    const auth = Auth.createAdoptante(
        new AuthEmail(email),
        AuthPasswordHashed.create(passwordHashed),);
    
    const profile =  UserProfile.create(
        auth.getId(),
        new UserProfileName(name),
    );
    
        console.log(auth,profile)
   }
}