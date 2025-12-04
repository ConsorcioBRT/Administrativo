"use client";
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { usePassageirosTipo } from "@/hooks/usePassageirosTipo";
import { useFiltros } from "@/hooks/useFiltrosPassageirosTipo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PassageirosMesSMB() {
  const { loading: filtrosLoading } = useFiltros();
  const [selected] = useState({
    categoria: "Demanda",
    indicador: "Passageiro/mês",
    brt: "SMB",
    grupo: "",
  });

  const { data } = usePassageirosTipo(selected);
  console.log("API retornou:", data);
  const lista = Array.isArray(data) ? data : [];
  const meses = [...new Set(lista.map((i) => i.periodo))];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    colors: ["#90D431"],
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 2,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val.toLocaleString("pt-BR");
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: meses,
      position: "bottom",
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: true },
    },
    yaxis: {
      axisBorder: { show: true },
      axisTicks: { show: true },
      labels: { show: true },
      tickAmount: 10,
    },
  };

  const totais = meses.map(
    (mes) => lista.find((i) => i.periodo === mes)?.valor || 0,
  );

  const series = [{ name: "Total do mês", data: totais }];

  if (filtrosLoading) return <p>Carregando...</p>;
  return (
    <div className="custom-scrollbar max-w-full overflow-x-auto">
      <div id="chartOne" className="min-w-[1000px]">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
        {/* LEGENDA CUSTOMIZADA + TABELA */}
        <div className="mt-4 w-full overflow-x-auto">
          <Table className="table-fixed border text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-32 border-x text-center">
                  Meses
                </TableHead>

                {meses.map((mes) => (
                  <TableHead key={mes} className="border-x text-center">
                    {mes}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="border-x text-center font-semibold">
                  Total
                </TableCell>

                {meses.map((mes) => {
                  const valor =
                    lista.find((i) => i.periodo === mes)?.valor || 0;

                  return (
                    <TableCell key={mes} className="border-x text-center">
                      {Number(valor).toLocaleString("pt-BR")}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
