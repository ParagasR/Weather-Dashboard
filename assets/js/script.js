var mainContent = document.querySelector('#main-content');
var subContent = document.querySelector('#sub-content');
var formInput = document.querySelector('#form');
var buttonEl = document.querySelector('#btn');
var cardListEl = document.querySelector('#card-list');
var contentEl = document.querySelector('#content');
var buttonListEl = document.querySelector('#button-list');
var apiKey = "units=imperial&appid=9f3b1a600b3d89b58a8f67f78a724195"
var WeatherAPI;
var setupAPI;
var cityName;
var latitude;
var longitude;

resetVariables();

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
        if (data.cod != 200) {
            if (document.getElementById('error-text') !== null){
                document.getElementById('error-text').remove();
            }
            console.log(document.getElementById('error-text') === null)
            let errorText = document.createElement('h1');
            errorText.textContent = 'That is not a valid City. Please try again'
            errorText.setAttribute('id', 'error-text');
            subContent.append(errorText);
            resetVariables()
        }

        //set variables to be used in currentWeatherAPI
        latitude += data.city.coord.lat;
        longitude += data.city.coord.lon;
        let cityName = data.city.name;

        if (buttonListEl.children[0] == null) {
            createButton(cityName);
        } else {
            let createBtn = true;
            for (let i = 0; i < buttonListEl.children.length; i++) {
                if (cityName === buttonListEl.children[i].textContent) {
                    createBtn = false;
                    break;
                } 
            }
            if (createBtn) {
                createButton(cityName);
            }
        }       
        
        //call displayWeather()
        displayWeather(cityName);
    })
}

function createButton(city) {
    let liButtonEl = document.createElement('li');
    liButtonEl.classList.add('list-group-item', 'border-0', 'LI');
    let buttonEl = document.createElement('button');                               
    buttonEl.classList.add('btn', 'btn-secondary');
    buttonEl.setAttribute('id', 'cityButton');
    buttonEl.textContent = city;

    liButtonEl.append(buttonEl);
    buttonListEl.append(liButtonEl);
}

//concat url for the weatherAPI
//fetch the weatherAPI 
//display that data in the main content box
//then reset variables
function displayWeather(city) {
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
        mainContent.classList.add('mx-4', 'mb-3', 'border', 'border-secondary', 'p-3');
        mainContent.setAttribute('id', 'main-content');
        contentEl.appendChild(mainContent);

        subContent.remove();
        subContent = document.createElement('div');
        subContent.setAttribute('id', 'sub-content');
        subContent.classList.add('mx-3')
        contentEl.append(subContent);
        //display city name & date
        let CurrentDate = new Date(data.daily[0].dt*1000);
        let mainHeader = document.createElement('h1');
        let mainWeatherIcon = document.createElement('img');
        let mainIconURL = 'http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png';
        mainWeatherIcon.setAttribute('href', data.current.weather[0].main);
        mainWeatherIcon.setAttribute('src', mainIconURL);
        mainHeader.classList.add('display-4');
        mainHeader.textContent = city + " " + ((CurrentDate.getMonth() + 1) + "/" + CurrentDate.getDate() + "/" + CurrentDate.getFullYear());
        mainHeader.append(mainWeatherIcon);
        mainContent.append(mainHeader);

        let mainTemp = document.createElement('h5');
        mainTemp.textContent = "Temp: " + data.daily[0].temp.day + "°F";

        let mainWind = document.createElement('h5');
        mainWind.textContent = "Wind: " + data.daily[0].wind_speed + " MPH";
        
        let mainHumidity = document.createElement('h5');
        mainHumidity.textContent = "Humidity: " + data.daily[0].humidity + "%";

        let UVIndex = document.createElement('span');
        let UVText = document.createElement('h5');
        UVText.textContent = "UVI: ";
        let UVContent = document.createElement('h5');
        let uv = data.daily[0].uvi;
        UVContent.textContent = uv;
        UVContent.classList.add('border', 'rounded-pill', 'px-3', 'ms-3', 'custom-width');
        if (uv < 3) {
            UVContent.classList.add('bg-success');
        } else if (uv < 8) {
            UVContent.classList.add('bg-warning');
        } else {
            UVContent.classList.add('bg-danger');
        }

        UVIndex.appendChild(UVText);
        UVIndex.appendChild(UVContent);

        //display temp wind humidity & UVi
        mainContent.append(mainTemp);
        mainContent.append(mainWind);
        mainContent.append(mainHumidity);
        mainContent.append(UVIndex);
        //create cards that will be shown for the next 5 days
        cardListEl.remove();
        cardListEl = document.createElement('ul');
        cardListEl.setAttribute('id', 'card-list');
        cardListEl.classList.add('list-group-horizontal-lg', 'list-group', 'justify-content-between');
        
        let forcastText = document.createElement('h2');

        for (var i = 1; i <= 5; i++){
            let cardEl = document.createElement('li');
            cardEl.classList.add('card','list-group-item', 'col-sm-12', 'col-lg-2', 'mx-2', 'mb-3', 'border', 'rounded-3', 'border-info', 'bg-info', 'bg-gradient');
            
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardDate = document.createElement('h4');
            // console.log(data.daily[i].dt)
            let date = new Date(data.daily[i].dt*1000);
            cardDate.textContent = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
            cardDate.classList.add('card-title');

            //add icon
            let weatherState = document.createElement('img');
            let iconURL = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png';
            weatherState.setAttribute('href', data.daily[i].weather[0].main);
            weatherState.setAttribute('src', iconURL);

            let cardTemp = document.createElement('h5');
            cardTemp.classList.add('card-text', 'my-3');
            cardTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";

            let cardWind = document.createElement('h5');
            cardWind.classList.add('card-text', 'my-3');
            cardWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";

            let cardHumidity = document.createElement('h5');
            cardHumidity.classList.add('card-text', 'mT-3');
            cardHumidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

            cardBody.append(cardDate);
            cardBody.append(weatherState);
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


function resetVariables() {
    //reset API call variables
    // parameters: lat (lat) long (lon) API KEY (appid)
    WeatherAPI = "https://api.openweathermap.org/data/2.5/onecall?";
    // parameters: city name (q) & API KEY (appid)
    setupAPI = "https://api.openweathermap.org/data/2.5/forecast?";
    cityName = "&q=";
    apiKey = "units=imperial&appid=9f3b1a600b3d89b58a8f67f78a724195";
    latitude = "&lat=";
    longitude = "&lon=";
    city = '';
}

//-----------------Event Listeners--------------------------

//take the input from the form
//concat that to the url to be redisplayed
document.addEventListener('submit', function(event) {
    event.preventDefault();
    cityName += formInput.value;
    formInput.value = '';
    setup();
})

//if the button is pressed, take the value attached to that button
document.addEventListener('click', function(event){
    if (event.target.id == 'cityButton') {
        cityName += event.target.textContent
        setup();
        formInput.value = '';
    }
})