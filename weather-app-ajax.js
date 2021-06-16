// appID for OpenWeatherMap
var apiKey = 'f2546e168627aac0ac384b43efbb1f0f';

document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons() {

    // if the city search button is clicked
    document.getElementById('submitCity').addEventListener('click', function (event) {
        event.preventDefault();
        var city1 = document.getElementById("city").value;
        var countryCode1 = document.getElementById("cityCountryCode").value;
        
        // both city and country code are required
        if (city1 != '' && countryCode1 != '') {
            var req = new XMLHttpRequest();
            var cityURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city1 + ',' + countryCode1 + '&appid=' + apiKey;
            
            // send request using an asynchronous call
            req.open('GET', cityURL, false);
            req.send(null);
            var response = JSON.parse(req.responseText);
            
            // calculate temperature from Kelvin unit that openweathermap provides
            var tempC = Math.round(response.main.temp - 273.15);
            var tempF = Math.round(((response.main.temp - 273.15) * 9 / 5) + 32);

            // clear old results if any
            clearResults();

            // display results
            document.getElementById('resultTitle').textContent = 'Weather Info for ' + response.name;
            document.getElementById('resultCity').textContent = 'City: ' + response.name;
            document.getElementById('resultCountryCode').textContent = 'Country Code: ' + response.sys.country;
            document.getElementById('resultTemp').textContent = 'Temperature: ' + tempC + ' °C, ' + tempF + ' °F';
            document.getElementById('resultHumidity').textContent = 'Humidity: ' + response.main.humidity + ' %';
            document.getElementById('resultWind').textContent = 'Wind Speed: ' + response.wind.speed + ' m/s, ' + response.wind.deg + ' degrees';
        }
        else {           
            clearResults();  
        }
    })

    // if the zip search button is clicked
    document.getElementById('submitZip').addEventListener('click', function (event) {
        event.preventDefault();
        var zip1 = document.getElementById("zip").value;
        var countryCode2 = document.getElementById("zipCountryCode").value;

        // both zip code and country code are required
        if (zip1 != '' && countryCode2 != '') {
            var req = new XMLHttpRequest();           
            var zipURL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip1 + ',' + countryCode2 + '&appid=' + apiKey;
            
            // send request an asynchronous call
            req.open('GET', zipURL, false);
            req.send(null);
            var response = JSON.parse(req.responseText);

            // calculate temperature from Kelvin unit that openweathermap provides
            var tempC = Math.round(response.main.temp - 273.15);
            var tempF = Math.round(((response.main.temp - 273.15) * 9 / 5) + 32);

            // clear old results if any
            clearResults();

            // display results
            document.getElementById('resultTitle').textContent = 'Weather Info for ' + zip1;
            document.getElementById('resultCity').textContent = 'City: ' + response.name;
            document.getElementById('resultCountryCode').textContent = 'Country Code: ' + response.sys.country;
            document.getElementById('resultTemp').textContent = 'Temperature: ' + tempC + ' °C, ' + tempF + ' °F';
            document.getElementById('resultHumidity').textContent = 'Humidity: ' + response.main.humidity + ' %';
            document.getElementById('resultWind').textContent = 'Wind Speed: ' + response.wind.speed + ' m/s, ' + response.wind.deg + ' degrees';
        }
        else {           
            clearResults(); 
        }
    })

    // if POST request submit button is clicked
    document.getElementById('submitPost').addEventListener('click', function (event) {
        event.preventDefault();
        var req = new XMLHttpRequest();
        var payload = { data : null }; 
        payload.data = document.getElementById('postInput').value;

        // submit asynchronously via a POST
        req.open('POST', 'http://httpbin.org/post', false); 
        // set a content-type to application/json 
        req.setRequestHeader('Content-Type', 'application/json'); 
        // send stringified object
        req.send(JSON.stringify(payload));
        // parses a JSON string
        var response = JSON.parse(req.responseText);
        
        clearResults();

        // display the response data that matches the data sent 
        document.getElementById('resultPostTitle').textContent = 'POST request';
        document.getElementById('resultPost').textContent = response.json.data;
    })
};

// clear results
function clearResults () {    
        document.getElementById('resultTitle').textContent = '';
        document.getElementById('resultCity').textContent = '';
        document.getElementById('resultCountryCode').textContent = '';
        document.getElementById('resultTemp').textContent = '';
        document.getElementById('resultHumidity').textContent = '';
        document.getElementById('resultWind').textContent = '';
        document.getElementById('resultPostTitle').textContent = '';
        document.getElementById('resultPost').textContent = '';
}
