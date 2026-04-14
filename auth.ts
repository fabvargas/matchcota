import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { VerifyCredentialUseCase } from "./backend/context/Auth/app/VerifyCredentialUseCase";
import { Session } from "./backend/context/Session/domain/Session";
import { SessionUserId } from "./backend/context/Session/domain/SessionUserId";
import { SessionExpireAt } from "./backend/context/Session/domain/SessionExpireAt";
import { SaveSessionUseCase } from "./backend/context/Session/app/SaveSessionUseCase";


export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const authuseCase = new VerifyCredentialUseCase();
        const sessionUsecase = new SaveSessionUseCase();

        const authUser = await authuseCase.execute(
          credentials?.username as string,
          credentials?.password as string
        );

        if (!authUser) return null;

        const session = await sessionUsecase.execute(authUser.getId().getValue());


        return {
          id: authUser.getId().getValue(),
          email: authUser.getEmail().getValue(),
          name: authUser.getEmail().getValue(),
          role: authUser.getRole().getValue(), 
          sessionToken: session.getToken().getValue() 
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
      if(!token || !token.sessionToken){
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