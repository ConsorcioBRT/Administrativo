"use client";
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { usePassageirosTipo } from "@/hooks/usePassageirosTipo";
import { useFiltros } from "@/hooks/useFiltrosPassageirosTipo";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PassageirosMesNS() {
  const { loading: filtrosLoading } = useFiltros();
  const [selected] = useState({
    categoria: "Demanda",
    indicador: "Passageiro/mês",
    brt: "BRT Norte Sul",
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
    colors: ["#465fff"],
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
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr>
                <th className="w-32 p-2 text-left">Meses</th>
                {meses.map((mes) => (
                  <th key={mes} className="p-2 text-center">
                    {mes}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-2 font-semibold">Total</td>
                {meses.map((mes) => {
                  const valor =
                    lista.find((i) => i.periodo === mes)?.valor || 0;

                  return (
                    <td key={mes} className="p-2 text-center">
                      {Number(valor).toLocaleString("pt-BR")}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
