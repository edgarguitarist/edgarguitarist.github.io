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
  mariadb: {
    name: "MariaDB",
    url_image: "images/svg/mariadb.svg",
    state: "",
    states: "",
  },
};

const libfra = {
  node_js: {
    name: "Node.js",
    url_image: "images/svg/nodejs-1.svg",
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
};

function showContentCard(data, destiny) {
  let output = "";
  for (let key in data) {
    output += `
            <div class="column is-3-mobile is-inline-block">
                <div class="card">
                    <div class="card-image">
                      <figure class="image is-4by3 is-flex">
                        <img class="mv-15" src="${data[key].url_image}" alt="${data[key].name}">
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
            </div>`;
  }
  document.getElementById(destiny).innerHTML = output;
}
