import { AuthId } from "../../Auth/domain/AuthId";
import { PetId } from "../../Pet/domain/PetId";
import { RefugioId } from "../../Refugio/domain/RefugioId";
import { ApplicationId } from "./ApplicationId";
import { ApplicationMessage } from "./ApplicationMessage";
import { ApplicationState } from "./ApplicationState";


export class Application {
    constructor(
        private id: ApplicationId,
        private mascotaId: PetId,
        private authId: AuthId,
        private refugioId: RefugioId,
        private mensaje: ApplicationMessage,
        private state: ApplicationState,
        private createdAt: Date = new Date(),
        private updatedAt: Date = new Date(),
    ) {

    }
    
    static create(
        mascotaId: PetId,
        authId: AuthId,
        refugioId: RefugioId,
        mensaje: ApplicationMessage,
    ): Application {
        const id = ApplicationId.create();
        const state = ApplicationState.createPendiente();
        const createdAt = new Date();
        const updatedAt = new Date();

        return new Application(
            id,
            mascotaId,
            authId,
            refugioId,
            mensaje,
            state,
            createdAt,
            updatedAt
        );
    }

    getId(): ApplicationId {
        return this.id;
    }   

    getState(): ApplicationState {
        return this.state;
    }

    getMensaje(): ApplicationMessage {
        return this.mensaje;
    }
    toPrimitives() {
        return {
            id: this.id.getValue(),
            mascotaId: this.mascotaId.getValue(),
            authId: this.authId.getValue(),
            refugioId: this.refugioId.getValue(),
            mensaje: this.mensaje.getValue(),
            state: this.state.getValue(),
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString(),
        }
    }

   static fromPrimitives(primitives: {
        id: string,
        mascotaId: string,
        authId: string,
        refugioId: string,
        mensaje: string,
        state: string,
        createdAt: string,
        updatedAt: string,
    }): Application {
        return new Application(
            new ApplicationId(primitives.id),
            new PetId(primitives.mascotaId),
            new AuthId(primitives.authId),
            new RefugioId(primitives.refugioId),
            new ApplicationMessage(primitives.mensaje),
            new ApplicationState(primitives.state),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt)

        );
    }
}