//Selector for Date Choices
const dateType = d3.select("#date-type");
//Selectors for Date Inputs
const dateSingle = d3.select("#date-input");
const dateStart = d3.select("#start-date-holder");
const dateEnd = d3.select("#end-date-holder");
//Function to change input display for datetype
function inputRender() {
    //Grab date type value
    const dateTypeValue = dateType.property("value");
    //Switch statement to adjust display
    switch (dateTypeValue) {
        case "Date Range": 
        {
            dateSingle.style("display", "none");
            dateStart.style("display", "");
            dateEnd.style("display", "");
            d3.select("#infection-heatmap").style("display", "none");
            d3.select("#weather-heatmap").style("display", "none");
            d3.select("#infection-line").style("display", "");
            d3.select("#weather-line").style("display", "");
            d3.select("#infection-heatmap").innerHTML = "";
            d3.select("#weather-heatmap").innerHTML = "";
            break;
        }
        case "Single Date":
        { 
            dateStart.style("display", "none");
            dateEnd.style("display", "none");
            dateSingle.style("display", "");
            d3.select("#infection-line").style("display", "none");
            d3.select("#weather-line").style("display", "none");
            d3.select("#infection-heatmap").style("display", "");
            d3.select("#weather-heatmap").style("display", "");
            break;
        }
    }
}

//Selector for comparison chart
const chartSelect = d3.select("#comparison");
//Selectors for comparison classes
const stockClassSelector = d3.selectAll(".stock");
const weatherClassSelector = d3.selectAll(".weather");
const stockClass = stockClassSelector["_groups"][0];
const weatherClass = weatherClassSelector["_groups"][0];

//Function to adjust website based on chart selection
function renderChart() {
    const currentChart = d3.select("#comparison").property("value");
    //Conditional statements to set displays
    switch (currentChart) {
        case 'Weather Comparison':
          {
                for (i = 0; i < stockClass.length; i++) {
                stockClass[i].style.display = "none";
                }
                for (i = 0; i < weatherClass.length; i++) {
                weatherClass[i].style.display = "inline-block";
                }
                dateSingle.property("value", "2020-03-31");
                dateSingle.attr("value", "2020-03-31");
                dateSingle.attr("min", "2020-01-22");
                dateSingle.attr("max", "2020-03-31");
                dateStart.select("input").property("value", "2020-01-22");
                dateStart.select("input").attr("value", "2020-01-22");
                dateStart.select("input").attr("min", "2020-01-22");
                dateStart.select("input").attr("max", "2020-03-31");
                dateEnd.select("input").property("value", "2020-03-31");
                dateEnd.select("input").attr("value", "2020-03-31");
                dateEnd.select("input").attr("min", "2020-01-22");
                dateEnd.select("input").attr("max", "2020-03-31");
                break;
          }
        case 'Stock Lookup':
            {
                for (i = 0; i < stockClass.length; i++) {
                    stockClass[i].style.display = "inline-block";
                }
                for (i = 0; i < weatherClass.length; i++) {
                    weatherClass[i].style.display = "none";
                }
                dateSingle.property("value", "2020-05-25");
                dateStart.property("value", "2020-01-22");
                dateEnd.property("value", "2020-05-25");
                break;
           }
    }
}

//Set initial display
renderChart();
//Event handler to change charts when selected
chartSelect.on("change", renderChart);

//Set initial input display
inputRender();
//Event handler to change input display
dateType.on("change", inputRender);