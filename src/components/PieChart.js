import * as d3 from "d3";

export default function PieChart(){
    const width = 750;
    const height = 500;
    const colors = d3.scaleOrdinal(d3.schemeDark2);
    const svg = d3.select('body').append('svg')
                  .attr('width', width)
                  .attr('height', height)
                  .style("background", "#cee");
    const grades = [
        {grade:"A+", number: 8},
        {grade:"B", number: 15},
        {grade:"D", number: 11},
        {grade:"A", number: 21},
        {grade:"C", number: 29},
        {grade:"F", number: 6}
        
    ]
    const data = d3.pie().sort(null).value((d => d.number))
                (grades)
    console.log(data);
    const segments = d3.arc()
                        .innerRadius(0)
                        .outerRadius(200)
                        .padAngle(.05)
                        .padRadius(50);
    const sections = svg
                        .append("g")
                        .attr("transform", "translate(250, 250)")
                        .selectAll("path")
                        .data(data);
    sections
            .enter()
            .append("path")
            .attr("d", segments)
            .attr("fill", (d) => colors(d.data.number))
    const content = d3
                        .select("g")
                        .selectAll("text")
                        .data(data);
        content
                .enter()
                .append("text")
                .classed("pietext", true)                
                .each(function(d) {
                    const center = segments.centroid(d)
                    d3
                        .select(this)
                        .attr("x", center[0])
                        .attr("y", center[1])
                        .text(d.data.number)
                        
                });
    let legends = svg.append("g").attr("transform","translate(500, 140)")
                      .selectAll(".legends").data(data);
    let legend =  legends.enter().append("g").attr("class", "legends")
                          .attr("transform", function(d, i){
                              return "translate(0,"+(i+1)*30+")"
                          })
        legend.append("rect").attr("width", 20)
                             .attr("height", 20)
                             .attr("fill", function(d) { 
                                 return colors(d.data.number);
                                });
        legend.append("text")
              .attr("class", "pielabel")
              .text(function(d) { return d.data.grade; })
              .attr("fill", function(d) { return colors(d.data.number);})
              .attr("x", 25)
              .attr("y", 19)
}
PieChart();