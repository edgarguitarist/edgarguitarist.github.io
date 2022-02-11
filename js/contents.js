const languages = {
  html: {
    name: "HTML",
    url_image: "images/svg/html-1.svg",
    state: "",
    states: "",
  },
  css: {
    name: "CSS",
    url_image: "images/svg/css-3.svg",
    state: "",
    states: "",
  },
  javascript: {
    name: "JavaScript",
    url_image: "images/svg/logo-javascript.svg",
    state: "",
    states: "",
  },
  typescript: {
    name: "TypeScript",
    url_image: "images/svg/typescript.svg",
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
    state: "Android Studio",
    states: "Android Studio",
  },
  kotlin: {
    name: "Kotlin",
    url_image: "images/svg/kotlin-1.svg",
    state: "Android Studio",
    states: "Android Studio",
  },
  arduino: {
    name: "Arduino",
    url_image: "images/svg/arduino-1.svg",
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
    state: "",
    states: "",
  },
  firebase: {
    name: "Firebase",
    url_image: "images/svg/firebase.svg",
    state: "",
    states: "",
  }
}

const libfra = {
  node_js: {
    name: "Node.js",
    url_image: "images/svg/nodejs-1.svg",
    state: "",
    states: "",
  },
  express: {
    name: "Express",
    url_image: "images/svg/express-109.svg",
    state: "",
    states: "",
  },
  react: {
    name: "React",
    url_image: "images/svg/react-2.svg",
    state: "",
    states: "",
  },
  next_js: {
    name: "Next.js",
    url_image: "images/svg/next-js.svg",
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
    profesionalName: "Aula Virtual para Lecto-Escritura",
  },
  edgarguitarist: {
    url_image: screenshotMachine("https://github.com/edgarguitarist"),
    url: "https://github.com/edgarguitarist",
    profesionalName: "Mi Github",
  },
  "edgarguitarist.github.io": {
    url_image: screenshotMachine("https://edgarguitarist.github.io/index.html#aboutme"),
    url: "https://edgarguitarist.github.io/",
    profesionalName: "Mi Portfolio",
  },
  guinzo: {
    url_image: screenshotMachine("https://bockcaodesigners.com/"),
    url: "https://bockcaodesigners.com/",
    profesionalName: "Bockcao Designers",
  },
  jean: {
    url_image: screenshotMachine("https://jossyemb-produc.com/"),
    url: "https://jossyemb-produc.com/",
    profesionalName: "Embutidos Jossy",
  },
  jess: {
    url_image: "images/no_web/jess.jpeg",
    url: "",
    profesionalName: "Aula Virtual - Letras y Vida",
  },
  "jess-apk": {
    url_image: "",
    url: "",
    profesionalName: "Aula Virtual - Letras y Vida - APK",
  },
  serverless: {
    url_image: "images/no_web/almuerzi.png",
    url: "https://edgarguitarist.github.io/others/almuerzi/",
    profesionalName: "Almuerzi Serverless",
  }
}

async function getRepositories(url) {
  const url_api = "https://api.github.com/users/edgarguitarist/repos"
  const res = await fetch(url_api)
  const data = await res.json()
  //retornar el name de los data
  return data.map((repo) => repo)
}

const armador = (data) => {
  let repos = {}
  let forks = {}
  for (let i = 0; i < data.length; i++) {
    if (!data[i].fork) {
      repos[data[i].name] = {
        name: data[i].name,
        html_url: data[i].html_url,
      }
    }else{
      forks[data[i].name] = {
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
        repos[key].profesionalName = repoExtra[key2].profesionalName || ""
      }
    }
  }
  showContentCard(repos, "repos", 3, 3, 4, true)
  return repos
}

const repositorios = () => {
  if(localStorage.getItem("repositorios")){
    armador(JSON.parse(localStorage.getItem("repositorios"))) 
  }else{
    getRepositories().then((data) => {
      if (data.length > 0) {
        localStorage.setItem("repositorios", JSON.stringify(data))
        armador(data)
      } else {
        console.log("No se pueden cargar los repositorios")
      }
    })
  }
} 

repositorios()

function showContentCard(
  data,
  destiny,
  mobile = 4,
  tablet = 4,
  desktop = 6,
  anchor = false
) {
  mobile = Math.floor(12 / mobile)
  desktop = Math.floor(12 / desktop) //2
  tablet = Math.floor(12 / tablet)
  let output =""
  let name, url_image, state, states, url
  for (let key in data) {
    name = anchor ? data[key].profesionalName || data[key].name : data[key].name || ""
    url = data[key].url || "https://github.com/edgarguitarist/" + name 
    a_href = anchor
      ? '<a class="repos" href="' + url + '" target="_blank">'
      : ""
    a_close = anchor ? "</a>" : ""
    url_image = data[key].url_image || "images/svg/no-image.svg"
    state = data[key].state || ""
    states = data[key].states || ""
    output += `    
            <div class="column is-${mobile}-mobile is-${tablet}-tablet is-${desktop}-desktop is-inline-block">
            ${a_href}
                <div class="card">
                    <div class="card-image ph-15">
                      <figure class="image is-4by3 is-flex">
                        <img class="mv-15 card-capture" src="${url_image}" alt="${name}">
                      </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            <span class="b-700 is-size-5-mobile is-size-5-tablet is-size-6-desktop">
                                ${name}
                            </span>
                            <br>
                            <span lang="en" class="has-text-success b-700 is-size-5-mobile is-size-5-tablet is-size-6-desktop " hidden>
                                ${state}
                            </span>
                            <span lang="es" class="has-text-success b-700 is-size-5-mobile is-size-5-tablet is-size-6-desktop">
                                ${states}
                            </span>
                        </div>
                    </div>
                </div>
                ${a_close}
            </div>`
  }
  document.getElementById(destiny).innerHTML = output
}
