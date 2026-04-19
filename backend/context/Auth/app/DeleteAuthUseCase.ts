import { AuthId } from "@/backend/context/Auth/domain/AuthId";
import { AuthRepository } from "@/backend/context/Auth/domain/AuthRepository";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";

export class DeleteAccountUseCase {

  constructor(
    private authRepository: AuthRepository,
  ) {}

  async execute(
    authId: string
  ): Promise<void> {

    const auth = await this.authRepository.findById(new AuthId(authId));
    
    if (!auth) {
        throw new ValidateDomainError("Usuario no encontrado");
    }

    await this.authRepository.delete(new AuthId(authId));
  }

}