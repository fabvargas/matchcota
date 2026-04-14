import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      name: string;
      sessionToken: string;
    };
  }

  interface User {
    id: string;
    role: string;
    email: string;
    name: string;
    sessionToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    email: string;
    name: string;
    sessionToken: string;
  }
}