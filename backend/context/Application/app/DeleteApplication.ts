import { AuthId } from "../../Auth/domain/AuthId";
import { ApplicationRepository } from "../domain/ApplicationRepository";


export class DeleteApplicationUseCase{

    constructor(private applicationRepository: ApplicationRepository){}

    async execute(id: string, applicantAuthId: AuthId){
        return await this.applicationRepository.delete(id, applicantAuthId);
    }
}