import { redirect } from "next/navigation";
import { obtenerSesion } from "@/lib/panel-auth";
import PanelApp from "@/components/panel/PanelApp";

export default async function PanelPage() {
  const sesion = await obtenerSesion();
  if (!sesion) redirect("/panel/login");
  return <PanelApp email={sesion.email} />;
}
