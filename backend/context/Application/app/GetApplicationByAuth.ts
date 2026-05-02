import { AuthId } from "../../Auth/domain/AuthId";
import { ApplicationRepository } from "../domain/ApplicationRepository";
import { ApplicationWithRelations } from "../infra/SupabaseApplicationRepository";


export class GetApplicationByAuthUseCase {
    constructor(
        private applicationRepository: ApplicationRepository,
    ) {}

    async execute(authId: string) {
           const application = await this.applicationRepository.getByAuthId(new AuthId(authId));
       

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