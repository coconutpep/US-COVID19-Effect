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
    console.log(currentChart);
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
                break;
           }
    }
}

//Set initial display
renderChart();
//Event handler to change charts when selected
chartSelect.on("change", renderChart);