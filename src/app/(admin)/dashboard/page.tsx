import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlySalesChart from "@/components/ecommerce/FaturamentoChart";
import MapaCharts from "@/components/ecommerce/MapaChart";
import DisponibilidadeConectores from "@/components/ecommerce/DisponibilidadeConectoresChart";
import RecargasPorPeriodo from "@/components/ecommerce/RecargasPorPeriodoChart";
import TempoPermanencia from "@/components/ecommerce/TempoPermanenciaChart";
import EnergiaInstantaneaChart from "@/components/ecommerce/EnergiaInstantaneaChart";
import PotenciaInstantaneaChart from "@/components/ecommerce/PotenciaInstantaneaChart";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Este é um Site Administrativo do Consórcio BRT",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6">
        <EcommerceMetrics />

        <div className="grid grid-cols-3 gap-4">
          <MonthlySalesChart />
          <MapaCharts />
          <DisponibilidadeConectores />
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-2 gap-4">
        <RecargasPorPeriodo />
        <TempoPermanencia />
      </div>

      <div className="col-span-12 grid grid-cols-2 gap-4">
        <EnergiaInstantaneaChart />
        <PotenciaInstantaneaChart />
      </div>
    </div>
  );
}
