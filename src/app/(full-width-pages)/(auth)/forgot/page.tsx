import ForgetForm from "@/components/auth/ForgetForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Página de Login para o Dashboard do Consórcio BRT",
  // other metadata
};

export default function ForgotPassword() {
  return <ForgetForm />;
}
