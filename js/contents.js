const languages = {
  html: {
    name: "HTML",
    url_image: "images/svg/html-1.svg",
    state: "",
    states: "",
  },
  javascript: {
    name: "JavaScript",
    url_image: "images/svg/logo-javascript.svg",
    state: "",
    states: "",
  },
  css: {
    name: "CSS",
    url_image: "images/svg/css-3.svg",
    state: "",
    states: "",
  },
  php: {
    name: "PHP",
    url_image: "images/svg/php-1.svg",
    state: "",
    states: "",
  },
  java: {
    name: "Java",
    url_image: "images/svg/java.svg",
    state: "",
    states: "",
  },
  kotlin: {
    name: "Kotlin",
    url_image: "images/svg/kotlin-1.svg",
    state: "",
    states: "",
  },
}

const dbms = {
  mysql: {
    name: "MySQL",
    url_image: "images/svg/mysql-6.svg",
    state: "",
    states: "",
  },
  mariadb: {
    name: "MariaDB",
    url_image: "images/svg/mariadb.svg",
    state: "",
    states: "",
  },
  mongodb: {
    name: "MongoDB",
    url_image: "images/svg/mongodb-icon-1.svg",
    state: "Learning",
    states: "Aprendiendo",
  },
}

const libfra = {
  node_js: {
    name: "Node.js",
    url_image: "images/svg/nodejs-1.svg",
    state: "Learning",
    states: "Aprendiendo",
  },
  express: {
    name: "Express",
    url_image: "images/svg/express-109.svg",
    state: "Learning",
    states: "Aprendiendo",
  },
  react: {
    name: "React",
    url_image: "images/svg/react-2.svg",
    state: "Learning",
    states: "Aprendiendo",
  },
  next_js: {
    name: "Next.js",
    url_image: "images/svg/next-js.svg",
    state: "Learning",
    states: "Aprendiendo",
  },
  sass: {
    name: "Sass",
    url_image: "images/svg/sass-1.svg",
    state: "",
    states: "",
  },
  tailwind: {
    name: "Tailwind",
    url_image: "images/svg/tailwind-css-2.svg",
    state: "",
    states: "",
  },
  bulma: {
    name: "Bulma",
    url_image: "images/svg/bulma.svg",
    state: "",
    states: "",
  },
}

const repoExtra = {
  changa: {
    url_image: screenshotMachine("https://ueparosemenatola.com/"),
    url: "https://ueparosemenatola.com/",
  },
  edgarguitarist: {
    url_image: screenshotMachine("https://github.com/edgarguitarist"),
    url: "https://github.com/edgarguitarist",
  },
  "edgarguitarist.github.io": {
    url_image: screenshotMachine("https://edgarguitarist.github.io/"),
    url: "https://edgarguitarist.github.io/",
  },
  guinzo: {
    url_image: screenshotMachine("https://bockcaodesigners.com/"),
    url: "https://bockcaodesigners.com/",
  },
  jean: {
    url_image: screenshotMachine("https://jossyemb-produc.com/"),
    url: "https://jossyemb-produc.com/",
  },
  jess: {
    url_image: "images/web_down/jess.jpeg",
    url: "error-404.html",
  },
  midudev: {
    url_image: screenshotMachine(""),
  },
}

async function getRepositories(url) {
  const url_api = "https://api.github.com/users/edgarguitarist/repos"
  const res = await fetch(url_api)
  const data = await res.json()
  //retornar el name de los data
  return data.map((repo) => repo)
}

const armador = (data) =>{
  let repos = {}
    for (let i = 0; i < data.length; i++) {
      if (!data[i].fork) {
        repos[data[i].name] = {
          name: data[i].name,
          html_url: data[i].html_url,
        }
      }
    }
    for (let key in repos) {
      for (let key2 in repoExtra) {
        if (key == key2) {
          repos[key].url_image = repoExtra[key2].url_image || ""
          repos[key].state = repoExtra[key2].state || ""
          repos[key].states = repoExtra[key2].states || ""
          repos[key].url = repoExtra[key2].url || ""
        }
      }
    }
    showContentCard(repos, "repos", 3, 3, 4, true)
    return repos
}

const repositorios =
  armador(JSON.parse(localStorage.getItem("repositorios"))) ||
  getRepositories().then((data) => {
    localStorage.setItem("repositorios", JSON.stringify(data)) 
    armador(data)
  })

function showContentCard(  data, destiny, mobile = 4, tablet = 4, desktop = 6, anchor = false) {
  mobile = Math.floor(12 / mobile)
  desktop = Object.keys(data).length <= 6 ? Math.floor(12 / desktop) : Math.floor(12 / desktop) //3
  console.log(Object.keys(data).length, desktop) 
  tablet = Math.floor(12 / tablet)
  let output = ""
  
  for (let key in data) {
    a_href = anchor
      ? '<a class="repos" href="' + data[key].url + '" target="_blank">'
      : ""
    a_close = anchor ? "</a>" : ""
    output += `
    
            <div class="column is-${mobile}-mobile is-${tablet}-tablet is-${desktop}-desktop is-inline-block">
            ${a_href}
                <div class="card">
                    <div class="card-image ph-15">
                      <figure class="image is-4by3 is-flex">
                        <img class="mv-15 card-capture" src="${data[key].url_image}" alt="${data[key].name}">
                      </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <span class="b-700 is-size-5-mobile is-size-5-tablet is-size-6-desktop">
                                ${data[key].name}
                            </span>
                            <br>
                            <span lang="en" class="has-text-danger b-700 is-size-5-mobile is-size-5-tablet is-size-6-desktop">
                                ${data[key].state}
                            </span>
                            <span lang="es" class="has-text-danger b-700 is-size-5-mobile is-size-5-tablet is-size-6-desktop">
                                ${data[key].states}
                            </span>
                        </div>
                    </div>
                </div>
                ${a_close}
            </div>`
  }
  document.getElementById(destiny).innerHTML = output
}
