import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Carregadores from "@/components/tables/carregadores/Carregadores";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Esse é o Portal Administrador do Consórcio BRT",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Nansen" />
      <div className="space-y-6">
        <ComponentCard title="API Nansen - Carregadores">
          <Carregadores />
        </ComponentCard>
      </div>
    </div>
  );
}
