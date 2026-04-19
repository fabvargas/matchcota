import { auth } from "@/auth";
import { DeleteAccountUseCase } from "@/backend/context/Auth/app/DeleteAuthUseCase";
import { SupabaseAuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { ResponseType } from "../Shared/type";


export default async function DeleteAccount():Promise<ResponseType<void>> {

    const session =  await auth();

    if (!session?.user?.id) {
      return {
        error: true,
        message: "No autenticado"
      };
    }
    const dbClient = SupabaseService.getInstance().getClient();
    const authRepository = new SupabaseAuthRepository(dbClient);
    const useCase = new DeleteAccountUseCase(authRepository);

    await useCase.execute(session.user.id);

  return {
    error: false,
    message: "Cuenta eliminada correctamente"
  }
}
