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
function dropDownChange(info) {
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

  //need code to reflect a filter on top 10 OTU's when an individual is selcted from the dropdown. 
function allPlots(info) {
    d3.json('samples.json').then ((dataPlots) => {
        console.log(dataPlots);
        
        let id = dataPlots.samples[0].otu_ids;
        let labels = dataPlots.samples[0].otu_labels.slice(0, 10);
        let sampleValues = dataPlots.samples[0].sample_values.slice(0, 10).reverse();
      
        console.log(id);
        console.log(labels);
        console.log(sampleValues);

        //Sort the data by sample Value search results
        // let topTen = dataPlots.sort((a,b) => b.sampleValues - a.sampleValues);
        // Slice the first 10 objects for plotting
        // let slicedData = topTen.slice(0, 10);
        // console.log(slicedData);
      
        //Reverse the array to accommodate Plotly's defaults
        // let reversedData = slicedData.reverse();
        
        let trace1 = {
            type: 'bar',
            orientation: 'h',
            x: sampleValues,
            y: id,
            text: labels,
            name: 'Gross'
        };
        
        // data
        let dataTrace = [trace1];
        
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

// On change to the DOM, call optionChange()
//set this to call both the plot change and the dropdown change
d3.selectAll("#selDataset").on("change", optionChanged);
function optionChanged(info) {
    allPlots(info);
    dropDownChange(info);

};
