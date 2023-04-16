var APIKey = "0a4b94a5f4f88fe22b1db9a21f0ba2cc";
var city;
currentForcast = `api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}`;


// Add event listener to table
const searchBtn = document.getElementById("search-submit");
searchBtn.addEventListener("click", grabSearch);

// Function to change the content of t2
function grabSearch() {
  const searchText = document.getElementById("search-text");
  const cityName = searchText.value;
  mkCityBtn(cityName);
}

//function that makes city history buttons
function mkCityBtn(cityName) {
  const cityBtn = document.createElement('button');
  cityBtn.id = cityName;
  cityBtn.type = "submit";
  cityBtn.classList.add('fs-4', 'ms-1', 'btn-primary', 'mb-3', 'w-75', 'p-2');
  cityBtn.textContent = cityName;
  // console.log('cityBtn: ' + cityBtn)
  // appendHTML();
}

//function that appends html to the page
// function appendHTML() {

// }