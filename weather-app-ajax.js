// appID for OpenWeatherMap
var apiKey = 'f2546e168627aac0ac384b43efbb1f0f';

document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons() {

    // if the city search button is clicked
    document.getElementById('submitForm').addEventListener('click', function (event) {
        event.preventDefault();

        var city = document.getElementById("cityInput").value;
        var zip = document.getElementById("zipInput").value;
        var countryCode = document.getElementById("countryCode").value;

        if (document.getElementById('cityOption').checked) {
            if (city == '') {
                showError('Enter a city name!');
            }
            else {
                // make a request to openweathermap API
                var req = new XMLHttpRequest();
                var cityURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + countryCode + '&appid=' + apiKey;

                // send request using an asynchronous call
                req.open('GET', cityURL, false);
                req.send(null);
                var response = JSON.parse(req.responseText);

                // if no response per invalid input
                if (!response.name) {
                    showError();
                }
                displayResults(response, city);
            }
        }

        if (document.getElementById('zipOption').checked) {
            if (zip == '') {
                showError('Enter a zip code!');
            }
            else {
                var req = new XMLHttpRequest();
                var zipURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',' + countryCode + '&appid=' + apiKey;

                // send request an asynchronous call
                req.open('GET', zipURL, false);
                req.send(null);
                var response = JSON.parse(req.responseText);
                if (!response.name) {
                    showError('It is not a valid input. Try again.');
                }
                displayResults(response, zip);
            }
        }
    })
};

// clear results
function clearResults() {
    document.getElementById('resultTitle').textContent = '';
    document.getElementById('resultCity').textContent = '';
    document.getElementById('resultCountryCode').textContent = '';
    document.getElementById('resultTemp').textContent = '';
    document.getElementById('resultHumidity').textContent = '';
    document.getElementById('resultWind').textContent = '';
}

// display error message
function showError(errorMessage) {
    clearResults();
    document.getElementById('resultTitle').textContent = errorMessage;
}

function displayResults(response, input) {
    // if no response per invalid input, display error
    if (!response.name) {
        showError('It is not a valid input. Try again.');
    }

    // calculate temperature from Kelvin unit that openweathermap provides
    var tempC = Math.round(response.main.temp - 273.15);
    var tempF = Math.round(((response.main.temp - 273.15) * 9 / 5) + 32);

    // clear old results
    clearResults();

    // display results
    document.getElementById('resultTitle').textContent = 'Weather Info for ' + input;
    document.getElementById('resultCity').textContent = 'City: ' + response.name;
    document.getElementById('resultCountryCode').textContent = 'Country Code: ' + response.sys.country;
    document.getElementById('resultTemp').textContent = 'Temperature: ' + tempC + ' °C, ' + tempF + ' °F';
    document.getElementById('resultHumidity').textContent = 'Humidity: ' + response.main.humidity + ' %';
    document.getElementById('resultWind').textContent = 'Wind Speed: ' + response.wind.speed + ' m/s, ' + response.wind.deg + ' degrees';
    document.getElementById("resultContainer").style.display = "block";
}
