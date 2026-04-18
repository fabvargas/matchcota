import { SupabaseClient } from "@supabase/supabase-js";
import { UserProfileRepository } from "../domain/UserProfileRepository";
import { UserProfile } from "../domain/UserProfile";

export class SupabaseUserProfileRepository implements UserProfileRepository {
  constructor(private supabase: SupabaseClient) {}

  async save(userProfile: UserProfile): Promise<void> {
    const data = userProfile.toPrimitives();

    const { error } = await this.supabase
      .from("usuario_profile")
      .upsert({
        id_usuario: data.id,
        nombre: data.name,
        telefono: data.telephone,
        direccion: data.address,
        imagen_url: data.img_url,
        descripcion: data.description,
        id_comuna: data.comunaId
      });

    if (error) {
      if (error.code === "23505") {
        throw new Error("User profile already exists");
      }
      throw new Error("Error saving user profile: " + error.message);
    }
  }

  async findById(id: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from("usuario_profile")
      .select("*")
      .eq("id_usuario", id)
      .maybeSingle();

    if (error) {
      throw new Error("Error finding by id: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  async findByName(nombre: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from("usuario_profile")
      .select("*")
      .ilike("nombre", nombre);

    if (error) {
      throw new Error("Error finding by name: " + error.message);
    }

    if (!data || data.length === 0) return null;

    return this.mapToDomain(data[0]); // o devuelve lista si prefieres
  }

  // ⚠️ ESTE MÉTODO CAMBIA COMPLETAMENTE
  async findByEmail(email: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from("usuario_profile")
      .select(`
        *,
        auth:auth_id ( email )
      `)
      .eq("auth.email", email)
      .maybeSingle();

    if (error) {
      throw new Error("Error finding by email: " + error.message);
    }

    if (!data) return null;

    return this.mapToDomain(data);
  }

  private mapToDomain(data: any): UserProfile {
    return UserProfile.fromPrimitives({
      id: data.id_usuario,
      name: data.nombre,
      telephone: data.telefono,
      address: data.direccion,
      img_url: data.imagen_url,
      description: data.descripcion,
      comunaId: data.id_comuna,
      authId: data.auth_id,
      updatedAt: data.updated_at
    });
  }
}