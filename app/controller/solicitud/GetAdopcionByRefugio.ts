import { auth } from "@/auth";
import { GetApplicationByAuthUseCase } from "@/backend/context/Application/app/GetApplicationByAuth";
import { GetApplicationByRefugioIdUseCase } from "@/backend/context/Application/app/GetApplicationByRefugioIdUseCase";
import { SupabaseApplicationRepository } from "@/backend/context/Application/infra/SupabaseApplicationRepository";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";



export async function GetAdopcionByRefugio() {
    try {
    const session = await auth();

    if (!session) {
        throw new Error("User not authenticated");
    }

    const dbClient = SupabaseService.getInstance().getAdminClient();
    const applicationRepository = new SupabaseApplicationRepository(dbClient);
    const refugioRepository = new SupabaseRefugioRepository(dbClient);
    const useCase = new GetApplicationByRefugioIdUseCase(applicationRepository, refugioRepository);
    console.log("Executing GetAdopcionByRefugio for auth ID:", session.user.id);
    const applications = await useCase.execute(session.user.id);
    console.log("Applications fetched in GetAdopcionByRefugio:", applications);
    return applications;
}
catch (error) {
    console.error("Error in GetAdopcionByRefugio:", error);
}
}