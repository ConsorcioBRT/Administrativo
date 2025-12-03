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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays } from "lucide-react";

// Função que busca a API
async function getEnergyConsumed(startDate: string, endDate: string) {
  const formatDate = (date: string) => date.replaceAll("-", "");

  const res = await fetch(
    `https://gonansen.com.br/endpoints/central-monitoring/users-added-report/?start_date=${formatDate(
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
    const text = await res.text();
    console.error("Erro da API:", res.status, text);
    throw new Error("Erro ao buscar dados da API");
  }

  return res.json();
}

interface UsuariosAdd {
  usersAdded: number;
  totalUsers: number;
}

export default function UsuariosAdicionados() {
  const [data, setData] = useState<UsuariosAdd | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date("2025-11-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2025-11-13"));
  const [openCalendar, setOpenCalendar] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getEnergyConsumed(
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd"),
      );
      setData(result);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportExcel = () => {
    if (!data) return;
    const ws = XLSX.utils.json_to_sheet([data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Usuarios Adicionados");
    XLSX.writeFile(wb, "usuarios-adicionados.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Usuários Adicionados
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {/* Calendário Popover */}
          <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 dark:border-gray-600 dark:text-white"
              >
                <CalendarDays className="h-4 w-4" />
                {`${format(startDate, "dd/MM/yyyy")} → ${format(
                  endDate,
                  "dd/MM/yyyy",
                )}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              align="start"
            >
              <Calendar
                mode="range"
                selected={{ from: startDate, to: endDate }}
                onSelect={(range) => {
                  if (range?.from) setStartDate(range.from);
                  if (range?.to) setEndDate(range.to);
                }}
                numberOfMonths={2}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <Button
            onClick={fetchData}
            className="bg-brand-600 hover:bg-brand-700 text-white"
          >
            Buscar
          </Button>

          <Button
            onClick={handleExportExcel}
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Tabela */}
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[400px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  Usuários Adicionados
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-center font-medium text-gray-500 dark:text-gray-400"
                >
                  Total de Usuários
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : !data ? (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500">
                    Nenhum dado encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                    {data.usersAdded}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center text-gray-800 dark:text-white/90">
                    {data.totalUsers}
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
