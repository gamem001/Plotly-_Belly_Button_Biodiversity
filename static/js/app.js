var data = []
d3.json('samples.json').then((input) => {
    console.log(input))
    data = input;
    input['names'].forEach(dropDown => {
        d3.select("#selDataset")
            .append("option")
            .text(dropDown)
            .property("value", dropDown)
    })
})

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
    d3.select('#sample-metadata').html("")
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a letiable
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