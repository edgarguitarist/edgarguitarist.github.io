import { useState, useEffect } from "preact/hooks";

interface IUseLocalStorage {
  (key: string, initialValue: any): [any, any, any];
}

export default function useLanguages() {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem("search");
    console.log(item);
    return item ? item : "";
  });

  return [value, setValue];
}