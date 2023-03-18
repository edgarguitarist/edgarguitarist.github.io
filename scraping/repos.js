import { writeDBFile } from "../db/index.js";

const REPOS_URL = "https://api.github.com/users/edgarguitarist/repos";

export default async () => {
  writeDBFile("repos", await fetch(REPOS_URL).then((res) => res.json()));
  console.log("We got it, my repos data!!!");
};
