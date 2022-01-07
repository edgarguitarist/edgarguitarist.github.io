

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
