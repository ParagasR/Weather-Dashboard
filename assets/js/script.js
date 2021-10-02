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
    //reset API call variables
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
        
        //need a conditional statement that checks the status of the api call. if 200 then continue with data processing. If 404, display that the city is not available
        
        //set lat and lon for the parameters of the currentWeatherAPI
        latitude = "&lat=" + data.city.coord.lat;
        longitude = "&lon=" + data.city.coord.lon;
        
        //create cards that will be shown for the next 5 days
        cardListEl.remove();
        cardListEl = document.createElement('ul');
        cardListEl.setAttribute('id', 'card-list');

        //create a button that will generate if we don't return an error
        
        //need to compare array to the next day (incrementing)
        var dayIndex = data.list[0].dt_txt.split(' ');
        dayIndex = dayIndex[0].split('-');
        dayIndex = dayIndex[2] - 1;

        for (var i = 0; i < data.list.length; i++) {
            dayCompare = data.list[i].dt_txt.split(' ');
            dayCompare = dayCompare[0].split('-');
            dayCompare = dayCompare[2];
            
            if (dayIndex != dayCompare) {
                //now display the data
                dayIndex = dayCompare;
            }
        }
        

        //call displayCurrentWeather()
        
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