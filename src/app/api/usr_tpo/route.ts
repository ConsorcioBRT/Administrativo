import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Rota da api: http://localhost:3000/src/app/api/user_tpo
// Vai listar todos os tipos de usuários
export async function GET() {
  try {
    const users = await prisma.usr_tpo.findMany({
      select: {
        usr_tpo_id: true,
        usr_tpo_nme: true,
        stt_id: true,
        usr_id_alt: true,
        dta_alt: true,
        mtv_del: true,
      },
      orderBy: {
        usr_tpo_id: "asc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar o tipo de usuário." },
      { status: 500 },
    );
  }
}
