import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Usuarios from "@/components/tables/usuarios/Usuarios";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Esse é o Portal Administrador do Consórcio BRT",
  // other metadata
};

export default function ListaDeUsuarios() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Nansen" />
      <div className="space-y-6">
        <ComponentCard title="API Nansen - Lista de Usuários">
          <Usuarios />
        </ComponentCard>
      </div>
    </div>
  );
}
