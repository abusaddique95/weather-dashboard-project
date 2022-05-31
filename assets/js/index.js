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

const renderCurrentData = () => {
  const currentWeatherCard = `<div class="text-center">
    <h2>Wolverhampton</h2>
    <h3>Sunday, 30th May 2022</h3>
    <hr />
    <img src="http://openweathermap.org/img/w/04d.png" alt="weather-icon">
    </div>
    <div>
    <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-3">Temperature</div>
        <div class="col-sm-12 col-md-8 p-3">16 &deg;C</div>
    </div>

    <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-3">Humidity</div>
        <div class="col-sm-12 col-md-8 p-3">20 &percnt;</div>
    </div>

    <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-3">Wind Speed</div>
        <div class="col-sm-12 col-md-8 p-3">35 mph</div>
    </div>

    <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-3">UV index</div>
        <div class="col-sm-12 col-md-8 p-3">
            <span class="bg-success p-2 text-white">1</span>
        </div>
    </div>

    </div>
    </div>`;

  weatherInfoContainer.append(currentWeatherCard);
};

const renderForecastData = () => {
  const forecastWeatherCards = `<div>
    <h2 class="text-center">5 day Forecast</h2>
    <HR />
    <div class="d-flex flex-row justify-content-center flex-wrap">
        <!-- card 1 -->
        <div class="card ms-2 mb-2 shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Sunday, 29th May</h5>
                <div>
                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Temperature</div>
                        <div class="col-sm-12">16 &deg;C</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Humidity</div>
                        <div class="col-sm-12">20 &percnt;</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Wind Speed</div>
                        <div class="col-sm-12">35 mph</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">UV index</div>
                        <div class="col-sm-12">
                            <span class="bg-success p-1 text-white">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- card 2 -->
        <div class="card ms-2 mb-2 shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Sunday, 29th May</h5>
                <div>
                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Temperature</div>
                        <div class="col-sm-12">16 &deg;C</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Humidity</div>
                        <div class="col-sm-12">20 &percnt;</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Wind Speed</div>
                        <div class="col-sm-12">35 mph</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">UV index</div>
                        <div class="col-sm-12">
                            <span class="bg-success p-1 text-white">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- card 3 -->
        <div class="card ms-2 mb-2 shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Sunday, 29th May</h5>
                <div>
                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Temperature</div>
                        <div class="col-sm-12">16 &deg;C</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Humidity</div>
                        <div class="col-sm-12">20 &percnt;</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Wind Speed</div>
                        <div class="col-sm-12">35 mph</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">UV index</div>
                        <div class="col-sm-12">
                            <span class="bg-success p-1 text-white">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- card 4 -->
        <div class="card ms-2 mb-2 shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Sunday, 29th May</h5>
                <div>
                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Temperature</div>
                        <div class="col-sm-12">16 &deg;C</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Humidity</div>
                        <div class="col-sm-12">20 &percnt;</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Wind Speed</div>
                        <div class="col-sm-12">35 mph</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">UV index</div>
                        <div class="col-sm-12">
                            <span class="bg-success p-1 text-white">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- card 5 -->
        <div class="card ms-2 mb-2 shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Sunday, 29th May</h5>
                <div>
                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Temperature</div>
                        <div class="col-sm-12">16 &deg;C</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Humidity</div>
                        <div class="col-sm-12">20 &percnt;</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Wind Speed</div>
                        <div class="col-sm-12">35 mph</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">UV index</div>
                        <div class="col-sm-12">
                            <span class="bg-success p-1 text-white">1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

  weatherInfoContainer.append(forecastWeatherCards);
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

const renderErrorAlert = () => {
  // empty container
  weatherInfoContainer.empty();

  const alert = `<div class="alert alert-danger" role="alert">
      Something went wrong. Please try again.
    </div>`;

  weatherInfoContainer.append(alert);
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
