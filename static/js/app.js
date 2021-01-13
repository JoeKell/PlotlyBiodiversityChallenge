d3.json("./data/samples.json").then(function(incomingData) {
    
    //Populate the dropdown
    d3.select("#selDataset")
        .selectAll("option")
        .data(incomingData.names)
        .enter()
        .append("option")
        .text(d=>d)
        .attr("value",d=>d);

        optionChanged(d3.select("#selDataset").select("option").select("value"));
        console.log(d3.select("#selDataset"));
        console.log(d3.select("#selDataset").select("option"));
});

function optionChanged(value) {
    d3.json("./data/samples.json").then(function(incomingData) {
        var metadata = incomingData.metadata.filter(data => data.id ==value);
        console.log(metadata);
        var sample = incomingData.samples.filter(data => data.id ==value);
        console.log(sample);

    });
}