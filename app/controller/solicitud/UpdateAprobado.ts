"use server";

import { UpdateAprobadoUseCase } from "@/backend/context/Application/app/UpdateAprobado";
import { SupabaseApplicationRepository } from "@/backend/context/Application/infra/SupabaseApplicationRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { redirect } from "next/navigation";

export async function UpdateAprobado(id: string) {

    const dbClient =  SupabaseService.getInstance().getClient();
    const applicationRepository = new SupabaseApplicationRepository(dbClient);
    const useCase = new UpdateAprobadoUseCase(applicationRepository);

     await useCase.execute(id);
    
     redirect("/perfil/gestionarmascota?tab=solicitudes");
}