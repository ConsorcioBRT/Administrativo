"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function RecargasPorPeriodo() {
  const vehicles = [
    "1201",
    "20805",
    "20806",
    "20807",
    "20808",
    "20809",
    "20810",
    "50900",
    "50901",
    "50902",
    "50903",
    "50904",
  ];

  const options: ApexOptions = {
    colors: ["#465FFF", "#00C49A", "#7D50FA"], // azul, verde, vermelho
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 250,
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
    },
    xaxis: {
      categories: [
        "00:00",
        "02:00",
        "04:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
      ],
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
    fill: { opacity: 1 },
    grid: {
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      y: { formatter: (val: number) => `${val} recargas` },
    },
  };

  const series = [
    {
      name: "Segunda a Sexta",
      data: [80, 70, 30, 10, 40, 15, 5, 8, 12, 60, 55],
    },
    {
      name: "Sábado",
      data: [25, 20, 15, 5, 18, 8, 3, 2, 5, 20, 18],
    },
    {
      name: "Domingo",
      data: [15, 10, 5, 2, 5, 3, 1, 1, 2, 10, 12],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Faturamento
        </h3>

        <div className="relative inline-block">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown-toggle"
          >
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="w-40 p-2"
          >
            <DropdownItem onItemClick={() => setIsOpen(false)}>
              Ver mais
            </DropdownItem>
            <DropdownItem onItemClick={() => setIsOpen(false)}>
              Excluir
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <div className="-ml-5 min-w-[700px] pl-2 xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={250}
          />
        </div>
      </div>
    </div>
  );
}
