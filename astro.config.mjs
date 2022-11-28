import { defineConfig } from 'astro/config';
import astroI18next from "astro-i18next";
// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [astroI18next(), tailwind(), preact()],
  site: 'https://edgarguitarist.github.io'
});