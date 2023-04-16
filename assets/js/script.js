var APIKey = "0a4b94a5f4f88fe22b1db9a21f0ba2cc";
var city;
currentForcast = `api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}`;


// Add event listener to table
const searchBtn = document.getElementById("search-submit");
searchBtn.addEventListener("click", grabSearch);

// Function to grab the search term when the search button is clicked
function grabSearch() {
  const searchText = document.getElementById("search-text");
  const cityName = searchText.value;
  mkCityBtn(cityName);
};

//function that makes city history buttons
//Also appends them to the aside
function mkCityBtn(cityName) {
  const cityBtn = document.createElement('button');
  const aside = document.getElementById('aside');
  cityBtn.id = cityName;
  cityBtn.type = "submit";
  cityBtn.classList.add('fs-4', 'ms-1', 'btn-primary', 'mb-3', 'w-75', 'p-2');
  cityBtn.textContent = cityName;
  aside.appendChild(cityBtn);
};