import { SupabaseClient } from "@supabase/supabase-js";
import { ServerError } from "@/backend/error/ServerError";
import { Refugio } from "../domain/Refugio";
import { RefugioId } from "../domain/RefugioId";
import { AuthId } from "../../Auth/domain/AuthId";
import { ComunaType } from "../../Shared/ComunaType";


type RefugioRow = {
  id: string;
  id_usuario: string;
  nombre: string;
  direccion: string | null;
  telefono: string | null;
  descripcion: string | null;
  comuna: ComunaType | null;
  codigo_postal: string | null;
};

export class RefugioRepository {
  /**
   * Campos que seleccionados desde la tabla refugio en la base de datos
   */
  private static readonly SELECT_FIELDS = `
    id,
    id_usuario,
    nombre,
    direccion,
    telefono,
    descripcion,
    comuna,
    codigo_postal
  `;

  /**
   * El repositorio recibe el cliente de Supabase por inyección de dependencias
   */
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Guarda un nuevo refugio en la base de datos.
   * Se usa normalmente cuando una cuenta autenticada crea su perfil institucional
   */
  async save(refugio: Refugio): Promise<void> {
    try {
      const primitives = refugio.toPrimitives();

      const row = {
        id: primitives.id,
        id_usuario: primitives.authId,
        nombre: primitives.name,
        direccion: primitives.address,
        telefono: primitives.telephone,
        descripcion: primitives.description,
        comuna: primitives.comuna,
        codigo_postal: primitives.codigoPostal,
      };

      const { error } = await this.supabase.from("refugio").insert(row);

      if (error) {
        // 23505 indica violación de restricción unica
        if (error.code === "23505") {
          throw new ServerError("Ya existe un refugio asociado a este usuario.");
        }

        throw new ServerError(
          "No pudimos crear el refugio en este momento. Intenta de nuevo más tarde."
        );
      }
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos crear el refugio en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  /**
   * Busca un refugio por su identificador unico retornando null si no existe
   */
  async findById(id: RefugioId): Promise<Refugio | null> {
    try {
      const { data, error } = await this.supabase
        .from("refugio")
        .select(RefugioRepository.SELECT_FIELDS)
        .eq("id", id.getValue())
        .maybeSingle<RefugioRow>();

      if (error) {
        throw new ServerError(
          "No pudimos consultar el refugio en este momento. Intenta de nuevo más tarde."
        );
      }

      if (!data) return null;

      return RefugioRepository.rowToRefugio(data);
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos consultar el refugio en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  /**
   * Busca un refugio a partir del id del usuario autenticado
   * para saber si una cuenta ya tiene un perfil de refugio creado
   */
  async findByAuthId(authId: AuthId): Promise<Refugio | null> {
    try {
      const { data, error } = await this.supabase
        .from("refugio")
        .select(RefugioRepository.SELECT_FIELDS)
        .eq("id_usuario", authId.getValue())
        .maybeSingle<RefugioRow>();

      if (error) {
        throw new ServerError(
          "No pudimos consultar el refugio asociado al usuario en este momento. Intenta de nuevo más tarde."
        );
      }

      if (!data) return null;

      return RefugioRepository.rowToRefugio(data);
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos consultar el refugio asociado al usuario en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  /**
   * Verifica si ya existe un refugio asociado a un usuario
   * Esto es útil antes de crear un nuevo perfil de refugio
   */
  async existsByAuthId(authId: AuthId): Promise<boolean> {
    try {
      const { count, error } = await this.supabase
        .from("refugio")
        .select("id", { count: "exact", head: true })
        .eq("id_usuario", authId.getValue());

      if (error) {
        throw new ServerError(
          "No pudimos comprobar la existencia del refugio en este momento. Intenta de nuevo más tarde."
        );
      }

      return (count ?? 0) > 0;
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos comprobar la existencia del refugio en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  /**
   * Actualiza el perfil completo del refugio
   */
  async update(refugio: Refugio): Promise<void> {
    try {
      const primitives = refugio.toPrimitives();

      const { data, error } = await this.supabase
        .from("refugio")
        .update({
          nombre: primitives.name,
          direccion: primitives.address,
          telefono: primitives.telephone,
          descripcion: primitives.description,
          comuna: primitives.comuna,
          codigo_postal: primitives.codigoPostal,
        })
        .eq("id", primitives.id)
        .select("id");

      if (error) {
        throw new ServerError(
          "No pudimos actualizar el refugio en este momento. Intenta de nuevo más tarde."
        );
      }

      // Validamos que si exista el registro que intentamos actualizar
      if (!data || data.length === 0) {
        throw new ServerError(
          "No encontramos el refugio que intentas actualizar."
        );
      }
    } catch (error) {
      if (error instanceof ServerError) throw error;

      throw new ServerError(
        "No pudimos actualizar el refugio en este momento. Intenta de nuevo más tarde."
      );
    }
  }

  /**
   * Convierte una fila de la base de datos en el agregado de dominio Refugio
   */
  private static rowToRefugio(row: RefugioRow): Refugio {
    return Refugio.fromPrimitives({
      id: row.id,
      authId: row.id_usuario,
      name: row.nombre,
      address: row.direccion,
      telephone: row.telefono,
      description: row.descripcion,
      comuna: row.comuna,
      codigoPostal: row.codigo_postal,
    });
  }
}