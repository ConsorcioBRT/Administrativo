import NovaPesquisaChart from "@/components/charts/nova-pesquisa/NovaPesquisaChart";
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
      <PageBreadcrumb pageTitle="Nova Pesquisa Ônibus" />
      <div className="space-y-6">
        <ComponentCard title="Pesquisa Ônibus">
          <NovaPesquisaChart />
        </ComponentCard>
      </div>
    </div>
  );
}
