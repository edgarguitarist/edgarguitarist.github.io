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

$(document).ready(function () {
  getMyInfoGit();
});
