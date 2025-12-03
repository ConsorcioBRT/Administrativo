import ResetPwdForm from "@/components/auth/ResetPwdForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Página de Login para o Dashboard do Consórcio BRT",
};

export default function ResetPassword() {
  return <ResetPwdForm />;
}
