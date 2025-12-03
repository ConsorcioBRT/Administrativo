import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Rota da api: http://localhost:3000/src/app/api/stt
// Vai listar todos os tipos de situações
export async function GET() {
  try {
    const stt = await prisma.stt.findMany({
      select: {
        stt_id: true,
        stt_nme: true,
        stt_id_atu: true,
        usr_id_alt: true,
        dta_alt: true,
        mtv_del: true,
      },
      orderBy: {
        stt_id: "asc",
      },
    });
    return NextResponse.json(stt);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar a situação do usuário." },
      { status: 500 },
    );
  }
}
