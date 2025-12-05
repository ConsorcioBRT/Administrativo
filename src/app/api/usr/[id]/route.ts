import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Função para extrair o ID da URL
function getIdFromRequest(request: Request): string | null {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1];
    return id || null;
  } catch {
    return null;
  }
}

// GET
export async function GET(request: Request) {
  const id = getIdFromRequest(request);

  if (!id) {
    return NextResponse.json({ error: "ID não informado." }, { status: 400 });
  }

  try {
    const user = await prisma.usr.findUnique({
      where: { usr_id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar usuário." }, { status: 500 });
  }
}

// PUT
export async function PUT(request: Request) {
  const id = getIdFromRequest(request);

  if (!id) {
    return NextResponse.json({ error: "ID não informado." }, { status: 400 });
  }

  try {
    const body = await request.json();

    let hashedPassword: string | undefined;
    if (body.usr_pwd) {
      hashedPassword = await bcrypt.hash(body.usr_pwd, 10);
    }

    const atualizarUser = await prisma.usr.update({
      where: { usr_id: Number(id) },
      data: {
        usr_nme: body.usr_nme,
        usr_lgn: body.usr_lgn,
        usr_cpf: body.usr_cpf,
        usr_eml: body.usr_eml,
        ...(hashedPassword && { usr_pwd: hashedPassword }),
        usr_fne: body.usr_fne,
        usr_tpo_id: body.usr_tpo_id,
        stt_id: body.stt_id,
      },
    });

    return NextResponse.json(atualizarUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar usuário." }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: Request) {
  const id = getIdFromRequest(request);

  if (!id) {
    return NextResponse.json({ error: "ID não informado." }, { status: 400 });
  }

  try {
    await prisma.usr.delete({
      where: { usr_id: Number(id) },
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao deletar usuário." }, { status: 500 });
  }
}
