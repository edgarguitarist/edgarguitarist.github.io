# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Portfolio personal de Edgar Mariano Laz Terán, construido con **Astro 7** (sitio estático) y desplegado en GitHub Pages en `https://edgarguitarist.github.io`. Usa Preact para islas interactivas, **Tailwind 4** para estilos e **i18n nativo de Astro** para internacionalización (inglés/español). Requiere **Node ≥ 22.12**.

## Commands

```bash
pnpm install              # instalar dependencias (el proyecto usa pnpm)
pnpm dev                  # servidor de desarrollo en localhost:3000 (puerto fijado en astro.config.mjs)
pnpm build                # build de producción a ./dist/ (genera / y /es/)
pnpm preview              # previsualizar el build
pnpm scrape               # scrapea la API de GitHub y escribe db/*.json (requiere TOKEN)
```

No hay tests ni linter configurados.

## Arquitectura

### Internacionalización (i18n) — nativa de Astro

- **Enrutado:** i18n nativo configurado en `astro.config.mjs` (`defaultLocale: "en"`, `locales: ["en","es"]`, `prefixDefaultLocale: false`). El locale se deriva de la URL (`/` = en, `/es/` = es) y se lee con **`Astro.currentLocale`**.
- **Textos:** NO se usa i18next ni astro-i18next (ambos eliminados). Los diccionarios viven en `src/i18n/{en,es}.json` y se acceden **por objeto**: `const ui = getUI(Astro.currentLocale)` (helper en `src/i18n/ui.ts`), luego `ui.index.about.greeting`. `getUI` solo selecciona el diccionario del locale (fallback a `en`) y su tipo `UI` da autocompletado.
- Hay una página por idioma: `src/pages/index.astro` (en) y `src/pages/es/index.astro` (es), con contenido idéntico. Ya **no** llaman a `changeLanguage()` ni importan ningún init.
- **Las islas Preact (`.tsx`) no tienen acceso a `Astro.currentLocale`** (es API de servidor). Resolver los textos en el `.astro` padre y pasarlos ya traducidos como props (ver `src/components/sections/Projects.astro` → `projectsPart.tsx`).

### Fuentes de datos

Hay tres orígenes distintos de datos:

1. **Repos en vivo** (`src/components/parts/projectsPart.tsx`): la sección Projects consulta los repositorios directamente desde la API de GitHub **en el cliente** (`https://api.github.com/users/edgarguitarist/repos`), sin scraping ni rebuild. Filtra los forks y los repos de perfil (`edgarguitarist`) y portfolio (`edgarguitarist.github.io`), y ordena por estrellas. Usa la API pública (1 petición, sin token).
2. **Perfil** (`db/user.json`): nombre, empresa, ubicación y fecha de creación, usados por Aboutme y Footer. Es un JSON **estático** commiteado (ya no hay scraping); editar a mano si cambia. Alias `@db/user.json`.
3. **Datos estáticos i18n** (`src/data/*.json`): `experience.json`, `langs.json`, `libs.json`, `dbs.json`. `experience.json` está estructurado por locale (`{ "en": {...}, "es": {...} }`); seleccionar la clave con `Astro.currentLocale`.

### Componentes

- **`.astro`** = secciones estáticas renderizadas en servidor (`src/components/sections/`, `src/layouts/`).
- **`.tsx` (Preact)** = islas interactivas (lista de proyectos consultada en vivo, botones de idioma), hidratadas con `client:load`.
- `src/layouts/App.astro` es el shell HTML (head, Navbar con selector de idioma, Footer). `src/layouts/Sections.astro` envuelve cada sección con título.
- La estructura de la página vive en `src/pages/index.astro`: `<Aboutme>`, `<Experience>`, `<Projects>`, `<Knowledge>`.
- **Iconos:** SVG inline como componentes `.astro` en `src/icons/` (no se usa `astro-icon`). Los assets de `public/` se referencian por URL string (`<img src="/svg/...">`), **no** con `import` (Astro moderno lo rechaza).

### Estilos

**Tailwind 4** vía el plugin de Vite `@tailwindcss/vite` (no `@astrojs/tailwind`). Config CSS-first en `src/styles/global.css`:
- `@import "tailwindcss";`
- Dark mode basado en clase con `@custom-variant dark (&:where(.dark, .dark *));` (el toggle añade `.dark` a `<html>` desde el script del Navbar).
- Tokens de marca con `@theme` (`--color-brand-purple`, `--color-brand-pink`, `--color-ink`).
- Utilidades custom como CSS plano (`gradient-text`, `noise`, `border-gradient`, `experience-card`, animaciones, etc.). **No** hay `tailwind.config.js`.

### Alias de imports (tsconfig.json)

`@components/*`, `@layouts/*`, `@pages/*`, `@public/*`, `@styles/*`, `@utils/*`, `@types/*`, `@data/*`, `@hooks/*`, `@db/*`, `@icons/*`, `@i18n/*`.

## Despliegue (CI/CD)

- `.github/workflows/astro.yml`: se dispara al hacer push a `main`; usa **pnpm + Node 22**, hace build y despliega a GitHub Pages.

No hay proceso de scraping ni redespliegue programado: los repositorios se consultan en vivo desde el navegador, así que la lista de proyectos se mantiene al día sin rebuild.
