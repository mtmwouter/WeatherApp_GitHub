function displayTemperature(response) {


  console.log(response.data);
  let temperatureElement = document.querySelector("#current-Degrees");
  let cityElement = document.querySelector("#city-outcome");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round
  (response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round 
  (response.data.wind.speed);
}

let apiKey = "5a6ffbc1dc083aafeb2b79c41271ca68";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=${apiKey}&units=metric`;


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
