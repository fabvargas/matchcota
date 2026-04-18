import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Auth } from "../domain/Auth";
import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { UserProfile } from "../../UserProfile/domain/UserProfile";
import { UserProfileName } from "../../UserProfile/domain/UserProfileName";
import { RolId } from "../../Rol/RolId";
import {AuthRepository } from "@/backend/context/Auth/domain/AuthRepository";
import {UserProfileRepository } from "../../UserProfile/domain/UserProfileRepository";
import { ProviderId } from "../../Provider/domain/ProviderId";





export class RegisterAdoptanteUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userProfileRepository: UserProfileRepository
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

    const existingProfile = await this.userProfileRepository.findByName(new UserProfileName(name));

    if(existingProfile?.toPrimitives().name === name){
        throw new ValidateDomainError("Ya existe un perfil asociado a este nombre");
    }
    
    const auth = await Auth.createAdoptante(
        new AuthEmail(email),
       new AuthPassword(password),
       new RolId(1),
        new ProviderId(1)
    );
    
    const profile =  UserProfile.create(
        auth.getId(),
        new UserProfileName(name),
    );
    
    await this.authRepository.save(auth);
    await this.userProfileRepository.save(profile);
   }
}