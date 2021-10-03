var mainContent = document.querySelector('#main-content');
var subContent = document.querySelector('#sub-content');
var formInput = document.querySelector('#form');
var buttonEl = document.querySelector('#btn');
var cardListEl = document.querySelector('#card-list')
// parameters: lat (lat) long (lon) API KEY (appid)
var WeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?units=imperial";
// parameters: city name (q) & API KEY (appid)
var setupAPI = "https://api.openweathermap.org/data/2.5/forecast?units=imperial";
var cityName = "&q=";
var apiKey = "&appid=9f3b1a600b3d89b58a8f67f78a724195"
var latitude = "&lat=";
var longitude = "&lon=";
var city;

// controlled test fetch to see if api worked
// fetch("https://api.openweathermap.org/data/2.5/forecast?q=Chicago&appid=9f3b1a600b3d89b58a8f67f78a724195")
// .then(function (response) {
//     return response.json();
// })
// .then (function (data) {
//     console.log(data);
// })

//concat url for the weatherAPI
//fetch the weatherAPI 
//display that data in the main content box

function displayWeather() {
    WeatherAPI += latitude + longitude + apiKey;
    console.log(WeatherAPI)

    fetch(WeatherAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data);

        //display city name & date
        
        //display temp wind humidity & UVi

        //create cards that will be shown for the next 5 days
        cardListEl.remove();
        cardListEl = document.createElement('ul');
        cardListEl.setAttribute('id', 'card-list');
        cardListEl.classList.add('list-group-horizontal', 'list-group', 'justify-content-between');
        
        for (var i = 1; i <= 5; i++){
            let cardEl = document.createElement('li');
            cardEl.classList.add('card','list-group-item', 'col-sm-12', 'col-lg-2');
            
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardDate = document.createElement('h1');
            console.log(data.daily[i].dt)
            let date = new Date(data.daily[i].dt*1000);
            cardBody.textContent = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            cardBody.classList.add('card-title');

            let cardTemp = document.createElement('p');
            cardTemp.classList.add('card-text');
            cardTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";

            let cardWind = document.createElement('p');
            cardWind.classList.add('card-text');
            cardWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";

            let cardHumidity = document.createElement('p');
            cardHumidity.classList.add('card-text');
            cardHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

            cardBody.append(cardDate);
            cardBody.append(cardTemp);
            cardBody.append(cardWind);
            cardBody.append(cardHumidity);
            cardEl.append(cardBody);
            cardListEl.append(cardEl);
        }
        subContent.append(cardListEl);
    })

    //reset API call variables
}

//concat url for the setupAPI
//fetch the setupAPI
//set variables and create new button
function setup() {
    setupAPI += cityName + apiKey;
    fetch(setupAPI)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        //check the data that is being pulled
        console.log(data)    
        //need a conditional statement that checks the status of the api call. if 200 then continue with data processing. If 404, display that the city is not available

        //set variables to be used in currentWeatherAPI
        latitude += data.city.coord.lat;
        longitude += data.city.coord.lon;
        city = data.city.name;
        
        //create a button that will generate if we don't return an error
        
        //call CurrentWeather()
        displayWeather();
    })
}

//if the button is pressed, take the value attached to that button
//concat that to the url to be redisplayed
document.addEventListener('submit', function(event) {
    event.preventDefault();
    cityName += formInput.value;
    setup();
})