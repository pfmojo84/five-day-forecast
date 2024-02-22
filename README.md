# Five-Day-Forecast

User Story: <br>
    AS A traveler<br>
    I WANT to see the weather outlook for multiple cities<br>
    SO THAT I can plan a trip accordingly<p>

Acceptance Criteria:<br>
    GIVEN a weather dashboard with form inputs<br>
    WHEN I search for a city<br>
    THEN I am presented with current and future conditions for that city and that city is added to the search history<br>
    WHEN I view current weather conditions for that city<br>
    THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature,<br> the    humidity, and the the wind speed<br>
    WHEN I view future weather conditions for that city<br>
    THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions,<br> the  temperature, the wind speed, and the humidity<br>
    WHEN I click on a city in the search history<br>
    THEN I am again presented with current and future conditions for that city<p>

Project Plan:<br>
    To create a five-day forecast app, I will use the example included in the challenge materials as a wireframe for the web app. <br> The design will include a header or hero section with the weather dashboard. There will be a side panel or menu for the user to input their city.<br> Using JS and the OpenWeather API, the data will return lat and lon coordinates from the location input (in local storage).Using the geocoding coordiantes, a function will then fetch the weather details for the city. This information will then post to the innerHTML.<br> An object with the city data will be updated in local storage an a button will be created that will allow users to easily obtain weather details for cities in the search history.<p>

Resources:<br>
OpenWeatherMap API - Geocoding and 5-day/3-hour Forecast<br>
Asish George Tech - YT Tutorial<br>
BCS Tutoring Services (Shout out to Robby Kurle for his expertise)<p>

Screenshot:<br>
![Screenshot of Weather Dashboard](<Images/Screenshot 2024-02-22 at 11.09.15 AM.png>)<p>

Link to Deployed Application:
https://pfmojo84.github.io/five-day-forecast/

Link to Repo:
https://github.com/pfmojo84/five-day-forecast