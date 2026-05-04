import { SupabaseClient } from "@supabase/supabase-js";
import { Application } from "../domain/Application";
import { ApplicationRepository } from "../domain/ApplicationRepository";
import { ApplicationMapper } from "./ApplicationMapper";
import { RefugioId } from "../../Refugio/domain/RefugioId";
import { AuthId } from "../../Auth/domain/AuthId";

export type ApplicationWithRelations = {
  application: Application;
  nombreMascota: string;
  nombreUsuario: string;
  userEmail: string;
};

export class SupabaseApplicationRepository implements ApplicationRepository {
  constructor(
    private readonly supabaseClient: SupabaseClient
  ) {}

 async save(application: Application): Promise<void> {
  const data = ApplicationMapper.toPersistence(application);

  const { error } = await this.supabaseClient
    .from("solicitud_adopcion")
    .insert(data);

  if (error) {
    console.error("Error saving application:", error);
    throw new Error("Failed to save application"  );
  }
}



async getByRefugioId(refugioId: RefugioId): Promise<ApplicationWithRelations[] > {
  const { data, error } = await this.supabaseClient
    .from("solicitud_adopcion")
    .select(`
  *,
  mascota ( nombre ),
  auth (
    usuario_profile ( nombre ),
    email
  )
`)
    .eq("id_refugio", refugioId.getValue());

  if (error) {
    console.error("Error fetching applications by refugio ID:", error);
    throw new Error("Failed to fetch applications by refugio ID");
  }

 return data.map((item) => {
    return {
      nombreMascota: item.mascota.nombre,
      nombreUsuario: item.auth.usuario_profile.nombre,
      userEmail: item.auth.email,
      application: ApplicationMapper.toDomain(item)
    };
});

}

async getByAuthId(authId: AuthId): Promise<ApplicationWithRelations[] > {
  const { data, error } = await this.supabaseClient
    .from("solicitud_adopcion")
    .select(`
  *,
  mascota ( nombre ),
  auth (
    usuario_profile ( nombre ),
    email
  )
`)
    .eq("auth_id", authId.getValue());

  if (error) {
    console.error("Error fetching applications by auth ID:", error);
    throw new Error("Failed to fetch applications by auth ID");
  }

 return data.map((item) => {
    return {
      nombreMascota: item.mascota.nombre,
      nombreUsuario: item.auth.usuario_profile.nombre,
      userEmail: item.auth.email,
      application: ApplicationMapper.toDomain(item)
    };
});

}

async delete(id: string, applicantAuthId: AuthId): Promise<void> {
  const { data, error } = await this.supabaseClient
    .from("solicitud_adopcion")
    .delete()
    .eq("id_solicitud", id)
    .eq("auth_id", applicantAuthId.getValue())
    .select("id_solicitud");

  if (error) {
    console.error("Error deleting application:", error);
    throw new Error("Failed to delete application");
  }
  if (!data?.length) {
    throw new Error(
      "No se pudo eliminar la solicitud o no pertenece a tu cuenta"
    );
  }
}

async updateStatus(
  applicationId: string,
  status: number,
  refugioId: RefugioId
): Promise<void> {
  const { data, error } = await this.supabaseClient
    .from("solicitud_adopcion")
    .update({ id_estado_adopcion: status })
    .eq("id_solicitud", applicationId)
    .eq("id_refugio", refugioId.getValue())
    .select("id_solicitud");

  if (error) {
    console.error("Error updating application status:", error);
    throw new Error("Failed to update application status");
  }
  if (!data?.length) {
    throw new Error(
      "No se pudo actualizar la solicitud o no pertenece a tu refugio"
    );
  }
}
}