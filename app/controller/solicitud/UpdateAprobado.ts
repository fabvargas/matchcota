"use server";

import { auth } from "@/auth";
import { UpdateAprobadoUseCase } from "@/backend/context/Application/app/UpdateAprobado";
import { SupabaseApplicationRepository } from "@/backend/context/Application/infra/SupabaseApplicationRepository";
import { AuthId } from "@/backend/context/Auth/domain/AuthId";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { redirect } from "next/navigation";

export async function UpdateAprobado(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }
  if (session.user.role !== "refugio") {
    throw new Error("Solo los refugios pueden aprobar solicitudes");
  }

  const dbClient = SupabaseService.getInstance().getAdminClient();
  const refugioRepository = new SupabaseRefugioRepository(dbClient);
  const refugio = await refugioRepository.findByAuthId(
    new AuthId(session.user.id)
  );
  if (!refugio) {
    throw new Error("Refugio no encontrado");
  }

  const applicationRepository = new SupabaseApplicationRepository(dbClient);
  const useCase = new UpdateAprobadoUseCase(applicationRepository);

  await useCase.execute(id, refugio.getId());

  redirect("/perfil/gestionarmascota?tab=solicitudes");
}
