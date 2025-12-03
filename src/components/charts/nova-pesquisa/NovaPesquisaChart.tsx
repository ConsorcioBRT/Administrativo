"use client";
import React from "react";

import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function NovaPesquisaChart() {
  const options: ApexOptions = {
    colors: ["#465FFF", "#00C49A"], // azul, verde, vermelho
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
  const series = [150, 180];

  const optionsbar: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: "100%",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true, // 🔹 barra na horizontal
        borderRadius: 6, // 🔹 bordas arredondadas
        borderRadiusApplication: "end", // 🔹 deixa mais grossa ou mais fina
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
        "Feminino",
        "Masculino",
      ], // 🔹 nomes dos lados
    },
    legend: {
      show: true, // você pode ativar se quiser
    },
    tooltip: {
      y: { formatter: (val: number) => `${val}` },
    },
  };

  const seriesbar = [
    {
      name: "Quantidade",
      data: [
        150, 180, 200, 100, 23, 45, 62, 12, 256, 10, 14, 160, 156, 145, 321,
        234, 123, 231, 167, 102,
      ], // 🔹 valores das barras
    },
  ];

  return (
    <div className="custom-scrollbar flex max-w-full flex-col gap-3 overflow-x-auto">
      {/* Parte de cima */}
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-3 rounded-lg bg-gray-100">
          {/* Número total de Entrevistas */}
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-[#465FFF] p-2">
            <h1 className="text-lg text-white">Entrevista</h1>
            <h1 className="text-4xl text-white">781</h1>
          </div>

          {/* Recomendação */}
          <div className="boder-gray-400 flex flex-col items-center justify-center gap-3 rounded-lg border bg-[#FFF] p-2">
            <h1 className="text-center text-base text-[#465FFF]">
              Em uma escala de 0 a 10, qual a probabildade de você recomendar as
              linhas do BRT a um amigo ou colega?
            </h1>
            <h1 className="rounded-lg bg-[#465FFF] p-3 text-4xl text-[#FFF]">
              8,5
            </h1>
          </div>

          {/* Feminino ou Masculino */}
          <div id="chartOne" className="min-w-[1000px]">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={180}
            />
          </div>
        </div>

        {/* Conforto */}
        <div className="flex flex-col items-center gap-3 rounded-lg bg-gray-100">
          {/* Número total de Entrevistas */}
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-400">
            <h1 className="p-4 text-lg text-white">
              Conforto e Condições dos Veículos
            </h1>
          </div>

          {/* Perguntas */}
          <div className="flex flex-col items-center gap-4 p-2">
            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Limpeza e conservação do interior dos ônibus
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#EBC94B] p-2">
                <h1 className="text-3xl font-bold text-white">7,30</h1>
              </div>
            </div>

            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Limpeza e conforto dos assentos no ônibus
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#EBC94B] p-2">
                <h1 className="text-3xl font-bold text-white">6,61</h1>
              </div>
            </div>

            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Limpeza e conservação do interior dos ônibus
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#EBC94B] p-2">
                <h1 className="text-3xl font-bold text-white">7,30</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Desenpenho */}
        <div className="flex flex-col items-center gap-3 rounded-lg bg-gray-100">
          {/* Número total de Entrevistas */}
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-400">
            <h1 className="p-4 text-lg text-white">Desempenho e Operação</h1>
          </div>

          {/* Perguntas */}
          <div className="flex flex-col items-center gap-4 p-2">
            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Cumprimento dos horários de saída e chegada dos ônibus
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#EBC94B] p-2">
                <h1 className="text-3xl font-bold text-white">7,20</h1>
              </div>
            </div>

            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Velocidade média do veículo durante as viagens
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#EBC94B] p-2">
                <h1 className="text-3xl font-bold text-white">7,23</h1>
              </div>
            </div>

            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-6">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Tempo/duração da viagem
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#EBC94B] p-2">
                <h1 className="text-3xl font-bold text-white">6,98</h1>
              </div>
            </div>

            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Lotação dos veículos durante as viagens (sem superlotação)
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#EBC94B] p-2">
                <h1 className="text-3xl font-bold text-white">5,42</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Condução */}
        <div className="flex flex-col items-center gap-3 rounded-lg bg-gray-100">
          {/* Número total de Entrevistas */}
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-400">
            <h1 className="p-4 text-lg text-white">
              Condução e Atendimento a bordo
            </h1>
          </div>

          {/* Perguntas */}
          <div className="flex flex-col items-center gap-4 p-2">
            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Clareza e acesso às informações sobre viagens
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                <h1 className="text-3xl font-bold text-white">7,61</h1>
              </div>
            </div>

            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Condução do motorista (sem solavancos ou freadas bruscas)
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                <h1 className="text-3xl font-bold text-white">7,53</h1>
              </div>
            </div>

            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Cordialidade e cuidado dos motoristas no embarque/desembarque
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                <h1 className="text-3xl font-bold text-white">7,66</h1>
              </div>
            </div>

            <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="flex w-[70%] items-center p-4">
                <h1 className="text-base leading-tight font-semibold text-gray-600">
                  Distância entre ônibus e plataforma para embarque/desembarque
                </h1>
              </div>
              <div className="flex w-[30%] items-center justify-center bg-[#EBC94B] p-2">
                <h1 className="text-3xl font-bold text-white">6,61</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parte debaixo */}
      <div className="flex w-full gap-4">
        <div className="flex w-full rounded-lg bg-gray-100 p-4">
          {/* Feminino ou Masculino */}
          <div id="chartOne" className="w-full">
            <ReactApexChart
              options={optionsbar}
              series={seriesbar}
              type="bar"
              height="100%"
            />
          </div>
        </div>

        {/* Conforto */}
        <div className="flex w-full flex-col items-center gap-3 rounded-lg bg-gray-100">
          {/* Número total de Entrevistas */}
          <div className="flex w-full flex-col items-center justify-center rounded-lg bg-gray-400">
            <h1 className="p-4 text-lg text-white">
              Infraestrutura das estações/terminais
            </h1>
          </div>

          {/* Perguntas */}
          <div className="flex items-center gap-4 p-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex w-[70%] items-center p-4">
                  <h1 className="text-base leading-tight font-semibold text-gray-600">
                    Clareza e acesso às informações sobre viagens
                  </h1>
                </div>
                <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                  <h1 className="text-3xl font-bold text-white">7,61</h1>
                </div>
              </div>
              <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex w-[70%] items-center p-4">
                  <h1 className="text-base leading-tight font-semibold text-gray-600">
                    Clareza e acesso às informações sobre viagens
                  </h1>
                </div>
                <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                  <h1 className="text-3xl font-bold text-white">7,61</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex w-[70%] items-center p-4">
                  <h1 className="text-base leading-tight font-semibold text-gray-600">
                    Clareza e acesso às informações sobre viagens
                  </h1>
                </div>
                <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                  <h1 className="text-3xl font-bold text-white">7,61</h1>
                </div>
              </div>
              <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex w-[70%] items-center p-4">
                  <h1 className="text-base leading-tight font-semibold text-gray-600">
                    Clareza e acesso às informações sobre viagens
                  </h1>
                </div>
                <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                  <h1 className="text-3xl font-bold text-white">7,61</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex w-[70%] items-center p-4">
                  <h1 className="text-base leading-tight font-semibold text-gray-600">
                    Clareza e acesso às informações sobre viagens
                  </h1>
                </div>
                <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                  <h1 className="text-3xl font-bold text-white">7,61</h1>
                </div>
              </div>
              <div className="flex w-full overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex w-[70%] items-center p-4">
                  <h1 className="text-base leading-tight font-semibold text-gray-600">
                    Clareza e acesso às informações sobre viagens
                  </h1>
                </div>
                <div className="flex w-[30%] items-center justify-center bg-[#465FFF] p-2">
                  <h1 className="text-3xl font-bold text-white">7,61</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
