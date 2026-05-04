import { auth } from "@/auth";
import { GetApplicationByAuthUseCase } from "@/backend/context/Application/app/GetApplicationByAuth";
import { GetApplicationByRefugioIdUseCase } from "@/backend/context/Application/app/GetApplicationByRefugioIdUseCase";
import { SupabaseApplicationRepository } from "@/backend/context/Application/infra/SupabaseApplicationRepository";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";




export async function GetAdopcionByAuth() {
    try{
    const session = await auth();
    
    if (!session) {
        throw new Error("User not authenticated");
    }

    console.log("Session user ID in GetAdopcionByAuth:", session.user.id);

    const dbClient = SupabaseService.getInstance().getAdminClient();
    const applicationRepository = new SupabaseApplicationRepository(dbClient);
    const useCase = new GetApplicationByAuthUseCase(applicationRepository);

    return useCase.execute(session.user.id);
}catch (error) {
    console.error("Error in GetAdopcionByAuth:", error);
}

}
