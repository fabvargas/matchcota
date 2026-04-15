import { ValidateDomainError } from "@/backend/error/ValidateDomainError";
import { AuthPassword } from "../domain/AuthPassword";
import { Auth } from "../domain/Auth";

export class ChangePasswordUseCase {

    constructor() {}
    
    async execute(currentPassword: string, newPassword: string, confirmPassword: string): Promise<void> {
        
        const currentPasswordObj = new AuthPassword(currentPassword);
        const newPasswordObj = new AuthPassword(newPassword);
        const confirmPasswordObj = new AuthPassword(confirmPassword);

        if (newPasswordObj.getValue() !== confirmPasswordObj.getValue()) {
            throw new ValidateDomainError("Las contraseñas no coinciden");
        }
        
        // const authRepository = new AuthRepository();
        // const auth = await authRepository.getAuth();

        const oldPassword = "Festejo?3"
        if (currentPasswordObj.getValue() !== oldPassword) {
            throw new ValidateDomainError("La contraseña actual es incorrecta");
        }
        if (currentPasswordObj.getValue() === newPasswordObj.getValue()) {
            throw new ValidateDomainError("La nueva contraseña no puede ser igual a la contraseña actual");
        }

        const hashedNewPassword = await Auth.hashPassword(newPasswordObj);
        
        // await this.authRepository.updatePassword(hashedNewPassword);

    }

}