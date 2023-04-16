var APIKey = "0a4b94a5f4f88fe22b1db9a21f0ba2cc";
//global variable to hold search city
var city;
var coords;
// Add event listener to table
const searchBtn = document.getElementById("search-submit");
searchBtn.addEventListener("click", grabSearch);

// Function to grab the search term when the search button is clicked
function grabSearch() {
  const searchText = document.getElementById("search-text");
  city = searchText.value.trim();
  if (city){
    mkCityBtn(city);
  }
};


//function that makes city history buttons
//Also appends them to the aside
function mkCityBtn(city) {
  const cityBtn = document.createElement('button');
  const aside = document.getElementById('aside');
  cityBtn.id = city;
  cityBtn.type = "submit";
  cityBtn.classList.add('fs-4', 'ms-1', 'btn-primary', 'mb-3', 'w-75', 'p-2');
  cityBtn.textContent = city;
  aside.appendChild(cityBtn);
  var currentForcast = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  fetchWeatherData(APIKey, currentForcast);
};

function fetchWeatherData(APIKey, currentForcast) {
  fetch(currentForcast)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data)
    coords = [data.coord.lat, data.coord.lon];
    console.log(coords); 
    console.log(coords[0]); 
    console.log(coords[1]); 
    return [coords[0], coords[1], data]
  })
}
const latitude = coords;
const longitude = coords;

var fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid={APIKey};
`
function fetchFiveDayForcast(){
  fetch
}