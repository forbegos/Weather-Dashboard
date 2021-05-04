// - declarations -
// var input = "";

var cities = new Array();

function handleSearch() {
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
  var city = {
    name: input,
    temp: data.main.temp,
    wind: data.wind.speed,
    humidity: data.main.humidity,
    uVIndex: 0.0,
  };

  $(".list-group-item").remove();
  $("#main-output").append(
    "<li> <h2>" + city.name + " (" + wDate + ")" + "</h2></li>"
  );
  $("#main-output").append("<li> <p>Temp: " + city.temp + "°F</p></li>");
  $("#main-output").append("<li> <p>Wind: " + city.wind + "</p></li>");
  $("#main-output").append("<li> <p>Humidity: " + city.humidity + "</p></li>");
  $("#main-output").append("<li> <p>UV Index: " + city.uVIndex + "</p></li>");
  $("li").addClass("list-group-item");

  searchButtons();
}
function searchButtons() {
  $("button").click(function (e) {
    var idClicked = e.target.id;
    searchApi(idClicked);
  });
  $("li").remove;
}

$("#search-btn").click(handleSearch);
