// Variables
var key = "7a588f02129aa7b976b2a6e4e1befc63";
var submit = document.getElementById('city-search');
var accessCityForm = document.getElementById("search-cities");
var cityInput = document.getElementById('city').value;
var form = document.getElementById('form');
var tempEl = document.getElementById("temp");
var dateEl = document.getElementById("card-title");



var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.textContent = '';
  } else {
    alert('Enter a city please!');
  }
};

var getWeather = function (cityInput) {
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + key)
  .then(function (response) {
    return response.json()
  .then (function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
    .then(function (outcome) {
        return outcome.json()
    /* Weather Forecast Data */
    .then(function (weatherData) {
        console.log(weatherData);
        /* Input Daily Data */
        tempEl.textContent = "Temp: " + weatherData.current.temp + " °F";


form.addEventListener('submit', formSubmitHandler);