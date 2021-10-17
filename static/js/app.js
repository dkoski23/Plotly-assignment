function getIDs(){
    //tie the function to the selDataset button in the html then
    //use d3 select to get all of the unique ids in the names section
    //of samples.json and put them as options on the page's dropdown 
        var selector = d3.select("#selDataset");
        // console.log(selector)
        d3.json("samples.json").then(function(data) {
            // console.log(data);
            var ids = data.names;
            ids.forEach(function(id) {
                selector
                .append("option")
                .text(id)
                .property("value", id)
            })   
            // console.log(selector)
            console.log(ids)     
        })
};
getIDs()

function getDemographics(sample){
    //connect to the html sample-metadata table and access all metadata,
    // then only display the stats for the person who has their id selected
    //in the dropdown button using the filter function, which should
    //create an array with only one object inside (the person's info)
    var selector = d3.select("#sample-metadata");
    d3.json("samples.json").then(function(data){
        var metadata = data.metadata;
        var resultsArray = metadata.filter(function(data){
            return data.id === sample;
        
        })
        console.log(resultsArray);
        result = resultsArray[0]
        console.log(result)
        selector.append(Object.entries(result))
        
    })
}
getDemographics(940)