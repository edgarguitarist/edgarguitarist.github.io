// obtener informacion de un usuario de github

function getMyInfoGit() {
  var url = "https://api.github.com/users/edgarguitarist";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var user = JSON.parse(xhr.responseText);
      document.getElementById("logo").src = user.avatar_url;
      //cambiar el icon
      document.getElementById("icon").href = user.avatar_url;
    }
  };
  xhr.send();
}

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});


//cambiar atributos de un boton cuando se haga click
function changeButton(elemento) {
  var button = document.getElementById(elemento.id);
  if (button.classList.contains("English")) {
    button.classList.remove("English");
    button.classList.add("Spanish");
    button.innerHTML = "<img id='flag_img' src='images/flags/es.png' alt='flag' class='mp-0 h-30'>Es";
    //flag.src = "images/flags/es.png";
  } else {
    button.classList.remove("Spanish");
    button.classList.add("English");
    button.innerHTML = "<img id='flag_img' src='images/flags/en.png' alt='flag' class='mp-0 h-30'>En";
    //flag.src = "images/flags/en.png";

  }
}

$(document).ready(function () {
  getMyInfoGit();
});
