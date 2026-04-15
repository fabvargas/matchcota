import { SupabaseClient } from "@supabase/supabase-js";
import { ServerError } from "@/backend/error/ServerError";
import { Auth } from "../domain/Auth";
import { AuthEmail } from "../domain/AuthEmail";
import { AuthId } from "../domain/AuthId";

// Solo "adoptante" y "refugio" para respetar Auth.ts actual
type AuthRole = "adoptante" | "refugio";

// Representación de una fila de la tabla public.auth
type AuthRow = {
  id_auth: string;
  email: string;
  password_hash: string;
  role: AuthRole;
  verified: boolean;
  fecha_creacion: string | Date;
};

export class AuthRepository {
  private static readonly TABLE_NAME = "auth";

  private static readonly SELECT_FIELDS = `
    id_auth,
    email,
    password_hash,
    role,
    verified,
    fecha_creacion
  `;

  constructor(private readonly supabase: SupabaseClient) {}

  // Guarda una nueva cuenta de autenticación
  async save(auth: Auth): Promise<void> {
    try {
      const primitives = auth.toPrimitives();

      const row = {
        id_auth: primitives.id,
        email: primitives.email,
        password_hash: primitives.password,
        role: primitives.role,
        verified: primitives.verified,
        fecha_creacion: primitives.date_created,
      };

      const { error } = await this.supabase
        .from(AuthRepository.TABLE_NAME)
        .insert(row);

      if (error) {
        console.error("SUPABASE INSERT ERROR [auth.save]:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          row,
        });

        if (error.code === "23505") {
          throw new ServerError("El email ya está registrado.");
        }

        throw error;
      }
    } catch (error) {
      console.error("AUTH REPOSITORY SAVE CATCH:", error);

      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos crear la cuenta en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  // Busca una cuenta por email
  async findByEmail(email: AuthEmail): Promise<Auth | null> {
    try {
      const { data, error } = await this.supabase
        .from(AuthRepository.TABLE_NAME)
        .select(AuthRepository.SELECT_FIELDS)
        .eq("email", email.getValue())
        .maybeSingle<AuthRow>();

      if (error) {
        throw new ServerError(
          "No pudimos consultar la cuenta en este momento. Intenta de nuevo más tarde."
        );
      }

      if (!data) return null;

      return AuthRepository.rowToAuth(data);
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos consultar la cuenta en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  // Busca una cuenta por su identificador único
  async findById(id: AuthId): Promise<Auth | null> {
    try {
      const { data, error } = await this.supabase
        .from(AuthRepository.TABLE_NAME)
        .select(AuthRepository.SELECT_FIELDS)
        .eq("id_auth", id.getValue())
        .maybeSingle<AuthRow>();

      if (error) {
        throw new ServerError(
          "No pudimos consultar la cuenta en este momento. Intenta de nuevo más tarde."
        );
      }

      if (!data) return null;

      return AuthRepository.rowToAuth(data);
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos consultar la cuenta en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  // Verifica si ya existe una cuenta con ese email
  async existsByEmail(email: AuthEmail): Promise<boolean> {
    try {
      const { count, error } = await this.supabase
        .from(AuthRepository.TABLE_NAME)
        .select("id_auth", { count: "exact", head: true })
        .eq("email", email.getValue());

      if (error) {
        throw new ServerError(
          "No pudimos comprobar el correo en este momento. Intenta de nuevo más tarde."
        );
      }

      return (count ?? 0) > 0;
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos comprobar el correo en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  // Actualiza el rol
  async updateRole(id: AuthId, role: AuthRole): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from(AuthRepository.TABLE_NAME)
        .update({ role })
        .eq("id_auth", id.getValue())
        .select("id_auth");

      if (error) {
        throw new ServerError(
          "No pudimos actualizar el rol en este momento. Intenta de nuevo más tarde."
        );
      }

      if (!data || data.length === 0) {
        throw new ServerError(
          "No encontramos la cuenta que intentas actualizar."
        );
      }
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos actualizar el rol en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  // Actualiza el estado de verificación
  async updateVerificationStatus(
    id: AuthId,
    verified: boolean
  ): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from(AuthRepository.TABLE_NAME)
        .update({ verified })
        .eq("id_auth", id.getValue())
        .select("id_auth");

      if (error) {
        throw new ServerError(
          "No pudimos actualizar la verificación en este momento. Intenta de nuevo más tarde."
        );
      }

      if (!data || data.length === 0) {
        throw new ServerError(
          "No encontramos la cuenta que intentas actualizar."
        );
      }
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos actualizar la verificación en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  // Actualiza el hash de contraseña
  async updatePasswordHash(
    id: AuthId,
    passwordHash: string
  ): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from(AuthRepository.TABLE_NAME)
        .update({ password_hash: passwordHash })
        .eq("id_auth", id.getValue())
        .select("id_auth");

      if (error) {
        throw new ServerError(
          "No pudimos actualizar la contraseña en este momento. Intenta de nuevo más tarde."
        );
      }

      if (!data || data.length === 0) {
        throw new ServerError(
          "No encontramos la cuenta que intentas actualizar."
        );
      }
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos actualizar la contraseña en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  // Actualización completa del agregado
  async update(auth: Auth): Promise<void> {
    try {
      const primitives = auth.toPrimitives();

      const { data, error } = await this.supabase
        .from(AuthRepository.TABLE_NAME)
        .update({
          email: primitives.email,
          password_hash: primitives.password,
          role: primitives.role,
          verified: primitives.verified,
        })
        .eq("id_auth", primitives.id)
        .select("id_auth");

      if (error) {
        throw new ServerError(
          "No pudimos actualizar la cuenta en este momento. Intenta de nuevo más tarde."
        );
      }

      if (!data || data.length === 0) {
        throw new ServerError(
          "No encontramos la cuenta que intentas actualizar."
        );
      }
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos actualizar la cuenta en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  // Convierte una fila de BD en el agregado Auth
  private static rowToAuth(row: AuthRow): Auth {
    const dateCreated =
      row.fecha_creacion instanceof Date
        ? row.fecha_creacion
        : new Date(row.fecha_creacion);

    return Auth.fromPrimitives({
      id: row.id_auth,
      email: row.email,
      password: row.password_hash,
      role: row.role,
      verified: row.verified,
      date_created: dateCreated,
      date_banned: null,
    });
  }
}