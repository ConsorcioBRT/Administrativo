import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const eixo = searchParams.get("eixo") ?? "";
  const indicador = searchParams.get("indicador") ?? "";
  const grupo = searchParams.get("grupo") ?? "";

  const data = await prisma.vw_indicadores_smb.findMany({
    where: {
      categoria: "Demanda",
      brt: eixo || undefined,
      indicador: indicador,
      grupo: grupo
    },
    orderBy: {
      periodo: "asc",
    },
  });
  return NextResponse.json(data);
}
