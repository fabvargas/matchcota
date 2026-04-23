import { AuthRepository } from "../domain/AuthRepository";
import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { Auth } from "../domain/Auth";

export class VerifyCredentialUseCase {

  constructor(
    private authRepository: AuthRepository
  ) {}

  async execute(
    email: string,
    password: string
  ): Promise<Auth> {

    // ✅ 1. Buscar usuario en DB
    const auth = await this.authRepository.findByEmail(
      new AuthEmail(email)
    );
    
    // ❌ 2. No existe
    if (!auth) {
      throw new ValidateDomainError("Credenciales inválidas");
    }

    // ❌ 3. Comparar contraseña
    const isValid = await auth.comparePassword(
      new AuthPassword(password)
    );

    if (!isValid) {
      throw new ValidateDomainError("Credenciales inválidas");
    }

   

    // ✅ 5. Retornar usuario autenticado
    return auth;
  }
}