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

// Função para buscar os dados com datas dinâmicas
async function getStayDuration(startDate: string, endDate: string) {
  // converter "2025-01-01" → "20250101"
  const formatDate = (date: string) => date.replaceAll("-", "");

  const res = await fetch(
    `https://gonansen.com.br/endpoints/central-monitoring/stay-duration/?start_date=${formatDate(
      startDate,
    )}&end_date=${formatDate(endDate)}`,
    {
      headers: {
        accept: "application/json",
        Authorization: "d3d15c2effddf4e11ef9fbcfd066c62878b35039",
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Resposta da API:", res.status, errorText);
    throw new Error(`Erro ao buscar dados da API (${res.status})`);
  }

  return res.json();
}

interface DuracaoItem {
  label: string;
  value: string;
}

export default function DuracaoPorEstacao() {
  const [data, setData] = useState<DuracaoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-11-13");

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getStayDuration(startDate, endDate);
      setData(result.data || []);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Duração por Estação");
    XLSX.writeFile(wb, "duracao-por-estacao.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Duração por Estação
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <span className="text-gray-500 dark:text-gray-400">até</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            onClick={fetchData}
            className="bg-brand-600 hover:bg-brand-700 rounded-md px-4 py-2 text-sm text-white"
          >
            Buscar
          </button>
          <button
            onClick={handleExportExcel}
            className="rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            Exportar Excel
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[400px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400">
                  Faixa de Duração
                </TableCell>
                <TableCell className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400">
                  Percentual (%)
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
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500 dark:text-gray-400">
                    Nenhum dado encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow key={item.label}>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {item.label}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                      {item.value}
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
