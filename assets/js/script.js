// Creating variables that target HTML elements by ID so that the HTML can be manipulated in JavaScript
var submit = document.getElementById("submit");
var recent = document.getElementById("recent");
var city = document.getElementById("city");
var date = document.getElementById("date");
var image = document.getElementById("image");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humid = document.getElementById("humid");
var uvi = document.getElementById("uvi");

// OpenWeather API Key
var apiKey = "bc0e6bde862987722740c53628de2aa5";

// Empty array that will be used to store recent searches in Local Storage
var searches = JSON.parse(localStorage.getItem("searches")) || [];

// An event listener for when the search button is clicked
submit.addEventListener('click', searchWeather);

// A function to check for the input in the search bar and then uses the text from that to make 
// an API call and then parse it to JSON and then call the updateContent function
function searchWeather(event) {

    event.preventDefault();

    var input = document.getElementById("input").value.trim();

    if (input) {
        fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + apiKey)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            updateContent(data);
        })
    } else {
        return;
    }

}

// A function that updates the main content for the current weather on the web application
function updateContent(data) {

    // Setting the text content to the data we grabbed from the API call as well as using Moment.JS for the current date
    city.textContent = data.name;
    date.textContent = moment().format("l");
    image.setAttribute('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    temp.textContent = "Temp: " + data.main.temp + "°F";
    wind.textContent = "Wind: " + data.wind.speed + " MPH";
    humid.textContent = "Humidity: " + data.main.humidity + "%";
    
    // Grabbing latitude and longitude from the first API call
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    // Making an API call using the lat and lon variables to get the UV Index
    // and then setting it to the uvi variable to update the HTML element
    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        uvi.textContent = data.current.uvi;

        // Sets the background color for the UV Index
        if (uvi.textContent <= 2) {
            uvi.style.backgroundColor = 'green';
            uvi.style.borderRadius = '5px';
        } else if (uvi.textContent > 2 && uvi.textContent <= 5) {
            uvi.style.backgroundColor = 'yellow';
            uvi.style.borderRadius = '5px';
        } else if (uvi.textContent > 5 && uvi.textContent <= 7) {
            uvi.style.backgroundColor = 'orange';
            uvi.style.borderRadius = '5px';
        } else if (uvi.textContent > 7 && uvi.textContent <= 10) {
            uvi.style.backgroundColor = 'red';
            uvi.style.borderRadius = '5px';
        } else {
            uvi.style.backgroundColor = 'purple';
            uvi.style.borderRadius = '5px';
        }

        updateForecast(data);

    })

    updateRecentSearches(city.textContent);

}

// A function that creates a button underneath the recent searches
// everytime that a new search is entered
function updateRecentSearches(city) {

    var recentBtn = document.createElement('button');
    recentBtn.textContent = city;
    recent.append(recentBtn);

    searches.push(city);
    localStorage.setItem("searches", JSON.stringify(searches));

    $(recentBtn).on('click', function () {
        updateContent(recentBtn.textContent);
    })

}

// A function containing a for loop to create and display the 5-day forecast
function updateForecast(data) {
    
    for (i = 1; i <= 5; i++) {
        var c = document.querySelector('.card');
        var card = document.createElement('div');
        card.setAttribute('class', 'card');
        var cardDate = document.createElement('p')
        cardDate.textContent = moment().add(i, "days").format("l");
        var cardIcon = document.createElement('img');
        cardIcon.setAttribute('src', 'https://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png');
        var cardTemp = document.createElement('p');
        cardTemp.textContent = "Temp: " + data.daily[i].temp.day + "°F";
        var cardWind = document.createElement('p');
        cardWind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        var cardHumid = document.createElement('p');
        cardHumid.textContent = "Humidity: " + data.daily[i].humidity + "%";
        card.appendChild(cardDate);
        card.appendChild(cardIcon);
        card.appendChild(cardTemp);
        card.appendChild(cardWind);
        card.appendChild(cardHumid);
        c.appendChild(card);
    }

}