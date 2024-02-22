
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const historyArray = JSON.parse(localStorage.getItem("historyArray")) || []
const historyEl = document.querySelector("#history")

const API_KEY = "ef40e314163105cadeda4066c25abdba";// API Key for OpenWeatherMap API

// Takes parameters defined in acceptance criteria (city name, temp, wind, and humidity) and posts dynamically to html as weather cards.
const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0) {
        return `<div class="details">
                <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                <h4>Temp: ${weatherItem.main.temp}</h4>
                <h4>Wind: ${weatherItem.wind.speed}</h4>
                <h4>Humidity: ${weatherItem.main.humidity}</h4>
                </div>
                <div class="icon">
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else {
        return `<li class="card">
                <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                <h4>Temp: ${weatherItem.main.temp}</h4>
                <h4>Wind: ${weatherItem.wind.speed}</h4>
                <h4>Humidity: ${weatherItem.main.humidity}</h4>
                </li>`

    }    
}
//function triggered when user enters a city name in search field. 
const getCityCoordinates = () => {
   const cityName = cityInput.value.trim(); // Get user entered city name and remove extra spaces
   if (cityName === "") return; //return if cityName is empty
   const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
//Fetch latitude and longitude coordinates using OpenWeatherMap Geocoding API
   fetch(API_URL).then(res => res.json()).then(data => {
       if (!data.length) return alert(`No coordinates found for ${cityName}`); //if response data is an emply array, it means no coordinates were found for the city.
       
       const { lat, lon, name } = data[0]; //if coordinates are found, extract lat, lon, and name from first element of the response data
       getWeatherDetails(name, lat, lon);

       var cityButton = document.createElement("button") //create new button element 
       cityButton.textContent = cityName; //set text content to cityName value
 
       cityButton.addEventListener("click", () => {
       getWeatherDetails(name, lat, lon);  //calls getWeatherDetails function to fetch weather based on geocoding coordinates
     });

       historyEl.append(cityButton); //adds cityButton to historyEl which is used to display search history
       historyArray.push({name: cityName, lat: lat, lon: lon}); //push object to historyArray
       localStorage.setItem("historyArray", JSON.stringify(historyArray)) //updates historyArray in the local storage in JSON formate
     })
     .catch (() => {
    alert("An error occurred while fetching the coordinates!");
  });  
}

//Fetch weather details using OpenWeatherMap 5 Day/3 Hour Forecast API
const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;

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

//loop to add event listeners to existing city buttons
historyArray.forEach (cityData => {
    let cityButton = document.createElement("button");
    cityButton.textContent = cityData.name;

    cityButton.addEventListener("click", () => {
        getWeatherDetails(cityData.name, cityData.lat, cityData.lon);
    });

    historyEl.append(cityButton);
});

//Add event listeners for click and enter (keyup) functionality in search button
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());