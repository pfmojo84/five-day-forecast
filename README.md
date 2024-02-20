# five-day-forecast

User Story:
    AS A traveler
    I WANT to see the weather outlook for multiple cities
    SO THAT I can plan a trip accordingly

Acceptance Criteria:
    GIVEN a weather dashboard with form inputs
    WHEN I search for a city
    THEN I am presented with current and future conditions for that city and that city is added to the search history
    WHEN I view current weather conditions for that city
    THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the    humidity, and the the wind speed
    WHEN I view future weather conditions for that city
    THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the     temperature, the wind speed, and the humidity
    WHEN I click on a city in the search history
    THEN I am again presented with current and future conditions for that city

Project Plan:
    To create a five-day forecast app, I will use the example included in the challenge materials as a wireframe for the web app.  The design will include a header or hero section with the weather dashboard. I will use the Bulma CSS Framework for styling/layout. There will be a side panel or menu for the user to input their city. Using JS and the OpenWeather API, the data will return lat and lon coordinates from the location input (in local storage). The app will then take the geolocation of the user input and return the five day forecast with temp, wind speed, and humidity. This information will then post to the innerHTML. Local storage will also provide a search history the the user can access current weather conditions by clicking on the city.