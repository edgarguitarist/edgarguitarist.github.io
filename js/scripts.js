const idioma =
  navigator.language.substring(0, 2) || navigator.userLanguage.substring(0, 2)
var currentLang = idioma == "es" ? "es" : "en"

function getMyInfoGit() {
  const url = "https://api.github.com/users/edgarguitarist"
  let xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let user = JSON.parse(xhr.responseText)
      localStorage.setItem('avatar', user.avatar_url) 
      return user.avatar_url
    }
  }
  xhr.send()
}

//hacer un array con los nombres de los archivos del directorio images
// function getImages() {
//   var images = ["hola", ""];
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", "images/error-404/", true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       let files = xhr.responseText.split("\n");
//       for (let i = 0; i < files.length; i++) {
//         if (files[i].includes(".gif")) {
//           let data =
//             files[i].split(" ")[1].split("/error-404/")[1].split(".")[0] +
//             ".gif";
//           console.log(data);
//           images.push(data); //CHECK: : El Array se comporta raro y el length no es el correcto
//         }
//       }
//     }
//   };
//   xhr.send();
//   return images;
// }

const gifs = [
  "bender.gif",
  "dbz.gif",
  "error.gif",
  "gatito.gif",
  "dbz.gif",
  "bender.gif",
  "gatito.gif",
  "iron_man.gif",
]

function setRandomImage() {
  /*let images = getImages();
   let random = Math.floor(Math.random() * images.length); 
   console.log(images, images.length);*/
  let random = Math.floor(Math.random() * gifs.length)
  document.getElementById("error_404").src = "images/error-404/" + gifs[random]
}

document.addEventListener("DOMContentLoaded", () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  )
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        const target = el.dataset.target
        const $target = document.getElementById(target)
        el.classList.toggle("is-active")
        $target.classList.toggle("is-active")
      })
    })
  }
})

function screenshotMachine(url) {
  return (
    "https://api.screenshotmachine.com/?key=a97b01&dimension=1024x768&format=PNG&url=" +
    url
  )
}

function changeButton(elemento) {
  let button = document.getElementById(elemento.id)
  if (button.classList.contains("English")) {
    button.classList.remove("English")
    button.classList.add("Spanish")
    currentLang = "es"
  } else {
    button.classList.remove("Spanish")
    button.classList.add("English")
    currentLang = "en"
  }
  $('[lang="es"]').toggle()
  $('[lang="en"]').toggle()
}

window.onload = () => {
  document.getElementById("icon").href = localStorage.getItem('avatar') || "images/me/me3.png"
    let wth = idioma == "es" ? "en" : "es"
    $('[lang="' + wth + '"]').hide()
}
