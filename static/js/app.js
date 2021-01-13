var data = d3.json("./data/samples.json").then(function(incomingData) {
    console.log(incomingData.names);
    console.log(samples[0].id);
    console.log(samples[1].id);
    
    //Populate the dropdown
    d3.select("#selDataset")
    .selectAll("option")
    .data(incomingData.samples)
    .enter()
    .append("option")
    .text(function(d) {
      return d.id;
    })
    .property("value",function(d) {
        return d.id;
      });

    return incomingData;
});