import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import ReviewForm from "@/components/ReviewForm";
import { buscarInvitacion } from "@/lib/resenas";

export const metadata: Metadata = {
  title: "Deja tu reseña",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ResenaInvitacion({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const inv = await buscarInvitacion(token);

  return (
    <PageShell cta={false}>
      <section className="max-w-[40rem] mx-auto px-gutter-mobile md:px-gutter-tablet py-space-3xl space-y-space-lg">
        {!inv ? (
          <Aviso
            titulo="Este enlace no es válido"
            texto="Revisa que copiaste el enlace completo que te enviamos por WhatsApp, o escríbenos para enviarte uno nuevo."
          />
        ) : inv.usada_at ? (
          <Aviso
            titulo="Este enlace ya se usó"
            texto="Cada enlace sirve para dejar una sola reseña. ¡Gracias por tu opinión!"
          />
        ) : (
          <>
            <div className="space-y-space-2xs">
              <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Tu opinión</span>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                ¡Hola, {inv.cliente.split(" ")[0]}!
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Gracias por confiar en RED INFORMÁTICA. ¿Cómo te fue con el servicio? Tu reseña aparecerá como
                verificada porque viene de un trabajo real.
              </p>
            </div>
            <ReviewForm token={token} cliente={inv.cliente} servicio={inv.servicio} />
          </>
        )}
      </section>
    </PageShell>
  );
}

function Aviso({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="rounded-2xl bg-surface-container-lowest shadow-sm p-space-xl text-center space-y-space-sm">
      <h1 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface">{titulo}</h1>
      <p className="font-body-md text-body-md text-on-surface-variant">{texto}</p>
      <Link href="/resenas" className="inline-flex text-primary font-semibold hover:underline">
        Ver reseñas
      </Link>
    </div>
  );
}
