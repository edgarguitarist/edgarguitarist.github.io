import { useEffect, useState } from "preact/hooks";
import ProjectsCard from "@components/cards/projectsCard";
import repos from "@db/repos.json";
import { t } from "i18next";

//INFO: ERROR: i18next Dont works correctly with preact


export default function ProjectsPart({ forked }: any) {
  let initialRepositories = repos
                                .filter((r) => r.fork === forked)
  
  if(!forked){
    initialRepositories.sort((a, b) => b.stargazers_count - a.stargazers_count)
  } else{    
    initialRepositories.sort((a, b) => b.contributor!?.contributions - a.contributor!?.contributions)
  }
                                

  // const [repositories, setRepositories] = useState(initialRepositories);
  // const [elementos, setElementos] = useState("");

  // useEffect(() => {
  //   filtro.metodo(JSON.parse(localStorage.getItem(filtro.tipo) ?? "[]"));
  // }, []);

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
    ? "REPOS"
    : "FORKS";

  console.log(sectionName);

  const reposFiltered = initialRepositories.filter(
    (r) =>
      !r.name.includes("prueba") &&
      !r.name.includes("portfolio") &&
      !r.name.includes("edgarguitarist")
  )

  return (
    <div className=" pt-7">
      <h2 className="font-bold flex  text-3xl mt-10 text-left dark:text-white text-black">
        {sectionName}
        {/* {elementos && (
          <div className="flex w-full place-content-between">
            <span className="text-xl ml-3 font-semibold text-gray-500 dark:text-gray-400 self-center">
              {t("index.projects.with")} ({elementos}){" = "}
              {
                reposFiltered.length
              }
            </span>
            <button
              className="bg-slate-800 hover:bg-black px-4 rounded-lg text-white font-semibold flex items-center gap-1 text-sm"
              onClick={filtro.clear}
            >
              <img
                src={"/svg/clearfilter.svg"}
                alt={t("index.projects.clear") ?? "clear filters"}
                className="w-6 h-6 text-white mr-1"
              />
              {t("index.projects.clear")}
            </button>
          </div>
        )} */}
      </h2>

      <div className="flex justify-around flex-wrap gap-10 mt-10">
        {reposFiltered
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
