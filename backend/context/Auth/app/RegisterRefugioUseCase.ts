import { Auth } from "../domain/Auth";
import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Refugio } from "../../Refugio/domain/Refugio";
import { RefugioName } from "../../Refugio/domain/RefugioName";
import { RolId } from "../../Rol/RolId";
import {AuthRepository } from "@/backend/context/Auth/domain/AuthRepository";
import {RefugioRepository } from "../../Refugio/domain/RefugioRepository";
import { ProviderId } from "../../Provider/domain/ProviderId";

export class RegisterRefugioUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly refugioRepository: RefugioRepository
    ){

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

    const existingAuth = await this.authRepository.findByEmail(new AuthEmail(email));

    if(existingAuth){
        throw new ValidateDomainError("Ya existe una cuenta con este correo electrónico");
    }
    
    const exisitenteRefugio = await this.refugioRepository.findByName(new RefugioName(name));

    if(exisitenteRefugio){
        throw new ValidateDomainError("Ya existe un refugio asociado a este nombre");
    }


    const auth = await Auth.createRefugio(
        new AuthEmail(email),
        new AuthPassword(password),
        new RolId(2),
        new ProviderId(1)
    );
    
    const refugio =Refugio.create(
        auth.getId(),
        new RefugioName(name),
    );
    
    await this.authRepository.save(auth);
    await this.refugioRepository.save(refugio);
   }

}