import { Auth } from "./Auth";
import { AuthEmail } from "./AuthEmail";
import { AuthId } from "./AuthId";

export interface AuthRepository {
    save(auth: Auth): Promise<void>;
    findByEmail(email: AuthEmail): Promise<Auth | null>;
    findById(id: AuthId): Promise<Auth | null>;
}