// - declarations -
// var input = "";
var city = {
  name: "",
  temp: "",
  wind: "",
  humidty: "",
  uVIndex: 0.0,
};
var cities = new Array();

function handleSearch() {
  $("li").remove();
  var input = $("#formCityInput").val();
  cities.push(input);

  $("#search-history").append(
    "<button type = 'button' class='btn' id=" +
      input +
      ">" +
      input +
      "</button>"
  );

  searchApi(input);
}

function searchApi(input) {
  $("li").remove();
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
      postResults(data, input);
    });
}

function postResults(data, input) {
  var wDate = new Date(data.dt * 1000).toLocaleDateString("en-US");
  city.name = input;
  city.temp = data.main.temp;
  city.wind = data.wind.speed;
  city.humidity = data.main.humidity;
  city.uVIndex = "UVINDEX";
  // console.log(city);

  $("#main-output").append(
    "<li> <h2>" + city.name + " (" + wDate + ")" + "</h2></li>"
  );
  $("#main-output").append("<li> <p>Temp: " + city.temp + "°F</p></li>");
  $("#main-output").append("<li> <p>Wind: " + city.wind + "</p></li>");
  $("#main-output").append("<li> <p>Humidity: " + city.humidity + "</p></li>");
  $("#main-output").append("<li> <p>UV Index: " + city.uVIndex + "</p></li>");
  $("li").addClass("list-group-item");

  // searchButtons();
}
// function searchButtons() {
// }

$("#search-btn").on("click", handleSearch);

// $("button").click(function (e) {
//   e.preventDefault();
//   var idClicked = e.target.id;
//   searchApi(idClicked);
//   $("li").remove();
// });
