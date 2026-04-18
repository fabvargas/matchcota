import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { AuthPassword } from "../domain/AuthPassword";
import { Auth } from "../domain/Auth";
import { AuthRepository } from "../domain/AuthRepository";
import { AuthId } from "../domain/AuthId";

export class ChangePasswordUseCase {

  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  async execute(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
    idAuth: string
  ): Promise<void> {

    // ✅ 1. Crear Value Objects
    const currentPasswordObj = new AuthPassword(currentPassword);
    const newPasswordObj = new AuthPassword(newPassword);
    const confirmPasswordObj = new AuthPassword(confirmPassword);

    // ❌ 2. Validar confirmación
    if (newPasswordObj.getValue() !== confirmPasswordObj.getValue()) {
      throw new ValidateDomainError("Las contraseñas no coinciden");
    }

    // ✅ 3. Obtener usuario real
    const auth = await this.authRepository.findById(
      new AuthId(idAuth)
    );

    if (!auth) {
      throw new ValidateDomainError("Usuario no encontrado");
    }

    // ❌ 4. Validar contraseña actual (hash 🔥)
    const isValid = await auth.comparePassword(currentPasswordObj);

    if (!isValid) {
      throw new ValidateDomainError("La contraseña actual es incorrecta");
    }

    // ❌ 5. Evitar misma contraseña
    const isSame = await auth.comparePassword(newPasswordObj);

    if (isSame) {
      throw new ValidateDomainError(
        "La nueva contraseña no puede ser igual a la actual"
      );
    }

    // ✅ 6. Hashear nueva contraseña
    const hashedNewPassword = await Auth.hashPassword(newPasswordObj);

    // ✅ 7. Persistir cambio
    await this.authRepository.updatePassword(
      new AuthId(idAuth),
      hashedNewPassword.getValue()
    );
  }
}