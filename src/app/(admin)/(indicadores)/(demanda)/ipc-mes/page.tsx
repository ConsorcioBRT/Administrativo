import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import IpcMesLO from "@/components/indicadores/demanda/ipcmes/IpcMesLO";
import IpcMesNS from "@/components/indicadores/demanda/ipcmes/IpcMesNS";
import IpcMesSMB from "@/components/indicadores/demanda/ipcmes/IpcMesSMB";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Este é um Site Administrativo do Consórcio BRT",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="IPC por Mês" />
      <div className="space-y-6">
        <ComponentCard title="BRT Norte Sul">
          <IpcMesNS />
        </ComponentCard>

        <ComponentCard title="BRT Leste Oeste">
          <IpcMesLO />
        </ComponentCard>

        <ComponentCard title="SMB">
          <IpcMesSMB />
        </ComponentCard>
      </div>
    </div>
  );
}
