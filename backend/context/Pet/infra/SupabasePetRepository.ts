import { SupabaseClient } from "@supabase/supabase-js";
import { PetRepository } from "../domain/PetRepository";
import { Pet } from "../domain/Pet";
import { PetId } from "../domain/PetId";
import { PetMapper } from "./PetMapper";
import { RefugioId } from "../../Refugio/domain/RefugioId";

export class SupabasePetRepository implements PetRepository {

  constructor(private supabase: SupabaseClient) {}

  // =====================================================
  // 💾 SAVE
  // =====================================================
  async save(pet: Pet): Promise<void> {
    const { mascota, caracter } = PetMapper.toPersistence(pet);

    const { error } = await this.supabase
      .from("mascota")
      .insert(mascota);

    if (error) throw new Error(error.message);

    if (caracter) {
      const { error: caracterError } = await this.supabase
        .from("mascota_caracter")
        .insert({
          id_mascota: mascota.id_mascota,
          id_caracter: caracter.id_caracter,
        });

      if (caracterError) throw new Error(caracterError.message);
    }
  }

  async saveImages(petId: PetId, imageUrl: string): Promise<void> {
    const { error } = await this.supabase
      .from("imagen_mascota")
      .insert({
        id_mascota: petId.getValue(),
        url: imageUrl,
        orden_visualizacion: 0 // Aquí podrías implementar una lógica para asignar el orden correcto
      });
      
    if (error) throw new Error(error.message);
  }

  // =====================================================
  // 🔍 FIND BY ID
  // =====================================================
  async findById(id: PetId): Promise<Pet | null> {

    const { data, error } = await this.supabase
      .from("mascota")
      .select(`
        *,
        tipo_mascota(nombre),
        raza(nombre),
        estado_mascota(nombre),
        size(nombre),
        comuna(nombre),
        sexo(nombre),
        imagen_mascota(url, orden_visualizacion),
        mascota_caracter (
          caracter (nombre)
        )
      `)
      .eq("id_mascota", id.getValue())
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(error.message);
    }

    const result = this.mapToDomain(data);
  
    return result;
  }

  // =====================================================
  // 🔍 FIND ALL
  // =====================================================
  async findAll(): Promise<Pet[]> {
    const { data, error } = await this.supabase
      .from("mascota")
      .select(`
        *,
        tipo_mascota(nombre),
        raza(nombre),
        estado_mascota(nombre),
        comuna(nombre),
        sexo(nombre),
        size(nombre), 
        imagen_mascota(url, orden_visualizacion),
        mascota_caracter (
          caracter (nombre)
        )
      `);

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) return [];

    return data.map((m) => this.mapToDomain(m));
  }

  // =====================================================
  // 🔍 FIND BY REFUGIO
  // =====================================================
  async findByRefugioId(id_refugio: RefugioId): Promise<Pet[]> {

   

    const { data, error } = await this.supabase
      .from("mascota")
      .select(`
        *,
        tipo_mascota(nombre),
        raza(nombre),
        estado_mascota(nombre),
        comuna(nombre),
        sexo(nombre),
        size(nombre),
        imagen_mascota(url, orden_visualizacion),
        mascota_caracter (
          caracter (nombre)
        )
      `)
      .eq("id_refugio", id_refugio.getValue());

      
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) return [];
  

    return data.map((m) => this.mapToDomain(m));
  }

  // =====================================================
  // ✏️ UPDATE
  // =====================================================
  async update(pet: Pet): Promise<void> {
    const data = pet.toPrimitives();

    const { error } = await this.supabase
      .from("mascota")
      .update({
        nombre: data.name,
        edad: data.age,
        nivel_energia: data.energy_level,
        descripcion: data.description,
        descripcion_salud: data.health_description,
        fecha_actualizacion: new Date().toISOString()
      })
      .eq("id_mascota", data.id);

    if (error) throw new Error(error.message);
  }

  // =====================================================
  // ❌ DELETE
  // =====================================================
  async deleteById(id: PetId): Promise<void> {
    const { error } = await this.supabase
      .from("mascota")
      .delete()
      .eq("id_mascota", id.getValue());

    if (error) throw new Error(error.message);
  }

  // =====================================================
  // 🧠 MAPPER (FIXED PRO)
  // =====================================================
  private mapToDomain(data: any): Pet {

    // 🖼️ limpiar imágenes (CRÍTICO)
    const images = (data.imagen_mascota ?? [])
      .filter((img: any) => typeof img?.url === "string" && img.url.trim() !== "")
      .sort(
        (a: any, b: any) =>
          (a?.orden_visualizacion ?? 0) - (b?.orden_visualizacion ?? 0)
      )
      .map((img: any) => img.url);

    return Pet.fromPrimitives({
      id: data.id_mascota,
      id_refugio: data.id_refugio,

      tipo: data.tipo_mascota?.nombre,
      raza: data.raza?.nombre ,
      estado: data.estado_mascota?.nombre ,
      comuna: data.comuna?.nombre,

      createdAt: data.fecha_publicacion,

      name: data.nombre,
      age: data.edad ,
      energy_level: data.nivel_energia ,

      personality:
        data.mascota_caracter?.[0]?.caracter?.nombre ,

      genre: data.sexo?.nombre ,
      size: data.size?.nombre , 

      description: data.descripcion ,
      health_description: data.descripcion_salud ,

      images,

      updatedAt: data.fecha_actualizacion 
    });
  }
}