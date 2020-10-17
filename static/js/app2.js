d3.json('samples.json').then((data) => {
    console.log(data);
});
    // Grab values from the response json object to build the plots
    let name = data.dataset.name;
    console.log(name);
    // let metadata = data.dataset.metadata;
    // let startDate = data.dataset.samples;
    // let endDate = data.dataset.otu_labels;
    // // Print the names of the columns
    // console.log(data.dataset.name);
    // // Print the data for each day
    // console.log(data.dataset.data);
    // let dates = data.dataset.data.map(row => row[0]);
    // // console.log(dates);
    // let closingPrices = data.dataset.data.map(row => row[4]);
    // // console.log(closingPrices);