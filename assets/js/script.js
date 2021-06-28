var apiKey = "bc0e6bde862987722740c53628de2aa5";
var userInput = "";

fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial&appid=" + apiKey)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        console.log(data);
    })