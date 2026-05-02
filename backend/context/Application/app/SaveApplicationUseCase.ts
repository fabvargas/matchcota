import { AuthId } from "../../Auth/domain/AuthId";
import { PetId } from "../../Pet/domain/PetId";
import { RefugioId } from "../../Refugio/domain/RefugioId";
import { Application } from "../domain/Application";
import { ApplicationMessage } from "../domain/ApplicationMessage";
import { ApplicationRepository } from "../domain/ApplicationRepository";

export class SaveApplicationUseCase{
    
    constructor(
        private readonly applicationRepository: ApplicationRepository
    ) {

    }

    async execute(mascotaId: string, authId: string, refugioId: string, mensaje: string): Promise<void> {
       
        const application = Application.create(
            new PetId(mascotaId),
            new AuthId(authId),
            new RefugioId(refugioId),
            new ApplicationMessage(mensaje)
        );
        await this.applicationRepository.save(application);
    }
}