import { useEffect, useState } from "preact/hooks";
import ProjectsCard from "@components/cards/projectsCard";
import repos from "@db/repos.json";
import { t } from "i18next";
import clearfilter from "/svg/clearfilter.svg";

export default function ProjectsPart({ forked }: any) {
  const initialRepositories = repos.filter((r) => r.fork === forked);
  const [repositories, setRepositories] = useState(initialRepositories);
  const [elementos, setElementos] = useState("");

  useEffect(() => {
    filtro.metodo(JSON.parse(localStorage.getItem(filtro.tipo) ?? "[]"));
  }, []);

  const filtro = {
    tipo: forked ? "forks" : "repositories",
    metodo: (language: string[]) => {
      const elementosToText = language.join(", ");
      setElementos(elementosToText);
      if (language.length === 0) return setRepositories(initialRepositories);
      const filteredRepos = initialRepositories.filter((r) => {
        const l = new Set(language);
        return Object.keys(r.languages).some((lang: string) => l.has(lang));
      });
      window.location.hash = filtro.tipo;
      setRepositories(filteredRepos);
    },
    clear: () => {
      setElementos("");
      setRepositories(initialRepositories);
      localStorage.setItem(filtro.tipo, JSON.stringify([]));
      window.location.hash = filtro.tipo;
    },
  };

  const sectionName = !forked
    ? t("index.projects.repositories")
    : t("index.projects.forks");

  return (
    <div id={sectionName.toLocaleLowerCase()} class=" pt-7">
      <h2 class="font-bold flex  text-3xl mt-10 text-left dark:text-white text-black">
        {sectionName}
        {elementos && (
          <div class="flex w-full place-content-between">
            <span class="text-xl ml-3 font-semibold text-gray-500 dark:text-gray-400 self-center">
              {t("index.projects.with")} ({elementos}){" = "}
              {
                repositories.filter(
                  (r) =>
                    !r.name.includes("prueba") &&
                    !r.name.includes("portfolio") &&
                    !r.name.includes("edgarguitarist")
                ).length
              }
            </span>
            <button
              class="bg-slate-800 hover:bg-black px-4 rounded-lg text-white font-semibold flex items-center gap-1 text-sm"
              onClick={filtro.clear}
            >
              <img
                src={clearfilter}
                alt={t("index.projects.clear") ?? "clear filters"}
                class="w-6 h-6 text-white mr-1"
              />
              {t("index.projects.clear")}
            </button>
          </div>
        )}
      </h2>

      <div class="flex justify-around flex-wrap gap-10 mt-10">
        {repositories
          .filter(
            (r) =>
              !r.name.includes("prueba") &&
              !r.name.includes("portfolio") &&
              !r.name.includes("edgarguitarist")
          )
          .map((repo) => {
            return (
              <ProjectsCard
                key={repo.id}
                name={repo.name}
                repo_url={repo.html_url}
                site={repo.homepage}
                description={repo.description ?? ""}
                contributor={repo.contributor as Contributor}
                languages={repo.languages}
                stars={repo.stargazers_count}
                filtro={filtro}
              />
            );
          })}
      </div>
    </div>
  );
}
