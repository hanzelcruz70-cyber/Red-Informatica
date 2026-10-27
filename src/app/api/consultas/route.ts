import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { consultaSchema } from "@/lib/validation";

const MAX = 5;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 10 * 1024;
const hits = new Map<string, { count: number; reset: number }>();

const SERVICIO_LABELS: Record<string, string> = {
  reparacion: "Reparación de Computadora / Laptop",
  optimizacion: "Optimización y Mantenimiento SSD",
  software: "Instalación de Software & OS",
  web: "Diseño y Desarrollo de Página Web",
  "soporte-integral": "Soporte Corporativo Integral",
};

const AMP = String.fromCharCode(38);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, AMP + "amp;")
    .replace(/</g, AMP + "lt;")
    .replace(/>/g, AMP + "gt;")
    .replace(/"/g, AMP + "quot;");
}

async function enviarNotificacion(consulta: {
  nombre: string;
  telefono: string;
  email: string;
  servicio: string;
  mensaje: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const servicioLabel = SERVICIO_LABELS[consulta.servicio] ?? consulta.servicio;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Consultas RED INFORMÁTICA <onboarding@resend.dev>",
        to: [process.env.NOTIFY_EMAIL ?? "redinformaticatotal@gmail.com"],
        subject: `Nueva consulta técnica — ${servicioLabel}`,
        html: `
          <h2 style="margin:0 0 12px;">Nueva consulta desde la web</h2>
          <p><strong>Servicio:</strong> ${escapeHtml(servicioLabel)}</p>
          <p><strong>Nombre:</strong> ${escapeHtml(consulta.nombre)}</p>
          <p><strong>Teléfono / WhatsApp:</strong> ${escapeHtml(consulta.telefono)}</p>
          <p><strong>Correo:</strong> ${escapeHtml(consulta.email)}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap;border-left:3px solid #002eb4;padding-left:12px;">${escapeHtml(consulta.mensaje)}</p>
        `,
      }),
    });
  } catch (e) {
    console.error("Error enviando notificación por email:", e);
  }
}

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [key, value] of hits) {
      if (now > value.reset) hits.delete(key);
    }
  }
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Demasiadas solicitudes. Intenta de nuevo más tarde." },
        { status: 429 }
      );
    }

    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Solicitud demasiado grande." }, { status: 413 });
    }

    const body = await req.json().catch(() => null);
    const parsed = consultaSchema.safeParse(body);

    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json({ ok: false, error: first?.message ?? "Datos inválidos" }, { status: 400 });
    }

    if (parsed.data.web) {
      return NextResponse.json(
        { ok: true, message: "¡Solicitud recibida! Te contactaremos a la brevedad." },
        { status: 201 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ ok: false, error: "Error del servidor. Intenta por WhatsApp." }, { status: 500 });
    }

    const { nombre, telefono, email, servicio, mensaje } = parsed.data;

    const { error } = await getSupabaseAdmin().from("consultas").insert({
      nombre,
      telefono,
      email,
      servicio,
      mensaje,
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ ok: false, error: "No pudimos guardar tu consulta. Intenta por WhatsApp." }, { status: 500 });
    }

    await enviarNotificacion({ nombre, telefono, email, servicio, mensaje });

    return NextResponse.json({ ok: true, message: "¡Solicitud recibida! Te contactaremos a la brevedad." }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Error inesperado. Intenta por WhatsApp." }, { status: 500 });
  }
}
