import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    return NextResponse.json({ message: "Credenciales incorrectas" }, { status: 401 });
  }

  // 🔥 Establecer la cookie correctamente en el backend
  const res = NextResponse.json({ message: "Login exitoso", user: result.user });

  res.headers.set(
    "Set-Cookie",
    `jwt=${result.jwt}; Path=/; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; Max-Age=2592000; SameSite=Strict`
  );

  return res;
}
