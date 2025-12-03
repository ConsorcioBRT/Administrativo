import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Aqui será o POST - Usandoa criptografia
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access-secret";

export async function POST(request: NextRequest) {
  try {
    const { usuario, senha } = await request.json();

    // Aqui vai buscar o usuário pelo Nome, E-mail ou CPF
    const user = await prisma.usr.findFirst({
      where: {
        OR: [{ usr_eml: usuario }, { usr_lgn: usuario }, { usr_cpf: usuario }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuário ou senha inválidos." },
        { status: 401 },
      );
    }

    // Aqui irá resetar a senha, quando o Stt = 8
    if (user.stt_id === 8) {
      return NextResponse.json(
        {
          message: "Usuário precisa resetar a senha.",
          resetRequired: true,
          userId: user.usr_id,
        },
        { status: 200 },
      );
    }

    // Aqui vai comparar a senha criptografada
    const senhaValida = await bcrypt.compare(senha, user.usr_pwd);
    if (!senhaValida) {
      return NextResponse.json(
        { message: "Usuário ou Senha inválidos." },
        { status: 401 },
      );
    }

    // Aqui não vai enviar a senha no front
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { usr_pwd, ...userSemSenha } = user;

    // Gera o Token
    const accessToken = jwt.sign(
      {
        id: user.usr_id,
        email: user.usr_eml,
        role: user.usr_tpo_id,
      },
      ACCESS_SECRET,
      { expiresIn: "1h" },
    );

    const response = NextResponse.json({
      message: "Login realizado com sucesso",
      user: userSemSenha,
    });

    // Irá salvar os tokens nos cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1h é sempre considerado em segundos 3600s
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro no Login" }, { status: 500 });
  }
}
