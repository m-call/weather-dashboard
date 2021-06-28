var submit = document.getElementById("submit");
var city = document.getElementById("city");
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
    })

}