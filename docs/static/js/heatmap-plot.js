//Set date input to variable
const infectionDate = d3.select("#date-input");
const infectionDateType = d3.select("#date-type");

//Function to run code
function runInfection() {
    const infectionDateValue = infectionDate.property("value");

    //Read in infection & death data
    d3.json(`https://covid19bootcampproject3.herokuapp.com/county_clean/${infectionDateValue}`, infectionData => {
        //Parse through data
        infectionData.forEach(d => {
            d.cases = +d.cases;
            d.deaths = +d.deaths;
        });

        //Create data arrays for heatmap layers
        let infectionArr = [];
        let deathArr = [];
        //Add lat lngs to the arrays
        infectionData.forEach(d => {
            let countCases = d.cases;
            let countDeaths = d.deaths;
            for (let i=0; i<=countCases; i++) {
                infectionArr.push([d.lat, d.long]);
            }
            for (let i=0; i<=coundDeaths; i++) {
                deathArr.push([d.lat, d.long]);
            }
        });

        //Create Heatmap layers
        let infectionLayer = L.heatLayer(infectionArr);
        let deathLayer = L.heatLayer(deathArr);

        //Set base layer for the map
        let baseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "streets-v11",
            accessToken: API_KEY
            });

        //create map
        let Map = L.map("infection-heatmap", {
            center: [39.50, -98.35],
            zoom: 4,
            layers: [baseLayer, infectionLayer]
        });

        //Set Overlay Layers
        let overlayMaps = {
            Infections: infectionLayer,
            Deaths: deathLayer
        };

        //Create Layer control
        L.control.layers(overlayMaps).addTo(Map);

        //Add legend to map
        legend.addTo(Map);
    });
}

//Create legend for the map
const legend = L.control({position: "bottomleft"});
//Function to add legend to map
legend.onAdd = function (map) {
    //Div for the legend
    var div = L.DomUtil.create('div', 'legend');
        //Create labels for the legend
        const grades = ["Least", "", "", "", "Most"];
        const colors = ["blue", "cyan", "lime", "yellow", "red"];
        const labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < colors.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i>' +
            grades[i] + '<br><br>';
    }
    //return the div with label
    return div;
}   

//Event handler to begin running code
infectionDateType.on("change.heat", runInfection);
infectionDate.on("change.heat", runInfection);