import { SupabaseClient } from "@supabase/supabase-js";
import { UserProfileRepository } from "../domain/UserProfileRepository";
import { UserProfile } from "../domain/UserProfile";
import { UserProfileName } from "../domain/UserProfileName";
import { AuthId } from "../../Auth/domain/AuthId";

export class SupabaseUserProfileRepository implements UserProfileRepository {

  // ✅ tabla
  private static readonly TABLE = "usuario_profile";

  // ✅ columnas
  private static readonly COLUMNS = {
    ID: "id_usuario",
    AUTH_ID: "id_usuario", // 👈 mismo campo (FK a auth)
    NAME: "nombre",
    TELEPHONE: "telefono",
    ADDRESS: "direccion",
    IMG_URL: "imagen_url",
    DESCRIPTION: "descripcion",
    UPDATED_AT: "fecha_actualizacion",
    COMUNA: "id_comuna"
  };

  constructor(private supabase: SupabaseClient) {}

  async save(userProfile: UserProfile): Promise<void> {
    const data = userProfile.toPrimitives();

    const { error } = await this.supabase
      .from(SupabaseUserProfileRepository.TABLE)
      .upsert({
        [SupabaseUserProfileRepository.COLUMNS.ID]: data.authId, // 👈 clave
        [SupabaseUserProfileRepository.COLUMNS.NAME]: data.name,
        [SupabaseUserProfileRepository.COLUMNS.TELEPHONE]: data.telephone,
        [SupabaseUserProfileRepository.COLUMNS.ADDRESS]: data.address,
        [SupabaseUserProfileRepository.COLUMNS.COMUNA]: data.comuna,
        [SupabaseUserProfileRepository.COLUMNS.IMG_URL]: data.img_url,
        [SupabaseUserProfileRepository.COLUMNS.DESCRIPTION]: data.description,
        [SupabaseUserProfileRepository.COLUMNS.UPDATED_AT]: data.updateAt
      });

    if (error) {
      throw new Error("Error saving user profile: " + error.message);
    }
  }

  async findById(id: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from(SupabaseUserProfileRepository.TABLE)
      .select("*")
      .eq(SupabaseUserProfileRepository.COLUMNS.ID, id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error("Error finding by id: " + error.message);
    }

    return this.mapToDomain(data);
  }

  async findByName(name: UserProfileName): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from(SupabaseUserProfileRepository.TABLE)
      .select("*")
      .ilike(
        SupabaseUserProfileRepository.COLUMNS.NAME,
        name.getValue()
      )
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error("Error finding by name: " + error.message);
    }

    return this.mapToDomain(data);
  }

  async findByAuthId(authId: AuthId): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from(SupabaseUserProfileRepository.TABLE)
      .select("*")
      .eq(SupabaseUserProfileRepository.COLUMNS.AUTH_ID, authId.getValue())
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error("Error finding by auth id: " + error.message);
    }

    return this.mapToDomain(data);
  }

  async update(userProfile: UserProfile): Promise<void> {
    const data = userProfile.toPrimitives();

    const { error } = await this.supabase
      .from(SupabaseUserProfileRepository.TABLE)
      .update({
        [SupabaseUserProfileRepository.COLUMNS.NAME]: data.name,
        [SupabaseUserProfileRepository.COLUMNS.TELEPHONE]: data.telephone,
        [SupabaseUserProfileRepository.COLUMNS.ADDRESS]: data.address,
        [SupabaseUserProfileRepository.COLUMNS.COMUNA]: data.comuna,
        [SupabaseUserProfileRepository.COLUMNS.IMG_URL]: data.img_url,
        [SupabaseUserProfileRepository.COLUMNS.DESCRIPTION]: data.description,
        [SupabaseUserProfileRepository.COLUMNS.UPDATED_AT]: data.updateAt
      })
      .eq(SupabaseUserProfileRepository.COLUMNS.ID, data.authId);

    if (error) {
      throw new Error("Error updating user profile: " + error.message);
    } 
  }

  private mapToDomain(data: any): UserProfile {
    return UserProfile.fromPrimitives({
      id: data[SupabaseUserProfileRepository.COLUMNS.ID],
      authId: data[SupabaseUserProfileRepository.COLUMNS.AUTH_ID],
      name: data[SupabaseUserProfileRepository.COLUMNS.NAME],
      telephone: data[SupabaseUserProfileRepository.COLUMNS.TELEPHONE],
      address: data[SupabaseUserProfileRepository.COLUMNS.ADDRESS],
      comuna: data[SupabaseUserProfileRepository.COLUMNS.COMUNA],
      img_url: data[SupabaseUserProfileRepository.COLUMNS.IMG_URL],
      description: data[SupabaseUserProfileRepository.COLUMNS.DESCRIPTION],
      updateAt: data[SupabaseUserProfileRepository.COLUMNS.UPDATED_AT]
    });
  }
}