import { ApplicationRepository } from "../domain/ApplicationRepository";


export class DeleteApplicationUseCase{

    constructor(private applicationRepository: ApplicationRepository){}

    async execute(id: string){
        return await this.applicationRepository.delete(id);
    }
}