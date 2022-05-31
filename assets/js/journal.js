`<div>
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
        </div>`;
