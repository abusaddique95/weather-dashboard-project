const recentSearchesContainer = $("#recent-searches-container");
const weatherInfoContainer = $("#weather-info-container");
const searchForm = $("#search-form");

// read and write local storage
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

const writeToLocalStorage = (key, value) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

// API url function
const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUviClassName = (uvi) => {
  if (uvi >= 0 && uvi <= 2) {
    return "bg-success";
  }

  if (uvi > 2 && uvi <= 8) {
    return "bg-warning";
  }
  if (uvi > 8) {
    return "bg-danger";
  }
};

// render current data
const renderCurrentData = (data) => {
  const currentWeatherCard = `<div class="text-center">
    <h2>${data.cityName}</h2>
    <h3>${moment
      .unix(data.weatherData.timezone + data.weatherData.timezone)
      .format("dddd, Do MMM, YYYY")}
        </h3>
    <hr />
    <img src="http://openweathermap.org/img/w/${
      data.weatherData?.weather[0].icon
    }.png" alt="weather-icon">
    </div>
    <div>
    <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-3">Temperature</div>
        <div class="col-sm-12 col-md-8 p-3">${
          data.weatherData.main.temp
        } &deg;C</div>
    </div>

    <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-3">Humidity</div>
        <div class="col-sm-12 col-md-8 p-3">${
          data.weatherData.main.humidity
        } &percnt;</div>
    </div>

    <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-3">Wind Speed</div>
        <div class="col-sm-12 col-md-8 p-3">${
          data.weatherData.wind.speed
        } mph</div>
    </div>
    

    <div class="row g-0">
        <div class="col-sm-12 col-md-4 p-3">UV index</div>
        <div class="col-sm-12 col-md-8 p-3">
            <span class="bg-success p-2 text-white" ${getUviClassName(
              data.weatherData.main.uvi
            )}">${data.weatherData.main.uvi}</span>
        </div>
    </div>

    </div>
    </div>`;
  weatherInfoContainer.append(currentWeatherCard);
};

// render future data
const renderForecastData = (data) => {
  console.log(data);
  const generateCastWeatherCards = (each) => {
    const forecast = `<div>
    <h2 class="text-center">5 day Forecast</h2>
    <HR />
    <div class="d-flex flex-row justify-content-center flex-wrap">
        <!-- card 1 -->
        <div class="card ms-2 mb-2 shadow p-3 mb-5 bg-body rounded" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${moment
                  .unix(each.dt)
                  .format("ddd, Do MMM")}</h5>
                <div>
                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Temperature</div>
                        <div class="col-sm-12">${each.temp.day} &deg;C</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Humidity</div>
                        <div class="col-sm-12">${each.humidity} &percnt;</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">Wind Speed</div>
                        <div class="col-sm-12">${each.wind_speed} mph</div>
                    </div>

                    <div class="row g-0 text-center">
                        <div class="col-sm-12 bg-light">UV index</div>
                        <div class="col-sm-12">
                            <span class="bg-success p-1 text-white">${getUviClassName(
                              each.uvi
                            )}"
                                >${each.uvi}</span
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

    return forecast;
  };
  //   const forecastCards = data.weatherData.map(generateCastWeatherCards).join;

  const forecastCards = data.weatherData.daily
    .slice(1, 6)
    .map(createForecastCard)
    .join("");

  const forecastWeatherCards = `<div>
    <h2 class="mt-3 text-center">5-day Forecast</h2>
    <hr />
    <div class="d-flex flex-row justify-content-center flex-wrap">
      ${forecastCards}
    </div>
  </div>`;

  weatherInfoContainer.append(forecastWeatherCards);
};

const renderRecentSearches = () => {
  // get recent searches from LS
  const recentSearches = readFromLocalStorage("recentSearches", []);

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

// render error
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
    weatherData: currentData,
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
  console.log(cityName);

  // validate
  if (cityName) {
    // render weather cards
    const renderStatus = await renderWeatherInfo(cityName);
    console.log(renderStatus);
    const weatherData = await getWeatherData(cityName);
    weatherInfoContainer.empty();

    renderCurrentData(weatherData);

    renderForecastData(weatherData);

    // renderCurrentData();

    // renderForecastData();

    // get recentSearches from LS
    const recentSearches = readFromLocalStorage("recentSearches", []);

    console.log(recentSearches);

    if (!recentSearches.includes(cityName)) {
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
