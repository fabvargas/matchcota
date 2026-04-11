import type { Auth } from "../Auth";
import type { AuthEmail } from "../AuthEmail";
import type { AuthId } from "../AuthId";


export interface IAuthRepository {

  save(auth: Auth): Promise<void>;

  update(auth: Auth): Promise<void>;

  findById(id: AuthId): Promise<Auth | null>;

  findByEmail(email: AuthEmail): Promise<Auth | null>;

  existsByEmail(email: AuthEmail): Promise<boolean>;
}
