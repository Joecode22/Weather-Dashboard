// Script File for Weather Dashboard
// Joseph McKinney
// Challenf
// 4/16/2023

document.addEventListener("DOMContentLoaded", function() {
  //global variables
  var city;
  var latitude;
  var longitude;
  var fiveDayForcast;
  var date; //get the date
  var temperature;
  var wind;
  var humidity;
  var iconCode;
  var iconURL;
  // Todo: need to hide this key 
  const APIKey = "0bd6340dd436be54dde5c8bc47376fd9";
  const searchBtn = document.getElementById("search-submit");
  searchBtn.addEventListener("click", main);

  //Conversions
  //Kelvin to Fahrenheit
  function kelvinToFahrenheit(kelvin) {
    return Math.floor((kelvin - 273.15) * 9/5 + 32);
  }
  //Kelvin to Celsius
  function kelvinToCelsius(kelvinTemp) {
    return Math.floor(kelvinTemp - 273.15);
  }
  

  

  async function main() {
    city = grabSearch();
    if (city) {
      const isValidCity = await fetchWeatherData(city);
      if (isValidCity) {
        const cityBtn = mkCityBtn(city);
        appendCityBtn(cityBtn);
        fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
        fetchFiveDayForcast(fiveDayForcast);
        updateJumbotron(city, date, temperature, wind, humidity, iconURL)
        // Create the heading
        const fiveDayHeading = document.createElement('h2');
        fiveDayHeading.textContent = 'Five Day Forecast';

        // Append the heading to the container element
        const container = document.getElementById('container');
        container.appendChild(fiveDayHeading);
      } else {
        console.log("Invalid city name");
      }
    }
  }
  // This function gets the text in the search input field
  function grabSearch() {
    const searchText = document.getElementById("search-text");
    return searchText.value.trim();
  }

  // This function makes the city history buttons
  function mkCityBtn(city) {
    const cityBtn = document.createElement('button');
    cityBtn.id = city;
    cityBtn.type = "submit";
    cityBtn.classList.add('fs-4', 'ms-1', 'btn-secondary', 'mb-3', 'w-75', 'p-2');
    cityBtn.textContent = city;
    return cityBtn;
  }

  // This function appends the city history buttons as children of the aside
  function appendCityBtn(cityBtn) {
    const aside = document.getElementById('aside');
    aside.appendChild(cityBtn);
  }

  // This function fetches the current weather information for given city
  async function fetchWeatherData(city) {
    var currentForcast = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    try {
      const response = await fetch(currentForcast);
      if (!response.ok) {
        if (response.status === 404) {
          return false;
        }
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      latitude = data.coord.lat;
      longitude = data.coord.lon;
      date = new Date(data.dt * 1000).toLocaleDateString();
      temperature = kelvinToCelsius(data.main.temp);
      wind = data.wind.speed;
      humidity = data.main.humidity;
      iconCode = data.weather[0].icon;
      iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

      return true;
    } catch (error) {
      console.error(`Error fetching weather data: ${error.message}`);
      return false;
    }
  }

  // This function fetches the five day forcast informatiion
  // Todo: Note 5-day forcast information is provided in three hour blocks so we will need to manage that later
  async function fetchFiveDayForcast(fiveDayForcast) {
    try {
      const response = await fetch(fiveDayForcast);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      container.innerHTML = '';


      // Loop through the data and create a card for each day
      for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        
        // Create the card element
        const card = document.createElement('div');
        card.classList.add('card', 'text-white', 'bg-primary', 'mb-3', 'mx-auto', 'weather-card');

        // Create the card body element
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'weather-card-body');

        // Create the date element
        const date = document.createElement('h5');
        date.classList.add('card-title', 'fs-6');
        date.textContent = new Date(day.dt * 1000).toLocaleDateString();

        // Create the weather icon element
        const icon = document.createElement('img');
        icon.classList.add('card-img-top');
        icon.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

        // Create the temperature element
        const temp = document.createElement('p');
        temp.classList.add('card-text', 'fs-7');
        temp.textContent = `Temperature: ${kelvinToFahrenheit(day.main.temp)}°F`;

        // Create the wind element
        const wind = document.createElement('p');
        wind.classList.add('card-text', 'fs-7');
        wind.textContent = `Wind: ${day.wind.speed} MPH`;

        // Create the humidity element
        const humidity = document.createElement('p');
        humidity.classList.add('card-text', 'fs-7');
        humidity.textContent = `Humidity: ${day.main.humidity}%`;

        
        // Append the elements to the card body
        cardBody.appendChild(date);
        cardBody.appendChild(icon);
        cardBody.appendChild(temp);
        cardBody.appendChild(wind);
        cardBody.appendChild(humidity);
        
        // Append the card body to the card
        card.appendChild(cardBody);
        
        // Append the cardDeck to the container
        container.appendChild(card);
      }
          
    } catch (error) {
      console.error(`Error fetching five-day forecast: ${error.message}`);
    }
  }
  

  //this function updates the jumbotron
  function updateJumbotron(city, date, temperature, wind, humidity, iconURL) {
    const cityDate = document.getElementById("city-date");
    cityDate.textContent = `${city} (${date})`;
  
    // Create an img element for the weather icon
    const weatherIcon = document.createElement("img");
    weatherIcon.id = "weather-icon";
    weatherIcon.src = iconURL;
    weatherIcon.alt = "Weather icon";
  
    // Append the weather icon to the heading
    cityDate.appendChild(weatherIcon);
  
    document.getElementById("temperature").textContent = `Temp: ${temperature}°F`;
    document.getElementById("wind").textContent = `Wind: ${wind} MPH`;
    document.getElementById("humidity").textContent = `Humidity: ${humidity}%`;
  };
});
