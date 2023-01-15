import { writeDBFile } from "../db/index.js";

const API_USER = "https://api.github.com/users/edgarguitarist";

export default async () => {
  writeDBFile("user", await fetch(API_USER).then((res) => res.json()));
  console.log("We got it, my user data!!!");
};
