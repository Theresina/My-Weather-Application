//date

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

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//search engine

let city = document.querySelector("#city-input").value;

function displayWeatherCondition(response) {
  document.querySelector("#theCity").innerHTML = response.data.name;
  document.querySelector("#theDegrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#citydescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidityamount").innerHTML =
    response.data.main.humidity;
  document.querySelector("#windnumber").innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let apiKey = `72bb9dab46b9ec3d65f423c63f27a9b8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

//current location

function searchLocation(position) {
  let apiKey = `72bb9dab46b9ec3d65f423c63f27a9b8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currently");
currentLocationButton.addEventListener("click", getCurrentLocation);

//celsius and fahrenheit

function fahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  theDegrees.innerHTML = Math.round(fahrenheitTemp);

  theCelsius.classList.remove("active");
  theFahrenheit.classList.add("active");
}

let fahrenheitLink = document.querySelector("#theFahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitTemperature);

function celsiusTemperature(event) {
  event.preventDefault();
  theDegrees.innerHTML = Math.round(celsiusTemp);
  theFahrenheit.classList.remove("active");
  theCelsius.classList.add("active");
}

let celsiusLink = document.querySelector("#theCelsius");
celsiusLink.addEventListener("click", celsiusTemperature);

//other

searchCity("New York");
