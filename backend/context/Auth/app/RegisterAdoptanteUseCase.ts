import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Auth } from "../domain/Auth";
import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { UserProfile } from "../../UserProfile/domain/UserProfile";
import { UserProfileName } from "../../UserProfile/domain/UserProfileName";
import hashPassword from "../domain/utils/hashPassword";
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


    const auth = await Auth.createAdoptante(
        new AuthEmail(email),
       new AuthPassword(password),
    );
    
    const profile =  UserProfile.create(
        auth.getId(),
        new UserProfileName(name),
    );
    
        console.log(auth,profile)
   }
}