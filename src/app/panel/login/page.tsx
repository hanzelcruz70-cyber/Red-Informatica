import { redirect } from "next/navigation";
import { obtenerSesion, panelConfigurado } from "@/lib/panel-auth";
import LoginForm from "@/components/panel/LoginForm";

export default async function LoginPage() {
  if (await obtenerSesion()) redirect("/panel");
  return <LoginForm configurado={panelConfigurado()} />;
}
