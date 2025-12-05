"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { getCarregadoresConectores } from "@/app/api/nansen/carregadores-conectores";
import * as XLSX from "xlsx";

interface ChargerData {
  chargers: number;
  connectors: number;
}

export default function CarregadoresConectores() {
  const [data, setData] = useState<ChargerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCarregadoresConectores();
        setData(response);
      } catch (error) {
        console.error("Erro ao buscar carregadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet([data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CarregadoresConectores");
    XLSX.writeFile(wb, "carregadores-conectores.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Lista de Carregadores e Conectores
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
                <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                  Carregadores
                </TableCell>
                <TableCell className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400">
                  Conectores
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
              ) : data ? (
                <TableRow>
                  <TableCell className="px-5 py-4 text-start text-gray-800 dark:text-white/90">
                    {data.chargers}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                    {data.connectors}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500 dark:text-gray-400">
                    Nenhum carregador e conector encontrado.
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
