function testing(){
        var selector = d3.select("#selDataset");
        console.log(selector)
        d3.json("samples.json").then(function(data) {
            console.log(data);
            var names = data.names;
            names.forEach(function(name) {
                selector
                .append("option")
                .text(name)
                .property("value", name)
            })        
        })
};
testing()