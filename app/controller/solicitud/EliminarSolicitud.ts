"use server"
import { DeleteApplicationUseCase } from "@/backend/context/Application/app/DeleteApplication";
import { SupabaseApplicationRepository } from "@/backend/context/Application/infra/SupabaseApplicationRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";



export default async function EliminarSolicitud(id: string) {

    const dbClient = SupabaseService.getInstance().getClient();
    const applicationRepository = new SupabaseApplicationRepository(dbClient);
    const deleteApplicationUseCase = new DeleteApplicationUseCase(applicationRepository);
    return await deleteApplicationUseCase.execute(id);
}
