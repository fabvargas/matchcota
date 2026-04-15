import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Auth } from "../domain/Auth";



export class VerifyCredentialUseCase {

    constructor(){

   }

   async execute(
    email:string,
    password:string,
   ): Promise<Auth>{


    // Aquí deberías buscar el Auth por email en tu repositorio
    const auth = await Auth.createAdoptante(
        new AuthEmail(email),
       new AuthPassword(password)
    );

    if(!auth){
        throw new ValidateDomainError("Credenciales inválidas");
    }

    // repository.getAuthByEmail(email);
    if(auth.getEmail().getValue() !== new AuthEmail(email).getValue()){
        throw new ValidateDomainError("Credenciales inválidas");
    }

    const compared = await auth.comparePassword(new AuthPassword(password));

    if(!compared){
        throw new ValidateDomainError("Credenciales inválidas");
    }

  
    return auth
    
   }
}