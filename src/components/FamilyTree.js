import * as d3 from "d3";

export default function FamilyTree(){
    let svg = d3.select("body")
                .append("svg")
                .attr("width", 900)
                .attr("height", 600)
                .append("g")
                .attr("transform", "translate(50, 50)");
    let data = [
        {
            "child": "Emmanuel", "parent": "",
        },
        {
            "child": "Sandrine", "parent": "Emmanuel",
        },
        {
            "child": "Grace", "parent": "Emmanuel",
        },
        {
            "child": "Andre", "parent": "Emmanuel",
        },
        {
            "child": "Child1", "parent": "Sandrine",
        },
        {
            "child": "Child2", "parent": "Sandrine",
        },
        {
            "child": "Child3", "parent": "Grace",
        },
        {
            "child": "Child4", "parent": "Grace",
        },
        {
            "child": "Child5", "parent": "Grace",
        },
        {
            "child": "Child6", "parent": "Andre",
        },
        {
            "child": "Child7", "parent": "Andre",
        }
    ];
    let dataStructure = d3.stratify()
                          .id(function(d) { return d.child;})
                          .parentId(function(d) { return d.parent;})
                          (data);
    let treeStructure = d3.tree()
                          .size([650, 300]);
    let information = treeStructure(dataStructure);
    console.log(information.descendants());
    let rectangles =  svg.append("g").selectAll("rect")
                       .data(information.descendants());
        rectangles.enter()
                       .append("rect")
                       .attr("x", (d) => d.x - 40)
                       .attr("y", (d) => d.y - 20)
                       .style("fill", "none")
                       .style("stroke", "#ccc")
                       .style("stroke-width", 2)
                       .style("width", "80px")
                       .style("height", "40px")
                                              
    let connections = svg.append("g")
                          .selectAll("path")
                          .data(information.links());
        connections
                .enter()
                .append("path")
                .style("fill","none")
                .style("stroke", "red")
                .attr("d", function (d) {
                   return "M" + d.source.x + "," + d.source.y + " C " +
                    d.source.x + "," + (d.source.y + d.target.y) /2 + " " +
                    d.target.x + "," + (d.source.y + d.target.y)/2 + " " +
                    d.target.x + "," + d.target.y;
                })
        let names = svg
                        .append("g")
                        .selectAll("text")
                        .data(information.descendants());
                    names
                        .enter()
                        .append("text")
                        .style("dominant-baseline", "middle") // To align the text
                        .style("text-anchor", "middle") // to align the text
                        .text(function(d) { return d.data.child;})
                        .attr("x", function(d) { return d.x;})
                        .attr("y", function(d) { return d.y;})

}
FamilyTree();