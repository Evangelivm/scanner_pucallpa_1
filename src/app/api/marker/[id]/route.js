import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function PUT(request, { params }) {
  try {
    // Ejecutar la consulta de actualización
    const [result] = await conn.query(
      "UPDATE asistencia SET asistio = 1 WHERE alfanum = ?",
      [params.id]
    );

    // Verificar si se actualizó algún registro
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "No existe",
        },
        {
          status: 404,
        }
      );
    }

    // Devolver la respuesta si la actualización fue exitosa
    return NextResponse.json(
      {
        message: "Asistencia registrada exitosamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
