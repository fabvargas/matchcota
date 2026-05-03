export type PendingLoginOtp = {
  idOtp: string;
  authId: string;
  codeHash: string;
  fechaExpiracion: Date;
};

export interface AuthLoginOtpRepository {
  deletePendingForAuth(authId: string): Promise<void>;
  insertPending(
    authId: string,
    codeHash: string,
    fechaExpiracion: Date
  ): Promise<void>;
  findLatestPending(authId: string): Promise<PendingLoginOtp | null>;
  markConsumed(idOtp: string): Promise<void>;
}
