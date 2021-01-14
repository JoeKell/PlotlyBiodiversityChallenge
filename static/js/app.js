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

function CreateBubble(x,y,text) {
    var data = [{
        x: x,
        y: y,
        text: text,
        mode: 'markers',
        marker: {
          size: y,
          color: x.map(value=>5000+value)
        }
    }];

    var layout = {
        title: "OTU Values",
        xaxis: {
            title: {
              text: 'OTU ID',
            }
        }
      };

    Plotly.newPlot('bubble', data, layout);
}


function Meta(data) {
    var div = d3.select("#sample-metadata");
    div.html("")
    var list = div.append("ul");
    Object.entries(data).forEach(([key, value]) => {
        list.append("li").text(key + ": " + value);
     });
}

function CreateGauge(num) {
    
    var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: num,
        title: "Weekly Belly Button Washing Frequency",
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 10]},
            bar: { color: "#000000" },
            steps: [
                { range: [0, 1], color: "#FFEAE5" },
                { range: [1, 2], color: "#FFC4B7" },
                { range: [2, 3], color: "#FFAE9B" },
                { range: [3, 4], color: "#FE9A83" },
                { range: [4, 5], color: "#FF8E75" },
                { range: [5, 6], color: "#FF8166" },
                { range: [6, 7], color: "#FF7456" },
                { range: [7, 8], color: "#FF6C4D" },
                { range: [8, 9], color: "#FF5E3C" },
                { range: [9, 10], color: "#FF5733" },
            ],
        }
    }
    ];

    Plotly.newPlot('gauge', data);

}


function optionChanged(value) {
    d3.json("./data/samples.json").then(function(incomingData) {
        var metadata = incomingData.metadata.filter(data => data.id ==value);
        console.log(metadata);

        var sample = incomingData.samples.filter(data => data.id ==value);
        console.log(sample);

        console.log("Change 8");

        CreateHBar(sample[0].sample_values.slice(0,10).reverse(),sample[0].otu_ids.slice(0,10).reverse().map(a=>"OTU "+ a),sample[0].otu_labels.slice(0,10).reverse());
        CreateBubble(sample[0].otu_ids,sample[0].sample_values,sample[0].otu_labels);
        Meta(metadata[0]);
        CreateGauge(metadata[0].wfreq);
    });


}