"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import * as XLSX from "xlsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UsuariosLista {
  id: number;
  firstName: string;
  email: string;
  ocppIdTag: string;
  cpf: string;
  phone: string;
}

export default function Usuarios() {
  const [users, setUsers] = useState<UsuariosLista[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://gonansen.com.br/endpoints/users/?page_size=${pageSize}&status=Todas`,
        {
          headers: {
            Authorization: `d3d15c2effddf4e11ef9fbcfd066c62878b35039`,
          },
        },
      );

      const data = await res.json();
      setUsers(data.results || []);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recarrega sempre que o pageSize mudar
  useEffect(() => {
    fetchData();
  }, [pageSize]);

  // Exporta apenas os resultados
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuários");
    XLSX.writeFile(wb, "usuarios.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Usuários
        </h3>

        <div className="flex items-center gap-3">
          <Select
            value={String(pageSize)}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[160px">
              <SelectValue placeholder="Itens" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100, 200, 500, 1000].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} itens
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={handleExportExcel}
            className="rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            Exportar Excel
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  Primeiro Nome
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  E-mail
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  Tag
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  CPF
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  Telefone
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500 dark:text-gray-400">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma recarga encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.id}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.firstName}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.email}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.ocppIdTag}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.cpf}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.phone}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
