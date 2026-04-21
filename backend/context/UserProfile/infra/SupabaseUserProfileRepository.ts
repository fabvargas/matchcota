import { SupabaseClient } from "@supabase/supabase-js";
import { UserProfileRepository } from "../domain/UserProfileRepository";
import { UserProfile } from "../domain/UserProfile";
import { UserProfileName } from "../domain/UserProfileName";
import { AuthId } from "../../Auth/domain/AuthId";

export class SupabaseUserProfileRepository implements UserProfileRepository {

  private static readonly TABLE = "usuario_profile";

  constructor(private supabase: SupabaseClient) {}

  // 🔥 helper interno
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

  async save(userProfile: UserProfile): Promise<void> {
    const data = userProfile.toPrimitives();

    const idComuna = await this.findComunaId(
      data.comuna ?? undefined,
      data.region ?? undefined
    );

    const { error } = await this.supabase
      .from(SupabaseUserProfileRepository.TABLE)
      .upsert({
        id_usuario: data.authId,
        nombre: data.name,
        telefono: data.telephone,
        direccion: data.address,
        id_comuna: idComuna,
        imagen_url: data.img_url,
        descripcion: data.description,
        fecha_actualizacion: data.updateAt
      });

    if (error) {
      throw new Error("Error saving user profile: " + error.message);
    }
  }

  async findById(id: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from("usuario_profile")
      .select(`
        *,
        comuna:comuna (
          nombre,
          region:region (
            nombre
          )
        )
      `)
      .eq("id_usuario", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error("Error finding by id: " + error.message);
    }

    const result =  this.mapToDomain(data);
  
    return result;
  }

  async findByName(name: UserProfileName): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from("usuario_profile")
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
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error("Error finding by name: " + error.message);
    }

    return this.mapToDomain(data);
  }

  async findByAuthId(authId: AuthId): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from("usuario_profile")
      .select(`
        *,
        comuna:comuna (
          nombre,
          region:region (
            nombre
          )
        )
      `)
      .eq("id_usuario", authId.getValue())
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error("Error finding by auth id: " + error.message);
    }

    const result = this.mapToDomain(data);
  
    return result;
  }

  async update(userProfile: UserProfile): Promise<void> {
    const data = userProfile.toPrimitives();

    const idComuna = await this.findComunaId(
      data.comuna ?? undefined,
      data.region ?? undefined
    );

    const { error } = await this.supabase
      .from(SupabaseUserProfileRepository.TABLE)
      .update({
        nombre: data.name,
        telefono: data.telephone,
        direccion: data.address,
        id_comuna: idComuna,
        imagen_url: data.img_url,
        descripcion: data.description,
        fecha_actualizacion: data.updateAt
      })
      .eq("id_usuario", data.authId);

    if (error) {
      throw new Error("Error updating user profile: " + error.message);
    }
  }

  async deleteByAuthId(authId: string): Promise<void> {
    const { error } = await this.supabase
      .from(SupabaseUserProfileRepository.TABLE)
      .delete()
      .eq("id_usuario", authId);

    if (error) {
      throw new Error("Error deleting user profile: " + error.message);
    }
  }

  private mapToDomain(data: any): UserProfile {
    return UserProfile.fromPrimitives({
      id: data.id_usuario,
      authId: data.id_usuario,
      name: data.nombre,
      telephone: data.telefono,
      address: data.direccion,
      comuna: data.comuna?.nombre,
      img_url: data.imagen_url,
      description: data.descripcion,
      updateAt:new Date(data.fecha_actualizacion),
      region: data.comuna?.region?.nombre,
    });
  }
}