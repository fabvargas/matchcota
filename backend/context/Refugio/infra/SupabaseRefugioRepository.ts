import { SupabaseClient } from "@supabase/supabase-js";
import { RefugioRepository } from "../domain/RefugioRepository";
import { Refugio } from "../domain/Refugio";
import { RefugioId } from "../domain/RefugioId";
import { RefugioName } from "../domain/RefugioName";
import { AuthId } from "../../Auth/domain/AuthId";

export class SupabaseRefugioRepository implements RefugioRepository {

  private static readonly TABLE = "refugio_profile";

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

  // 🔥 helper interno (igual que user profile)
  private async findComunaId(
    comunaNombre?: string,
    regionNombre?: string
  ): Promise<number | undefined> {

    if (!comunaNombre) return undefined;

    let query = this.supabase
      .from("comuna")
      .select(`
        id_comuna,
        region:region (
          nombre
        )
      `)
      .eq("nombre", comunaNombre);

    if (regionNombre) {
      query = query.eq("region.nombre", regionNombre);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === "PGRST116") return undefined;
      throw new Error("Error finding comuna: " + error.message);
    }

    return data.id_comuna;
  }

  async save(refugio: Refugio): Promise<void> {
    const data = refugio.toPrimitives();

    const idComuna = await this.findComunaId(
      data.comuna ?? undefined,
      data.region ?? undefined
    );

    const { error } = await this.supabase
      .from(SupabaseRefugioRepository.TABLE)
      .upsert({
        id_refugio: data.id,
        auth_id: data.authId,
        nombre: data.name,
        direccion: data.address,
        telefono: data.telephone,
        descripcion: data.description,
        imagen_url: data.img_url,
        id_comuna: idComuna,
        codigo_postal: data.codigoPostal,
        fecha_actualizacion: new Date()
      });

    if (error) {
      throw new Error("Error saving refugio: " + error.message);
    }
  }

  async findById(id: RefugioId): Promise<Refugio | null> {
    const { data, error } = await this.supabase
      .from("refugio_profile")
      .select(`
        *,
        comuna:comuna (
          nombre,
          region:region (
            nombre
          )
        )
      `)
      .eq("id_refugio", id.getValue())
      .maybeSingle();

    if (error) {
      throw new Error("Error finding refugio by id: " + error.message);
    }

    if (!data) return null;

    const result =  this.mapToDomain(data);
    console.log("Refugio encontrado en SupabaseRefugioRepository.findById:", result);
    return result;
  }

  async findByName(name: RefugioName): Promise<Refugio | null> {
    const { data, error } = await this.supabase
      .from("refugio_profile")
      .select(`
        *,
        comuna:comuna (
          nombre,
          region:region (
            nombre
          )
        )
      `)
      .ilike("nombre", name.getValue())
      .maybeSingle();

    if (error) {
      throw new Error("Error finding refugio by name: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findByAuthId(authId: AuthId): Promise<Refugio | null> {
    const { data, error } = await this.supabase
      .from("refugio_profile")
      .select(`
        *,
        comuna:comuna (
          nombre,
          region:region (
            nombre
          )
        )
      `)
      .eq("auth_id", authId.getValue())
      .maybeSingle();

    if (error) {
      throw new Error("Error finding refugio by authId: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  async update(refugio: Refugio): Promise<void> {
    const data = refugio.toPrimitives();

    const idComuna = await this.findComunaId(
      data.comuna ?? undefined,
      data.region ?? undefined
    );

    const { error } = await this.supabase
      .from(SupabaseRefugioRepository.TABLE)
      .update({
        nombre: data.name,
        direccion: data.address,
        telefono: data.telephone,
        descripcion: data.description,
        imagen_url: data.img_url,
        id_comuna: idComuna,
        codigo_postal: data.codigoPostal,
        fecha_actualizacion: new Date()
      })
      .eq("id_refugio", data.id);

    if (error) {
      throw new Error("Error updating refugio: " + error.message);
    }
  }

  private mapToDomain(data: any): Refugio {
    return Refugio.fromPrimitives({
      id: data.id_refugio,
      authId: data.auth_id,
      name: data.nombre,
      address: data.direccion,
      telephone: data.telefono,
      description: data.descripcion,
      img_url: data.imagen_url,
      comuna: data.comuna?.nombre,
      region: data.comuna?.region?.nombre,
      codigoPostal: data.codigo_postal,
    });
  }
}