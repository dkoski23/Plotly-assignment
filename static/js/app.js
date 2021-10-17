function getIDs(){
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

function getDemographics(){
    var selector = d3.select("#sample-metadata");
    // console.log(selector)
    d3.json("samples.json").then(function(metadata) {
        // console.log(metadata);
         var people = metadata.metadata;
        // people.forEach(function(person) {
        //     selector
        //     .append("option")
        //     .text(person)
        //     .property("value", person)
        // })   
        console.log(people[0])     
    })
};
getDemographics()