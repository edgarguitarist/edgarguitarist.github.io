import en from "./en.json";
import es from "./es.json";

// Diccionarios de textos por idioma. La estructura de en.json es la fuente de
// verdad del tipo (ambos ficheros deben tener las mismas claves).
const dictionaries = { en, es };

export type Locale = keyof typeof dictionaries;
export type UI = typeof en;

/**
 * Devuelve el diccionario de textos para el locale dado (fallback a "en").
 * Uso con el i18n nativo de Astro:  const ui = getUI(Astro.currentLocale);
 * y luego acceso directo por objeto:  ui.index.about.greeting
 */
export function getUI(locale: string | undefined): UI {
  return (dictionaries[locale as Locale] ?? dictionaries.en) as UI;
}

/**
 * Interpola variables en un texto de traducción. Reemplaza los marcadores
 * `{clave}` por el valor correspondiente. Admite:
 *   - posicionales con un array:  format(ui.index.about.bio, [anios])   // {0}
 *   - nombrados con un objeto:    format(txt, { years: anios })          // {years}
 * Si falta un valor, el marcador se deja intacto.
 */
export function format(
  template: string,
  params: Record<string, unknown> | unknown[] = {}
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = Array.isArray(params) ? params[Number(key)] : params[key];
    return value !== undefined && value !== null ? String(value) : match;
  });
}
