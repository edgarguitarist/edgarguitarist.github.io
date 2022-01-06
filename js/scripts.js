const idioma = navigator.language.substring(0, 2) || navigator.userLanguage.substring(0, 2);
var currentLang = idioma == "es" ? "es" : "en";

function getMyInfoGit() {
  const url = "https://api.github.com/users/edgarguitarist";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let user = JSON.parse(xhr.responseText);
      document.getElementById("logo").src = user.avatar_url;
      document.getElementById("icon").href = user.avatar_url;
    }
  };
  xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

function changeButton(elemento) {
  let button = document.getElementById(elemento.id);
  console.log(elemento.id);
  if (button.classList.contains("English")) {
    button.classList.remove("English");
    button.classList.add("Spanish");
    currentLang = "es";
  } else {
    button.classList.remove("Spanish");
    button.classList.add("English");
    currentLang = "en";
  }
  $('[lang="es"]').toggle();
  $('[lang="en"]').toggle();
}

$(document).ready(function () {
  getMyInfoGit();
  showContentCard(languages, "languages"); // Languages
  showContentCard(libfra, "libfra"); // Languages
  let wth = idioma == 'es' ? 'en' : 'es';
  $('[lang="' + wth + '"]').hide();
});
