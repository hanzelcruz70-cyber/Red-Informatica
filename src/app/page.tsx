import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import Shortcuts from "@/components/Shortcuts";
import Pillars from "@/components/Pillars";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <Shortcuts />
      <Pillars />
    </PageShell>
  );
}
