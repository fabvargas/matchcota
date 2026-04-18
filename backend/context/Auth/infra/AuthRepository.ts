import { SupabaseClient } from "@supabase/supabase-js";
import { AuthRepository } from "../domain/AuthRepository";
import { Auth } from "../domain/Auth";
import { AuthEmail } from "../domain/AuthEmail";
import { AuthId } from "../domain/AuthId";

export class SupabaseAuthRepository implements AuthRepository {

  constructor(private supabase: SupabaseClient) {}

  async save(auth: Auth): Promise<void> {
    const authData = auth.toPrimitives();

    const { error } = await this.supabase
      .from("auth")
      .insert({
        auth_id: authData.id,
        email: authData.email,
        password_hash: authData.password,
        verified: authData.verified ?? false,
        two_factor_enabled: authData.two_factor,
        id_auth_provider: authData.providerId,
        id_rol: authData.roleId,
      });

    if (error) {
      if (error.code === "23505") {
        throw new Error("Email already exists");
      }
      throw new Error("Error saving auth: " + error.message);
    }
  }

  async findByEmail(email: AuthEmail): Promise<Auth | null> {
    const { data, error } = await this.supabase
      .from("auth")
      .select("*")
      .eq("email", email.getValue())
      .maybeSingle(); // 👈 mejor

    if (error) {
      throw new Error("Error finding by email: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findById(id: AuthId): Promise<Auth | null> {
    const { data, error } = await this.supabase
      .from("auth")
      .select("*")
      .eq("auth_id", id.getValue()) // 👈 corregido
      .maybeSingle();

    if (error) {
      throw new Error("Error finding by id: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  private mapToDomain(data: any): Auth {
    return Auth.fromPrimitives({
      id: data.auth_id,
      email: data.email,
      password: data.password_hash,
      verified: data.verified,
      two_factor: data.two_factor_enabled,
      providerId: data.id_auth_provider,
      roleId: data.id_rol,
      date_created: data.date_created,
      updated_at: data.updated_at
    });
  }
}