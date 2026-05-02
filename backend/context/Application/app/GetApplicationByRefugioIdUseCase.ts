import { AuthId } from "../../Auth/domain/AuthId";
import { RefugioId } from "../../Refugio/domain/RefugioId";
import { RefugioRepository } from "../../Refugio/domain/RefugioRepository";
import { ApplicationRepository } from "../domain/ApplicationRepository";

export class GetApplicationByRefugioIdUseCase {

    constructor(
        private readonly applicationRepository: ApplicationRepository,
        private readonly refugioRepository: RefugioRepository
    ) {
    
    }

    async execute(authId: string) {
        const refugio = await this.refugioRepository.findByAuthId(new AuthId(authId));
        if (!refugio) {
            console.log("Refugio not found for auth ID:", authId);
            return [];
        }
        const application = await this.applicationRepository.getByRefugioId(refugio.getId());
        return application.map(app => ({
            id: app.application.getId().getValue(),
            mensaje: app.application.getMensaje().getValue(),
            state: app.application.getState().getValue(),
            fecha: app.application.toPrimitives().createdAt,
            userEmail: app.userEmail,
            nombreMascota: app.nombreMascota,
            nombreUsuario: app.nombreUsuario
        }));
    }

}