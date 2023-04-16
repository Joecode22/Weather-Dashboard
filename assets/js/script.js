var APIKey = "0a4b94a5f4f88fe22b1db9a21f0ba2cc";
var city;
currentForcast = `api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKey}`;

// Function to change the content of t2
function grabSearch() {
  const searchText = document.getElementById("search-text");
  return searchText.value
}

// Add event listener to table
const searchBtn = document.getElementById("search-submit");
searchBtn.addEventListener("click", grabSearch);

