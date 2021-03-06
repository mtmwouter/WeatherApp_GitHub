// Show current time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  
  return `${hours}:${minutes}`;
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

  celsiusTemperature = response.data.main.temp;


  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt*1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute(
    "alt", response.data.weather[0].description);
  
  }


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
        id="weather-forecast-img"
        class="float-left"
      />
      <div class="weather-forecast-temperature">
        <strong> ${Math.round(forecast.main.temp_max)}°</strong> | ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
    `;


  }

 
 

}


function search(event) {
  event.preventDefault(); 
  let searchTextInputElement = dpcument.querySelector("#search-text-input");
  console.log(searchTextInputElement);
}

function search(city) {
let apiKey = "5a6ffbc1dc083aafeb2b79c41271ca68";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}





function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#current-Degrees");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-Degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;

// Show temperature for city entered in search form

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// fahrenheitLink

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let celsiusLink = document.querySelector("#celcius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Amsterdam");


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


apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`; 
axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);