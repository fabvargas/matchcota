//TEST para AUth-Repository.ts
// Save usuario - findByEmail - findById
// existsByEmail - updateRole - updateVerification Status

//


import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { supabase, supabaseAdmin } from "@/backend/infra/supabase/server";
import { AuthRepository } from "@/backend/context/Auth/infra/AuthRepository";
import { Auth } from "@/backend/context/Auth/domain/Auth";
import { AuthEmail } from "@/backend/context/Auth/domain/AuthEmail";
import { AuthId } from "@/backend/context/Auth/domain/AuthId";

export async function GET() {
  try {
    const db = supabaseAdmin ?? supabase;
    const repository = new AuthRepository(db);

    const testId = randomUUID();
    const testEmail = `test_${Date.now()}@matchcota.cl`;

    //  Crear usuario
    const auth = Auth.fromPrimitives({
      id: testId,
      email: testEmail,
      password: "hash_de_prueba_123",
      role: "adoptante",
      verified: false,
      date_created: new Date(),
      date_banned: null,
    });

    await repository.save(auth);

    //  Buscar por email
    const foundByEmail = await repository.findByEmail(
      new AuthEmail(testEmail)
    );

    //  Buscar por ID
    const foundById = await repository.findById(new AuthId(testId));

    //  Verificar existencia
    const exists = await repository.existsByEmail(
      new AuthEmail(testEmail)
    );

    // Actualizar rol
    await repository.updateRole(new AuthId(testId), "refugio");

    //  Actualizar verificación
    await repository.updateVerificationStatus(
      new AuthId(testId),
      true
    );

    //  Actualizar contraseña
    await repository.updatePasswordHash(
      new AuthId(testId),
      "nuevo_hash_456"
    );

    //  Obtener estado final
    const finalState = await repository.findById(
      new AuthId(testId)
    );

    return NextResponse.json({
      success: true,
      message: "AuthRepository probado exitosamente",
      data: {
        createdUser: auth.toPrimitives(),
        foundByEmail: foundByEmail?.toPrimitives() ?? null,
        foundById: foundById?.toPrimitives() ?? null,
        exists,
        finalState: finalState?.toPrimitives() ?? null,
      },
    });
  } catch (error: any) {
    console.error("Error al probar AuthRepository:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error al probar AuthRepository",
        error: error.message,
      },
      { status: 500 }
    );
  }
}