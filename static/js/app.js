var data = d3.json("./data/samples.json").then(function(incomingData) {
    console.log(incomingData.names);
    console.log(samples[0].id);
    console.log(samples[1].id);
    return incomingData;
});