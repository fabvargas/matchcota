import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { VerifyCredentialUseCase } from "./backend/context/Auth/app/VerifyCredentialUseCase"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.BETTER_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
            const useCase = new VerifyCredentialUseCase()
          const authUser = await useCase.execute(
            credentials?.username as string,
            credentials?.password as string
          );

          if (!authUser) return null;

          return {
            id: authUser.getId().getValue(),
            email: authUser.getEmail().getValue(),
            name: authUser.getEmail().getValue(), // opcional
          };

      },
    }),
  ],
})