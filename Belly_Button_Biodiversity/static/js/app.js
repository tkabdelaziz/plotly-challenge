function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  let url = `/metadata/${sample}`;

  // Fetch the JSON data and console log it
  d3.json(url).then(function(sampledata) {   
    
    // Use d3 to select the panel with id of `#sample-metadata` 
    const sample_metadata = d3.select("#sample-metadata")
    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sampledata).forEach(function ([key,value]){
      const row = sample_metadata.append("p");
      row.text(`${key}: ${value}`);
    });
  });
    
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    d3.json(url).then(function(sampledata) {
        console.log(sampledata.WFREQ);
        level = sampledata.WFREQ
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(url).then(function(plotdata) {   
   
      // NEED CODE 

      // @TODO: Build a Bubble Chart using the sample data
      const
          x = plotdata.otu_ids;
          y = plotdata.sample_values;
          size = plotdata.sample_values;
          color = plotdata.otu_ids;
          labels = plotdata.otu_labels;
      
      const trace1 ={
        x:x,
        y:y,
        text:labels,
        mode:'markers',
        marker:{
          color: color,
          size: size,
          colorscale:"Rainbow" 
        }
      };
      const bubbledata = [trace1];
      
      const bubblelayout = {
        title: 'OTU ID',
        // height: 600,
        // width: 800,
      };
      
      Plotly.newPlot('bubble', bubbledata, bubblelayout);
      // // @TODO: Build a Pie Chart
      
      const data = [{
        values: y.slice(0,10), 
        labels: color.slice (0,10),
        type: "pie"
      }];
      
      const layout = {
      // margin: {t:0,l:0}
      };
      Plotly.plot("pie", data, layout);
    });
 
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
