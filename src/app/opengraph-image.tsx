import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "RED INFORMÁTICA — Soluciones Tecnológicas Integrales";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBuffer = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #002eb4 0%, #1242e6 60%, #0032c3 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 60,
            width: 140,
            height: 140,
            borderRadius: 9999,
            background: "rgba(87, 223, 254, 0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 60,
            width: 110,
            height: 110,
            borderRadius: 9999,
            background: "rgba(255, 255, 255, 0.08)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 26 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 6,
            }}
          >
            <img src={logoSrc} width={60} height={60} style={{ objectFit: "contain" }} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#dee1ff", letterSpacing: 2 }}>
            RED INFORMÁTICA
          </div>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            maxWidth: 620,
          }}
        >
          Soluciones Tecnológicas Integrales
        </div>

        <div
          style={{
            fontSize: 21,
            fontWeight: 500,
            color: "#c4ccff",
            marginTop: 22,
            maxWidth: 620,
          }}
        >
          Soporte Técnico · Reparación de Hardware · Optimización · Diseño Web
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 30,
            fontSize: 19,
            fontWeight: 700,
            color: "#57dffe",
          }}
        >
          <div style={{ width: 40, height: 4, background: "#57dffe", borderRadius: 2, display: "flex" }} />
          Diagnóstico express · Garantía por escrito
          <div style={{ width: 40, height: 4, background: "#57dffe", borderRadius: 2, display: "flex" }} />
        </div>
      </div>
    ),
    size
  );
}
