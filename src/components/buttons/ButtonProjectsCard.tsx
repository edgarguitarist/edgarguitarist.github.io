import world from "/svg/world.svg";
import github from "/svg/github.svg";


export default function ButtonProjectsCard({ site, icon_name, name }: any) {
  return (
    <a
      href={site}
      class="bg-slate-800 hover:bg-black px-8 py-2 rounded-lg text-white font-semibold flex items-center gap-1"
      target="_blank"
    >
      <img src={icon_name == "mdi:github" ? github : world} alt="icon_name" class="w-6 h-6 text-white" />
      {name}
    </a>
  );
}
