const recentSearchesContainer = $("#recent-searches-container");
const weatherInfoContainer = $("#weather-info-container");
const searchForm = $("#search-form");

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
  // get recent searches from LS
  const recentSearches = readFromLocalStorage("recentSearches", []);

  // ["foo", "bar"]
  if (recentSearches.length) {
    const createRecentCity = (city) => {
      return `<li class="list-group-item" data-city="${city}"> ${city}
      </li>`;
    };

    const recentCities = recentSearches.map(createRecentCity).join("");

    const ul = `<ul class="list-group rounded-0">
        ${recentCities}
      </ul>`;

    // append to parent
    recentSearchesContainer.append(ul);
  } else {
    // else empty show alert
    const alert = `<div class="alert alert-warning" role="alert">
        You have no recent searches.
      </div>`;

    // append to parent
    recentSearchesContainer.append(alert);
  }
};

const renderWeatherInfo = async (cityName) => {
  try {
    const weatherData = await getWeatherData(cityName);

    windowInfoContainer.empty();

    renderCurrentData(weatherData);

    renderForecastData(weatherData);

    return true;
  } catch (error) {
    renderErrorAlert();
    return false;
  }
};

const getWeatherData = async (cityName) => {
  const currentDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      q: cityName,
      appid: "9828c3cfd73cc833c0599fbbda617050",
    }
  );

  const currentData = await fetchData(currentDataUrl);

  const lat = currentData?.coord?.lat;
  const lon = currentData?.coord?.lon;
  const displayCityName = currentData?.name;

  // forecast url
  const forecastDataUrl = constructUrl(
    "https://api.openweathermap.org/data/2.5/onecall",
    {
      lat: lat,
      lon: lon,
      exclude: "minutely,hourly",
      units: "metric",
      appid: "9828c3cfd73cc833c0599fbbda617050",
    }
  );

  const forecastData = await fetchData(forecastDataUrl);

  return {
    cityName: displayCityName,
    weatherData: forecastData,
  };
};

const handleRecentSearchClick = async (event) => {
  const target = $(event.target);

  // restrict clicks only from li
  if (target.is("li")) {
    // get data city attribute
    const cityName = target.attr("data-city");

    await renderWeatherInfo(cityName);
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  // get form input value
  const cityName = $("#search-input").val();

  // validate
  if (cityName) {
    // render weather cards
    const renderStatus = await renderWeatherInfo(cityName);

    // get recentSearches from LS
    const recentSearches = readFromLocalStorage("recentSearches", []);

    if (!recentSearches.includes(cityName) && renderStatus) {
      // push city name to array
      recentSearches.push(cityName);

      // write recent searches to LS
      writeToLocalStorage("recentSearches", recentSearches);

      // remove previous items
      recentSearchesContainer.children().last().remove();

      // re-render recent cities
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
