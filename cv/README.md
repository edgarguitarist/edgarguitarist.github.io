# CV — fuente versionable

Currículum de Edgar Laz generado desde una **fuente única de datos** para que las versiones
en inglés y español nunca se desincronicen.

## Archivos

- `data.json` — **la única fuente de verdad**. Edita aquí el contenido (experiencia, skills, etc.).
- `build.mjs` — genera el HTML de ambos idiomas a partir de `data.json`.
- `dist/` — HTML generados (no se versiona; se regenera con el build).

## Generar el HTML

```bash
pnpm cv          # o:  node cv/build.mjs
```

Produce:
- `cv/dist/Edgar_Laz-Developer.html` (EN)
- `cv/dist/Edgar_Laz-Desarrollador.html` (ES)

## Exportar a PDF

Los márgenes y el tamaño **A4** ya están definidos vía `@page` en el HTML.
Tamaño objetivo: **A4** (210×297 mm) — estándar en Ecuador, Latinoamérica y Europa.
No uses Letter (solo estándar en EE. UU./Canadá).

### Opción A — Navegador (rápida)

1. Abre el `.html` en Chrome o Edge.
2. `Ctrl + P` → Destino: **Guardar como PDF**.
3. **Tamaño de papel: A4** · Márgenes: **Predeterminado** ·
   Desactiva **«Encabezados y pies de página»** · Activa **«Gráficos de fondo»**.
4. Guarda como `Edgar_Laz-Developer.pdf` / `Edgar_Laz-Desarrollador.pdf`.

> El `<title>` del HTML se convierte en el **Título** del PDF (metadato correcto),
> a diferencia del PDF anterior que venía de una plantilla de Word con el autor de otra persona.

### Opción B — playwright-cli (reproducible)

`playwright-cli` no carga `file://` y su comando `pdf` exporta en **Letter** por
defecto, así que hay que servir el HTML por HTTP y forzar A4 con `run-code`:

```bash
# 1) Sirve el HTML (p. ej. copiándolo a public/documents/ con `pnpm dev` levantado)
cp cv/dist/Edgar_Laz-Developer.html public/documents/_preview.html

# 2) Abre la página servida y exporta forzando A4
playwright-cli open "http://localhost:3000/documents/_preview.html"
playwright-cli run-code "async page => await page.pdf({ path: 'public/documents/Edgar_Laz-Developer.pdf', format: 'A4', printBackground: true })"

# 3) Limpia el preview
rm public/documents/_preview.html
```

Verifica el tamaño con: `grep -ao 'MediaBox[^]]*]' public/documents/Edgar_Laz-Developer.pdf`
→ debe ser `[0 0 595.x 842.x]` (A4), no `[0 0 612 792]` (Letter).

## Publicar

Los PDF que sirve el sitio viven en `public/documents/` y están enlazados desde
`src/i18n/{en,es}.json` (`footer.curriculum`). Copia ahí los PDF regenerados para actualizarlos.

## Pendiente / mejoras sugeridas

- **Cuantificar logros**: añadir métricas reales a los bullets (tamaño de equipo,
  % de mejora, nº de proyectos/usuarios). Es lo que más peso da ante reclutadores e IA.
