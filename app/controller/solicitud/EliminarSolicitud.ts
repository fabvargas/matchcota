"use server";

import { auth } from "@/auth";
import { DeleteApplicationUseCase } from "@/backend/context/Application/app/DeleteApplication";
import { SupabaseApplicationRepository } from "@/backend/context/Application/infra/SupabaseApplicationRepository";
import { AuthId } from "@/backend/context/Auth/domain/AuthId";
import { SupabaseService } from "@/backend/infra/supabase/server";

export default async function EliminarSolicitud(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Debes iniciar sesión para eliminar una solicitud");
  }

  const dbClient = SupabaseService.getInstance().getAdminClient();
  const applicationRepository = new SupabaseApplicationRepository(dbClient);
  const deleteApplicationUseCase = new DeleteApplicationUseCase(
    applicationRepository
  );
  return await deleteApplicationUseCase.execute(
    id,
    new AuthId(session.user.id)
  );
}
