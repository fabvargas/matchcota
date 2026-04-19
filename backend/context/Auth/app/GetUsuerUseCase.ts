import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Auth } from "../domain/Auth";
import { AuthId } from "../domain/AuthId";
import { AuthRepository } from "../domain/AuthRepository";




export class GetUserUseCase {

  constructor(
    private authRepository: AuthRepository,
  ) {}

  async execute(
    authId: string
  ): Promise<Auth> {

    const auth = await this.authRepository.findById(new AuthId(authId));
    
    if (!auth) {
        throw new ValidateDomainError("Usuario no encontrado");
    }

    return auth;
  }

}