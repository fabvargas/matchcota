import { ServerError } from "@/backend/error/ServerError";
import type { IAuthRepository } from "../domain/ports/IAuthRepository";
import type { Auth } from "../domain/Auth";
import type { AuthEmail } from "../domain/AuthEmail";
import type { AuthId } from "../domain/AuthId";

export class AuthRepository implements IAuthRepository {

  /* Recibir cliente de BD sin tipo fijo */
  constructor(private readonly db: unknown) {}


  private client(): unknown {
    return this.db;
  }

  /**
   * Normalizado de errores
   * - Si es ServerError, se deja igual
   * - not implemented yet se deja ver en desarrolloo
   * - otro error se convierte en ServerError para respuestas uniformes al usuario
   */
  private handleError(error: unknown): never {
    if (error instanceof ServerError) throw error;
    if (error instanceof Error && error.message === "Not implemented yet") {
      throw error;
    }
    throw new ServerError("Server error");
  }


  async save(auth: Auth): Promise<void> {
    try {
      void this.client();
      void auth;
      throw new Error("Not implemented yet");
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(auth: Auth): Promise<void> {
    try {
      void this.client();
      void auth;
      throw new Error("Not implemented yet");
    } catch (error) {
      this.handleError(error);
    }
  }

  async findById(id: AuthId): Promise<Auth | null> {
    try {
      void this.client();
      void id;
      throw new Error("Not implemented yet");
    } catch (error) {
      this.handleError(error);
    }
  }

  async findByEmail(email: AuthEmail): Promise<Auth | null> {
    try {
      void this.client();
      void email;
      throw new Error("Not implemented yet");
    } catch (error) {
      this.handleError(error);
    }
  }

  async existsByEmail(email: AuthEmail): Promise<boolean> {
    try {
      void this.client();
      void email;
      throw new Error("Not implemented yet");
    } catch (error) {
      this.handleError(error);
    }
  }
}
