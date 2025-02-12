import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("⏩ Middleware interceptando:", req.nextUrl.pathname);
  const token = req.cookies.get("token");

  const isAuthRoute = req.nextUrl.pathname.startsWith("/mi-cuenta");

  if (!token && isAuthRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mi-cuenta/:path*"], 
};
