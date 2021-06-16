# weather-app

This app makes HTTP requests from a webpage using the Open Weather Map API.
There are two forms in the HTML page and the response for each form is displayed in the browser.

## Form 1
This form is used to send an HTTP request to the Open Weather Map API. 

The form is able to handle the following inputs:
- CITY_NAME, COUNTRY_CODE
- ZIP_CODE, COUNTRY_CODE

The form then sends the input using an asynchronous call to the Open Weather Map API and retrieve the weather for the provided input. 
The appID used is from https://home.openweathermap.org/users/sign_up. 

- The format for the City GET request URL is:</br> http://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={api key}
- The format for the Zip GET request URL is:</br> https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={api key}

## Form 2
The form submits a request to http://httpbin.org/post.

This form submits asynchronously via a POST. It sends a content-type of application/json. When the input is submitted, it returns the data response from the server which matches the data sent. It is stored as a string in the data field of the JSON encoded string returned from the server.
