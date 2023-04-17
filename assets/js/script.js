document.addEventListener("DOMContentLoaded", function() {
  var city;
  var latitude;
  var longitude;
  var fiveDayForcast;
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
      } else {
        console.log("Invalid city name");
      }
    }
  }

  function grabSearch() {
    const searchText = document.getElementById("search-text");
    return searchText.value.trim();
  }

  function mkCityBtn(city) {
    const cityBtn = document.createElement('button');
    cityBtn.id = city;
    cityBtn.type = "submit";
    cityBtn.classList.add('fs-4', 'ms-1', 'btn-secondary', 'mb-3', 'w-75', 'p-2');
    cityBtn.textContent = city;
    return cityBtn;
  }

  function appendCityBtn(cityBtn) {
    const aside = document.getElementById('aside');
    aside.appendChild(cityBtn);
  }

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
      console.log(data);
      latitude = data.coord.lat;
      longitude = data.coord.lon;
      return true;
    } catch (error) {
      console.error(`Error fetching weather data: ${error.message}`);
      return false;
    }
  }

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
});
