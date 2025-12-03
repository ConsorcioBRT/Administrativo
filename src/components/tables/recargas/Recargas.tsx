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

interface Transaction {
  idTag: string;
  rfid: string;
  vinCode: string;
  prefix: string;
  porte: string;
  bodywork: string;
  vehicle: string;
  plate: string;
  name: string;
  email: string;
  chargingStationDescription: string;
  connectorType: string;
  transactionCount: number;
  startedDate: string;
  startTime: string;
  finishedDate: string;
  finishedTime: string;
  totalTime: string;
  initialSoc: number;
  endSoc: number;
  power: string;
  voltage: string;
  current: string;
  kwhTotalConsume: string;
  kwhcost: string;
  kwhTotalCost: string;
  kwhRevenue: string;
  kwhTotalReport: string;
  tariffTotalReport: string;
  initialRevenue: string;
  totalRevenueValue: string;
}

export default function Recargas() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-11-13");

  async function getStayDuration(startDate: string, endDate: string) {
    // converter "2025-01-01" → "20250101"
    const formatDate = (date: string) => date.replaceAll("-", "");

    const res = await fetch(
      `https://gonansen.com.br/endpoints/transactions/report-xlsx/?page_size=${pageSize}&?start_date=${formatDate(
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getStayDuration(startDate, endDate);
      setTransactions(result.results?.data || []);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recarrega sempre que o pageSize mudar
  useEffect(() => {
    fetchData();
  }, []);

  // Exporta apenas os resultados
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transações");
    XLSX.writeFile(wb, "transacoes.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Recargas (Transactions)
        </h3>

        <div className="flex items-center gap-3">
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

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  idTag
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  rfid
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  vinCode
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  prefix
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  porte
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  bodywork
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  vehicle
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  plate
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  name
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  email
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  chargingStationDescription
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  connectorType
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  transactionCount
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  startedDate
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  startTime
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  finishedDate
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  finishedTime
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  totalTime
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  initialSoc
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  endSoc
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  power
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  voltage
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  current
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  kwhTotalConsume
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  kwhCost
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  kwhTotalCost
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  kwhRevenue
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  kwhTotalReport
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  tariffTotalReport
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  initialRevenue
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  totalRevenueValue
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
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500 dark:text-gray-400">
                    Nenhuma recarga encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((t, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.idTag}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.rfid}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.vinCode}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.prefix}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.porte}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.bodywork}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.vehicle}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.plate}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.name}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.email}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.chargingStationDescription}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.connectorType}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.transactionCount}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.startedDate}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.startTime}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.finishedDate}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.totalTime}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.initialSoc}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.endSoc}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.power}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.voltage}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.current}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.kwhTotalConsume}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.kwhTotalCost}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.kwhRevenue}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.kwhTotalReport}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.tariffTotalReport}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.initialRevenue}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                      {t.totalRevenueValue}
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
