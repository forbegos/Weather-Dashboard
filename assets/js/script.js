// - declarations -

var cities = new Array();

function search() {
  var input = $("#formCityInput").val();
  cities.push(input);
  console.log(cities);
  $("#search-history").append("<button>" + input + "</button>");
  $("button").addClass("list-group-item");
}

$("#search-btn").on("click", search);
