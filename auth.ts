import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { VerifyCredentialUseCase } from "./backend/context/Auth/app/VerifyCredentialUseCase";
import { VerifyLoginOtpUseCase } from "./backend/context/Auth/app/VerifyLoginOtpUseCase";
import { SaveSessionUseCase } from "./backend/context/Session/app/SaveSessionUseCase";
import { SupabaseService } from "./backend/infra/supabase/server";
import { SupabaseAuthRepository } from "./backend/context/Auth/infra/SupabaseAuthRepository";
import { SupabaseAuthLoginOtpRepository } from "./backend/context/Auth/infra/SupabaseAuthLoginOtpRepository";
import { verifyLoginOtpTicket } from "./backend/context/Auth/domain/utils/loginOtpTicket";
import { AuthId } from "./backend/context/Auth/domain/AuthId";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        loginTicket: { label: "Login ticket", type: "text" },
        otp: { label: "OTP", type: "text" },
      },

      async authorize(credentials) {
        const secret = process.env.BETTER_AUTH_SECRET;
        if (!secret) return null;

        const clientDb = SupabaseService.getInstance().getAdminClient();
        const authRepository = new SupabaseAuthRepository(clientDb);
        const sessionUsecase = new SaveSessionUseCase();

        const loginTicket = credentials?.loginTicket as string | undefined;
        const otp = credentials?.otp as string | undefined;

        if (loginTicket && otp) {
          const ticket = verifyLoginOtpTicket(loginTicket, secret);
          if (!ticket) return null;

          const email = (credentials?.username as string)?.trim().toLowerCase();
          if (!email || email !== ticket.email.trim().toLowerCase()) {
            return null;
          }

          const otpRepository = new SupabaseAuthLoginOtpRepository(clientDb);
          const verifyOtp = new VerifyLoginOtpUseCase(otpRepository);
          try {
            await verifyOtp.execute(ticket.authId, otp);
          } catch {
            return null;
          }

          const authUser = await authRepository.findById(
            new AuthId(ticket.authId)
          );
          if (!authUser) return null;

          const session = await sessionUsecase.execute(
            authUser.getId().getValue()
          );

          return {
            id: authUser.getId().getValue(),
            email: authUser.getEmail().getValue(),
            name: authUser.getEmail().getValue(),
            role: authUser.getRole().getValue(),
            sessionToken: session.getToken().getValue(),
          };
        }

        const authuseCase = new VerifyCredentialUseCase(authRepository);

        const authUser = await authuseCase.execute(
          credentials?.username as string,
          credentials?.password as string
        );

        if (!authUser) return null;

        if (authUser.isTwoFactorEnabled()) {
          return null;
        }

        const session = await sessionUsecase.execute(
          authUser.getId().getValue()
        );

        return {
          id: authUser.getId().getValue(),
          email: authUser.getEmail().getValue(),
          name: authUser.getEmail().getValue(),
          role: authUser.getRole().getValue(),
          sessionToken: session.getToken().getValue(),
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.sessionToken = user.sessionToken;
      }

      return token;
    },

    async session({ session, token }) {
      if (!token || !token.sessionToken) {
        return session;
      }

      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.sessionToken = token.sessionToken as string;
      }

      return session;
    },
  },
});
