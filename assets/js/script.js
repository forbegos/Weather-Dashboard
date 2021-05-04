// - declarations -

var cities = new Array();
var input = "";
var city = {
  name: "",
  temp: "",
  wind: "",
  humidty: "",
  uVIndex: 0.0,
};

function handleSearch() {
  $("li").remove();

  input = $("#formCityInput").val();
  cities.push(input);
  console.log(cities);
  $("#search-history").append("<button>" + input + "</button>");
  $("button").addClass("list-group-item");

  searchApi(input);
}

function searchApi(input) {
  var weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    input +
    "&units=imperial&appid=c2e67013d929cf413079d489df0a2fe1";

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      postResults(data);
    });
}

function postResults(data) {
  var wDate = new Date(data.dt * 1000).toLocaleDateString("en-US");
  city.name = input;
  city.temp = data.main.temp;
  city.wind = data.wind.speed;
  city.humidity = data.main.humidity;
  city.uVIndex = "UVINDEX";
  console.log(city);

  $("#main-output").append("<li> <h2>" + city.name + "</h2></li>");
  $("#main-output").append("<li> <p>Temp: " + city.temp + "°F</p></li>");
  $("#main-output").append("<li> <p>Wind: " + city.wind + "</p></li>");
  $("#main-output").append("<li> <p>Humidity: " + city.humidity + "</p></li>");
  $("#main-output").append("<li> <p>UV Index: " + city.uVIndex + "</p></li>");
  $("li").addClass("list-group-item");
}

$("#search-btn").on("click", handleSearch);
