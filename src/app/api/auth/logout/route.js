import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Sesión cerrada" }, { status: 200 });

  
  response.cookies.set("jwt", "", {
    httpOnly: true,    
    sameSite: "strict",
    maxAge: 0, 
    path: "/",
  });

  return response;
}
