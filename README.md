# Weather-Dashboard

Use the Open Weather API to create a weather dashboard that allows users to search for weather information for any given city, and displays the current weather data as well as a five-day forecast for that city. The app dynamically creates and appends HTML elements to display weather data on the page, including a search button, city history buttons, current weather information, and a five-day forecast. The app uses local storage to save the last searched city and the list of added cities.

## Appearance

Below is a short video of the appearance and functionality of this application:
![Weather Dashboard Application Behavior](assets/images/app.gif "Weather Dashboard Application Behavior")

## User Story

- AS A traveler
- I WANT to see the weather outlook for multiple cities
- SO THAT I can plan a trip accordingly

## Acceptance Criteria

- GIVEN a weather dashboard with form inputs
- WHEN I search for a city
- THEN I am presented with current and future conditions for that city and that city is - added to the search history
- WHEN I view current weather conditions for that city
- THEN I am presented with the city name, the date, an icon representation of weather - conditions, the temperature, the humidity, and the wind speed
- WHEN I view future weather conditions for that city
- THEN I am presented with a 5-day forecast that displays the date, an icon representation - of weather conditions, the temperature, the wind speed, and the humidity
- WHEN I click on a city in the search history
- THEN I am again presented with current and future conditions for that city

## Installation

There is no installation requirement

## Usage

This project is deployed on github pages.
Follow this link to view: <https://joecode22.github.io/Weather-Dashboard/>

## Credits

- The README for this project incorporates text from the project challenge assignment README from class.
- Background Photo by Davies Designs Studios on Unsplash: <https://unsplash.com/photos/f5_lfi2S-d4>

## License

Please refer to the license section

## Features

Some key features of this application include:

1. First it listens for the DOMContentLoaded event to ensure the page is fully loaded before executing the script.

2. Uses global variables to store data such as city, latitude, longitude, fiveDayForcast, date, temperature, wind, humidity, iconCode, iconURL, and addedCities.

3. Fetches weather data using the OpenWeatherMap API with the API key stored in a config file, and converts temperature units from Kelvin to Celsius and Fahrenheit.

4. Dynamically creates and appends HTML elements to display weather data on the page, including a search button, city history buttons, current weather information, and a five-day forecast.

5. Uses local storage to save the last searched city and the list of added cities, and loads the page based on the stored data.
