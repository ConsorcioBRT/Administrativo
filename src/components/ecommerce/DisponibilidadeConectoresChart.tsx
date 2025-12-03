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

export default function DisponibilidadeConectores() {
  const options: ApexOptions = {
    colors: ["#465FFF", "#00C49A", "#FF6B6B"], // azul, verde, vermelho
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "donut",
      height: 250,
      toolbar: { show: false },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: "bottom",
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#fff"],
    },
    tooltip: {
      y: { formatter: (val: number) => `${val}` },
    },
  };

  const series = [150, 180, 170];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Disponibilidade de Conectores
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
            type="donut"
            height={250}
          />
        </div>
      </div>
    </div>
  );
}
