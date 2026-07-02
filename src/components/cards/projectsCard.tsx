import ButtonProjectsCard from "@components/buttons/ButtonProjectsCard";

interface Props {
  name: string;
  repo_url: string;
  site: string | null;
  description: string;
  language: string | null;
  stars: number;
  starsLabel: string;
  siteLabel: string;
}

export default function ProjectsCard({
  name,
  repo_url,
  site,
  description,
  language,
  stars,
  starsLabel,
  siteLabel,
}: Readonly<Props>) {
  return (
    <article class="group flex flex-col h-full p-5 rounded-2xl border-gradient transition-transform duration-300 hover:scale-[1.02]">
      <header class="flex items-start justify-between gap-3">
        <a
          href={repo_url}
          title={name}
          target="_blank"
          rel="noreferrer"
          class="min-w-0"
        >
          <h3 class="text-lg font-bold dark:text-white text-gray-900 truncate transition-colors group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">
            {name}
          </h3>
        </a>
        {stars > 0 && (
          <span
            title={`${stars} ${starsLabel}`}
            class="flex shrink-0 items-center gap-1 text-xs font-semibold dark:text-yellow-300 text-yellow-600"
          >
            <svg
              class="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {stars}
          </span>
        )}
      </header>

      <p class="mt-2 flex-1 text-sm leading-relaxed dark:text-gray-400 text-gray-600 line-clamp-3">
        {description}
      </p>

      <div class="mt-5 flex items-center justify-between gap-3">
        {language ? (
          <span class="inline-flex items-center gap-1.5 text-xs font-medium dark:text-gray-300 text-gray-600">
            <span class="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
            {language}
          </span>
        ) : (
          <span />
        )}
        <div class="flex items-center gap-2">
          <ButtonProjectsCard name="GitHub" icon_name="mdi:github" site={repo_url} />
          {site && (
            <ButtonProjectsCard
              name={siteLabel}
              icon_name="ic:baseline-language"
              site={site}
            />
          )}
        </div>
      </div>
    </article>
  );
}
