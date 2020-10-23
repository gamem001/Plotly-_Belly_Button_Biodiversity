//array to hold data
let data = []
// initialize the data for the page, call data from samples.js using d3
function init() {
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
    // pass promise to next .then
    }).then(() => {
        let dropDown= d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropDown.property("value");
        optionChanged(dataset)
    }); 
    
};

// this is returning data based on dropdown selection
function dropDownChange(param_func) {
    // Append data selected from dropdown to demographics table
    d3.select('#sample-metadata').html("")
    let filteredData = data.metadata.filter(input => input['id'] == param_func);
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
          
    let trace= {
        type: 'bar',
        orientation: 'h',
        x: topTen,
        y: id.map(otuID => `OTU ${otuID}`).reverse(),
        text: labels,
        name: 'Belly Button Bacteria'
    };
    
    // data
    let dataTrace = [trace];
    
    // Apply the group bar mode to the layout
    let layout = {
        title: 'Top Ten Belly Button Bacteria',
        xaxis: {title: "OTU Sample Values"},
        yaxis: {title: "OTU ID"},
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        }
    };
    // Render the plot to the div tag with id "bar"
    Plotly.newPlot('bar', dataTrace,layout);

    let trace1 = {
        x: id,
        y: sampleValues,
        mode: 'markers',
        text: id,
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(93, 164, 214)', 'rgb(255, 144, 14)'],
          opacity: [1, 0.8, 0.6, 0.4, 1, 0.8, 0.6, 0.4, 1, 0.8],
          size: sampleValues
        }
      };
      
      let dataBubble = [trace1];
      
      let layoutBubble = {
        title: 'Top Ten Belly Button Bacteria',
        showlegend: false,
        height: 550,
        width: 800,
        xaxis: {title: "OTU ID"},
        yaxis: {title: "OTU Sample Value"},
        hovermode: "closest"
      };
      
      Plotly.newPlot('bubble', dataBubble, layoutBubble);
    });
};

init();

