import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  try {
    const token = cookies().get("jwt")?.value;

    if (!token) {
      return NextResponse.json({ message: "No autenticado" }, { status: 401 });
    }

    const decoded = jwt.decode(token);
    const userId = decoded?.id;

    if (!userId) {
      return NextResponse.json({ message: "Token inválido" }, { status: 401 });
    }

    const requestData = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: "Error en Strapi", error: errorData },
        { status: response.status }
      );
    }

    const updatedUser = await response.json();
    return NextResponse.json(
      { message: "Perfil actualizado", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error en la API:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
