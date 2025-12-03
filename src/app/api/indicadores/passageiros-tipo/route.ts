// /api/indicadores/passageiros-tipo/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const categoria = searchParams.get("categoria") || undefined;
  const indicador = searchParams.get("indicador") || undefined;
  const brt = searchParams.get("brt") || undefined;
  const grupo = searchParams.get("grupo") || undefined;

  const data = await prisma.vw_indicadores_smb.findMany({
    where: {
      categoria,
      indicador,
      brt,
      grupo,
    },
    orderBy: [{ periodo: "asc" }, { grupo: "asc" }],
  });

  return NextResponse.json(data);
}
