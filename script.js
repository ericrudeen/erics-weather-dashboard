var accessCityForm = document.getElementById("search-cities");
var inputCity = document.getElementById("city");
var returnData = document.getElementById("weather-card");
var tempEl = document.getElementById("temp");
var humidEl = document.getElementById("humid");
var windEl = document.getElementById("wind");
var uviEl = document.getElementById("uvi");
var dateEl = document.querySelector(".card-title");
var forecastHead = document.getElementById("forecast-header");
var forecastDisplay = document.getElementById("forecast-display");
var apiKey = "7a588f02129aa7b976b2a6e4e1befc63"



function showWeather(city) {
    console.log(city);
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + apiKey)
    .then(function (response) {
        return response.json()
    .then (function (data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial" + "&appid=" + apiKey)
        .then(function (outcome) {
            return outcome.json()
        /* Weather Forecast Data */
        .then(function (weatherData) {
            console.log(weatherData);
            /* Input Daily Data */
            tempEl.textContent = "Temp: " + weatherData.current.temp + " °F";
            humidEl.textContent = "Humidity: " + weatherData.current.humidity + "%";
            windEl.textContent = "Wind: " + weatherData.current.wind_speed + " MPH";
            uviEl.textContent = "UVI: " + weatherData.current.uvi;
            /* UVI Analysis */
                if (weatherData.current.uvi < 3) {
                    uviEl.style.backgroundColor = "green";
                    uviEl.style.color = "white";
                } else if (weatherData.current.uvi < 7) {
                    uviEl.style.backgroundColor = "yellow";
                    uviEl.style.color = "black";
                } else {
                    uviEl.style.backgroundColor = "red";
                    uviEl.style.color = "white";
                };
            /* Weather Icon */
            var weatherIcon = weatherData.current.weather[0].icon;
            var iconImg = $("<img>");
            iconImg.attr("src", "https://openweathermap.org/img/w/" + weatherIcon + ".png");
            iconImg.appendTo(dateEl);
            /* Today's Date via Moment.js */
            var date = moment.unix(weatherData.current.dt).format("MM/DD/YYYY");
            dateEl.textContent = city + " " + date;
            /* 5 Day Forecast */
            forecastHead.textContent = "How Your Week's Looking:"
            forecastDisplay.innerHTML = "";
                /* Forecast Loop */
                for (var i = 0; i < 5; i++) {
                    /* Make the card elements */
                    var col = document.createElement("div");
                    col.setAttribute("class", "col");
                    var cards = document.createElement("div");
                    cards.setAttribute("class", "card");
                    var cardBody = document.createElement("div");
                    cardBody.setAttribute("class", "card-body");
                    var h4 = document.createElement("h4").textContent = moment.unix(weatherData.daily[i].dt).format("MM/DD/YYYY");
                    var newIcon = weatherData.daily[i].weather[0].icon;
                    var icon = document.createElement("img");
                    icon.setAttribute("src", "https://openweathermap.org/img/w/" + newIcon + ".png");
                    var newTemp = document.createElement("p").textContent = "Temp: " + weatherData.daily[i].temp.day + "°F\n";
                    var newHumid = document.createElement("p").textContent = "Humid: " + weatherData.daily[i].humidity + "%";
                    /* Append */
                    cardBody.append(h4, icon, newTemp, newHumid);
                    cards.append(cardBody);
                    col.append(cards);
                    forecastDisplay.append(col);
                }
        })
        })
    })
    })
}

accessCityForm.addEventListener("submit", function (e) {
    e.preventDefault();
    returnData.classList.remove("weather");
    returnData.style.display = "block";
    var city = document.getElementById("city").value;
    showWeather(city);
})