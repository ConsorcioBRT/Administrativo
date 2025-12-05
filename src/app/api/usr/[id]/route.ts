import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// GET - Buscar usuário por ID
export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "ID não informado." }, { status: 400 });
  }

  const user = await prisma.usr.findUnique({
    where: { usr_id: Number(id) },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado." },
      { status: 404 },
    );
  }

  return NextResponse.json(user);
}

// PUT - Atualizar usuário
export async function PUT(
  request: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;
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

  return NextResponse.json(atualizarUser);
}

// DELETE - Remover usuário
export async function DELETE(
  request: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;

  await prisma.usr.delete({
    where: { usr_id: Number(id) },
  });

  return NextResponse.json(
    { message: "Usuário deletado com sucesso." },
    { status: 200 },
  );
}
