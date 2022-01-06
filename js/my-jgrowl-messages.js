const messages = {
  bienvenido: {
    header: "BIENVENIDO!!! 🤩",
    message: "Es un gusto volver a verte!",
    type: "INFO",
  },
  error: {
    header: "ERROR",
    message: "Lo sentimos, Algo no ha salido bien!",
    type: "ERROR",
  },
  default: {
    header: "Vuelve Pronto!",
    message: "Este Sitio aún está en Desarrollo",
    type: "INFO",
  },
  welcome: {
    header: "Welcome!!! 🤩",
    message: "It's a pleasure to see you again!",
    type: "INFO",
  },
  Error: {
    header: "ERROR",
    message: "Sorry, Something went Wrong!",
    type: "ERROR",
  },
  defaulten: {
    header: "Come Back Soon!",
    message: "This Site is still under Development",
    type: "INFO",
  },
};

const params = window.location.search;
const urlParams = new URLSearchParams(params);
const info = urlParams.get("info") || null;

const messagetoShow = info != null ? messages[info].message : currentLang == 'es' ? messages.default.message : messages.defaulten.message;
const headertoShow = info != null ? messages[info].header : currentLang == 'es' ? messages.default.header : messages.defaulten.header;


$.jGrowl(messagetoShow, {
  header: headertoShow,
  life: 5000,
});