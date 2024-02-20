
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "ef40e314163105cadeda4066c25abdba";// API Key for OpenWeatherMap API

//define items to post to dynamically add to html 
const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) {
        return `<div class="details">
                <h2>${cityName}(${weatherItem.dt_txt.split(" ")[0]})</h2>
                <h4>Temp:${weatherItem.main.temp}</h4>
                <h4>Wind:${weatherItem.wind.speed}</h4>
                <h4>Humidity:${weatherItem.main.humidity}</h4>
                </div>
                <div class="icon">
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                <h6>${weatherItem.weather[0].description}</h6>
            </div>`;
    } else {
        return `<li class="card">
                <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                <h4>Temp:${weatherItem.main.temp}</h4>
                <h4>Wind:${weatherItem.wind.speed}</h4>
                <h4>Humidity:${weatherItem.main.humidity}</h4>
                </li>`

    }    
}


const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(response => response.json()).then(data => {
// Filter the forecasts to get only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });

// Clearing previous weather data
        cityInput.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";

// Creating weather cards and adding them to the DOM
        fiveDaysForecast.forEach((weatherItem, index) => {
            const html = createWeatherCard(cityName, weatherItem, index);
            if (index === 0) {
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
        });        
    }).catch(() => {
        alert("An error occurred while fetching the weather forecast!");
    });
}


const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // Get user entered city name and remove extra spaces
   if (cityName === "") return; //return if cityName is empty
   const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
//Get entered city coordinates (latitude, longitude, and name) from the API response
   fetch(API_URL).then(res => res.json()).then(data => {
    if (!data.length) return alert(`No coordinates found for ${cityName}`);
    const { lat, lon, name } = data[0];
    getWeatherDetails(name, lat, lon);
   }).catch (() => {
    alert("An error occurred while fetching the coordinates!");
});
}

//Add event listeners for click and enter (keyup) functionality in search button

searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());