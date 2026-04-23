import { SupabaseClient } from "@supabase/supabase-js";
import {
  AuthLoginOtpRepository,
  PendingLoginOtp,
} from "../domain/AuthLoginOtpRepository";

export class SupabaseAuthLoginOtpRepository implements AuthLoginOtpRepository {
  private static readonly TABLE = "auth_login_otp";

  private static readonly COL = {
    ID: "id_otp",
    AUTH_ID: "auth_id",
    HASH: "codigo_hash",
    EXP: "fecha_expiracion",
    CONSUMED: "fecha_consumo",
    CREATED: "fecha_creacion",
  };

  constructor(private supabase: SupabaseClient) {}

  async deletePendingForAuth(authId: string): Promise<void> {
    const { error } = await this.supabase
      .from(SupabaseAuthLoginOtpRepository.TABLE)
      .delete()
      .eq(SupabaseAuthLoginOtpRepository.COL.AUTH_ID, authId)
      .is(SupabaseAuthLoginOtpRepository.COL.CONSUMED, null);

    if (error) {
      throw new Error("Error limpiando OTP pendiente: " + error.message);
    }
  }

  async insertPending(
    authId: string,
    codeHash: string,
    fechaExpiracion: Date
  ): Promise<void> {
    const { error } = await this.supabase
      .from(SupabaseAuthLoginOtpRepository.TABLE)
      .insert({
        [SupabaseAuthLoginOtpRepository.COL.AUTH_ID]: authId,
        [SupabaseAuthLoginOtpRepository.COL.HASH]: codeHash,
        [SupabaseAuthLoginOtpRepository.COL.EXP]: fechaExpiracion.toISOString(),
        [SupabaseAuthLoginOtpRepository.COL.CONSUMED]: null,
      });

    if (error) {
      throw new Error("Error guardando OTP: " + error.message);
    }
  }

  async findLatestPending(authId: string): Promise<PendingLoginOtp | null> {
    const nowIso = new Date().toISOString();
    const { data, error } = await this.supabase
      .from(SupabaseAuthLoginOtpRepository.TABLE)
      .select("*")
      .eq(SupabaseAuthLoginOtpRepository.COL.AUTH_ID, authId)
      .is(SupabaseAuthLoginOtpRepository.COL.CONSUMED, null)
      .gt(SupabaseAuthLoginOtpRepository.COL.EXP, nowIso)
      .order(SupabaseAuthLoginOtpRepository.COL.CREATED, { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error("Error buscando OTP: " + error.message);
    }
    if (!data) return null;

    return {
      idOtp: data[SupabaseAuthLoginOtpRepository.COL.ID],
      authId: data[SupabaseAuthLoginOtpRepository.COL.AUTH_ID],
      codeHash: data[SupabaseAuthLoginOtpRepository.COL.HASH],
      fechaExpiracion: new Date(data[SupabaseAuthLoginOtpRepository.COL.EXP]),
    };
  }

  async markConsumed(idOtp: string): Promise<void> {
    const { error } = await this.supabase
      .from(SupabaseAuthLoginOtpRepository.TABLE)
      .update({
        [SupabaseAuthLoginOtpRepository.COL.CONSUMED]: new Date().toISOString(),
      })
      .eq(SupabaseAuthLoginOtpRepository.COL.ID, idOtp);

    if (error) {
      throw new Error("Error marcando OTP consumido: " + error.message);
    }
  }
}
