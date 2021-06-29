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
            console.log(data);
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
    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
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
    })

    updateRecentSearches(city.textContent);

}

function updateRecentSearches(city) {
    var recentBtn = document.createElement('button');
    recentBtn.textContent = city;
    console.log(recentBtn.textContent);
    recent.append(recentBtn);
}