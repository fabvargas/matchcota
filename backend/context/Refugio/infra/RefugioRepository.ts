import { SupabaseClient } from "@supabase/supabase-js";
import { RefugioRepository } from "../domain/RefugioRepository";
import { Refugio } from "../domain/Refugio";
import { RefugioId } from "../domain/RefugioId";
import { RefugioName } from "../domain/RefugioName";

export class SupabaseRefugioRepository implements RefugioRepository {

  constructor(private supabase: SupabaseClient) {}

  async save(refugio: Refugio): Promise<void> {
    const data = refugio.toPrimitives();

    const { error } = await this.supabase
      .from("refugio_profile")
      .upsert({
        id_refugio: data.id,
        nombre: data.name,
        direccion: data.address,
        telefono: data.telephone,
        descripcion: data.description,
        imagen_url: data.img_url,
        id_comuna: data.comunaId,
        auth_id: data.authId,
        codigo_postal: data.codigoPostal
      });

    if (error) {
      if (error.code === "23505") {
        throw new Error("Refugio already exists");
      }
      throw new Error("Error saving refugio: " + error.message);
    }
  }

  async findById(id: RefugioId): Promise<Refugio | null> {
    const { data, error } = await this.supabase
      .from("refugio_profile")
      .select("*")
      .eq("id_refugio", id.getValue())
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error("Error finding refugio by id: " + error.message);
    }

    return this.mapToDomain(data);
  }

  async findByName(name: RefugioName): Promise<Refugio | null> {
    const { data, error } = await this.supabase
      .from("refugio_profile")
      .select("*")
      .ilike("nombre", name.getValue()) // mejor que eq para búsquedas
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error("Error finding refugio by name: " + error.message);
    }

    return this.mapToDomain(data);
  }

  private mapToDomain(data: any): Refugio {
    return Refugio.fromPrimitives({
      id: data.id_refugio,
      name: data.nombre,
      address: data.direccion,
      telephone: data.telefono,
      description: data.descripcion,
      img_url: data.imagen_url,
      comunaId: data.id_comuna,
      authId: data.auth_id,
      updatedAt: data.updated_at,
      codigoPostal: data.codigo_postal
    });
  }
   
}