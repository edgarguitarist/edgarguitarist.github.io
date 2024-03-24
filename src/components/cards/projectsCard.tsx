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

interface Pcard {
  contribution: string;
  stars: string;
  languages: string;
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
}: Readonly<Props>) {
  const no_show = ["Hack", "Tcl", "Batchfile", "Shell"];
  const {
    stars: t_stars,
    contribution: t_contribution,
    languages: t_languages,
  } = t("index.projects.cards", { returnObjects: true }) as Pcard;
  

  const lenguajes = Object.keys(languages)
    .filter((key) => !no_show.includes(key))
    .sort();

  const lenguajes_string = lenguajes.join(", ") + ".";

  return (
    <article
      id={name + "-card"}
      className="p-3 lg:w-[31%] md:w-[45%] w-[96%] border-gradient hover:scale-105 relative font-semibold"
    >
      <header>
        <a href={repo_url} title={name} target="_blank">
          <h2 className="py-3 mx-auto w-[90%] dark:text-white text-2xl overflow-hidden text-ellipsis whitespace-nowrap hover:text-[#743ad5] dark:hover:text-[#d53a9d]">
            {name}
          </h2>
        </a>
      </header>
      <div className="content h-20">
        <p
          title={description}
          className="text-md text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {description || "..."}
        </p>
        <p
          title={`${t_languages}: ${lenguajes_string}`}
          className="text-slate-800 dark:text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap flex items-center justify-center gap-2 pt-2"
        >
          {t_languages}:{" "}
          {lenguajes.map((lenguaje) => (
            <ButtonLanguage language={lenguaje} filtro={filtro} />
          ))}
        </p>
      </div>
      <footer>
        <div className="flex place-content-center gap-8 center w-[80%] mx-auto">
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
          title={`${stars} ${t_stars}`}
          className="absolute inline-flex items-center justify-center w-8 h-8 font-semibold bg-transparent rounded-full -top-3 -right-3 text-md"
        >
          {/* <Icon
            name="ph:star-fill"
            className="flex absolute z-[1] text-yellow-300"
          /> */}
          <img
            src={starfill}
            alt="icono de estrella"
            className="flex absolute z-[1] text-yellow-300"
          />
          <span className="text-gray-900 z-[2]">{stars}</span>
        </div>
      )}
      {contributor?.contributions > 0 && (
        <div
          id={`${"badge-contributions"}-${name}`}
          title={`${contributor.contributions} ${t_contribution}`}
          className="absolute inline-flex items-center justify-center w-8 h-8 font-bold bg-red-600 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900 text-md"
        >
          <span className="text-white">{contributor.contributions}</span>
        </div>
      )}
    </article>
  );
}
