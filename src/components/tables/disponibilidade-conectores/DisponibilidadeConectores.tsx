"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { getDisponibilidadeConectores } from "@/app/api/nansen/disponibilidade-conectores";
import * as XLSX from "xlsx";

interface DisponibilidadeConector {
  available: number;
  occupied: number;
  unavailable: number;
  online: number;
  total: number;
}

export default function DisponibilidadeConectores() {
  const [disponibilidades, setDisponibilidades] =
    useState<DisponibilidadeConector | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDisponibilidadeConectores();
        setDisponibilidades(data);
      } catch (error) {
        console.error("Erro ao buscar carregadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet([disponibilidades]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DisponibilidadeConectores");
    XLSX.writeFile(wb, "disponibilidade-conectores.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Lista de Disponibilidade de Conectores
        </h3>
        <button
          onClick={handleExportExcel}
          className="bg-brand-600 hover:bg-brand-700 rounded-md px-4 py-2 text-sm text-white"
        >
          Exportar Excel
        </button>
      </div>

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Available
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Occupied
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Unavailable
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Online
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Total
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
              ) : disponibilidades ? (
                <TableRow key={disponibilidades.available}>
                  <TableCell className="px-5 py-4 text-start text-gray-800 dark:text-white/90">
                    {disponibilidades.available}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                    {disponibilidades.occupied}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                    {disponibilidades.unavailable}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                    {disponibilidades.online}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                    {disponibilidades.total}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma disponibilidade encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
