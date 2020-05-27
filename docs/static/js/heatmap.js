//Set-up map
const myMap = L.map("infection-heatmap", {
    center: [39.50, -98.35],
    zoom: 5
  });

//Add background layer to heatmap
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "streets-v9",
accessToken: API_KEY
}).addTo(myMap)

//Access infection data for heatmap
d3.csv("data/covid_confirmed_usafacts.csv").then(infectionData => {

    //

});