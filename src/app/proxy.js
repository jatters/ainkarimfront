import { NextResponse } from "next/server";

export function proxy(req) {
  const token = req.cookies.get("jwt");

  const isAuthRoute = req.nextUrl.pathname.startsWith("/mi-cuenta");

  if (!token && isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mi-cuenta/:path*"],
};
