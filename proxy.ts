import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login","/registro"];
const protectedRoutes = ["/perfil"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionToken = req.cookies.get("authjs.session-token")?.value;
  const isLoggedIn = !!sessionToken;

  const isPublic = publicRoutes.includes(pathname);
  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // 🔒 NO logueado → bloquear privadas
  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 Logueado → bloquear públicas y home
  if (isLoggedIn && (isPublic || pathname === "/")) {
    return NextResponse.redirect(new URL("/perfil", req.url));
  }

  return NextResponse.next();
}

export const config = {
      matcher: ["/login", "/registro", "/perfil/:path*"],
};