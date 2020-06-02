//Selector for comparison chart
const chartSelect = d3.select("#comparison");
//Selectors for comparison classes
const stockClassSelector = d3.selectAll(".stock");
const weatherClassSelector = d3.selectAll(".weather");
const stockClass = stockClassSelector["_groups"][0];
const weatherClass = weatherClassSelector["_groups"][0];

//Set initial date value
//Create selector for date input
const dateInput = d3.select("#date-input");

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
                dateInput.attr("value", "2020-03-31");
                dateInput.property("value", "2020-03-31");
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
                dateInput.attr("value", "2020-05-25");
                dateInput.property("value", "2020-05-25");
                break;
           }
    }
}

//Set initial display
renderChart();
//Event handler to change charts when selected
chartSelect.on("change", renderChart);