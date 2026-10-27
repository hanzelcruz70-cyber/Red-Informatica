import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import Shortcuts from "@/components/Shortcuts";
import Pillars from "@/components/Pillars";
import MapSection from "@/components/MapSection";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Shortcuts />
      <Pillars />
      <MapSection />
    </PageShell>
  );
}
