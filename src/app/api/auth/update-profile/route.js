import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"; // 📌 Instala con `npm install jsonwebtoken`

export async function PUT(req) {
  try {
    // 🔹 Obtener la cookie JWT
    const token = cookies().get("jwt")?.value;
    console.log("📢 Token recibido:", token);

    if (!token) {
      return NextResponse.json({ message: "No autenticado" }, { status: 401 });
    }

    // 🔹 Decodificar el token para obtener el ID del usuario
    const decoded = jwt.decode(token);
    const userId = decoded?.id; // 📌 Extrae el ID del usuario

    if (!userId) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    // 🔹 Obtener los datos enviados en la petición
    const requestData = await req.json();

    console.log("📢 Datos recibidos para actualizar:", requestData);

    // 🔹 Hacer la petición a Strapi
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Error en Strapi:", errorData);
      return NextResponse.json({ message: "Error en Strapi", error: errorData }, { status: response.status });
    }

    const updatedUser = await response.json();
    return NextResponse.json({ message: "Perfil actualizado", user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
