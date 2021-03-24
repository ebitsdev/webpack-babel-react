import * as d3 from "d3";

export default function FamilyTree(){
    // From here: https://youtu.be/1DUv_OS59Uc?list=PLf1qCOLSl4H38Qp0J5UQpli7_pCnd_JpI
    let svg = d3.select("body")
                .append("svg")
                .attr("width", 900)
                .attr("height", 600)
                .append("g")
                .attr("transform", "translate(50, 50)");
    let data = [
        {
            "child": "ParentOne", "parent": "",
        },
        {
            "child": "ChildOne", "parent": "ParentOne",
        },
        {
            "child": "ChildTwo", "parent": "ParentOne",
        },
        {
            "child": "ChildThree", "parent": "ParentOne",
        },
        {
            "child": "Child1", "parent": "ChildOne",
        },
        {
            "child": "Child2", "parent": "ChildOne",
        },
        {
            "child": "Child3", "parent": "ChildTwo",
        },
        {
            "child": "Child4", "parent": "ChildTwo",
        },
        {
            "child": "Child5", "parent": "ChildTwo",
        },
        {
            "child": "Child6", "parent": "ChildThree",
        },
        {
            "child": "Child7", "parent": "ChildThree",
        }
    ];
    let dataStructure = d3.stratify()
                          .id(function(d) { return d.child;})
                          .parentId(function(d) { return d.parent;})
                          (data);
    let treeStructure = d3.tree()
                          .size([850, 300]);
    let information = treeStructure(dataStructure);
    console.log(information.descendants());
    // Draw the path before appending the rectangles
    let connections = svg.append("g")
    .selectAll("path")
    .data(information.links());
    connections
        .enter()
        .append("path")
        .style("fill","none")
        .style("stroke", "red")
        .attr("d", function (d) {
        return "M" + d.source.x + "," + d.source.y + " v 50 H" + 
        d.target.x + " V" + d.target.y
        });
    let rectangles =  svg.append("g").selectAll("rect")
                       .data(information.descendants());
        rectangles.enter()
                       .append("rect")
                       .attr("x", (d) => d.x - 40)
                       .attr("y", (d) => d.y - 20)
                       .style("fill", "#fff")
                       .style("stroke", "#ccc")
                       .style("stroke-width", 2)
                       .style("width", "80px")
                       .style("height", "40px")
                                              

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
                        .classed('bigger', true)

}
FamilyTree();