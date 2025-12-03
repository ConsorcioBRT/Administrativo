"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Usuario {
  usr_nme: string;
  usr_cpf: string;
  usr_eml: string;
  usr_id: number;
  usr_tpo_id: number;
  usr_lgn: string;
}

export default function SignInForm() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [erroLogin, setErroLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    setErroLogin(null);
    if (!usuario || !senha) {
      setErroLogin("Preencha usuário e senha.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/usr/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario,
          senha,
        }),
      });
      const data = await res.json();
      // Caso o backend retorne resetRequired (SttId = 8)
      if (data.resetRequired) {
        router.push(`/resetpwd?userId=${data.userId}`); // redireciona para a tela de redefinir senha
        throw new Error(data.message || "Redefinição de senha necessária");
      }
      if (!res.ok) {
        throw new Error(data.message); // rejeita a promise
      }
      // Irá salvar o usuário no "usuarioLogado"
      const userLogged: Usuario = data.user;
      localStorage.setItem("usuarioLogado", JSON.stringify(userLogged));

      // Vai redirecionar para o dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro no login", error);
      setErroLogin("Usuário ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center sm:max-w-lg">
        <div>
          <div className="mb-2 sm:mb-2">
            <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
              Bem-Vindo ao Consórcio BRT
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entre com as credenciais para acessar o portal de gestão de
              recargas.
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white p-2 text-gray-400 sm:px-5 sm:py-2 dark:bg-gray-900">
                  <Image
                    width={45}
                    height={45}
                    src="/images/logo/logo_sidebar.png"
                    alt="logo"
                    className="rounded-lg"
                  />
                </span>
              </div>
            </div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Usuário <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    type="text"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="h-12 w-64 bg-gray-100"
                    placeholder="Entre com seu Usuário"
                  />
                </div>
                <div>
                  <Label>
                    Senha <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Entre com sua Senha"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Link
                    href="/forgot"
                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400 text-sm"
                  >
                    Esqueceu a Senha?
                  </Link>
                </div>
                {erroLogin && (
                  <p className="mt-2 text-sm text-red-500">{erroLogin}</p>
                )}
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-300 border-t-blue-500"></div>
                      </div>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Não possui uma conta?{" "}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Cadastrar conta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
