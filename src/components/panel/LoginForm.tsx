"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

export default function LoginForm({ configurado }: { configurado: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ver, setVer] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      const r = await fetch("/api/panel/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) {
        setError(d.error ?? "No se pudo iniciar sesión");
        setCargando(false);
        return;
      }
      window.location.href = "/panel";
    } catch {
      setError("Error de conexión");
      setCargando(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-gutter-mobile py-space-2xl bg-[radial-gradient(ellipse_at_top,_#dee1ff_0%,_#f8f9ff_55%)]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-space-xl">
          <Image src="/logo.png" alt="" width={56} height={56} className="h-14 w-14 rounded-xl object-contain mb-space-md" />
          <h1 className="font-headline-sm text-headline-sm text-on-surface">Panel privado</h1>
          <p className="font-label-md text-label-md uppercase text-on-surface-variant mt-space-2xs">RED INFORMÁTICA</p>
        </div>

        <form
          onSubmit={entrar}
          className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-[0_8px_30px_rgba(0,46,180,0.08)] p-space-lg space-y-space-md"
        >
          {!configurado && (
            <p className="text-body-sm bg-[#fff4e5] dark:bg-[#3a2a0f] text-[#7a4a00] dark:text-[#f6c87a] border border-[#f3d29b] dark:border-[#6b4f1d] rounded-xl p-space-sm">
              Faltan las variables <code className="font-label-md">ADMIN_EMAIL</code>,{" "}
              <code className="font-label-md">ADMIN_PASSWORD_HASH</code> y{" "}
              <code className="font-label-md">ADMIN_SESSION_SECRET</code>.
            </p>
          )}

          <label className="block">
            <span className="block font-label-lg text-label-lg text-on-surface mb-space-2xs">Correo</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-space-sm rounded-xl border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container text-body-md"
            />
          </label>

          <label className="block">
            <span className="block font-label-lg text-label-lg text-on-surface mb-space-2xs">Contraseña</span>
            <div className="relative">
              <input
                type={ver ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-space-sm pr-11 rounded-xl border border-outline-variant bg-surface focus:outline-none focus:ring-2 focus:ring-primary-container/40 focus:border-primary-container text-body-md"
              />
              <button
                type="button"
                onClick={() => setVer((v) => !v)}
                className="absolute right-1 top-1 h-9 w-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container"
                aria-label={ver ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {ver ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {error && (
            <p role="alert" className="text-body-sm text-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full h-11 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-semibold flex items-center justify-center gap-space-xs transition-colors disabled:opacity-60"
          >
            {cargando ? <Loader2 size={18} className="animate-spin" /> : <Lock size={16} />}
            Entrar
          </button>
        </form>

        <p className="text-center text-body-sm text-on-surface-variant mt-space-lg">
          <a href="/" className="hover:text-primary">← Volver al sitio</a>
        </p>
      </div>
    </main>
  );
}
