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


// this is returning data based on dropdown selection
function dropDownChange(sample) {
    d3.select('#sample-metadata').html("")
    let dropDown= d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropDown.property("value");
    // Append data selected from dropdown to demographics table
    let filteredData = data.metadata.filter(input => input['id'] == dataset);
    Object.entries(filteredData[0]).forEach(([key, value]) => {
        d3.select('#sample-metadata')
            .append("div")
            .text(`${key}: ${value}`);
      });
    console.log(filteredData);
};
// On change to the DOM, call optionChange()
//set this to call both the plot change and the dropdown change
// d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged(newSample) {
    allPlots(newSample);
    dropDownChange(newSample);

};
  //need code to reflect a filter on top 10 OTU's when an individual is selcted from the dropdown. 
function allPlots(sample) {
    d3.json('samples.json').then ((dataPlots) => {
    console.log(dataPlots);
    samples = dataPlots.samples;
    let filteredSample = samples.filter(sampleButton => sampleButton['id'] == sample);
    console.log(filteredSample);    
    let bButton = filteredSample[0]
    let id = bButton.otu_ids.slice(0, 10);
    let labels = bButton.otu_labels.slice(0, 10);
    let sampleValues = bButton.sample_values.slice(0, 10);
    
    console.log(id);
    console.log(labels);
    console.log(sampleValues);

    //Sort the data by sample Value search results
    let topTen = sampleValues.sort((a,b) => b.sampleValues - a.sampleValues).reverse();
    // Slice the first 10 objects for plotting
    // let slicedData = topTen.slice(0, 10);
    // console.log(slicedData);
    
    //Reverse the array to accommodate Plotly's defaults
    // let reversedData = topTen.reverse();
    
    let trace= {
        type: 'bar',
        orientation: 'h',
        x: topTen,
        y: id,
        text: labels,
        name: 'Gross'
    };
    
    // data
    let dataTrace = [trace];
    
    // Apply the group bar mode to the layout
    let layout = {
        title: 'Nastiness Belly Button Bacteria',
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };
    // Render the plot to the div tag with id "bar"
    Plotly.newPlot('bar', dataTrace,layout);
    });

};