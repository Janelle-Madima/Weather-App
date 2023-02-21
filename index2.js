function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput.value}`;
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", searchCity);

// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
function toFahrenheit(event) {
  let temperatureChange = document.querySelector("#temperature");
  temperatureChange.innerHTML =
    Math.round(temperatureChange.innerHTML * 9) / 5 + 32;
}

function toCelcius(event) {
  let temperatureChange = document.querySelector("#temperature");
  temperatureChange.innerHTML = Math.round(
    ((temperatureChange.innerHTML - 32) * 5) / 9
  );
}
let temperatureF = document.querySelector("#fahrenheit-link");
temperatureF.addEventListener("click", toFahrenheit);
let temperatureC = document.querySelector("#celsius-link");
temperatureC.addEventListener("click", toCelcius);

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
  );
}
function searchCurrentCity(city) {
  let apiKey = "46d4b1d6f90b68211c09b44671cd24f2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchPosition(position) {
  let apiKey = "cc66f0f5ce4fc1dc21b3f112a350636f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
let currentLocation = document.querySelector("#current-button");

currentLocation.addEventListener("click", getCurrentLocation);
