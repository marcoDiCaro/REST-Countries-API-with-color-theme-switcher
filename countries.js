async function getCountries() {
  const url = "https://restcountries.com/v3.1/all";
  const resData = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);

  countriesTemplate(resData);
}

async function getCountry(search) {
  const url = "https://restcountries.com/v3.1/name/";
  const [resData] = await fetch(url + search)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        throw new Error(
          `<span class="error">${res.status} Country not found</span>`
        );
      }
    })
    .then((data) => data)
    .catch((err) => (box.innerHTML = err.message));

  countryTemplate(resData);
}

async function getCountryByCode(code) {
  const url = "https://restcountries.com/v3.1/alpha/";
  const [resData] = await fetch(url + code)
    .then((res) => res.json())
    .then((data) => data);

  countryTemplate(resData);
}

function countriesTemplate(countries) {
  box.classList.add("box-country");
  box.innerHTML = "";

  filterBox.classList.remove("none");

  countries.forEach((country) => {
    const card = document.createElement("article");

    const { flags, name, population, region, capital } = country;

    card.innerHTML = `
                <img class="card-img" src="${flags.png}" alt="card-img">
                <div class="card-description">
                    <h2 class="country-name country-property">${
                      name.common
                    }</h2>
                    <h2 class="country-property"><span class="description-key">Population:</span>${population.toLocaleString()}</h2>
                    <h2 class="country-property"><span class="description-key">Region:</span>${region}</h2>
                    <h2 class="country-property"><span class="description-key">Capital:</span>${capital}</h2>
                </div>
            `;
    card.classList.add("card");
    card.addEventListener("click", () => getCountry(name.common));

    box.appendChild(card);
  });

  changeTheme();
}

function countryTemplate(country) {
  filterBox.classList.add("none");

  const {
    tld,
    currencies,
    languages,
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    borders,
  } = country;
  const currencyObj = Object.keys(currencies);
  const currenceList = currencyObj.map((cur) => currencies[cur].name);
  const langs = Object.values(languages);

  box.classList.remove("box-country");
  box.innerHTML = `
            <article class="country-detail">
              <button class="back"><i class="fa-solid fa-arrow-left-long arrow"></i>Back</button>
              <div class="single-country">
                <img class="country-img" src="${flags.png}" alt="country-img">
                <div class="country-description-box">
                  <div class="country-description">
                    <div class="primary-description">
                      <h2 class="country-name">${name.common}</h2>
                      <h2 class="country-property"><span class="description-key">Population:</span> ${population.toLocaleString()}</h2>
                      <h2 class="country-property"><span class="description-key">Region:</span> ${region}</h2>
                      <h2 class="country-property"><span class="description-key">Sub Region:</span> ${subregion}</h2>
                      <h2 class="country-property"><span class="description-key">Capital:</span> ${capital}</h2>
                    </div>
                    <div class="secondary-description">
                      <h2 class="tld"><span class="description-key">Top Level Domain:</span>${tld}</h2>
                      <div class="currencies-box">
                        <h2 class="description-key">Currencies: </h2>
                        <ul class="currencies"></ul>
                      </div>
                      <div class="languages-box">
                        <h2 class="description-key">Languages: </h2>
                        <ul class="languages"></ul>
                      </div>
                    </div>
                  </div>
                  <div class="borders-box">
                    <h2 class="description-key">Border countries: </h2>
                    <ul class="borders"></ul>
                  </div>
                </div>
              </div>
            </article>
        `;

  if (borders) {
    borders.forEach((border) => bordersTemplate(border));
  }

  currenceList.forEach((cur) => currenceTemplate(cur));

  langs.forEach((lang) => langsTemplate(lang));

  const back = document.querySelector(".back");

  back.addEventListener("click", () => getCountries());

  changeTheme();
}

function bordersTemplate(borderName) {
  const borders = document.querySelector(".borders");
  const li = document.createElement("li");
  const button = document.createElement("button");

  button.innerText = borderName;
  button.classList.add("borders-button");
  button.addEventListener("click", () => getCountryByCode(borderName));

  li.appendChild(button);

  borders.appendChild(li);
}

function currenceTemplate(currency) {
  const currencies = document.querySelector(".currencies");
  const li = document.createElement("li");

  li.innerText = currency;

  currencies.appendChild(li);
}

function langsTemplate(lang) {
  const languages = document.querySelector(".languages");
  const li = document.createElement("li");

  li.innerText = lang;

  languages.appendChild(li);
}

async function countriesFilter(region) {
  const url = "https://restcountries.com/v3.1/all";
  const resData = await fetch(url)
    .then((res) => res.json())
    .then((data) => data);

  const filter = resData.filter((country) => country.region === region);

  countriesTemplate(filter);
}

function changeTheme() {
  if (!dark) {
    darkMode.innerHTML =
      '<span class="dark"><i class="fa-solid fa-moon"></i>Dark Mode</span>';

    document.querySelector("input").style.backgroundColor = "hsl(0, 0%, 100%)";
    document.querySelector("select").style.backgroundColor = "hsl(0, 0%, 100%)";

    document.body.classList.remove("dark-body");
    document.querySelector(".header-page").classList.remove("dark-header");
    document
      .querySelector(".header-title")
      .classList.remove("dark-header-title");
    document.querySelector(".search-box").classList.remove("dark-search-box");

    document
      .querySelectorAll(".card")
      .forEach((card) => card.classList.remove("dark-card"));
    document
      .querySelectorAll(".country-name")
      .forEach((name) => name.classList.remove("dark-country-name"));
    document
      .querySelectorAll(".description-key")
      .forEach((key) => key.classList.remove("dark-description-key"));

    document.querySelectorAll("button").forEach((btn) => {
      btn.style.backgroundColor = "hsl(0, 0%, 100%)";
      btn.style.color = "hsl(209, 23%, 22%)";
    });
  } else {
    darkMode.innerHTML =
      '<span class="dark"><i class="fa-solid fa-sun sun"></i>Light Mode</span>';

    document.querySelector("input").style.backgroundColor =
      "hsl(209, 23%, 22%)";
    document.querySelector("select").style.backgroundColor =
      "hsl(209, 23%, 22%)";

    document.body.classList.add("dark-body");
    document.querySelector(".header-page").classList.add("dark-header");
    document.querySelector(".header-title").classList.add("dark-header-title");
    document.querySelector(".search-box").classList.add("dark-search-box");

    document
      .querySelectorAll(".card")
      .forEach((card) => card.classList.add("dark-card"));
    document
      .querySelectorAll(".country-name")
      .forEach((name) => name.classList.add("dark-country-name"));
    document
      .querySelectorAll(".description-key")
      .forEach((key) => key.classList.add("dark-description-key"));

    document.querySelectorAll("button").forEach((btn) => {
      btn.style.backgroundColor = "hsl(209, 23%, 22%)";
      btn.style.color = "hsl(0, 0%, 100%)";
    });
  }
}

const box = document.querySelector(".box");
const filterBox = document.querySelector(".filter-box");
const search = document.querySelector(".search-country");
const regionSelect = document.querySelector(".filter-region");

search.addEventListener("search", () => {
  if (search.value.length !== 0) {
    getCountry(search.value);
    search.value = "";
  }
});

regionSelect.addEventListener("change", () =>
  countriesFilter(regionSelect.value)
);

getCountries();

const darkMode = document.querySelector(".dark");

let dark = false;

darkMode.addEventListener("click", () => {
  dark ? (dark = false) : (dark = true);

  changeTheme();
});
