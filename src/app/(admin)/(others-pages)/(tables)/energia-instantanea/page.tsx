import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EnergiaInstantanea from "@/components/tables/energia-instantanea/EnergiaInstantanea";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Esse é o Portal Administrador do Consórcio BRT",
  // other metadata
};

export default function EnergiasInstantaneas() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Nansen" />
      <div className="space-y-6">
        <ComponentCard title="API Nansen - Carregadores">
          <EnergiaInstantanea />
        </ComponentCard>
      </div>
    </div>
  );
}
