import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PassageirosTipoLO from "@/components/indicadores/demanda/passageirostipo/PassageirosTipoLO";
import PassageirosTipoNS from "@/components/indicadores/demanda/passageirostipo/PassageirosTipoNS";
import PassageirosTipoSMB from "@/components/indicadores/demanda/passageirostipo/PassageirosTipoSMB";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Este é um Site Administrativo do Consórcio BRT",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Passageiros por tipo/dia" />
      <div className="space-y-6">
        <ComponentCard title="BRT Norte Sul" headerBg="bg-[#D1883B]">
          <PassageirosTipoNS />
        </ComponentCard>

        <ComponentCard title="BRT Leste Oeste" headerBg="bg-[#90D431]">
          <PassageirosTipoLO />
        </ComponentCard>

        <ComponentCard title="SMB" headerBg="bg-[#106BEF]">
          <PassageirosTipoSMB />
        </ComponentCard>
      </div>
    </div>
  );
}
