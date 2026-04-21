"use server";
import { auth, signOut } from '@/auth';
import { SupabaseAuthRepository } from '@/backend/context/Auth/infra/SupabaseAuthRepository';
import { DeleteUserProfileUseCase } from '@/backend/context/UserProfile/app/DeleteUserProfileUseCase';
import { SupabaseUserProfileRepository } from '@/backend/context/UserProfile/infra/SupabaseUserProfileRepository';
import { SupabaseService } from '@/backend/infra/supabase/server';



export default async function DeleteUserProfile() {

    const session = await auth();
    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado"
      };
    }
    console.log("Session en DeleteUserProfile:", session);
    const dbClient = SupabaseService.getInstance().getClient();
    const userProfileRepository = new SupabaseUserProfileRepository(dbClient);
    const authRepository = new SupabaseAuthRepository(dbClient);
    const useCase = new DeleteUserProfileUseCase(userProfileRepository, authRepository);

    try {
        await useCase.execute(session.user.id);

         await signOut({ redirect: false });
         
        return {
            error: false,
            message: "Perfil de usuario eliminado exitosamente"
        };
    } catch (error) {
        console.error("Error al eliminar el perfil de usuario:", error);
        return {
            error: true,
            message: "Error al eliminar el perfil de usuario"
        };
    }
}
