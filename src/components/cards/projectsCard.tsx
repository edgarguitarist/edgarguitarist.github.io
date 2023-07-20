import ButtonLanguage from "@components/buttons/ButtonLanguage";
import ButtonProjectsCard from "@components/buttons/ButtonProjectsCard";
import { t } from "i18next";
import starfill from "/svg/starfill.svg";

interface Props {
  name: string;
  repo_url: string;
  site: string | null;
  description: string;
  contributor: Contributor;
  languages: Languages;
  stars: number;
  filtro: any;
}

export default function ProjectsCard({
  name,
  repo_url,
  site,
  description,
  contributor,
  languages,
  stars,
  filtro,
}: Props) {
  const no_show = ["Hack", "PowerShell", "Tcl", "Batchfile", "Shell"];

  const lenguajes = Object.keys(languages)
    .filter((key) => !no_show.includes(key))
    .sort();

  const lenguajes_string = lenguajes.join(", ") + ".";

  return (
    <article
      id={name + "-card"}
      class="p-3 lg:w-[31%] md:w-[45%] w-[96%] border-gradient hover:scale-105 relative font-semibold"
    >
      <header>
        <a href={repo_url} title={name} target="_blank">
          <h2 class="py-3 mx-auto w-[90%] dark:text-white text-2xl overflow-hidden text-ellipsis whitespace-nowrap hover:text-[#743ad5] dark:hover:text-[#d53a9d]">
            {name}
          </h2>
        </a>
      </header>
      <div class="content h-20">
        <p
          title={description}
          class="text-md text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {description || "..."}
        </p>
        <p
          title={`${t("index.projects.cards.languages")}: ${lenguajes_string}`}
          class="text-slate-800 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap flex items-center justify-center gap-2 pt-2"
        >
          {t("index.projects.cards.languages")}:{" "}
          {lenguajes.map((lenguaje) => (
            <ButtonLanguage language={lenguaje} filtro={filtro} />
          ))}
        </p>
      </div>
      <footer>
        <div class="flex place-content-center gap-8 center w-[80%] mx-auto">
          <ButtonProjectsCard
            name="GitHub"
            icon_name="mdi:github"
            site={repo_url}
          />
          {site && (
            <ButtonProjectsCard
              name="Site"
              icon_name="ic:baseline-language"
              site={site}
            />
          )}
        </div>
      </footer>
      {Boolean(stars) && !contributor && (
        <div
          id={`${"badge-stars"}-${name}`}
          title={`${stars} ${t("index.projects.cards.stars")}`}
          class="absolute inline-flex items-center justify-center w-8 h-8 font-semibold bg-transparent rounded-full -top-3 -right-3 text-md"
        >
          {/* <Icon
            name="ph:star-fill"
            class="flex absolute z-[1] text-yellow-300"
          /> */}
          <img src={starfill} alt="icono de estrella" class="flex absolute z-[1] text-yellow-300" />
          <span class="text-gray-900 z-[2]">{stars}</span>
        </div>
      )}
      {contributor && (
        <div
          id={`${"badge-contributions"}-${name}`}
          title={`${contributor.contributions} ${t(
            "index.projects.cards.contribution"
          )}`}
          class="absolute inline-flex items-center justify-center w-8 h-8 font-bold bg-red-600 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900 text-md"
        >
          <span class="text-white">{contributor.contributions}</span>
        </div>
      )}
    </article>
  );
}
