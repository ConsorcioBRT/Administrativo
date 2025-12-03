import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Rota da api: http://localhost:3000/src/app/api/usr
// Vai listar todos os usuários
export async function GET() {
  try {
    const users = await prisma.usr.findMany({
      select: {
        emp_id: true,
        usr_tpo_id: true,
        usr_id: true,
        usr_nme: true,
        usr_lgn: true,
        usr_cpf: true,
        usr_eml: true,
        usr_fne: true,
        usr_pwd: true,
        stt_id: true,
        usr_id_alt: true,
      },
      orderBy: {
        usr_id: "asc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários." },
      { status: 500 },
    );
  }
}

// Aqui será o POST - Criar novos usuários - http://localhost:3000/api/usr
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.usr_pwd) {
      return NextResponse.json(
        {
          error: "Senha é obrigatória",
        },
        { status: 400 },
      );
    }

    // Aqui vamos criptografar a senha antes de salvar
    const hashedPassword = await bcrypt.hash(body.usr_pwd, 10);

    const novoUsuario = await prisma.usr.create({
      data: {
        emp_id: body.emp_id,
        usr_id_alt: body.usr_id_alt,
        usr_nme: body.usr_nme,
        usr_lgn: body.usr_lgn,
        usr_cpf: body.usr_cpf,
        usr_eml: body.usr_eml,
        usr_pwd: hashedPassword,
        usr_tpo_id: body.usr_tpo_id,
        stt_id: body.stt_id,
        usr_fne: body.usr_fne,
      },
    });
    return NextResponse.json(novoUsuario, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 },
    );
  }
}
