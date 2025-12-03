"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { getCarregadoresMapa } from "@/app/api/nansen/carregadores-mapa";
import * as XLSX from "xlsx";

interface CarregadoresNoMapa {
  id: number;
  nameEstablishment: string;
  name: string;
  latitude: number;
  longitude: number;
  status: string;
  count: number;
}

export default function CarregadoresMapa() {
  const [carregadoresMapa, setCarregadoresMapa] = useState<
    CarregadoresNoMapa[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCarregadoresMapa();
        setCarregadoresMapa(data);
      } catch (error) {
        console.error("Erro ao buscar carregadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(carregadoresMapa);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CarregadoresMapa");
    XLSX.writeFile(wb, "carregadores-mapa.xlsx");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-white/[0.05]">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Lista de Carregadores Mapa
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
                  Empresa
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Nome
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Latitude
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Longitude
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="text-theme-xs px-5 py-3 text-start font-medium text-gray-500 dark:text-gray-400"
                >
                  Count
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
              ) : carregadoresMapa.length > 0 ? (
                carregadoresMapa.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-5 py-4 text-start text-gray-800 dark:text-white/90">
                      {item.id}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                      {item.nameEstablishment}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                      {item.name}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                      {item.latitude}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                      {item.longitude}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                      {item.status}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-500 dark:text-gray-400">
                      {item.count}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500 dark:text-gray-400">
                    Nenhum carregador encontrado.
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
