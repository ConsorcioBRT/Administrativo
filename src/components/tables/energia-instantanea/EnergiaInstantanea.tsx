"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { getEnergiaInstantanea } from "@/app/api/nansen/energia-instantanea";
import * as XLSX from "xlsx";

interface EnergiaApi {
  energyData: {
    active: number[];
    reactive: number[];
    apparent: number[];
  };
}

interface EnergiaItem {
  tipo: string;
  valores: number[];
}

export default function EnergiaInstantanea() {
  const [dados, setDados] = useState<EnergiaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: EnergiaApi = await getEnergiaInstantanea();
        const formatado: EnergiaItem[] = [
          { tipo: "Ativa", valores: data.energyData.active },
          { tipo: "Reativa", valores: data.energyData.reactive },
          { tipo: "Aparente", valores: data.energyData.apparent },
        ];
        setDados(formatado);
      } catch (error) {
        console.error("Erro ao buscar energia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      dados.map((item) => ({
        Tipo: item.tipo,
        Valores: item.valores.join(", "),
      })),
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "EnergiaInstantanea");
    XLSX.writeFile(wb, "energia-instantanea.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Lista de Energia Instantânea
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
                <TableCell className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400">
                  Tipo
                </TableCell>
                <TableCell className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400">
                  Valores
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
              ) : dados.length === 0 ? (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500 dark:text-gray-400">
                    Nenhum carregador encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                dados.map((item) => (
                  <TableRow key={item.tipo}>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {item.tipo}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                      {item.valores.length > 0 ? item.valores.join(", ") : "-"}
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
