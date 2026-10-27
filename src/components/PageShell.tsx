import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";

/** Estructura común de cada página: menú, contenido, llamada a la acción y pie. */
export default function PageShell({ children, cta = true }: { children: React.ReactNode; cta?: boolean }) {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-background flex-1">
        {children}
        {cta && <CtaBand />}
      </main>
      <Footer />
    </>
  );
}
