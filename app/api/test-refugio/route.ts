import { NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/backend/infra/supabase/server";
import { AuthRepository } from "@/backend/context/Auth/infra/SupabaseAuthRepository";
import { RefugioRepository } from "@/backend/context/Refugio/infra/RefugioRepository";
import { Auth } from "@/backend/context/Auth/domain/Auth";
import { AuthEmail } from "@/backend/context/Auth/domain/AuthEmail";
import { AuthPasswordHashed } from "@/backend/context/Auth/domain/AuthPasswordHashed";
import { Refugio } from "@/backend/context/Refugio/domain/Refugio";
import { RefugioName } from "@/backend/context/Refugio/domain/RefugioName";
import { RefugioAddress } from "@/backend/context/Refugio/domain/RefugioAddress";
import { RefugioTelephone } from "@/backend/context/Refugio/domain/RefugioTelephone";
import { RefugioDescription } from "@/backend/context/Refugio/domain/RefugioDescription";
import { RefugioComuna } from "@/backend/context/Refugio/domain/RefugioComuna";
import { RefugioCodigoPostal } from "@/backend/context/Refugio/domain/RefugioCodigoPostal";
import { RefugioId } from "@/backend/context/Refugio/domain/RefugioId";

export async function GET() {
  try {
    const db = supabaseAdmin ?? supabase;
    const authRepository = new AuthRepository(db);
    const refugioRepository = new RefugioRepository(db);

    const testEmail = `refugio_test_${Date.now()}@matchcota.cl`;

    const auth = Auth.createRefugio(
      new AuthEmail(testEmail),
      AuthPasswordHashed.create("hash_prueba_refugio_123")
    );
    await authRepository.save(auth);

    const refugio = Refugio.create(
      auth.getId(),
      new RefugioName(`Refugio test ${Date.now()}`),
      new RefugioAddress("Av. Siempre Viva 742"),
      new RefugioTelephone("+56912345678"),
      new RefugioDescription(
        "Descripción de prueba del refugio para el endpoint de test del repositorio."
      ),
      new RefugioComuna("Santiago"),
      new RefugioCodigoPostal("8320000")
    );

    await refugioRepository.save(refugio);

    const refugioId = new RefugioId(refugio.toPrimitives().id);

    const foundById = await refugioRepository.findById(refugioId);
    const foundByAuthId = await refugioRepository.findByAuthId(auth.getId());
    const existsByAuthId = await refugioRepository.existsByAuthId(auth.getId());

    const beforeUpdate = foundById ?? foundByAuthId;
    if (!beforeUpdate) {
      throw new Error("No se pudo leer el refugio recién creado.");
    }

    const primitives = beforeUpdate.toPrimitives();
    const updated = Refugio.fromPrimitives({
      ...primitives,
      name: `${primitives.name.slice(0, 80)} (actualizado)`,
      description:
        "Perfil actualizado desde test-refugio: descripción modificada para probar RefugioRepository.update.",
    });

    await refugioRepository.update(updated);

    const finalState = await refugioRepository.findById(refugioId);

    return NextResponse.json({
      success: true,
      message: "RefugioRepository probado exitosamente",
      data: {
        authUser: auth.toPrimitives(),
        createdRefugio: refugio.toPrimitives(),
        foundById: foundById?.toPrimitives() ?? null,
        foundByAuthId: foundByAuthId?.toPrimitives() ?? null,
        existsByAuthId,
        finalState: finalState?.toPrimitives() ?? null,
      },
    });
  } catch (error: unknown) {
    console.error("Error al probar RefugioRepository:", error);

    const message =
      error instanceof Error ? error.message : "Error desconocido";

    return NextResponse.json(
      {
        success: false,
        message: "Error al probar RefugioRepository",
        error: message,
      },
      { status: 500 }
    );
  }
}