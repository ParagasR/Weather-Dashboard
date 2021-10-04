var mainContent = document.querySelector('#main-content');
var subContent = document.querySelector('#sub-content');
var formInput = document.querySelector('#form');
var buttonEl = document.querySelector('#btn');
var cardListEl = document.querySelector('#card-list');
var contentEl = document.querySelector('#content');
var buttonListEl = document.querySelector('#button-list');
// parameters: lat (lat) long (lon) API KEY (appid)
var WeatherAPI;
// parameters: city name (q) & API KEY (appid)
var setupAPI;
var cityName;
var apiKey = "units=imperial&appid=9f3b1a600b3d89b58a8f67f78a724195"
var latitude;
var longitude;
var city;

resetVariables();
//concat url for the weatherAPI
//fetch the weatherAPI 
//display that data in the main content box
//then reset variables
function displayWeather() {
    WeatherAPI += apiKey + latitude + longitude;
    // console.log(WeatherAPI)

    fetch(WeatherAPI)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        // console.log(data);
        mainContent.remove();
        mainContent = document.createElement('div');
        mainContent.classList.add('mx-4', 'mb-3');
        mainContent.setAttribute('id', 'main-content');
        contentEl.appendChild(mainContent);

        subContent.remove();
        subContent = document.createElement('div');
        subContent.setAttribute('id', 'sub-content');
        contentEl.append(subContent);
        //display city name & date
        let CurrentDate = new Date(data.daily[0].dt*1000);
        let mainHeader = document.createElement('h1');
        mainHeader.classList.add('display-4');
        mainHeader.textContent = city + " " + ((CurrentDate.getMonth() + 1) + "/" + CurrentDate.getDate() + "/" + CurrentDate.getFullYear())
        mainContent.append(mainHeader);

        let mainTemp = document.createElement('h5');
        mainTemp.textContent = "Temp: " + data.daily[0].temp.day + "°F";

        let mainWind = document.createElement('h5');
        mainWind.textContent = "Wind: " + data.daily[0].wind_speed + " MPH";
        
        let mainHumidity = document.createElement('h5');
        mainHumidity.textContent = "Humidity: " + data.daily[0].humidity + "%";

        let UVindex = document.createElement('h5');
        UVindex.textContent = "UVI: " + data.daily[0].uvi;

        //display temp wind humidity & UVi
        mainContent.append(mainTemp);
        mainContent.append(mainWind);
        mainContent.append(mainHumidity);
        mainContent.append(UVindex);
        //create cards that will be shown for the next 5 days
        cardListEl.remove();
        cardListEl = document.createElement('ul');
        cardListEl.setAttribute('id', 'card-list');
        cardListEl.classList.add('list-group-horizontal', 'list-group', 'justify-content-between');
        
        for (var i = 1; i <= 5; i++){
            let cardEl = document.createElement('li');
            cardEl.classList.add('card','list-group-item', 'col-sm-12', 'col-lg-2', 'mx-2', 'border', 'rounded');
            
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardDate = document.createElement('h4');
            // console.log(data.daily[i].dt)
            let date = new Date(data.daily[i].dt*1000);
            cardDate.textContent = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            cardDate.classList.add('card-title');

            let cardTemp = document.createElement('h5');
            cardTemp.classList.add('card-text');
            cardTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";

            let cardWind = document.createElement('h5');
            cardWind.classList.add('card-text');
            cardWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";

            let cardHumidity = document.createElement('h5');
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
    resetVariables();
}

//concat url for the setupAPI
//fetch the setupAPI
//set variables and create new button
function setup() {
    setupAPI += apiKey + cityName;
    fetch(setupAPI)
    .then(function (response){
        return response.json();
    })
    .then(function (data) {
        //check the data that is being pulled
        // console.log(data)    
        //need a conditional statement that checks the status of the api call. if 200 then continue with data processing. If 404, display that the city is not available

        //set variables to be used in currentWeatherAPI
        latitude += data.city.coord.lat;
        longitude += data.city.coord.lon;
        city = data.city.name;
        
        let liButtonEl = document.createElement('li');
        liButtonEl.classList.add('list-group-item', 'border-0', 'LI');

        // console.log(city);
        // console.log(data);

        //THIS IS THE PROBLEM CHILD-----------------------------------------------------------\
        //THIS IS THE PROBLEM CHILD-----------------------------------------------------------|
        //THIS IS THE PROBLEM CHILD-----------------------------------------------------------\
        if (buttonListEl.children[0] == null) {
            let buttonEl = document.createElement('button');                               
            buttonEl.classList.add('btn', 'btn-secondary');
            buttonEl.setAttribute('id', 'cityButton');
            buttonEl.textContent = city;

            liButtonEl.append(buttonEl);
            buttonListEl.append(liButtonEl);
        } else {
            console.log('city: ' + city)
            for (let i = 0; i < buttonListEl.children.length; i++) {
                if (city != buttonListEl.children[i].textContent) {
                    console.log('button: ' + buttonListEl.children[i].textContent) 
                    let buttonEl = document.createElement('button');
                    buttonEl.classList.add('btn', 'btn-secondary');
                    buttonEl.setAttribute('id', 'cityButton');
                    buttonEl.textContent = city;

                    liButtonEl.append(buttonEl);
                    buttonListEl.append(liButtonEl);
                    break;
                }
            }
            console.log("------------------------------")
        }
        //THIS IS THE PROBLEM CHILD-----------------------------------------------------------\
        //THIS IS THE PROBLEM CHILD-----------------------------------------------------------|
        //THIS IS THE PROBLEM CHILD-----------------------------------------------------------\       
        
 
        //call CurrentWeather()
        displayWeather();
    })
}

//if the button is pressed, take the value attached to that button
//concat that to the url to be redisplayed
document.addEventListener('submit', function(event) {
    event.preventDefault();
    cityName += formInput.value;
    formInput.value = '';
    setup();
})

function resetVariables() {
    //reset API call variables
     WeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?";
     setupAPI = "https://api.openweathermap.org/data/2.5/forecast?";
     cityName = "&q=";
     apiKey = "units=imperial&appid=9f3b1a600b3d89b58a8f67f78a724195";
     latitude = "&lat=";
     longitude = "&lon=";
     city = '';
}