import { NextResponse } from "next/server";

export async function GET(req) {
  const cookiesHeader = req.headers.get("cookie") || "";
  const token = cookiesHeader
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Strapi rechazó el token:", await response.text());
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }

  const user = await response.json();
  return NextResponse.json(user);
}
