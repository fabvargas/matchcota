import { RefugioId } from "../../Refugio/domain/RefugioId";
import { ApplicationRepository } from "../domain/ApplicationRepository";

export class UpdateRechazarUseCase  {
    
    constructor(
        private applicationRepository: ApplicationRepository
    ) {

    }


    async execute(applicationId: string, refugioId: RefugioId): Promise<void> {
        return await this.applicationRepository.updateStatus(applicationId, 3, refugioId);
    }
}