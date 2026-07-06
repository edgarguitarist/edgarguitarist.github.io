import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://edgarguitarist.github.io",
  // Puerto de dev (Astro cambió el default a 4321; lo fijamos como antes).
  server: { port: 3000 },
  // i18n nativo de Astro: el locale se deriva de la URL (/ = en, /es/ = es)
  // y se lee con Astro.currentLocale. Sin prefijo para el idioma por defecto.
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    preact(),
    // Genera sitemap-index.xml + sitemap-0.xml con alternates hreflang (en/es)
    // gracias a la config i18n; robots.txt (en public/) apunta a este índice.
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],
  // Tailwind 4 se integra como plugin de Vite (el antiguo @astrojs/tailwind
  // quedó deprecado).
  vite: {
    plugins: [tailwindcss()],
  },
});
