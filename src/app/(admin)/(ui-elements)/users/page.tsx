"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen, PlusCircle, Search, Trash } from "lucide-react";

interface Usuario {
  emp_id: number;
  usr_id: number;
  usr_tpo_id: number;
  usr_nme: string;
  usr_lgn?: string | null;
  usr_cpf?: string | null;
  usr_eml: string;
  usr_fne?: string | null;
  stt_id: number;
  usr_id_alt?: number;
}

interface Empresa {
  emp_id: number;
  emp_nme: string;
}

interface TipoUsuario {
  usr_tpo_id: number;
  usr_tpo_nme: string;
}

interface Situacao {
  stt_id: number;
  stt_nme: string;
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [tipos, setTipos] = useState<TipoUsuario[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [situacao, setSituacao] = useState<Situacao[]>([]);
  const [editarUser, setEditarUser] = useState<Usuario | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    emp_id: "",
    usr_nme: "",
    usr_lgn: "",
    usr_cpf: "",
    usr_eml: "",
    usr_fne: "",
    usr_pwd: "",
    usr_tpo_id: "",
    stt_id: "",
  });

  // Aqui irá atualizar os valores do formulário
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Vai fazer o GET dos usuários do banco
  useEffect(() => {
    let isFirstLoad = true;
    const fetchUsuarios = async () => {
      if (isFirstLoad) setLoading(true);
      try {
        const [usrRes, empRes, tipoRes, sttRes] = await Promise.all([
          fetch("/api/usr"),
          fetch("/api/emp"),
          fetch("/api/usr_tpo"),
          fetch("/api/stt"),
        ]);

        const usrData = await usrRes.json();
        const empData = await empRes.json();
        const tipoData = await tipoRes.json();
        const sttData = await sttRes.json();

        setUsuarios(Array.isArray(usrData) ? usrData : [usrData]);
        setEmpresas(empData);
        setTipos(tipoData);
        setSituacao(sttData);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      } finally {
        if (isFirstLoad) setLoading(false);
        isFirstLoad = false;
      }
    };
    fetchUsuarios();
  }, []);

  // Prepara para criar novo
  const handleCreate = () => {
    setEditarUser(null);
    setFormData({
      emp_id: "",
      usr_nme: "",
      usr_lgn: "",
      usr_cpf: "",
      usr_eml: "",
      usr_fne: "",
      usr_pwd: "",
      usr_tpo_id: "",
      stt_id: "",
    });
    setOpen(true);
  };

  // Aqui vai ser o POST - Criar usuário
  const handleSubmit = async () => {
    try {
      const method = editarUser ? "PUT" : "POST";
      const url = editarUser ? `/api/usr/${editarUser.usr_id}` : `/api/usr`;

      const body = {
        emp_id: Number(formData.emp_id),
        usr_nme: formData.usr_nme,
        usr_lgn: formData.usr_lgn,
        usr_cpf: formData.usr_cpf,
        usr_eml: formData.usr_eml,
        usr_fne: formData.usr_fne,
        usr_pwd: formData.usr_pwd,
        usr_tpo_id: Number(formData.usr_tpo_id),
        stt_id: Number(formData.stt_id),
        usr_id_alt: editarUser ? editarUser.usr_id_alt : 1,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erro ao criar usuário");

      const savedUser = await res.json();
      if (editarUser) {
        setUsuarios((prev) =>
          prev.map((u) => (u.usr_id === savedUser.usr_id ? savedUser : u)),
        );
      } else {
        setUsuarios((prev) => [...prev, savedUser]);
      }

      setOpen(false);
      setEditarUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Aqui irá ser o PUT - Alterar usuário
  const handleEdit = (user: Usuario) => {
    setEditarUser(user);
    setFormData({
      emp_id: String(user.emp_id),
      usr_nme: user.usr_nme,
      usr_lgn: user.usr_lgn || "",
      usr_cpf: user.usr_cpf || "",
      usr_eml: user.usr_eml,
      usr_pwd: "",
      usr_fne: user.usr_fne || "",
      usr_tpo_id: String(user.usr_tpo_id),
      stt_id: String(user.stt_id),
    });
    setOpen(true);
  };

  // Aqui vai ser o DELETE - Deletar usuário
  const handleDelete = async (id: number) => {
    if (!confirm("Deseja deletar este usuário?")) return;
    try {
      const res = await fetch(`/api/usr/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar usuário.");

      setUsuarios((prev) => prev.filter((u) => u.usr_id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl">Usuários</h1>
        <Separator className="mt-2 mb-5" />
      </div>

      {/* Corpo da Página */}
      <div className="p-5">
        {/* Search e Adionar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Input className="h-12 w-60" placeholder="Pesquise por Nome" />
            <Search className="text-gray-600" />
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className="flex h-12 w-42 cursor-pointer items-center gap-2 rounded-sm bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                onClick={handleCreate}
              >
                Criar Usuário
                <PlusCircle />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editarUser ? "Editar Usuário" : "Novo Usuário"}
                </DialogTitle>
                <DialogDescription>
                  {editarUser
                    ? "Edite os Dados do Usuário."
                    : "Adicione um Novo Usuário."}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-5">
                <div>
                  <span>Empresa:</span>
                  <Select
                    value={formData.emp_id}
                    onValueChange={(val) => handleInputChange("emp_id", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {empresas.map((e) => (
                        <SelectItem key={e.emp_id} value={String(e.emp_id)}>
                          {e.emp_nme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <span>Nome:</span>
                  <Input
                    type="text"
                    value={formData.usr_nme}
                    onChange={(e) =>
                      handleInputChange("usr_nme", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>Nome de Login:</span>
                  <Input
                    type="text"
                    value={formData.usr_lgn}
                    onChange={(e) =>
                      handleInputChange("usr_lgn", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>CPF:</span>
                  <Input
                    type="number"
                    value={formData.usr_cpf}
                    onChange={(e) =>
                      handleInputChange("usr_cpf", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>E-mail:</span>
                  <Input
                    type="email"
                    value={formData.usr_eml}
                    onChange={(e) =>
                      handleInputChange("usr_eml", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>Telefone:</span>
                  <Input
                    type="text"
                    value={formData.usr_fne}
                    onChange={(e) =>
                      handleInputChange("usr_fne", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>Senha:</span>
                  <Input
                    type="password"
                    value={formData.usr_pwd}
                    onChange={(e) =>
                      handleInputChange("usr_pwd", e.target.value)
                    }
                  />
                </div>
                <div>
                  <span>Situação</span>
                  <Select
                    value={formData.stt_id}
                    onValueChange={(val) => handleInputChange("stt_id", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {situacao.map((s) => (
                        <SelectItem key={s.stt_id} value={String(s.stt_id)}>
                          {s.stt_nme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <span>Tipo de Usuário</span>
                  <Select
                    value={formData.usr_tpo_id}
                    onValueChange={(val) =>
                      handleInputChange("usr_tpo_id", val)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {tipos.map((t) => (
                        <SelectItem
                          key={t.usr_tpo_id}
                          value={String(t.usr_tpo_id)}
                        >
                          {t.usr_tpo_nme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="h-12">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button onClick={handleSubmit} className="h-12">
                  {editarUser ? "Salvar Alterações" : "Adicionar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabela */}
        <div className="mt-10">
          {loading ? (
            <div className="flex h-32 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-300 border-t-blue-500"></div>
            </div>
          ) : (
            <Table className="w-full">
              <TableCaption>Lista de Usuários cadastrados.</TableCaption>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead className="text-black">Id</TableHead>
                  <TableHead className="text-black">Empresa</TableHead>
                  <TableHead className="text-black">Nome</TableHead>
                  <TableHead className="text-black">Login</TableHead>
                  <TableHead className="text-black">CPF</TableHead>
                  <TableHead className="text-black">E-mail</TableHead>
                  <TableHead className="text-black">Situação</TableHead>
                  <TableHead className="text-black">Telefone</TableHead>
                  <TableHead className="text-black">Tipo</TableHead>
                  <TableHead className="text-right text-black">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((user) => (
                  <TableRow key={user.usr_id}>
                    <TableCell>{user.usr_id}</TableCell>
                    <TableCell>{user.emp_id}</TableCell>
                    <TableCell>{user.usr_nme}</TableCell>
                    <TableCell>{user.usr_lgn}</TableCell>
                    <TableCell>{user.usr_cpf}</TableCell>
                    <TableCell>{user.usr_eml}</TableCell>
                    <TableCell>{user.stt_id}</TableCell>
                    <TableCell>{user.usr_fne}</TableCell>
                    <TableCell>{user.usr_tpo_id}</TableCell>
                    <TableCell className="flex justify-end gap-2 text-right">
                      <Button
                        className="bg-transparent text-black shadow-none hover:text-blue-500 dark:text-white"
                        onClick={() => handleEdit(user)}
                      >
                        <Pen />
                      </Button>
                      <Button
                        onClick={() => handleDelete(user.usr_id)}
                        className="bg-transparent text-black shadow-none hover:text-red-500 dark:text-white"
                      >
                        <Trash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
