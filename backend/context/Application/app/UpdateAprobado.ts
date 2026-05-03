import { ApplicationRepository } from "../domain/ApplicationRepository";

export class UpdateAprobadoUseCase  {
    
    constructor(
        private applicationRepository: ApplicationRepository
    ) {

    }


    async execute(applicationId: string): Promise<void> {
        return await this.applicationRepository.updateStatus(applicationId, 2);
    }
}