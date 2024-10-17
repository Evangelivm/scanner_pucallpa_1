import { NextResponse } from "next/server";
import { conn } from "@/app/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await conn.query(
      "SELECT nombres, apellidos, dni, tipo, alfanum FROM asistencia WHERE dni = ?",
      [params.id]
    );
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "No existe",
        },

        {
          status: 404,
        }
      );
    }

    const res = NextResponse.json(result[0]);
    return res;
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
