import { SupabaseClient } from "@supabase/supabase-js";
import { RefugioRepository } from "../domain/RefugioRepository";
import { Refugio } from "../domain/Refugio";
import { RefugioId } from "../domain/RefugioId";
import { RefugioName } from "../domain/RefugioName";
import { AuthId } from "../../Auth/domain/AuthId";

export class SupabaseRefugioRepository implements RefugioRepository {

  // ✅ tabla
  private static readonly TABLE = "refugio_profile";

  // ✅ columnas
  private static readonly COLUMNS = {
    ID: "id_refugio",
    AUTH_ID: "auth_id",
    NAME: "nombre",
    ADDRESS: "direccion",
    TELEPHONE: "telefono",
    DESCRIPTION: "descripcion",
    IMG_URL: "imagen_url",
    UPDATED_AT: "fecha_actualizacion",
    COMUNA: "id_comuna",
    CODIGO_POSTAL: "codigo_postal"
  };

  constructor(private supabase: SupabaseClient) {}

  async save(refugio: Refugio): Promise<void> {
    const data = refugio.toPrimitives();

    const { error } = await this.supabase
      .from(SupabaseRefugioRepository.TABLE)
      .upsert({
        [SupabaseRefugioRepository.COLUMNS.ID]: data.id,
        [SupabaseRefugioRepository.COLUMNS.AUTH_ID]: data.authId,
        [SupabaseRefugioRepository.COLUMNS.NAME]: data.name,
        [SupabaseRefugioRepository.COLUMNS.ADDRESS]: data.address,
        [SupabaseRefugioRepository.COLUMNS.TELEPHONE]: data.telephone,
        [SupabaseRefugioRepository.COLUMNS.DESCRIPTION]: data.description,
        [SupabaseRefugioRepository.COLUMNS.IMG_URL]: data.img_url,
        [SupabaseRefugioRepository.COLUMNS.COMUNA]: data.comuna,
        [SupabaseRefugioRepository.COLUMNS.CODIGO_POSTAL]: data.codigoPostal,
        [SupabaseRefugioRepository.COLUMNS.UPDATED_AT]: new Date()
      });

    if (error) {
      throw new Error("Error saving refugio: " + error.message);
    }
  }

  async findById(id: RefugioId): Promise<Refugio | null> {
    const { data, error } = await this.supabase
      .from(SupabaseRefugioRepository.TABLE)
      .select("*")
      .eq(
        SupabaseRefugioRepository.COLUMNS.ID,
        id.getValue()
      )
      .maybeSingle();

    if (error) {
      throw new Error("Error finding refugio by id: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findByName(name: RefugioName): Promise<Refugio | null> {
    const { data, error } = await this.supabase
      .from(SupabaseRefugioRepository.TABLE)
      .select("*")
      .ilike(
        SupabaseRefugioRepository.COLUMNS.NAME,
        name.getValue()
      )
      .maybeSingle();

    if (error) {
      throw new Error("Error finding refugio by name: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findByAuthId(authId: AuthId): Promise<Refugio | null> {
    const { data, error } = await this.supabase
      .from(SupabaseRefugioRepository.TABLE)
      .select("*")
      .eq(
        SupabaseRefugioRepository.COLUMNS.AUTH_ID,
        authId.getValue()
      )
      .maybeSingle();

    if (error) {
      throw new Error("Error finding refugio by authId: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  async update(refugio: Refugio): Promise<void> {
    const data = refugio.toPrimitives();

    const { error } = await this.supabase
      .from(SupabaseRefugioRepository.TABLE)
      .update({
        [SupabaseRefugioRepository.COLUMNS.NAME]: data.name,
        [SupabaseRefugioRepository.COLUMNS.ADDRESS]: data.address,
        [SupabaseRefugioRepository.COLUMNS.TELEPHONE]: data.telephone,
        [SupabaseRefugioRepository.COLUMNS.DESCRIPTION]: data.description,
        [SupabaseRefugioRepository.COLUMNS.IMG_URL]: data.img_url,
        [SupabaseRefugioRepository.COLUMNS.COMUNA]: data.comuna,
        [SupabaseRefugioRepository.COLUMNS.CODIGO_POSTAL]: data.codigoPostal,
        [SupabaseRefugioRepository.COLUMNS.UPDATED_AT]: new Date()
      })
      .eq(SupabaseRefugioRepository.COLUMNS.ID, data.id);

    if (error) {
      throw new Error("Error updating refugio: " + error.message);
    }

    
  }

  private mapToDomain(data: any): Refugio {
    return Refugio.fromPrimitives({
      id: data[SupabaseRefugioRepository.COLUMNS.ID],
      authId: data[SupabaseRefugioRepository.COLUMNS.AUTH_ID],
      name: data[SupabaseRefugioRepository.COLUMNS.NAME],
      address: data[SupabaseRefugioRepository.COLUMNS.ADDRESS],
      telephone: data[SupabaseRefugioRepository.COLUMNS.TELEPHONE],
      description: data[SupabaseRefugioRepository.COLUMNS.DESCRIPTION],
      img_url: data[SupabaseRefugioRepository.COLUMNS.IMG_URL],
      comuna: data[SupabaseRefugioRepository.COLUMNS.COMUNA],
      codigoPostal: data[SupabaseRefugioRepository.COLUMNS.CODIGO_POSTAL],
    });
  }
}