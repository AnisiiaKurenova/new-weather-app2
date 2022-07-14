const form = document.querySelector("form");
const searchEnter = document.querySelector("#searchEnter");
const searchButton = document.querySelector("#searchButton");
const apiKey = "7ad1bf417b741b444ec3593d62d14175";
let fahrenheitTemp = document.querySelector("#fahrenheit_temp");
let celsiusTemp = document.querySelector("#celsius_temp");
let tempNow = document.querySelector("#temp_now");

function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let year = date.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monht = months[date.getMonth()];
  let dates = date.getDate();
  if (dates < 10) {
    dates = `0${dates}`;
  }
  return `${day}: ${hours}:${minutes} </br>
  ${dates} ${monht} ${year}`;
}

function forecastAPI(coordinate){
apiUrlForecast= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}&units=metric`
axios.get(apiUrlForecast).then(displayForecast);



}
function cityValue(event) {
  event.preventDefault();
  let citySearch = searchEnter.value;
  search(citySearch);
}
function search(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  console.log(response)
  
  let hCity = document.querySelector("#cityInput");
  let country = document.querySelector("#country");
  let wind = document.querySelector("#speed_wind");
  let humidity = document.querySelector("#humidity");
  let tempMax = document.querySelector("#temp_max");
  let tempMin = document.querySelector("#temp_min");
  let day = document.querySelector("#day_now");
  let iconWeather = document.querySelector(".icon_weather_today");
  let typeOfWeather = document.querySelector("#type_weather");
  temp = Math.round(response.data.main.temp);
  tempNow.innerHTML = temp;
  hCity.innerHTML = response.data.name;
  country.innerHTML = response.data.sys.country;
  wind.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  typeOfWeather.innerHTML = response.data.weather[0].main;
  day.innerHTML = formateDate(response.data.dt * 1000);
  iconWeather.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  forecastAPI(response.data.coord)
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  tempNow.innerHTML = Math.round((temp * 9) / 5 + 32);
  fahrenheitTemp.classList.add("active");
  celsiusTemp.classList.remove("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  tempNow.innerHTML = temp;
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
}

function forecastDate(timestamp) {
  let forecastWeek=timestamp.getDay()
  days=[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
return days[forecastWeek];

}

function displayForecast(response){
  console.log(response.data.daily);
  let forecastWeather = response.data.daily;
let weatherForecast = document.querySelector("#weather_forecast");
let weatherForecastHTML=`<div class="row">`
forecastWeather.forEach(function (forecastWeatherDays, index) {
  if (index<6) {
  weatherForecastHTML =
    weatherForecastHTML +
    `<div class="col-2" id="forecast_day">
          <span class="weather_forecast_day">
            ${forecastDate (new Date (forecastWeatherDays.dt *1000))}
          </span>
        </br>
            <img src="http://openweathermap.org/img/wn/${
              forecastWeatherDays.weather[0].icon
            }@2x.png" width="50" alt="" class="icon_forecast">
      </br>
            <span class="weather_forecast_max">
              ${Math.round(forecastWeatherDays.temp.max)}°
            </span>
            <span class="weather_forecast_min">
               ${Math.round(forecastWeatherDays.temp.min)}°
            </span>
        </div>
        `;
}});
weatherForecastHTML=weatherForecastHTML + `</div>`
weatherForecast.innerHTML= weatherForecastHTML
}



let temp = null;
search("London");
form.addEventListener("submit", cityValue);
searchButton.addEventListener("click", cityValue);
fahrenheitTemp.addEventListener("click", showFahrenheitTemp);
celsiusTemp.addEventListener("click", showCelsiusTemp);

function showPosition (position){
let latitudePosition = (position.coords.latitude);
let longitudePosition = (position.coords.longitude);
let urlAPIPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudePosition}&lon=${longitudePosition}&appid=${apiKey}&units=metric`;
axios.get(urlAPIPosition).then(showTemperature);
}

 navigator.geolocation.getCurrentPosition(showPosition)

