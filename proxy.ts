import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";


export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
    const session = await auth();

  const isLoggedIn = !!session;

  const publicRoutes = ["/login", "/registro"];
  const protectedRoutes = ["/perfil"];

  const isPublic = publicRoutes.includes(pathname);
  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && (isPublic || pathname === "/")) {
    return NextResponse.redirect(new URL("/perfil", req.url));
  }

  return NextResponse.next();
}

export const config = {
      matcher: ["/login", "/registro", "/perfil/:path*"],
};