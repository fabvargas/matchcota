import { AuthId } from "../../Auth/domain/AuthId";
import { SupabaseAuthRepository } from "../../Auth/infra/SupabaseAuthRepository";
import { SupabaseUserProfileRepository } from "../infra/SupabaseUserProfileRepository";

export class DeleteUserProfileUseCase {

    constructor(
        private userProfileRepository: SupabaseUserProfileRepository,
        private authRepository: SupabaseAuthRepository
    ) {}

    async execute(authId: string): Promise<void> {

        const findAuthId = this.authRepository.findById(new AuthId(authId));
        if (!findAuthId) {
            throw new Error("Usuario no encontrado");
        }
       
        await this.userProfileRepository.deleteByAuthId(authId);
        await this.authRepository.delete(new AuthId(authId));
    }

}