var submit = document.getElementById("submit");
var city = document.getElementById("city");
var image = document.getElementById("image");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humid = document.getElementById("humid");
var uvi = document.getElementById("uvi");

var apiKey = "bc0e6bde862987722740c53628de2aa5";

submit.addEventListener('click', searchWeather);

function searchWeather(event) {

    event.preventDefault();
    var input = document.getElementById("input").value.trim();

    fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + apiKey)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
        updateContent(data);
    })

}

function updateContent(data) {

    city.textContent = data.name;
    image.setAttribute('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
    temp.textContent = "Temp: " + data.main.temp + "°F";
    wind.textContent = "Wind: " + data.wind.speed + " MPH";
    humid.textContent = "Humidity: " + data.main.humidity + "%";

}