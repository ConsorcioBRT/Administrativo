// /api/indicadores/passageiros-tipo/filtros/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  // pegar valores únicos do banco
  const categorias = await prisma.vw_indicadores_smb.findMany({
    distinct: ["categoria"],
    select: { categoria: true },
  });

  const indicadores = await prisma.vw_indicadores_smb.findMany({
    distinct: ["indicador"],
    select: { indicador: true },
  });

  const brts = await prisma.vw_indicadores_smb.findMany({
    distinct: ["brt"],
    select: { brt: true },
  });

  const grupos = await prisma.vw_indicadores_smb.findMany({
    distinct: ["grupo"],
    select: { grupo: true },
  });

  return NextResponse.json({
    categorias: categorias.map((i) => i.categoria),
    indicadores: indicadores.map((i) => i.indicador),
    brts: brts.map((i) => i.brt),
    grupos: grupos.map((i) => i.grupo),
  });
}
