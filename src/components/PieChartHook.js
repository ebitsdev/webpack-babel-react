import React, { useRef, useEffect } from "react";
import { select, arc, pie, schemeCategory10, scaleLinear, scaleBand } from "d3";
import useResizeObserver from './useResizeObserver';

function PieChart({data}){
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        console.log(data)
        if (!dimensions) return;
    
    const colors = scaleLinear(schemeCategory10)
                svg
                  .attr('width', dimensions.width)
                  .attr('height', dimensions.height)
                  .style("background", "#cee");

    data = pie().sort(null).value((d => d.number))
                (data)
                console.log(data)
  
    const segments = arc()
                        .innerRadius(0)
                        .outerRadius(200)
                        .padAngle(.05)
                        .padRadius(50);
    const sections = svg
                        .append("g")
                        .attr("transform", `translate(250, 250)`)
                        .selectAll("path")
                        .data(data);
    sections
            .enter()
            .append("path")
            .attr("d", segments)
            .attr("fill", (d) => colors(d.data.number))
    const content = select("g")
                    .selectAll("text")
                    .data(data);
        content
                .enter()
                .append("text")
                .classed("pietext", true)                
                .each(function(d) {
                    const center = segments.centroid(d)
                    select(this)
                      .attr("x", center[0])
                      .attr("y", center[1])
                      .text(d.data.number)
                        
                });
    let legends = svg.append("g").attr("transform",`translate(${dimensions.width - 680}, 140)`)
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
              .attr("y", 19);
    }, [data, dimensions]);
    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
          <svg ref={svgRef}></svg>
        </div>
      );
}
export default PieChart;