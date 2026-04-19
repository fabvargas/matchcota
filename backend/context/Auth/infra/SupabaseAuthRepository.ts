import { SupabaseClient } from "@supabase/supabase-js";
import { AuthRepository } from "../domain/AuthRepository";
import { Auth } from "../domain/Auth";
import { AuthEmail } from "../domain/AuthEmail";
import { AuthId } from "../domain/AuthId";


export class SupabaseAuthRepository implements AuthRepository {

  // ✅ tabla
  private static readonly TABLE = "auth";

  // ✅ columnas
  private static readonly COLUMNS = {
    ID: "auth_id",
    EMAIL: "email",
    PASSWORD: "password_hash",
    VERIFIED: "verified",
    TWO_FACTOR: "two_factor_enabled",
    CREATED_AT: "fecha_creacion",
    UPDATED_AT: "fecha_actualizacion",
    PROVIDER: "id_auth_provider",
    ROLE: "id_rol",
  };

  // ✅ mappings
  private static readonly ROLE_MAP: Record<string, number> = {
    adoptante: 1,
    refugio: 2,
  };

  private static readonly PROVIDER_MAP: Record<string, number> = {
    credentials: 1,
  };

  constructor(private supabase: SupabaseClient) {}

  async save(auth: Auth): Promise<void> {
    const data = auth.toPrimitives();

    const roleId = SupabaseAuthRepository.ROLE_MAP[data.role];
    const providerId = SupabaseAuthRepository.PROVIDER_MAP[data.provider];

    // 🔥 validación defensiva
    if (!roleId) throw new Error(`Invalid role: ${data.role}`);
    if (!providerId) throw new Error(`Invalid provider: ${data.provider}`);

    const { error } = await this.supabase
      .from(SupabaseAuthRepository.TABLE)
      .insert({
        [SupabaseAuthRepository.COLUMNS.ID]: data.id,
        [SupabaseAuthRepository.COLUMNS.EMAIL]: data.email,
        [SupabaseAuthRepository.COLUMNS.PASSWORD]: data.password,
        [SupabaseAuthRepository.COLUMNS.VERIFIED]: data.verified,
        [SupabaseAuthRepository.COLUMNS.TWO_FACTOR]: data.two_factor,

        // ⚠️ deja que la DB maneje esto si quieres
        [SupabaseAuthRepository.COLUMNS.CREATED_AT]: data.date_created,
        [SupabaseAuthRepository.COLUMNS.UPDATED_AT]: data.updated_at,

        [SupabaseAuthRepository.COLUMNS.PROVIDER]: providerId,
        [SupabaseAuthRepository.COLUMNS.ROLE]: roleId,
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
      .from(SupabaseAuthRepository.TABLE)
      .select("*")
      .eq(SupabaseAuthRepository.COLUMNS.EMAIL, email.getValue())
      .maybeSingle();

    if (error) {
      throw new Error("Error finding by email: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findById(id: AuthId): Promise<Auth | null> {
    const { data, error } = await this.supabase
      .from(SupabaseAuthRepository.TABLE)
      .select("*")
      .eq(SupabaseAuthRepository.COLUMNS.ID, id.getValue())
      .maybeSingle();

    if (error) {
      throw new Error("Error finding by id: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

private mapToDomain(data: any): Auth {
  return Auth.fromPrimitives({
    id: data[SupabaseAuthRepository.COLUMNS.ID],
    email: data[SupabaseAuthRepository.COLUMNS.EMAIL],
    password: data[SupabaseAuthRepository.COLUMNS.PASSWORD],
      verified: data[SupabaseAuthRepository.COLUMNS.VERIFIED],
      two_factor: data[SupabaseAuthRepository.COLUMNS.TWO_FACTOR],
    date_created: new Date(data[SupabaseAuthRepository.COLUMNS.CREATED_AT]),
    updated_at: data[SupabaseAuthRepository.COLUMNS.UPDATED_AT]
      ? new Date(data[SupabaseAuthRepository.COLUMNS.UPDATED_AT])
      : null,

    role: this.mapRoleFromDB(
      data[SupabaseAuthRepository.COLUMNS.ROLE]
    ),
    provider: this.mapProviderFromDB(
      data[SupabaseAuthRepository.COLUMNS.PROVIDER]
    ),
  });
}

  private mapRoleFromDB(id: number): "adoptante" | "refugio" {
    const map: Record<number, "adoptante" | "refugio"> = {
      1: "adoptante",
      2: "refugio",
    };

    if (!map[id]) throw new Error(`Invalid role id: ${id}`);
    return map[id];
  }

    async updatePassword(id: AuthId, newPasswordHashed: string): Promise<void> {
        const { error } = await this.supabase
          .from(SupabaseAuthRepository.TABLE)
          .update({
            [SupabaseAuthRepository.COLUMNS.PASSWORD]: newPasswordHashed,
            [SupabaseAuthRepository.COLUMNS.UPDATED_AT]: new Date(),
          })
          .eq(SupabaseAuthRepository.COLUMNS.ID, id.getValue());

        if (error) {
          throw new Error("Error updating password: " + error.message);
        }
      }

      async delete(id: AuthId): Promise<void> {
        const { error } = await this.supabase
          .from(SupabaseAuthRepository.TABLE)
          .delete()
          .eq(SupabaseAuthRepository.COLUMNS.ID, id.getValue());

        if (error) {
          throw new Error("Error deleting auth: " + error.message);
        }
      }

     

  private mapProviderFromDB(id: number): string {
    const map: Record<number, string> = {
      1: "credentials",
    };

    if (!map[id]) throw new Error(`Invalid provider id: ${id}`);
    return map[id];
  }
}