d3.json("./data/samples.json").then(function(incomingData) {
    
    //Populate the dropdown
    d3.select("#selDataset")
        .selectAll("option")
        .data(incomingData.names)
        .enter()
        .append("option")
        .text(d=>d)
        .attr("value",d=>d);

        optionChanged(d3.select("#selDataset").property("value"));
});

function CreateHBar(x,y,text) {
    var data = [{
        type: 'bar',
        x: x,
        y: y,
        text: text,
        orientation: 'h'
    }];

    var layout = {
        title: "Top 10 OTUs"
      };

    Plotly.newPlot('bar', data, layout);
}




function optionChanged(value) {
    d3.json("./data/samples.json").then(function(incomingData) {
        var metadata = incomingData.metadata.filter(data => data.id ==value);
        console.log(metadata);

        var sample = incomingData.samples.filter(data => data.id ==value);
        console.log(sample);

        console.log("Change 4");
        console.log(sample[0].sample_values.slice(0,10))
        CreateHBar(sample[0].sample_values.slice(0,10),sample[0].otu_ids.slice(0,10).map(a=>"OTU"+ a),sample[0].otu_labels.slice(0,10));
    });


}