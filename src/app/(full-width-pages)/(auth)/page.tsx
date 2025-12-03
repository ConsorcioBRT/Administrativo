import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consórcio BRT",
  description: "Página de Login para o Dashboard do Consórcio BRT",
};

export default function SignIn() {
  return <SignInForm />;
}
