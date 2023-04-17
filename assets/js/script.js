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
  var date;
  var temperature;
  var wind;
  var humidity;
  var iconCode;
  var iconURL;
  var addedCities = []; // keep track of the cities added

  // Todo: need to hide this key 
  const APIKey = "0bd6340dd436be54dde5c8bc47376fd9";
  const searchBtn = document.getElementById("search-submit");

  //Event Listener for search button
  searchBtn.addEventListener("click", function(){
    const searchText = document.getElementById("search-text");
    const cityName = searchText.value.trim();
    main(cityName);
  });

  //Conversions
  //Kelvin to Fahrenheit
  function kelvinToFahrenheit(kelvin) {
    return Math.floor((kelvin - 273.15) * 9/5 + 32);
  }
  //Kelvin to Celsius
  function kelvinToCelsius(kelvinTemp) {
    return Math.floor(kelvinTemp - 273.15);
  }
  

  function loadPage(){
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    const storedCities = JSON.parse(localStorage.getItem('addedCities'));

    if (storedCities) {
      storedCities.forEach(city => {
        const cityBtn = mkCityBtn(city);
        appendCityBtn(cityBtn);
      });
    }

    if (lastSearchedCity) {
      main(lastSearchedCity);
    }
  }

  async function main(city) {
    // city = grabSearch();
    if (city) {
      const isValidCity = await fetchWeatherData(city);
      if (isValidCity) {
        const cityBtn = mkCityBtn(city);
        appendCityBtn(cityBtn);
        fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
        fetchFiveDayForcast(fiveDayForcast);
        updateJumbotron(city, date, temperature, wind, humidity, iconURL)
        localStorage.setItem('lastSearchedCity', city);
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

    // Add an event listener to the city history button
    cityBtn.addEventListener('click', () => {
      main(city);
    });

    return cityBtn;
  }

  // This function appends the city history buttons as children of the aside
  function appendCityBtn(cityBtn) {
    if (!addedCities.includes(cityBtn.id)){
      const aside = document.getElementById('aside');
      aside.appendChild(cityBtn);
      addedCities.push(cityBtn.id);
      localStorage.setItem('addedCities', JSON.stringify(addedCities));
    }

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
  async function fetchFiveDayForcast(fiveDayForcast) {
    clearCards();
    try {
      const response = await fetch(fiveDayForcast);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      // Loop through the data and create a card for each day
      // Days are divided up into 3 hour segments so we step by 8
      for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        
        // Create the card element
        const card = document.createElement('div');
        card.classList.add('card', 'text-white', 'bg-primary', 'mb-3', 'weather-card');
    
        // Create the card body element
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'weather-card-body');

        // Create the date element
        const date = document.createElement('h5');
        date.classList.add('card-title', 'fs-6');
        date.textContent = new Date(day.dt * 1000).toLocaleDateString();

        // Create the weather icon element
        const icon = document.createElement('img');
        icon.classList.add('card-img-top', 'weather-icon');
        icon.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        icon.style.width = '50px'; // Adjust the icon size by changing this value
        icon.style.float = 'left'; // Align the icon to the left

        // Create the temperature element
        const temp = document.createElement('p');
        temp.classList.add('card-text', 'fs-7');
        temp.textContent = `Temp: ${kelvinToFahrenheit(day.main.temp)}°F`;

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

  //This function clears the cards
  function clearCards(){
    const container = document.getElementById('container');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  loadPage();
});
