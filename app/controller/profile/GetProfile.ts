import { auth } from "@/auth";
import {ResponseType, UserProfileType, RefugioType} from "../Shared/type";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseRefugioRepository } from "@/backend/context/Refugio/infra/SupabaseRefugioRepository";
import { SupabaseUserProfileRepository } from "@/backend/context/UserProfile/infra/SupabaseUserProfileRepository";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { GetUserUseCase } from "@/backend/context/Auth/app/GetUsuerUseCase";
import { GetUserByAuthId } from "@/backend/context/UserProfile/app/GetUserByAuthId";
import { GetRefugioByAuthId } from "@/backend/context/Refugio/app/GetRefuigioByAuthId";



export default async function GetProfile(
    prevState: ResponseType<void>,
    formData: FormData
):Promise<ResponseType<UserProfileType | RefugioType>> {

    const session =  await auth();

    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado"
      };
    }

    const dbClient = SupabaseService.getInstance().getClient();
    const authRepository = new SupabaseAuthRepository(dbClient);
    const userProfileRepository = new SupabaseUserProfileRepository(dbClient);
    const refugioRepository = new SupabaseRefugioRepository(dbClient);
    const authUseCase = new GetUserUseCase(authRepository);
    const userUseCase = new GetUserByAuthId(userProfileRepository);
    const refugioUseCase = new GetRefugioByAuthId(refugioRepository);

    const authData = await authUseCase.execute(session.user.id);

    if (authData.isAdoptante()) {
        const userProfile = await userUseCase.execute(session.user.id);

        if (!userProfile) {
            return {
                error: true,
                message: "Perfil de usuario no encontrado"
            };
        }

        return {
            error: false,
            message: "Perfil de usuario encontrado",
                data: {...userProfile,
                address: userProfile.address ?? undefined,
                telephone: userProfile.telephone ?? undefined,
                description: userProfile.description ?? undefined,
                img_url: userProfile.img_url ?? undefined,
                comuna: userProfile.comuna ?? undefined}
            }
        
    } else if (authData.isRefugio()) {
        const refugioProfile = await refugioUseCase.execute(session.user.id);

        if (!refugioProfile) {
            return {
                error: true,
                message: "Perfil de refugio no encontrado"
            };
        }

        return {
            error: false,
            message: "Perfil de refugio encontrado",
            data: {...refugioProfile,
                address: refugioProfile.address ?? undefined,
                telephone: refugioProfile.telephone ?? undefined,
                description: refugioProfile.description ?? undefined,
                img_url: refugioProfile.img_url ?? undefined,
                comuna: refugioProfile.comuna ?? undefined}

        }
    } else {
        return {
            error: true,
            message: "Tipo de usuario no reconocido"
        };
    }
}
