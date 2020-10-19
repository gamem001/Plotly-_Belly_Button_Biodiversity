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
d3.selectAll("#selDataset").on("change", optionChanged);
// this is returning data based on dropdown selection
function optionChanged() {
    d3.select('#sample-metadata').html("")
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let dataset = dropdownMenu.property("value");
    // Append data selected from dropdown to demographics table
    let filteredData = data.metadata.filter(input => input['id'] == dataset);
    Object.entries(filteredData[0]).forEach(([key, value]) => {
        d3.select('#sample-metadata')
            .append("div")
            .text(`${key}: ${value}`);
      });
    console.log(filteredData);
  }

  //need code to reflect a filter on top 10 OTU's when an individual is selcted from the dropdown. 

  let id = data.samples.otu_ids;
  let labels = data.samples.otu_labels;
  let sampleValues = data.samples.sample_values;

  console.log(id);
  //Sort the data by sample Value search results
  let otuTen = data.sort( (a,b) => b.sampleValues - a.sampleValues);
  // Slice the first 10 objects for plotting
  let slicedData = otuTen.slice(0, 10);
  console.log(slicedData);

  //Reverse the array to accommodate Plotly's defaults
  let reversedData = slicedData.reverse();
  
  let trace1 = {
      type: 'bar',
      orientation: 'h',
      x: reversedData.map(object => object.sample_values),
      y: reversedData.map(object => object.sample_values),
      text: reversedData.map(object => object.sample_values),
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
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot('bar', dataTrace,layout);
