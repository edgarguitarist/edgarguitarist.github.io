import { writeDBFile } from "../db/index.js";
import * as dotenv from 'dotenv' 
dotenv.config()

const TOKEN = process.env.TOKEN;
const REPOS_URL = process.env.REPOS_URL ?? "https://api.github.com/users/edgarguitarist/repos";

const headers = {
  Accept: "application/vnd.github.v3+json",
  Authorization: TOKEN,
};

let repos = []

export default async () => {

  repos = await fetch(REPOS_URL, { headers }).then((res) => res.json()).catch((err) => console.log(err));

  if (!repos.length) {
    console.log("No hay repos", repos)
    return
  };

  const responses = await Promise.all(
    repos.map(async (repo) => {
      let { contributors_url, languages_url, fork } = repo;
      if (fork) {
        repo.contributors = await fetch(contributors_url, { headers }).then((res) => res.json())
      }
      repo.languages = await fetch(languages_url, { headers }).then((res) => res.json())
      return repo;
    })
  )

  writeDBFile("repos", responses);
  console.log("We got it, my repos data!!!");
};
