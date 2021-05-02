// - declarations -

var cities = new Array();

function search(event) {
  var entry = $("#formCityInput").val();
  cities.push(entry);
  console.log(cities);
}

$("#search-btn").on("click", search);
