import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { buscarInvitacion, resenaSchema } from "@/lib/resenas";

const MAX = 5;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_BODY_BYTES = 4 * 1024;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
  }
  const e = hits.get(ip);
  if (!e || now > e.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  e.count++;
  return e.count > MAX;
}

const AMP = String.fromCharCode(38);
const escapeHtml = (v: string) =>
  v.replace(/&/g, AMP + "amp;").replace(/</g, AMP + "lt;").replace(/>/g, AMP + "gt;").replace(/"/g, AMP + "quot;");

async function avisar(r: { nombre: string; servicio: string; estrellas: number; comentario: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Reseñas RED INFORMÁTICA <onboarding@resend.dev>",
        to: [process.env.NOTIFY_EMAIL ?? "redinformaticatotal@gmail.com"],
        subject: `Nueva reseña verificada (${r.estrellas}★) de ${r.nombre}`,
        html: `
          <h2 style="margin:0 0 12px;">Nueva reseña verificada publicada</h2>
          <p><strong>Cliente:</strong> ${escapeHtml(r.nombre)}</p>
          <p><strong>Servicio:</strong> ${escapeHtml(r.servicio)}</p>
          <p><strong>Estrellas:</strong> ${"★".repeat(r.estrellas)}${"☆".repeat(5 - r.estrellas)}</p>
          <p style="white-space:pre-wrap;border-left:3px solid #002eb4;padding-left:12px;">${escapeHtml(r.comentario)}</p>
          <p>Ya está publicada en red-informatica.com/resenas. Desde tu panel puedes responderla u ocultarla.</p>
        `,
      }),
    });
  } catch (e) {
    console.error("Error enviando aviso de reseña:", e);
  }
}

/** Solo acepta reseñas que traen un token de invitación válido y sin usar. */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });
    }
    if (Number(req.headers.get("content-length") ?? "0") > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Reseña demasiado larga." }, { status: 413 });
    }

    const parsed = resenaSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
    }
    if (parsed.data.web) return NextResponse.json({ ok: true, message: "¡Gracias por tu reseña!" }, { status: 201 });

    const inv = await buscarInvitacion(parsed.data.token);
    if (!inv) {
      return NextResponse.json({ ok: false, error: "Este enlace de reseña no existe." }, { status: 404 });
    }
    if (inv.usada_at) {
      return NextResponse.json({ ok: false, error: "Este enlace ya se usó para dejar una reseña." }, { status: 409 });
    }

    const sb = getSupabaseAdmin();
    const { nombre, ciudad, estrellas, comentario } = parsed.data;

    // Marca la invitación como usada primero (solo si sigue sin usar), para evitar dobles envíos.
    const { data: marcada, error: e1 } = await sb
      .from("resena_invitaciones")
      .update({ usada_at: new Date().toISOString() })
      .eq("id", inv.id)
      .is("usada_at", null)
      .select("id")
      .maybeSingle();
    if (e1 || !marcada) {
      return NextResponse.json({ ok: false, error: "Este enlace ya se usó para dejar una reseña." }, { status: 409 });
    }

    const { data: resena, error } = await sb
      .from("resenas")
      .insert({
        nombre,
        ciudad,
        servicio: inv.servicio,
        estrellas,
        comentario,
        aprobada: true,
        verificada: true,
        invitacion_id: inv.id,
      })
      .select("id")
      .single();

    if (error || !resena) {
      console.error("resenas insert:", error?.message);
      await sb.from("resena_invitaciones").update({ usada_at: null }).eq("id", inv.id);
      return NextResponse.json({ ok: false, error: "No pudimos guardar tu reseña. Intenta de nuevo." }, { status: 500 });
    }

    await sb.from("resena_invitaciones").update({ resena_id: resena.id }).eq("id", inv.id);
    revalidatePath("/resenas");
    await avisar({ nombre, servicio: inv.servicio, estrellas, comentario });

    return NextResponse.json({ ok: true, message: "¡Gracias! Tu reseña ya está publicada." }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Error inesperado. Intenta más tarde." }, { status: 500 });
  }
}
