// Show current time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}


// Show Temperature when opening website

function displayTemperature(response) {

  let temperatureElement = document.querySelector("#current-Degrees");
  let cityElement = document.querySelector("#city-outcome");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round
  (response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round 
  (response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt*1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute(
    "alt", response.data.weather[0].description);
  
  }

let apiKey = "5a6ffbc1dc083aafeb2b79c41271ca68";
let city = "Amsterdam";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);

// Show temperature for city entered in search form

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureOutcome = document.querySelector("#current-Degrees");
  let message = `${temperature} °C`;
  temperatureOutcome.innerHTML = message;
}

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityOutcome = document.querySelector("#city-outcome");
  let units = "metric";
  let city = `${searchInput.value}`;
  let apiKey = "5a6ffbc1dc083aafeb2b79c41271ca68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  cityOutcome.innerHTML = `${searchInput.value}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let CityForm = document.querySelector("#current-city");
CityForm.addEventListener("submit", citySearch);

// Show current temperature for current location

function currentLocationShowTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city-outcome");
  let temperatureElement = document.querySelector("#current-Degrees");
  cityElement.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temperature} °C`;
}

function searchLocation(position) {
  let apiKey = "5a6ffbc1dc083aafeb2b79c41271ca68";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentLocationShowTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
