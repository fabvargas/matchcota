"use server";
import { auth } from "@/auth";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { SupabaseUserProfileRepository } from "@/backend/context/UserProfile/infra/SupabaseUserProfileRepository";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";
import { GetUserUseCase } from "@/backend/context/Auth/app/GetUsuerUseCase";
import { GetUserByAuthId } from "@/backend/context/UserProfile/app/GetUserByAuthId";
import { GetRefugioByAuthId } from "@/backend/context/Refugio/app/GetRefuigioByAuthId";

export default async function GetProfile(){
  try {
    const session = await auth();


    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado"
      };
    }

    const dbClient = SupabaseService.getInstance().getAdminClient();

    const authRepository = new SupabaseAuthRepository(dbClient);
    const userProfileRepository = new SupabaseUserProfileRepository(dbClient);
    const refugioRepository = new SupabaseRefugioRepository(dbClient);

    const authUseCase = new GetUserUseCase(authRepository);
    const userUseCase = new GetUserByAuthId(userProfileRepository);
    const refugioUseCase = new GetRefugioByAuthId(refugioRepository);

    const authFind = await authUseCase.execute(session.user.id);

    const authData = {
        id: authFind.getId().getValue(),
        email: authFind.getEmail().getValue(),
        role: authFind.getRole().getValue(),
        twoFactorEnabled: authFind.isTwoFactorEnabled(),
    }

    if (authFind.isAdoptante()) {
      const userProfile = await userUseCase.execute(session.user.id);

      if (!userProfile) {
        return { error: true, message: "Perfil de usuario no encontrado" };
      }

      return {
        error: false,
        message: "Perfil de usuario encontrado",
        data: {
          ...userProfile,
          ...authData,
            region:  userProfile.region ?? undefined,
          address: userProfile.address ?? undefined,
          telephone: userProfile.telephone ?? undefined,
          description: userProfile.description ?? undefined,
          img_url: userProfile.img_url ?? undefined,
          comuna: userProfile.comuna ?? undefined
        }
      };
    }

    if (authFind.isRefugio()) {
      const refugioProfile = await refugioUseCase.execute(session.user.id);

      if (!refugioProfile) {
        return { error: true, message: "Perfil de refugio no encontrado" };
      }

      return {
        error: false,
        message: "Perfil de refugio encontrado",
        data: {
          ...refugioProfile,
          ...authData,
          region: refugioProfile.region ?? undefined,
          address: refugioProfile.address ?? undefined,
          telephone: refugioProfile.telephone ?? undefined,
          description: refugioProfile.description ?? undefined,
          img_url: refugioProfile.img_url ?? undefined,
          comuna: refugioProfile.comuna ?? undefined
        }
      };
    }

    return {
      error: true,
      message: "Tipo de usuario no reconocido"
    };

  } catch (error) {
    console.error("🔥 GetProfile crash:", error);

    return {
      error: true,
      message: "Error interno al obtener el perfil"
    };
  }
}