import { AuthRepository } from "../../Auth/domain/AuthRepository";
import { RefugioRepository } from "../../Refugio/domain/RefugioRepository";

import { Auth } from "../domain/Auth";
import { AuthPassword } from "../domain/AuthPassword";
import { AuthEmail } from "../domain/AuthEmail";

import { ValidateDomainError } from "@/backend/error/ValidateDomainError";

import { Refugio } from "../../Refugio/domain/Refugio";
import { RefugioName } from "../../Refugio/domain/RefugioName";

export class RegisterRefugioUseCase {

  constructor(
    private authRepository: AuthRepository,
    private refugioRepository: RefugioRepository
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

    // ✅ 2. Validar si el email ya existe
    const existingAuth = await this.authRepository.findByEmail(
      new AuthEmail(email)
    );

    if (existingAuth) {
      throw new ValidateDomainError("El email ya está registrado");
    }

    const existingRefugio = await this.refugioRepository.findByName(
      new RefugioName(name)
    );

    if (existingRefugio) {
      throw new ValidateDomainError("El nombre del refugio ya está registrado");
    }

    // ✅ 3. Crear entidades (dominio)
    const auth = await Auth.createRefugio(
      new AuthEmail(email),
      new AuthPassword(password)
    );

    const refugio = Refugio.create(
      auth.getId(),
      new RefugioName(name)
    );

    // ⚠️ 4. Persistencia (idealmente en transacción)
    await this.authRepository.save(auth);
    await this.refugioRepository.save(refugio);

    // (opcional)
    // return algo como DTO o IDs
  }
}