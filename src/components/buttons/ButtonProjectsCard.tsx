export default function ButtonProjectsCard({ site, icon_name, name }: any) {
  return (
    <a
      href={site}
      class="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-black"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={icon_name == "mdi:github" ? "/svg/github.svg" : "/svg/world.svg"}
        alt=""
        class="w-4 h-4"
      />
      {name}
    </a>
  );
}
