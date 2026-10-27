import { chromium } from 'playwright';
import fs from 'fs';
const BASE = 'https://red-informatica.com';
fs.mkdirSync('out', { recursive: true });
const browser = await chromium.launch();

async function settle(page) {
  // fuerza la carga de imágenes "lazy" y videos con poster
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(1200);
}

async function shoot(name, path, { mobile = true, dark = false, full = true, extra } = {}) {
  const ctx = await browser.newContext(
    mobile
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'es-NI', colorScheme: dark ? 'dark' : 'light' }
      : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, locale: 'es-NI', colorScheme: dark ? 'dark' : 'light' }
  );
  await ctx.addInitScript((d) => { try { localStorage.setItem('tema', d ? 'oscuro' : 'claro'); } catch (e) {} }, dark);
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
  await settle(page);
  // la cabecera es fija: en capturas de página completa la dejamos solo arriba
  if (full) {
    await page.addStyleTag({ content: 'header{position:absolute!important}' });
    await page.screenshot({ path: `out/${name}.png`, fullPage: true });
  } else {
    await page.screenshot({ path: `out/${name}.png` });
  }
  if (extra) await extra(page, name);
  await ctx.close();
  console.log('ok', name);
}

for (const dark of [false, true]) {
  const sfx = dark ? '_dark' : '';
  await shoot('m_home' + sfx, '/', { dark });
  await shoot('m_home_top' + sfx, '/', { dark, full: false });
  await shoot('m_programas' + sfx, '/programas', { dark });
  await shoot('m_casos' + sfx, '/casos', { dark });
  await shoot('m_resenas' + sfx, '/resenas', { dark });
  await shoot('m_contacto' + sfx, '/contacto', { dark });
  await shoot('m_servicios' + sfx, '/servicios', { dark });
  await shoot('d_home' + sfx, '/', { dark, mobile: false, full: false });
  await shoot('d_home_full' + sfx, '/', { dark, mobile: false });
  await shoot('d_programas' + sfx, '/programas', { dark, mobile: false, full: false });
}

// tarjeta de programa: normal y con el botón "Reservar" en hover (verde)
await shoot('m_prog_hover', '/programas', {
  full: false,
  extra: async (page) => {
    const btn = page.locator('a:has-text("Reservar")').nth(2);
    await btn.scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -120));
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'out/m_prog_view.png' });
    const box = await btn.boundingBox();
    fs.writeFileSync('out/m_prog_btn.json', JSON.stringify(box));
    await btn.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'out/m_prog_view_hover.png' });
  },
});

// posiciones útiles (para animar toques/cursor en el video)
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const info = await page.evaluate(() => {
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: b.x, y: b.y + window.scrollY, w: b.width, h: b.height }; };
  return {
    toggle: r(document.querySelector('header button[aria-label]')),
    wa: r(document.querySelector('header a[aria-label*=WhatsApp]')),
    h: document.body.scrollHeight,
  };
});
fs.writeFileSync('out/info.json', JSON.stringify(info, null, 1));
await browser.close();
