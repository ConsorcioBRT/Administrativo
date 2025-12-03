import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UsuariosAdicionados from "@/components/tables/usuarios-adicionados/UsuariosAdicionados";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Esse é o Portal Administrador do Consórcio BRT",
  // other metadata
};

export default function ListaDeUsuariosAdicionados() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Nansen" />
      <div className="space-y-6">
        <ComponentCard title="API Nansen - Usuários Adicionados">
          <UsuariosAdicionados />
        </ComponentCard>
      </div>
    </div>
  );
}
