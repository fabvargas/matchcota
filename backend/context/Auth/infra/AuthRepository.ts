import { SupabaseClient } from "@supabase/supabase-js";
import { ServerError } from "@/backend/error/ServerError";
import { Auth } from "../domain/Auth";
import { AuthEmail } from "../domain/AuthEmail";
import { AuthId } from "../domain/AuthId";


//solo "adoptante" y "refugio" para respetar Auth.ts actual
 
type AuthRole = "adoptante" | "refugio";

 //Representaciion de una fila de la tabla auth en la base de datos
 
type AuthRow = {
  id_usuario: string;
  email: string;
  password_hash: string;
  role: AuthRole;
  verified: boolean;
  fecha_creacion: string | Date;
};

export class AuthRepository {

  private static readonly SELECT_FIELDS = `
    id_usuario,
    email,
    password_hash,
    role,
    verified,
    fecha_creacion
  `;

  
//El repositorio recibe el cliente de Supabase mediante inyección
//de dependencias

  constructor(private readonly supabase: SupabaseClient) {}

  
//Guarda una nueva cuenta de autenticacion
   
  async save(auth: Auth): Promise<void> {
    try {
      const primitives = auth.toPrimitives();

      const row = {
        id_usuario: primitives.id,
        email: primitives.email,
        password_hash: primitives.password,
        role: primitives.role,
        verified: primitives.verified,
        fecha_creacion: primitives.date_created,
      };

      const { error } = await this.supabase.from("auth").insert(row);

      // Manejo específico para emails duplicados con codigo 23505 que se usa para
      // evitar duplicados
      if (error) {
        if (error.code === "23505") {
          throw new ServerError("El email ya está registrado.");
        }

        throw new ServerError(
          "No pudimos crear la cuenta en este momento. Intenta de nuevo más tarde."
        );
      }
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos crear la cuenta en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  
//Busca una cuenta por su correo electrónico retornando null si no exite
  async findByEmail(email: AuthEmail): Promise<Auth | null> {
    try {
      const { data, error } = await this.supabase
        .from("auth")
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

  /**
   * Busca una cuenta por su identificador unico
   */
  async findById(id: AuthId): Promise<Auth | null> {
    try {
      const { data, error } = await this.supabase
        .from("auth")
        .select(AuthRepository.SELECT_FIELDS)
        .eq("id_usuario", id.getValue())
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

  /**
   * Verifica si ya existe una cuenta con el email indicado.
  **/
  async existsByEmail(email: AuthEmail): Promise<boolean> {
    try {
      const { count, error } = await this.supabase
        .from("auth")
        .select("id_usuario", { count: "exact", head: true })
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

  /**
   * Actualiza el rol del usuario limitado a los roles definidos en el dominio actual
   */
  async updateRole(id: AuthId, role: AuthRole): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from("auth")
        .update({ role })
        .eq("id_usuario", id.getValue())
        .select("id_usuario");

      if (error) {
        throw new ServerError(
          "No pudimos actualizar el rol en este momento. Intenta de nuevo más tarde."
        );
      }

      // Validación para asegurar que el registro existe
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

  /**
   * Actualiza el estado de verificación del usuario.
   * Se utiliza, por ejemplo, después de confirmar el email.
   */
  async updateVerificationStatus(
    id: AuthId,
    verified: boolean
  ): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from("auth")
        .update({ verified })
        .eq("id_usuario", id.getValue())
        .select("id_usuario");

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

  /**
   * Permite actualizar el hash de la contraseña
   * util para cambiar o recuperar password
   */
  async updatePasswordHash(
    id: AuthId,
    passwordHash: string
  ): Promise<void> {
    try {
      const { data, error } = await this.supabase
        .from("auth")
        .update({ password_hash: passwordHash })
        .eq("id_usuario", id.getValue())
        .select("id_usuario");

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

  /**
   * Método generico de actualización del agregado completo.
   */
  async update(auth: Auth): Promise<void> {
    try {
      const primitives = auth.toPrimitives();

      const { data, error } = await this.supabase
        .from("auth")
        .update({
          email: primitives.email,
          password_hash: primitives.password,
          role: primitives.role,
          verified: primitives.verified,
        })
        .eq("id_usuario", primitives.id)
        .select("id_usuario");

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

  /**
   * Convierte una fila de la base de datos en el agregado de dominio Auth
   */
  private static rowToAuth(row: AuthRow): Auth {
    const dateCreated =
      row.fecha_creacion instanceof Date
        ? row.fecha_creacion
        : new Date(row.fecha_creacion);

    return Auth.fromPrimitives({
      id: row.id_usuario,
      email: row.email,
      password: row.password_hash,
      role: row.role,
      verified: row.verified,
      date_created: dateCreated,
      date_banned: null, 
    });
  }
}