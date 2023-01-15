import { writeDBFile } from "../db/index.js";
import user from "../db/user.json" assert { type: "json" };

export default async () => {
  writeDBFile("repos", await fetch(user.repos_url).then((res) => res.json()));
  console.log("We got it, my repos data!!!");
};
