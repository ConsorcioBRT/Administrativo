import ControleVelocidadeChart from "@/components/charts/controle-velocidade-chart/ControleVelocidadeChart";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Este é um Site Administrativo do Consórcio BRT",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Controle de Velocidade" />
      <div className="space-y-6">
        <ComponentCard title="Controle de Velocidade">
          <ControleVelocidadeChart />
        </ComponentCard>
      </div>
    </div>
  );
}
