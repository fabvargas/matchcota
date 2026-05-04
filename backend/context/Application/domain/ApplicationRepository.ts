import { AuthId } from "../../Auth/domain/AuthId";
import { RefugioId } from "../../Refugio/domain/RefugioId";
import { ApplicationWithRelations } from "../infra/SupabaseApplicationRepository";
import { Application } from "./Application";



export interface ApplicationRepository {
    save(application: Application): Promise<void>;
    getByRefugioId(refugioId: RefugioId): Promise<ApplicationWithRelations[]>;
    getByAuthId(authId: AuthId): Promise<ApplicationWithRelations[]>;
    /** Solo borra si la solicitud pertenece al adoptante (`auth_id`). */
    delete(id: string, applicantAuthId: AuthId): Promise<void>;
    /** Solo actualiza si la solicitud pertenece al refugio (`id_refugio`). */
    updateStatus(
        applicationId: string,
        status: number,
        refugioId: RefugioId
    ): Promise<void>;
}