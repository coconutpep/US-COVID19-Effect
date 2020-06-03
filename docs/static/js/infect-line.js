//Read in data
d3.csv("data/infection_date.csv", infectionData => {
    //Parse through the data
    infectionData.forEach(d => {
        d.cases = +d.cases;
        d.deaths = +d.deaths;
    });

    //Set initial traces
    let traceInfection = {
        type: "scatter",
        x: infectionData.map(d => d.date),
        y: infectionData.map(d => d.cases),
        mode: "lines",
        name: "Infections",
        line: {
            color: "rgb(219, 130, 22)",
            width: 3
        }
    };
    let traceDeath = {
        type: "scatter",
        x: infectionData.map(d => d.date),
        y: infectionData.map(d => d.deaths),
        mode: "lines",
        name: "Deaths",
        line: {
            color: "rgb(64, 64, 66)",
            width: 3
        }
    };
    //Set the layout for the chart
    const layout = {
        title: "Confirmed Cases and Deaths of COVID-19",
        width: "100%",
        height: "100%"
    }
    //Set data array
    const data = [traceInfection, traceDeath];
    //Draw Plot
    Plotly.newPlot("infection-line", data, layout);
});