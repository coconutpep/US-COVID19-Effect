//Create Map
const myMap = L.map("hospital-bed-marker", {
    center: [39.50, -98.35],
    zoom: 4,
});

//Set background layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
    }).addTo(myMap);

//Call API for GeoJSON data
d3.json("https://opendata.arcgis.com/datasets/1044bb19da8d4dbfb6a96eb1b4ebf629_0.geojson", bedData => {
    //Set marker layer
    const markers = L.markerClusterGroup();

    //Loop through data
    for (let i=0; i<bedData.length; i++) {
        //Set data location value
        const location = bedData[i].geometry.coordinates;
        //Add new marker to cluster group and bind popup
        markers.addLayer(L.marker([location[1], location[0]]))
            .bindPopup(`<h3>${}`)
    }
});