import langs from "@data/langs.json";
import libs from "@data/libs.json";

interface Properties {
  name: string;
  src: string;
  show: boolean;
}

export default function ButtonLanguage({ language, filtro }: any) {
  const selectedLanguage: Properties =
    (langs.find((lang) => lang.name === language) as Properties) ??
    (libs.find((lib) => lib.name === language) as Properties);

  const handleClick = () => {
   
    const search = JSON.parse(localStorage.getItem(filtro.tipo) ?? "[]");
    const newElement = new Set([...search, language]);
    if (search.includes(language)) {
      newElement.delete(language);
    }
    filtro.metodo([...newElement])
    localStorage.setItem(filtro.tipo, JSON.stringify([...newElement]));
  };

  return (
    <button
      title={language}
      onClick={handleClick}
      className=" cursor-pointer hover:scale-110"
    >
      <img
        class="w-8 h-8"
        src={selectedLanguage?.src}
        alt={selectedLanguage?.name}
      />
    </button>
  );
}
