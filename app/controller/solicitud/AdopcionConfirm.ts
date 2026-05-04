"use server";

import { redirect } from "next/navigation";
import { parseSchema } from "@/app/controller/Shared/parseSchema";
import { z } from "zod";
import { ResponseType } from "@/app/controller/Shared/type";
import { auth } from "@/auth";
import { SupabaseService } from "@/backend/infra/supabase/server";
import { SupabaseApplicationRepository } from "@/backend/context/Application/infra/SupabaseApplicationRepository";
import { SaveApplicationUseCase } from "@/backend/context/Application/app/SaveApplicationUseCase";



// 🔥 Schema
const AdopcionSchema = z.object({
  mascotaId: z.string().min(1),
  refugioId: z.string().min(1),
  mensaje: z.string().min(1),
});


export async function AdopcionConfirm(
  prevState: ResponseType<void>,
  formData: FormData
): Promise<ResponseType<void>> {
  let mascotaId = "";

  try {
    const data = {
      mascotaId: formData.get("mascotaId") as string,
      refugioId: formData.get("refugioId") as string,
      mensaje: formData.get("mensaje") as string,
    };

    const parsedData = await parseSchema(AdopcionSchema, data);
    mascotaId = parsedData.mascotaId;

    const session = await auth();
    if (!session) {
      return {
        error: true,
        message: "Usuario no autenticado",
      };
    }

    const dbClient = SupabaseService.getInstance().getAdminClient();

    const adopcionRepository = new SupabaseApplicationRepository(dbClient);
    const useCase = new SaveApplicationUseCase(adopcionRepository);

    await useCase.execute(
      parsedData.mascotaId,
      session.user.id,
      parsedData.refugioId,
      parsedData.mensaje
    );
  } catch (error) {
    console.error("Error en AdopcionConfirm:", error);

    return {
      error: true,
      message: "Error al enviar la solicitud de adopción",
    };
  }

  redirect(`/mascota/${mascotaId}`);
}