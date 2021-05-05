// Initial read from local storage -------------------------
var cities = JSON.parse(localStorage.getItem("cities"));

// If local storage is not empty, populate history search list buttons -----------
console.log(cities);
if (cities != null) {
  for (var i = 0; i < cities.length; i++) {
    $("#search-history").append(
      "<button id = 'historybutton'>" + cities[i] + "</button>"
    );
  }
} else {
  cities = [];
}

// Startup city placeholder -----------
getWeatherData("Denver");

// Main event handler function - handle main search -----------
function handleSearch() {
  var input = $("#formCityInput").val();
  cities.push(input);
  getWeatherData(input);
}

// Get weather data for input city and display it ---------------------------------
function getWeatherData(input) {
  // Declare URL for basic weather data from open weather map -------------
  var weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    input +
    "&units=imperial&appid=7c08f7afcc6d36b67deb43725fa6e363";

  // fetch the first api from open weaher map with basic weather data and post to screen----------
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
        "<li> <p>Temp: " + data.main.temp + " °F</p></li>"
      );
      $("#main-output").append(
        "<li> <p>Wind: " + data.wind.speed + " MPH</p></li>"
      );
      $("#main-output").append(
        "<li> <p>Humidity: " + data.main.humidity + " %</p></li>"
      );
      // Declare second URL for specific weather data (weather forecast and uv index information)
      // from open weather map -------------

      var weather2URL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        data.coord.lat +
        "&lon=" +
        data.coord.lon +
        "&units=imperial&appid=7c08f7afcc6d36b67deb43725fa6e363";

      // fetch the second api from open weaher map with specific weather data and post to screen----------

      fetch(weather2URL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data2) {
          console.log(data2);
          if (data2.current.uvi > 8) {
            spanClass = "red";
          } else if (data2.current.uvi < 7 && data2.current.uvi > 3) {
            spanClass = "yellow";
          } else {
            spanClass = "green";
          }

          $("#main-output").append(
            "<li><p id = 'uvindex'>UV Index: <span class = " +
              spanClass +
              ">" +
              data2.current.uvi +
              "</span></p></li>"
          );
          $("li").addClass("list-group-item");

          //post forecast (5 Day) weather data here------------------------------
          for (var i = 0; i < 5; i++) {
            var wDate = new Date(data2.daily[i].dt * 1000).toLocaleDateString(
              "en-US"
            );

            $("#forecast" + i).append(
              "<li class = 'list-group-item'><h3>" + wDate + "</h3></li>"
            );
            var icon =
              "http://openweathermap.org/img/w/" +
              data2.daily[i].weather[0].icon +
              ".png";

            $("#forecast" + i).append(
              "<li class = 'list-group-item'><img src=" + icon + ">" + "</li>"
            );
            $("#forecast" + i).append(
              "<li class = 'list-group-item'><p>Temp: " +
                data2.daily[i].temp.day +
                " °F</p></li>"
            );
            $("#forecast" + i).append(
              "<li class = 'list-group-item'><p>Wind: " +
                data2.daily[i].wind_speed +
                " MPH</p></li>"
            );
            $("#forecast" + i).append(
              "<li class = 'list-group-item'><p>Humidity: " +
                data2.daily[i].humidity +
                " %</p></li>"
            );
          }
        });
    });
  // call create buttons function to generate search history button list ----------
  createButtons(cities);
  // save current array of cities to local storage --------------
  localStorage.setItem("cities", JSON.stringify(cities));
}

// Create history button lists ------------------
function createButtons(cities) {
  $("#search-history").append(
    "<button id = 'historybutton'>" + cities[cities.length - 1] + "</button>"
  );
}

// Event listner for search history buttons ------------

// $("#historybutton").click(function () {
//   console.log("hi!");
//   getWeatherData($("#historybutton").val());
// });

// Main event handler -----------------------
$("#search").click(handleSearch);
