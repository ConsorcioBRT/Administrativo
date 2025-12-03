import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Rota da api: http://localhost:3000/src/app/api/emp
// Vai listar todas as empresas
export async function GET() {
  try {
    const users = await prisma.emp.findMany({
      select: {
        emp_id: true,
        emp_nme: true,
        emp_raz: true,
        emp_rdz: true,
        emp_atv: true,
        emp_cnpj: true,
        end_uf: true,
        end_cdd: true,
      },
      orderBy: {
        emp_id: "asc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Erro ao buscar as empresas.",
      },
      { status: 500 },
    );
  }
}
