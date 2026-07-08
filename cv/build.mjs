// Genera los CV en HTML (EN/ES) desde una fuente única de datos: cv/data.json
// Uso:  node cv/build.mjs
// Salida: cv/dist/Edgar_Laz-Developer.html  y  cv/dist/Edgar_Laz-Desarrollador.html
//
// Para exportar a PDF (metadatos y márgenes correctos), ver cv/README.md.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, "data.json"), "utf8"));

// Escapa texto para HTML (los datos son de confianza, pero evitamos romper el marcado).
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const CSS = `
  @page { size: A4; margin: 1.3cm 1.5cm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11.5pt;
    line-height: 1.4;
    color: #111;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page { max-width: 21cm; margin: 0 auto; padding: 1.3cm 1.5cm; }
  @media print { .page { padding: 0; max-width: none; } }

  header { text-align: center; margin-bottom: 10px; }
  .name { font-size: 23pt; font-weight: 700; letter-spacing: .3px; margin: 0; }
  .role { font-size: 11.5pt; font-variant: small-caps; letter-spacing: .5px; color: #333; margin: 2px 0 4px; }
  .contact { font-size: 9.5pt; color: #222; }
  .contact a { color: #0b3d91; text-decoration: none; }
  .contact .ci { white-space: nowrap; }
  .contact .sep { color: #999; padding: 0 4px; }

  .summary { font-style: italic; text-align: justify; margin: 8px 0 4px; }

  h2 {
    font-size: 11.5pt;
    text-transform: uppercase;
    letter-spacing: .6px;
    border-bottom: 1px solid #000;
    padding-bottom: 2px;
    margin: 13px 0 6px;
  }

  .entry { margin-bottom: 8px; }
  .entry-head, .entry-sub { display: flex; justify-content: space-between; gap: 12px; }
  .entry-head { font-weight: 700; }
  .entry-sub { font-style: italic; }
  .entry-head .right, .entry-sub .right { white-space: nowrap; }

  ul { margin: 3px 0 0; padding-left: 17px; }
  li { margin-bottom: 2px; text-align: justify; }

  .skills p { margin: 2px 0; }
  .skills .k { font-weight: 700; }

  a { color: inherit; }
`;

function contactLine(s) {
  const tel = `tel:${s.phoneRaw}`;
  const parts = [
    esc(s.location),
    `<a href="${esc(s.linkedin.url)}">${esc(s.linkedin.label)}</a>`,
    `<a href="${esc(s.github.url)}">${esc(s.github.label)}</a>`,
    `<a href="${esc(s.website.url)}">${esc(s.website.label)}</a>`,
    `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>`,
    `<a href="${esc(tel)}">${esc(s.phone)}</a>`,
  ];
  return parts.map((p) => `<span class="ci">${p}</span>`).join('<span class="sep">·</span>');
}

function entry(e) {
  return `
      <div class="entry">
        <div class="entry-head"><span>${esc(e.company)}</span><span class="right">${esc(e.place)}</span></div>
        <div class="entry-sub"><span>${esc(e.title)}</span><span class="right">${esc(e.dates)}</span></div>
        <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
      </div>`;
}

function eduEntry(e) {
  return `
      <div class="entry">
        <div class="entry-head"><span>${esc(e.school)}</span><span class="right">${esc(e.place)}</span></div>
        <div class="entry-sub"><span>${esc(e.degree)}</span><span class="right">${esc(e.dates)}</span></div>
      </div>`;
}

function render(locale) {
  const d = data[locale];
  const s = data.shared;
  return `<!doctype html>
<html lang="${d.lang}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(d.docTitle)}</title>
  <meta name="author" content="${esc(s.name)}" />
  <meta name="description" content="${esc(d.summary)}" />
  <style>${CSS}</style>
</head>
<body>
  <main class="page">
    <header>
      <h1 class="name">${esc(s.name)}</h1>
      <div class="role">${esc(d.role)}</div>
      <div class="contact">${contactLine(s)}</div>
    </header>

    <p class="summary">${esc(d.summary)}</p>

    <section>
      <h2>${esc(d.sections.experience)}</h2>
      ${d.experience.map(entry).join("")}
    </section>

    <section>
      <h2>${esc(d.sections.education)}</h2>
      ${d.education.map(eduEntry).join("")}
    </section>

    <section class="skills">
      <h2>${esc(d.sections.skills)}</h2>
      ${d.skills.map((sk) => `<p><span class="k">${esc(sk.label)}:</span> ${esc(sk.value)}</p>`).join("")}
    </section>
  </main>
</body>
</html>
`;
}

const outDir = join(__dirname, "dist");
mkdirSync(outDir, { recursive: true });

const targets = [
  { locale: "en", file: "Edgar_Laz-Developer.html" },
  { locale: "es", file: "Edgar_Laz-Desarrollador.html" },
];

for (const t of targets) {
  const html = render(t.locale);
  writeFileSync(join(outDir, t.file), html, "utf8");
  console.log(`✓ ${t.file}`);
}
console.log(`\nHTML generado en cv/dist/. Para exportar a PDF, ver cv/README.md`);
