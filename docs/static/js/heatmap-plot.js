//Read in infection & death data
d3.csv("data/test_data.csv", infectionData => {
    //Parse through data
    infectionData.forEach(d => {
        d.cases = +d.cases;
        d.deaths = +d.deaths;
    });
    //Set data
    const testDataInfection = {
        max: d3.max(infectionData, d => d.cases),
        data: infectionData
    };
    const testDataDeath = {
        max: d3.max(infectionData, d => d.deaths),
        data: infectionData
    };
    //Set base layer for the map
    const baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v9",
        accessToken: API_KEY
        });

    //Set the config options for the infection heatmap layer
    const cfgInfection = {
        "radius": 2,
        "maxOpacity": .8,
        "scaleRadius": true,
        "useLocalExtrema": false,
        latField: "lat",
        lngField: "long",
        valueField: "cases"
    };
    //Set the config options for the death heatmap layer
    const cfgDeath = {
        "radius": 2,
        "maxOpacity": .8,
        "scaleRadius": true,
        "useLocalExtrema": false,
        latField: "lat",
        lngField: "long",
        valueField: "deaths",
    };

    //Create the heatmap layers
    const infectionLayer = new HeatmapOverlay(cfgInfection);
    const deathLayer = new HeatmapOverlay(cfgDeath);

    //create map
    const myMap = L.map("infection-heatmap", {
        center: [39.50, -98.35],
        zoom: 5,
        layers: [baseLayer, infectionLayer]
    });

    //Set data for heatmap layers
    infectionLayer.setData(testDataInfection);
    deathLayer.setData(testDataDeath);

    //Set Overlay Layers
    const overlayMaps = {
        Infections: infectionLayer,
        Deaths: deathLayer
    };

    //Create Layer control
    L.control.layers(overlayMaps).addTo(myMap);
})