// Genera las variables de acceso del panel privado.
// Uso:  node scripts/crear-acceso.mjs
// Te pide tu correo y contraseña y te imprime las 3 líneas para .env.local y Vercel.

import { randomBytes, scryptSync } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = createInterface({ input: stdin, output: stdout });
const email = (await rl.question("Correo para entrar al panel: ")).trim().toLowerCase();
const pass = await rl.question("Contraseña (mínimo 10 caracteres): ");
rl.close();

if (!email.includes("@")) {
  console.error("\n✗ Correo inválido");
  process.exit(1);
}
if (pass.length < 10) {
  console.error("\n✗ La contraseña debe tener al menos 10 caracteres");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(pass, salt, 64).toString("hex");
const secret = randomBytes(48).toString("base64url");

console.log("\n✓ Copia estas 3 líneas en tu .env.local y en Vercel (Settings → Environment Variables):\n");
console.log(`ADMIN_EMAIL=${email}`);
console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString("hex")}:${hash}`);
console.log(`ADMIN_SESSION_SECRET=${secret}`);
console.log("\nLa contraseña NO se guarda en ningún lado, solo su hash.\n");
