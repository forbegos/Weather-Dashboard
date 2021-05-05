function handleSearch() {
  var input = $("#formCityInput").val();
  console.log(input);
  getWeatherData(input);
}

function getWeatherData(input) {
  var weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    input +
    "&units=imperial&appid=7c08f7afcc6d36b67deb43725fa6e363";

  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var wDate = new Date(data.dt * 1000).toLocaleDateString("en-US");
      $(".list-group-item").remove();

      $("#main-output").append(
        "<li> <h2>" + data.name + " (" + wDate + ")" + "</h2></li>"
      );
      $("#main-output").append(
        "<li> <p>Temp: " + data.main.temp + "°F</p></li>"
      );
      $("#main-output").append(
        "<li> <p>Wind: " + data.wind.speed + "</p></li>"
      );
      $("#main-output").append(
        "<li> <p>Humidity: " + data.main.humidity + "</p></li>"
      );

      var weather2URL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        data.coord.lat +
        "&lon=" +
        data.coord.lon +
        "&appid=7c08f7afcc6d36b67deb43725fa6e363";

      fetch(weather2URL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data2) {
          console.log(data2);
          $("#main-output").append(
            "<li><p id = 'uvindex'>UV Index: " + data2.current.uvi + "</p></li>"
          );
          $("li").addClass("list-group-item");

          //get forecast here--------------
        });
    });
  createButtons(input);
}

function createButtons(input) {
  $("#search-history").append(
    "<button id = 'historybutton'>" + input + "</button>"
  );
}

$("#search").click(handleSearch);
