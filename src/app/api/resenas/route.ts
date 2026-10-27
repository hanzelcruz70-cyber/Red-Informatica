import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { resenaSchema } from "@/lib/resenas";

const MAX = 3;
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
        subject: `Nueva reseña (${r.estrellas}★) pendiente de aprobar`,
        html: `
          <h2 style="margin:0 0 12px;">Nueva reseña pendiente</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(r.nombre)}</p>
          <p><strong>Servicio:</strong> ${escapeHtml(r.servicio)}</p>
          <p><strong>Estrellas:</strong> ${"★".repeat(r.estrellas)}${"☆".repeat(5 - r.estrellas)}</p>
          <p style="white-space:pre-wrap;border-left:3px solid #002eb4;padding-left:12px;">${escapeHtml(r.comentario)}</p>
          <p>Apruébala o elimínala desde tu panel privado → pestaña Reseñas.</p>
        `,
      }),
    });
  } catch (e) {
    console.error("Error enviando aviso de reseña:", e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Ya enviaste varias reseñas. Intenta más tarde." }, { status: 429 });
    }
    if (Number(req.headers.get("content-length") ?? "0") > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Reseña demasiado larga." }, { status: 413 });
    }

    const parsed = resenaSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
    }

    const gracias = { ok: true, message: "¡Gracias! Tu reseña se publicará después de revisarla." };
    if (parsed.data.web) return NextResponse.json(gracias, { status: 201 });

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ ok: false, error: "Error del servidor. Intenta más tarde." }, { status: 500 });
    }

    const { nombre, servicio, estrellas, comentario } = parsed.data;
    const { error } = await getSupabaseAdmin()
      .from("resenas")
      .insert({ nombre, servicio, estrellas, comentario, aprobada: false });

    if (error) {
      console.error("resenas insert:", error.message);
      return NextResponse.json({ ok: false, error: "No pudimos guardar tu reseña. Intenta más tarde." }, { status: 500 });
    }

    await avisar({ nombre, servicio, estrellas, comentario });
    return NextResponse.json(gracias, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Error inesperado. Intenta más tarde." }, { status: 500 });
  }
}
