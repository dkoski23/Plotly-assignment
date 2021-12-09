function buildMetadata(sample){
    d3.json("samples.json").then(function(data){
        var metadata = data.metadata;
        var resultsArray = metadata.filter(function(data){
            return data.id === sample;
        })
        var result = resultsArray[0];
        var PANEL = d3.select("sample-metadata");
        PANEL.html("");

        Object.entries(result),forEach(function([key, value]){
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`)
        })
    })
}

function buildCharts(sample){
    // alert("Build Charts")
    d3.json("samples.json").then(function(data){
        var samples = data.samples;
        // console.log(samples)
        var resultArray = samples.filter(function(data){
            return data.id === sample;
        })
        var result = resultArray[0];
        // console.log(result)

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        console.log(otu_ids);
        console.log(otu_labels);
        console.log(sample_values);

        var bubbleLayout = {
            title: "Bacteria Culters Per Sample",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        }

        var bubbleData = [
            {
                x:otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            }
        ];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        var yticks = otu_ids.slice(0,10).map(function(otuID){
            return `OTU ${otuID}`;
        }).reverse;
        // console.log(yticks);
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];

        var barLayout = {
            title: "Top Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barData, barLayout)
    })
}

function getIDs(){
    //tie the function to the selDataset button in the html then
    //use d3 select to get all of the unique ids in the names section
    //of samples.json and put them as options on the page's dropdown 
        var selector = d3.select("#selDataset");
        // console.log(selector)
        d3.json("samples.json").then(function(data) {
            // console.log(data);
            var sampleNames = data.names;
            sampleNames.forEach(function(name) {
                selector
                .append("option")
                .text(name)
                .property("value", name)
            })   
            // console.log(selector)
            var firstSample = sampleNames[0];
            console.log(firstSample);  
            buildCharts(firstSample);   
        })
};
getIDs()

