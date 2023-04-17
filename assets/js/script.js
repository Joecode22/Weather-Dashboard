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
  // Todo: need to hide this key 
  const APIKey = "0bd6340dd436be54dde5c8bc47376fd9";
  const searchBtn = document.getElementById("search-submit");
  searchBtn.addEventListener("click", main);

  async function main() {
    city = grabSearch();
    if (city) {
      const isValidCity = await fetchWeatherData(city);
      if (isValidCity) {
        const cityBtn = mkCityBtn(city);
        appendCityBtn(cityBtn);
        fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;
        fetchFiveDayForcast(fiveDayForcast);
        updateJumbotron(city, date, temperature, wind, humidity)
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
      temperature = data.main.temp;
      wind = data.main.humidity;
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
    } catch (error) {
      console.error(`Error fetching five-day forecast: ${error.message}`);
    }
  }

  function updateJumbotron (city, date, temperature, wind, humidity){
    document.getElementById("city-date").textContent = `${city} (${date})`;
    document.getElementById("temperature").textContent = `${temperature}°F`;
    document.getElementById("wind").textContent = `${wind} MPH`;
    document.getElementById("humidity").textContent = `${humidity}%`;
  }
});
