# weather-app

This app makes HTTP requests from a webpage using the Open Weather Map API.
There is a form in the HTML page that user can search by city name or zip code, and the response for the form is displayed in the browser.

## Form
This form is used to send an HTTP request to the Open Weather Map API. 

The form is able to handle the following inputs:
- CITY_NAME, COUNTRY_CODE
- ZIP_CODE, COUNTRY_CODE

The form then sends the input using an asynchronous call to the Open Weather Map API and retrieve the weather for the provided input. 
The appID used is from https://home.openweathermap.org/users/sign_up. 

- The format for the City GET request URL is:</br> http://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={api key}
- The format for the Zip GET request URL is:</br> https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={api key}
