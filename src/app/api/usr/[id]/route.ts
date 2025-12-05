import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Rota da api: http://localhost:3000/src/app/api/usr/id
// GET - Vai listar apenas o usuário necessário
export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    if (!params.id) {
      return NextResponse.json({ error: "ID não informado." }, { status: 400 });
    }

    const user = await prisma.usr.findUnique({
      where: { usr_id: Number(params.id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário." },
      { status: 500 },
    );
  }
}

// PUT - Vai alterar apenas o usuário escolhido
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    // Aqui vai ser apenas se ela existir
    let hashedPassword: string | undefined;

    if (body.usr_pwd) {
      // Aqui vamos criptografar a senha antes de salvar
      hashedPassword = await bcrypt.hash(body.usr_pwd, 10);
    }

    const atualizarUser = await prisma.usr.update({
      where: { usr_id: Number(params.id) },
      data: {
        usr_nme: body.usr_nme,
        usr_lgn: body.usr_lgn,
        usr_cpf: body.usr_cpf,
        usr_eml: body.usr_eml,
        ...(hashedPassword && { usr_pwd: hashedPassword }), // irá adicionar se caso existir
        usr_fne: body.usr_fne,
        usr_tpo_id: body.usr_tpo_id,
        stt_id: body.stt_id,
      },
    });
    return NextResponse.json(atualizarUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar usuário." },
      { status: 500 },
    );
  }
}

// DELETE - Delete o usuário selecionado
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.usr.delete({
      where: { usr_id: Number(params.id) },
    });

    return NextResponse.json(
      { message: "Usuário deletado com sucesso." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao deletar usuário" },
      { status: 500 },
    );
  }
}
