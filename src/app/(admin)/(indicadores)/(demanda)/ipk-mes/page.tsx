import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import IpkMesLO from "@/components/indicadores/demanda/ipkmes/IpkMesLO";
import IpkMesNS from "@/components/indicadores/demanda/ipkmes/IpkMesNS";
import IpkMesSMB from "@/components/indicadores/demanda/ipkmes/IpkMesSMB";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Este é um Site Administrativo do Consórcio BRT",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="IPK por Mês" />
      <div className="space-y-6">
        <ComponentCard title="BRT Norte Sul">
          <IpkMesNS />
        </ComponentCard>

        <ComponentCard title="BRT Leste Oeste">
          <IpkMesLO />
        </ComponentCard>

        <ComponentCard title="SMB">
          <IpkMesSMB />
        </ComponentCard>
      </div>
    </div>
  );
}
