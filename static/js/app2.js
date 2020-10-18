let data = []
//call data from samples.js using d3
d3.json('samples.json').then((input) => {
    console.log(input);
    data = input;
    //populate dropdown menu with 'name' id's
    input['names'].forEach(dropDown => {
        d3.select("#selDataset")
            .append("option")
            .text(dropDown)
            .property("value", dropDown)
    })
});


// On change to the DOM, call optionChange()
d3.selectAll("#selDataset").on("change", optionChange);
// this is returning data based on dropdown selection
function optionChange() {
    d3.select('#sample-metadata').html("")
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    let filteredData = data.metadata.filter(input => input['id'] == dataset);
    Object.entries(filteredData[0]).forEach(([key, value]) => {
        d3.select('#sample-metadata')
            .append("div")
            .text(`${key}: ${value}`);
      });
    console.log(filteredData);
  }
//need code to reflect a filter on top 10 OTU's when an individual is selcted from the dropdown. 

// d3.json('samples.json').then((data) => {
//     console.log(data);
// // Sort the data by sample Value search results
// let barInfo = data.sort( (a,b) => b.sampleValue - a.sampleValue);
// // Slice the first 10 objects for plotting
// let slicedData = barInfo.slice(0, 10);

// // Reverse the array to accommodate Plotly's defaults
// let reversedData = slicedData.reverse();

// // Trace1 for the Greek Data
// let trace1 = {
//     type: 'bar',
//     orientation: 'h',
//     x: reversedData.map(object => object.sampleValue),
//     y: reversedData.map(object => object.greekName),
//     text: reversedData.map(object => object.greekName),
//     name: 'Greek'
// };

// // data
// let dataTrace = [trace1];

// // Apply the group bar mode to the layout
// let layout = {
//     title: 'Greek Gods Search Results',
//     margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//     }
// };
// // Render the plot to the div tag with id "plot"
// Plotly.newPlot('plot', dataTrace,layout);