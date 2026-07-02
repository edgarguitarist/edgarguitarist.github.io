import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
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
  integrations: [preact()],
  // Tailwind 4 se integra como plugin de Vite (el antiguo @astrojs/tailwind
  // quedó deprecado).
  vite: {
    plugins: [tailwindcss()],
  },
});
