d3.csv("data/test_data.csv", infectionData => {
    //Parse through data
    infectionData.forEach(d => {
        d.cases = +d.cases;
        d.deaths = +d.deaths;
    });
    
    //Create Array for heatmap infection layer
    const infectionArr = [];
    //Create Array for heatmap death layer
    const deathArr = [];
    //Iterate through data and append counties
    for (let i=0; i<infectionData.length; i++) {
        //Create multipliers from number of cases and deaths
        const cases = infectionData[i].cases;
        const deaths = infectionData[i].deaths;
        //Create for loops using "multipliers" to append coords for every case and death
        //For loop for cases
        for (let j=1; j<=cases; j++) {
            infectionArr.push([infectionData[i].lat, infectionData[i].long]);
        }
        //For loop for deaths
        for (let k=1; k<=deaths; k++) {
            deathArr.push([infectionData[i].lat, infectionData[i].long]);
        }
    }

    //Create layers for infections and deaths
    //Heatmap layer for infection rates
    const infectionLayer = L.heatLayer(infectionArr, {
        radius: 20,
        blur: 35
      })
    //Heatmap layer for death rates
    const deathLayer = L.heatLayer(deathArr, {
        radius: 20,
        blur: 35,
        gradient: {
            .2: "green",
            .4: "yellow",
            .6: "red",
            .8: "grey",
            1: "black"
        }
    })

    //Set Overlay Maps
    const overlayMaps = {
        Infections: infectionLayer,
        Deaths: deathLayer
    };

    //Set-up map
    const myMap = L.map("infection-heatmap", {
        center: [39.50, -98.35],
        zoom: 5,
        layers: [infectionLayer]
    });

    //Add background layer to heatmap
    L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "streets-v9",
        accessToken: API_KEY
        }).addTo(myMap)

    //Add Layer control
    L.control.layers(overlayMaps).addTo(myMap);
});