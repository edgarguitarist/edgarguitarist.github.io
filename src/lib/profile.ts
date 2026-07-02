export const GITHUB_USER = "edgarguitarist";

export interface Profile {
  name: string;
  company: string;
  location: string;
  created_at: string;
}

// Fallback mínimo por si la API no responde durante el build. La fecha de
// creación de la cuenta es inmutable, así que sirve de base para los años.
const FALLBACK: Profile = {
  name: "Edgar Laz",
  company: "",
  location: "",
  created_at: "2019-02-04T05:14:18Z",
};

let cache: Profile | null = null;

/**
 * Perfil de GitHub obtenido en build-time (SSR). En el cliente se refresca en
 * vivo con el script de App.astro. Memoizado para no repetir el fetch por página.
 */
export async function getProfile(): Promise<Profile> {
  if (cache) return cache;
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`);
    if (!res.ok) throw new Error(String(res.status));
    const u = await res.json();
    cache = {
      name: u.name || FALLBACK.name,
      company: u.company || "",
      location: u.location || "",
      created_at: u.created_at || FALLBACK.created_at,
    };
  } catch {
    cache = FALLBACK;
  }
  return cache;
}
