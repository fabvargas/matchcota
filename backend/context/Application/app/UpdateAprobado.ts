import { RefugioId } from "../../Refugio/domain/RefugioId";
import { ApplicationRepository } from "../domain/ApplicationRepository";

export class UpdateAprobadoUseCase  {
    
    constructor(
        private applicationRepository: ApplicationRepository
    ) {

    }


    async execute(applicationId: string, refugioId: RefugioId): Promise<void> {
        return await this.applicationRepository.updateStatus(applicationId, 2, refugioId);
    }
}