import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import comparePassword from "../infra/utils/comparePassword";
import { AuthPasswordHashed } from "../domain/AuthPasswordHashed";
import { Auth } from "../domain/Auth";
import hashPassword from "../infra/utils/hashPassword";


export class VerifyCredentialUseCase {

    constructor(){

   }

   async execute(
    email:string,
    password:string,
   ): Promise<Auth>{

    const passwordPlain = new AuthPassword(password);
    const emailObj = new AuthEmail(email);

    // Aquí deberías buscar el Auth por email en tu repositorio
    const auth = Auth.createAdoptante(
        emailObj,
        AuthPasswordHashed.create(await hashPassword(passwordPlain.getValue())), // Esto es solo un placeholder, deberías obtener el hash real del repositorio
    );

    if(!auth){
        throw new ValidateDomainError("Credenciales inválidas");
    }

    if("gfdgfdg" !== emailObj.getValue()){
        throw new ValidateDomainError("Credenciales inválidas");
    }

    if(!comparePassword(passwordPlain.getValue(), auth.getPasswordHashed().getValue())){
        throw new ValidateDomainError("Credenciales inválidas");
    }

  
    return auth
    
   }
}