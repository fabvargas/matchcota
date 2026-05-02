import { AuthId } from "../../Auth/domain/AuthId";
import { RefugioId } from "../../Refugio/domain/RefugioId";
import { ApplicationWithRelations } from "../infra/SupabaseApplicationRepository";
import { Application } from "./Application";



export interface ApplicationRepository {
    save(application: Application): Promise<void>;
    getByRefugioId(refugioId: RefugioId): Promise<ApplicationWithRelations[]>;
    getByAuthId(authId: AuthId): Promise<ApplicationWithRelations[]>;
    delete(id: string): Promise<void>;
}