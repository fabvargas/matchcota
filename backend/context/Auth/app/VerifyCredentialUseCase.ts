import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Auth } from "../domain/Auth";
import { AuthRepository } from "../domain/AuthRepository";





export class VerifyCredentialUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
    ){

   }

   async execute(
    email:string,
    password:string,
   ): Promise<Auth>{


    const findAuth = await this.authRepository.findByEmail(new AuthEmail(email));

    if(!findAuth){
        throw new ValidateDomainError("Credenciales inválidas");
    }

    if(findAuth.getEmail().getValue() !== new AuthEmail(email).getValue()){
        throw new ValidateDomainError("Credenciales inválidas");
    }

    const compared = await findAuth.comparePassword(new AuthPassword(password));

    if(!compared){
        throw new ValidateDomainError("Credenciales inválidas");
    }

  
    return findAuth;
    
   }
}