import * as d3 from "d3";

export default function DataJoin(){
    const data = [25, 45, 65, 85];
    let svg = d3.select("body")
                .append("svg")
                .attr("viewBox", 800, 800)
                .attr("width", 800)
                .attr("height", 800)
                .style("background", "#ccc");
    let square = svg.selectAll("rect")
                    .data(data)
        square.enter()
               .append("rect")
               .attr("width", (d) => d)
               .attr("height", (d) => 2 * d)
               
            //    Top left corner
                .attr("x", (d, i) =>2 * (i + 1) * d)
                .attr("y", (d, i) => (i + 1) * 80)
                .style("fill", "dodgerblue")
                .style("stroke", "#fff")
                .style("stroke-width", 2)
}
DataJoin();