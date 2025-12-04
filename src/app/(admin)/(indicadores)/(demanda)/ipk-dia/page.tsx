import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import IpkDiaLO from "@/components/indicadores/demanda/ipkdia/IpkDiaLO";
import IpkDiaNS from "@/components/indicadores/demanda/ipkdia/IpkDiaNS";
import IpkDiaSMB from "@/components/indicadores/demanda/ipkdia/IpkDiaSMB";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Este é um Site Administrativo do Consórcio BRT",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="IPK por Dia" />
      <div className="space-y-6">
        <ComponentCard title="BRT Norte Sul">
          <IpkDiaNS />
        </ComponentCard>

        <ComponentCard title="BRT Leste Oeste">
          <IpkDiaLO />
        </ComponentCard>

        <ComponentCard title="SMB">
          <IpkDiaSMB />
        </ComponentCard>
      </div>
    </div>
  );
}
