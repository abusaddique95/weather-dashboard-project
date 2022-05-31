const recentSearchesContainer = $("recent-searches");

const readFromLocalStorage = (key, defaultValue) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

// read and write local storage
const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

const renderRecentSearches = () => {
  const recentSearches = readFromLocalStorage("recentSearches", []);

  if (recentSearches.length) {
    const createRecentCity = (city) => {
      return `<li class="list-group-item" data-city="${city}"
        >
        ${city}
        </li>`;
    };

    const recentCities = recentSearches.map(createRecentCity).join;

    const ul = `<ul class="list-group ${recentCities}">
</ul>`;

    recentSearchesContainer.append(ul);
  } else {
    const alert = `<div class="alert alert-warning" role="alert">
        A simple warning alert—check it out!
    </div>`;
    recentSearchesContainer.append(alert);
  }
};

const handleRecentSearchClick = async (event) => {
  const target = $(event.target);

  if (target.is("li")) {
    const cityName = target.attr("data-city");
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // get form input value
  const cityName = $("#recent-searches").val();

  // validate
  if (cityName) {
    const renderStatus = await renderWeatherInfo(cityName);

    //  LS
    const recentSearches = readFromLocalStorage("recentSearches", []);

    if (!recentSearches.includes(cityName) && renderStatus) {
      recentSearches.push(cityName);

      writeToLocalStorage("recentSearches", recentSearches);

      recentSearchesContainer.children().last().remove();

      // re-render
      renderRecentSearches();
    }
  }
};

const onReady = () => {
  renderRecentSearches();
};

recentSearchesContainer.click(handleRecentSearchClick);
searchForm.submit(handleFormSubmit);
$(document).ready(onReady);
