import { Auth } from "../domain/Auth";
import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import hashPassword from "../infra/utils/hashPassword";
import { AuthPasswordHashed } from "../domain/AuthPasswordHashed";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Refugio } from "../../Refugio/domain/Refugio";
import { RefugioName } from "../../Refugio/domain/RefugioName";

export class RegisterRefugioUseCase {

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

    const auth = Auth.createRefugio(
        new AuthEmail(email),
        AuthPasswordHashed.create(passwordHashed),);
    
    const refugio =Refugio.create(
        auth.getId(),
        new RefugioName(name),
    );
    
    console.log(auth,refugio)
   }

}