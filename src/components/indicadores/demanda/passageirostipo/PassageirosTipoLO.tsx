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

export default function PassageirosTipoLO() {
  const { loading: filtrosLoading } = useFiltros();
  const [selected] = useState({
    categoria: "Demanda",
    indicador: "Passageiro por tipo dia",
    brt: "BRT Leste Oeste",
    grupo: "",
  });

  const { data } = usePassageirosTipo(selected);
  console.log("API retornou:", data);
  const lista = Array.isArray(data) ? data : [];
  const meses = [...new Set(lista.map((i) => i.periodo))];

  const valores = (nomeGrupo: string) =>
    meses.map(
      (mes) =>
        data.find((i) => i.periodo === mes && i.grupo === nomeGrupo)?.valor ||
        0,
    );

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
      fontSize: "14px",
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    colors: ["#D1883B", "#106BEF", "#90D431"], // laranja, azul e verde
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

  const series = [
    { name: "Útil", data: valores("Útil") },
    { name: "Sábado", data: valores("Sábado") },
    { name: "Domingo/Feriado", data: valores("Domingo/Feriado") },
  ];

  if (filtrosLoading) return <p>Carregando...</p>;
  return (
    <div>
      {/* GRÁFICO */}
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
      {/* LEGENDA CUSTOMIZADA + TABELA */}
      <div className="mt-4 w-full overflow-x-auto">
        <Table className="table-fixed border text-sm">
          {/* Cabeçalho */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-32 border-r text-left">Meses</TableHead>

              {meses.map((mes) => (
                <TableHead key={mes} className="border-x text-center">
                  {mes}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Corpo */}
          <TableBody>
            {series.map((s) => (
              <TableRow key={s.name} className="border-t">
                <TableCell className="border-r font-semibold">
                  {s.name}
                </TableCell>

                {meses.map((mes) => {
                  const valor =
                    data.find((i) => i.periodo === mes && i.grupo === s.name)
                      ?.valor || 0;

                  return (
                    <TableCell key={mes} className="border-x text-center">
                      {Number(valor).toLocaleString("pt-BR")}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
