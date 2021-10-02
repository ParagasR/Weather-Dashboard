var mainContent = document.querySelector('#main-content');
var subContent = document.querySelector('#sub-content');
var formInput = document.querySelector('#form');
var buttonEl = document.querySelector('#btn');
var cardListEl = document.querySelector('#card-list')
//lat (lat) long (lon) API KEY (appid)
var currentWeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}";
//city name (q) & API KEY (appid)
var futureWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?";
var cityName = "q=";
var apiKey = "&appid=9f3b1a600b3d89b58a8f67f78a724195"
var latitude;
var longitude;

// controlled test fetch to see if api worked
// fetch("https://api.openweathermap.org/data/2.5/forecast?q=Chicago&appid=9f3b1a600b3d89b58a8f67f78a724195")
// .then(function (response) {
//     return response.json();
// })
// .then (function (data) {
//     console.log(data);
// })

//concat url for the currentweatherAPI
//fetch the currentweatherAPI 
//display that data in the main content box

function displayCurrentWeather() {
    
}

//concat url for the futureWeatherAPI
//fet the futureWeatherAPI
//display the data in the sub content cards
function displayFutureWeather() {
    futureWeatherAPI += cityName + apiKey;
    console.log(futureWeatherAPI);
    fetch(futureWeatherAPI)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        //check the data that is being pulled
        console.log(data)
        
        //set lat and lon for the parameters of the currentWeatherAPI
        latitude = "&lat=" + data.city.coord.lat;
        longitude = "&lon=" + data.city.coord.lon;
        
        //create cards that will be shown for the next 5 days
        cardListEl.remove();
        cardListEl = document.createElement('ul');
        cardListEl.setAttribute('id', 'card-list');

        //need to compare array to the next day (incrementing) and time set for 1200
        //call the current day weather function
    })
}

//take the input from the submitted form
//make that a button apart of a list
//concat that to the url

//if the button is pressed, take the value attached to that button
//concat that to the url to be redisplayed
document.addEventListener('submit', function(event) {
    event.preventDefault();
    cityName += formInput.value;
    displayFutureWeather();
})