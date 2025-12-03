"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { getChargers } from "@/app/api/nansen/carregadores";
import * as XLSX from "xlsx";

interface Charger {
  id: number;
  description: string;
}

export default function BasicTableOne() {
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChargers();
        setChargers(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar carregadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(chargers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Carregadores");
    XLSX.writeFile(wb, "carregadores.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Lista de Carregadores
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
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Descrição
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : chargers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="py-6 text-center text-gray-500 dark:text-gray-400"
                  >
                    Nenhum carregador encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                chargers.map((charger) => (
                  <TableRow key={charger.id}>
                    <TableCell className="px-5 py-4 text-start text-gray-800 dark:text-white/90">
                      {charger.id}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                      {charger.description}
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
