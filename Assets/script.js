//create global variables
let city;
let cities;

//function to load most recently search city from local storage
function loadDefaultLoc() {
    let lastSearch = localStorage.getItem('mostRecent');
    if (lastSearch) {
        city = lastSearch;
        lastSearch();
    } else {
        city = "";
        search();
    }
}
loadDefaultLoc();

//function to load recently searched cities from local storage
function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem('cities'));
    if (recentCities) {
        cities = recentCities;
    } else {
        cities = [];
    }
};
loadRecentCities();

//function to save search cities to local storage
function saveSearch() {
    localStorage.setItem('mostRecent',city);
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
};