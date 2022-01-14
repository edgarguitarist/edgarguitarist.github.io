let mealsState = []
let ruta = "login"
let user = {}

const stringToHTML = (str) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(str, "text/html")
  return doc.body.firstChild
}

const renderItem = (item) => {
  const element = stringToHTML(`<li data-id="${item._id}">${item.name}</li>`)
  element.addEventListener("click", () => {
    const mealsList = document.getElementById("meals-list")

    Array.from(mealsList.children).forEach((x) =>
      x.classList.remove("selected")
    )
    element.classList.add("selected")
    const mealIdInput = document.getElementById("meals-id")
    mealIdInput.value = item._id
  })
  return element
}

const renderOrder = (order, meals) => {
  const meal = meals.find((meal) => meal._id === order.meal_id)
  const name = user.email.split("@")[0]
  const element = stringToHTML(
    `<li data-id="${order._id}">${meal.name} - ${name}</li>`
  )
  return element
}

const initializeForm = () => {
  const orderForm = document.getElementById("order")
  orderForm.onsubmit = (e) => {
    e.preventDefault()
    const submit = document.getElementById("submit")
    submit.setAttribute("disabled", true)
    const mealId = document.getElementById("meals-id")
    const mealIdValue = mealId.value
    if (!mealIdValue) {
      alert("Please select a meal")
      submit.removeAttribute("disabled")
      return
    }
    const order = {
      meal_id: mealIdValue,
      user_id: user._id,
    }

    fetch("https://serverless-edgarguitarist.vercel.app/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json",
        authorization: localStorage.getItem("token") },
      body: JSON.stringify(order),
    }).then(x => x.json())
      .then(respuesta => {
        const renderedOrder = renderOrder(respuesta, mealsState)
        const ordersList = document.getElementById("orders-list")
        ordersList.appendChild(renderedOrder)
      })
  }
}

const initializeDatos = () => {
  fetch("https://serverless-edgarguitarist.vercel.app/api/meals")
    .then((res) => res.json())
    .then((data) => {
      mealsState = data
      const mealsList = document.getElementById("meals-list")
      const submit = document.getElementById("submit")
      const listItems = data.map(renderItem)
      mealsList.removeChild(mealsList.firstElementChild)
      listItems.forEach((element) => mealsList.appendChild(element))
      submit.removeAttribute("disabled")

      fetch("https://serverless-edgarguitarist.vercel.app/api/orders")
        .then((res) => res.json())
        .then((ordersData) => {
          const ordersList = document.getElementById("orders-list")
          const listOrders = ordersData.map((orderData) =>
            renderOrder(orderData, data)
          )
          ordersList.removeChild(ordersList.firstElementChild)
          listOrders.forEach((element) => ordersList.appendChild(element))
        })
    })
}

const renderApp = () => {
  const token = localStorage.getItem("token")
  if (token) {
    user = JSON.parse(localStorage.getItem("user"))
    return renderOrders()
  }
  return renderLogin()
}

const renderOrders = () => {
  const ordersView = document.getElementById("orders-view")
  document.getElementById("app").innerHTML = ordersView.innerHTML
  initializeForm()
  initializeDatos()
}

const renderLogin = () => {
  const loginView = document.getElementById("login-view")
  document.getElementById("app").innerHTML = loginView.innerHTML

  const loginForm = document.getElementById("login-form")
  loginForm.onsubmit = (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    fetch("https://serverless-edgarguitarist.vercel.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((x) => x.json())
      .then((respuesta) => {
        localStorage.setItem("token", respuesta.token)
        ruta = "orders"
        return respuesta.token
      })
      .then(token => {
        return fetch(
          "https://serverless-edgarguitarist.vercel.app/api/auth/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          }
        )
      })
      .then((x) => x.json())
      .then((fetchedUSer) => {
        localStorage.setItem("user", JSON.stringify(fetchedUSer))
        user = fetchedUSer
        renderOrders()
      })
  }
}

window.onload = () => {
  renderApp()
}
