import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const requestData = await req.json();
    const { user, updatedFields } = requestData;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${user}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
        body: JSON.stringify(updatedFields),
      }
    );
    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    return NextResponse.json(
      { message: "Usuario actualizado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario" },
      { status: 500 }
    );
  }
}
