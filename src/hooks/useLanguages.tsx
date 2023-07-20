import { useState, useEffect } from "preact/hooks";

interface IUseLocalStorage {
  (key: string, initialValue: any): [any, any, any];
}

export default function useLanguages() {
  //cada vez que cambie en el localstore el item search se actualiza el estado
  const [search, setSearch] = useState(
    JSON.parse(localStorage.getItem("search") ?? "[]")
  );  

  return [search, setSearch];
}