import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  // Rotas privadas
  const protectedRoutes = [
    "/bar-chart",
    "/controle-velocidade",
    "/disponiveis-veiculos",
    "/line-chart",
    "/nova-pesquisa-onibus",
    "/operacao-eletrica",
    "/pesquisa-biometano",
    "/pesquisa-usuario-brt",
    "/form-elements",
    "/carregadores",
    "/carregadores-conectores",
    "/carregadores-mapa",
    "/disponibilidade-conectores",
    "/duracao-estacao",
    "/energia-consumida",
    "/energia-instantanea",
    "/falhas-carregadores",
    "/faturamento-energia",
    "/frequencia-carregamento",
    "/graficos",
    "/potencia-instantanea",
    "/recargas",
    "/sustentabilidade",
    "/usuarios",
    "/usuarios-adicionados",
    "/blank",
    "/profile",
    "/avatars",
    "/badge",
    "/buttons",
    "/images",
    "/modals",
    "/users",
    "/videos",
    "/dashboard",
  ];

  const { pathname } = req.nextUrl;

  // Se já está logado e tenta acessar a tela de login (/), irá mandar pro /terminal
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Se não tem token e tenta acessar rota protegida, irá retornar pro / (Login)
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Caso contrário, segue normalmente
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/bar-chart/:path*",
    "/controle-velocidade/:path*",
    "/disponiveis-veiculos/:path*",
    "/line-chart/:path*",
    "/nova-pesquisa-onibus/:path*",
    "/operacao-eletrica/:path*",
    "/pesquisa-biometano/:path*",
    "/pesquisa-usuario-brt/:path*",
    "/form-elements/:path*",
    "/carregadores/:path*",
    "/carregadores-conectores/:path*",
    "/carregadores-mapa/:path*",
    "/disponibilidade-conectores/:path*",
    "/duracao-estacao/:path*",
    "/energia-consumida/:path*",
    "/energia-instantanea/:path*",
    "/falhas-carregadores/:path*",
    "/faturamento-energia/:path*",
    "/frequencia-carregamento/:path*",
    "/graficos/:path*",
    "/potencia-instantanea/:path*",
    "/recargas/:path*",
    "/sustentabilidade/:path*",
    "/usuarios/:path*",
    "/usuarios-adicionados/:path*",
    "/blank/:path*",
    "/profile/:path*",
    "/avatars/:path*",
    "/badge/:path*",
    "/buttons/:path*",
    "/images/:path*",
    "/modals/:path*",
    "/users/:path*",
    "/videos/:path*",
    "/dashboard/:path*",
  ],
};
