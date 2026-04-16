import { SupabaseClient } from "@supabase/supabase-js";
import { ServerError } from "@/backend/error/ServerError";
import { Refugio } from "../domain/Refugio";
import { RefugioId } from "../domain/RefugioId";
import { AuthId } from "../../Auth/domain/AuthId";
import { ComunaSchema, ComunaType } from "../../Shared/ComunaType";

/** Fila de public.refugio_profile con comuna anidada (FK id_comuna → comuna) */
type RefugioRow = {
  id_refugio: string;
  auth_user_id: string;
  nombre: string;
  direccion: string | null;
  telefono: string;
  descripcion: string | null;
  codigo_postal: string | null;
  verificada: boolean;
  id_comuna: number | null;
  comuna: { nombre: string } | null;
};

export class RefugioRepository {
  private static readonly TABLE_NAME = "refugio_profile";

  /**
   * Columnas de refugio_profile + nombre de comuna vía relación PostgREST
   */
  private static readonly SELECT_FIELDS = `
    id_refugio,
    auth_user_id,
    nombre,
    direccion,
    telefono,
    descripcion,
    codigo_postal,
    verificada,
    id_comuna,
    comuna ( nombre )
  `;

  constructor(private readonly supabase: SupabaseClient) {}

  async save(refugio: Refugio): Promise<void> {
    try {
      const primitives = refugio.toPrimitives();
      const idComuna = await this.comunaTypeToId(primitives.comuna);

      const row = {
        id_refugio: primitives.id,
        auth_user_id: primitives.authId,
        nombre: primitives.name,
        direccion: primitives.address,
        telefono: primitives.telephone ?? "Por definir",
        descripcion: primitives.description,
        codigo_postal: primitives.codigoPostal,
        verificada: false,
        id_comuna: idComuna,
      };

      const { error } = await this.supabase
        .from(RefugioRepository.TABLE_NAME)
        .insert(row);

      if (error) {
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

  async findById(id: RefugioId): Promise<Refugio | null> {
    try {
      const { data, error } = await this.supabase
        .from(RefugioRepository.TABLE_NAME)
        .select(RefugioRepository.SELECT_FIELDS)
        .eq("id_refugio", id.getValue())
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

  async findByAuthId(authId: AuthId): Promise<Refugio | null> {
    try {
      const { data, error } = await this.supabase
        .from(RefugioRepository.TABLE_NAME)
        .select(RefugioRepository.SELECT_FIELDS)
        .eq("auth_user_id", authId.getValue())
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

  async existsByAuthId(authId: AuthId): Promise<boolean> {
    try {
      const { count, error } = await this.supabase
        .from(RefugioRepository.TABLE_NAME)
        .select("id_refugio", { count: "exact", head: true })
        .eq("auth_user_id", authId.getValue());

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

  async update(refugio: Refugio): Promise<void> {
    try {
      const primitives = refugio.toPrimitives();
      const idComuna = await this.comunaTypeToId(primitives.comuna);

      const { data, error } = await this.supabase
        .from(RefugioRepository.TABLE_NAME)
        .update({
          nombre: primitives.name,
          direccion: primitives.address,
          telefono: primitives.telephone ?? "Por definir",
          descripcion: primitives.description,
          codigo_postal: primitives.codigoPostal,
          id_comuna: idComuna,
        })
        .eq("id_refugio", primitives.id)
        .select("id_refugio");

      if (error) {
        throw new ServerError(
          "No pudimos actualizar el refugio en este momento. Intenta de nuevo más tarde."
        );
      }

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
   * Resuelve ComunaType (dominio) → id_comuna según catálogo public.comuna.nombre
   */
  private async comunaTypeToId(
    comuna: ComunaType | null
  ): Promise<number | null> {
    if (comuna === null) return null;

    const { data, error } = await this.supabase
      .from("comuna")
      .select("id_comuna")
      .eq("nombre", comuna)
      .maybeSingle<{ id_comuna: number }>();

    if (error) {
      throw new ServerError(
        "No pudimos resolver la comuna en este momento. Intenta de nuevo más tarde."
      );
    }

    if (!data) {
      throw new ServerError(
        "La comuna indicada no existe en el catálogo. Verifica el nombre respecto a la tabla comuna."
      );
    }

    return data.id_comuna;
  }

  private static rowToRefugio(row: RefugioRow): Refugio {
    const nombreComuna = row.comuna?.nombre ?? null;
    let comuna: ComunaType | null = null;
    if (nombreComuna !== null) {
      const parsed = ComunaSchema.safeParse(nombreComuna);
      comuna = parsed.success ? parsed.data : null;
    }

    return Refugio.fromPrimitives({
      id: row.id_refugio,
      authId: row.auth_user_id,
      name: row.nombre,
      address: row.direccion,
      telephone: row.telefono,
      description: row.descripcion,
      comuna,
      codigoPostal: row.codigo_postal,
    });
  }
}