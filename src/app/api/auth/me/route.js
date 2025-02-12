import { NextResponse } from "next/server";

export async function GET(req) {
  const cookiesHeader = req.headers.get("cookie") || "";
  console.log("📢 Cookies recibidas:", cookiesHeader); // 🛠️ Debugging

  const token = cookiesHeader
    .split("; ")
    .find((row) => row.startsWith("jwt="))
    ?.split("=")[1];

  console.log("🔑 Token extraído:", token); // 🛠️ Debugging

  if (!token) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  // 🔥 Verificar si Strapi acepta el token
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 Enviar token JWT
    },
  });

  if (!response.ok) {
    console.error("📢 Strapi rechazó el token:", await response.text()); // 🛠️ Debugging
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }

  const user = await response.json();
  return NextResponse.json(user);
}
