import { ValidateDomainError } from "@/backend/error/ValidateDomainError";

import { Auth } from "../domain/Auth";
import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";
import { AuthPasswordHashed } from "../domain/AuthPasswordHashed";

import { UserProfile } from "../../UserProfile/domain/UserProfile";
import { UserProfileName } from "../../UserProfile/domain/UserProfileName";

import { AuthRepository } from "../domain/AuthRepository";
import { UserProfileRepository } from "../../UserProfile/domain/UserProfileRepository";

import hashPassword from "../domain/utils/hashPassword";

export class RegisterAdoptanteUseCase {

  constructor(
    private authRepository: AuthRepository,
    private userProfileRepository: UserProfileRepository
  ) {}

  async execute(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
  ): Promise<void> {

    // ✅ 1. Validación básica
    if (password !== confirmPassword) {
      throw new ValidateDomainError("Las contraseñas no coinciden");
    }

    // ✅ 2. Email único
    const existingAuth = await this.authRepository.findByEmail(
      new AuthEmail(email)
    );

    if (existingAuth) {
      throw new ValidateDomainError("El email ya está registrado");
    }

   const existingProfile = await this.userProfileRepository.findByName(
      new UserProfileName(name)
    );

    if (existingProfile) {
      throw new ValidateDomainError("El nombre de usuario ya está registrado");
    }

    // ✅ 4. Crear entidad Auth (con password ya hasheado)
    const auth = await Auth.createAdoptante(
      new AuthEmail(email),
      new AuthPassword(password)
    );

    // ✅ 5. Crear perfil
    const profile = UserProfile.create(
      auth.getId(),
      new UserProfileName(name),
    );

    // ⚠️ 6. Persistencia
    await this.authRepository.save(auth);
    await this.userProfileRepository.save(profile);
  }
}