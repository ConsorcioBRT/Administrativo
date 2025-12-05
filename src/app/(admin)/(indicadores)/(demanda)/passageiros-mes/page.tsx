import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PassageirosMesLO from "@/components/indicadores/demanda/passageirosmes/PassageirosMesLO";
import PassageirosMesNS from "@/components/indicadores/demanda/passageirosmes/PassageirosMesNS";
import PassageirosMesSMB from "@/components/indicadores/demanda/passageirosmes/PassageirosMesSMB";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Este é um Site Administrativo do Consórcio BRT",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Passageiros/Mês" />
      <div className="space-y-6">
        <ComponentCard title="BRT Norte Sul" headerBg="bg-[#D1883B]">
          <PassageirosMesNS />
        </ComponentCard>

        <ComponentCard title="BRT Leste Oeste" headerBg="bg-[#90D431]">
          <PassageirosMesLO />
        </ComponentCard>

        <ComponentCard title="SMB" headerBg="bg-[#106BEF]">
          <PassageirosMesSMB />
        </ComponentCard>
      </div>
    </div>
  );
}
