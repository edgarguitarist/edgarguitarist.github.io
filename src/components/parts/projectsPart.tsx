import { useEffect, useState } from "preact/hooks";
import ProjectsCard from "@components/cards/projectsCard";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
}

interface Labels {
  loading: string;
  error: string;
  empty: string;
  noDescription: string;
  stars: string;
  site: string;
}

interface Props {
  user: string;
  labels: Labels;
}

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; repos: Repo[] };

// GitHub guarda "homepage" tal cual lo escribió el usuario (a veces sin http://).
// Un href sin esquema se resolvería como ruta relativa del propio sitio (404).
function safeUrl(url: string | null): string | null {
  const t = (url ?? "").trim();
  if (!t) return null;
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

export default function ProjectsPart({ user, labels }: Props) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let alive = true;
    // Se ocultan el repo de perfil (README) y este mismo portfolio.
    const excluded = new Set([
      user.toLowerCase(),
      `${user.toLowerCase()}.github.io`,
    ]);

    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error(String(res.status)))
      )
      .then((data: Repo[]) => {
        if (!alive) return;
        const repos = data
          .filter((r) => !r.fork && !excluded.has(r.name.toLowerCase()))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setState({ status: "ready", repos });
      })
      .catch(() => {
        if (alive) setState({ status: "error" });
      });

    return () => {
      alive = false;
    };
  }, [user]);

  const grid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10";

  if (state.status === "loading") {
    return (
      <div
        className={grid}
        role="status"
        aria-busy="true"
        aria-label={labels.loading}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            class="h-44 rounded-2xl border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/[0.03] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div class="mt-10 flex flex-col items-center gap-3">
        <p class="text-center dark:text-gray-400 text-gray-500">
          {labels.error}
        </p>
        <a
          href={`https://github.com/${user}`}
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black"
        >
          <img src="/svg/github.svg" alt="" class="w-4 h-4" />
          github.com/{user}
        </a>
      </div>
    );
  }

  if (state.repos.length === 0) {
    return (
      <p class="mt-10 text-center dark:text-gray-400 text-gray-500">
        {labels.empty}
      </p>
    );
  }

  return (
    <div className={grid}>
      {state.repos.map((repo) => (
        <ProjectsCard
          key={repo.id}
          name={repo.name}
          repo_url={repo.html_url}
          site={safeUrl(repo.homepage)}
          description={repo.description ?? labels.noDescription}
          language={repo.language}
          stars={repo.stargazers_count}
          starsLabel={labels.stars}
          siteLabel={labels.site}
        />
      ))}
    </div>
  );
}
