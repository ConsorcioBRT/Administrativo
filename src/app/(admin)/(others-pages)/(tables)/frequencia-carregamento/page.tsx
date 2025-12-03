import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FrequenciaCarregamento from "@/components/tables/frequencia-carregamento/FrequenciaCarregamento";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Esse é o Portal Administrador do Consórcio BRT",
  // other metadata
};

export default function FrequenciaDeCarregamento() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Nansen" />
      <div className="space-y-6">
        <ComponentCard title="API Nansen - Frequência de Carregamento">
          <FrequenciaCarregamento />
        </ComponentCard>
      </div>
    </div>
  );
}
