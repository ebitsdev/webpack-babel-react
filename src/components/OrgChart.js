import React, { useRef, useEffect } from "react";
import { select, stratify, tree} from "d3";
import useResizeObserver from "./useResizeObserver";

export default function OrgChart({data}) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = select(svgRef.current);
    console.log(data);
    if (!dimensions) return;

    svg
      .append("g")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
      .style("transform", `translateY(${dimensions.height}px)`)
      .style("transform", `translateX(${dimensions.width}px)`)
    let dataStructure = stratify()
      .id(d => d.child)
      .parentId(d => d.parent)
      (data)
    let treeStructure = tree().size([dimensions.width, dimensions.height]);
    let information = treeStructure(dataStructure);
   
    // Draw the path before appending the rectangles
    let connections = svg
      .append("g")
      .selectAll("path")
      .data(information.links())
    connections
      .enter()
      .append("path")
      .style("fill", "none")
      .style("stroke", "red")
      .attr("d", (d) =>{return (`M ${d.source.x} , ${d.source.y}  v 45 H ${d.target.x}  V ${d.target.y}`)});
    let rectangles = svg
      .append("g")
      .selectAll("rect")
      .data(information.descendants());
    rectangles
      .enter()
      .append("rect")
      .attr("class", "org-rect")
      .attr("x", (d) => d.x - 40)
      .attr("y", (d) => d.y - 20)
      .style("fill", "#cec")
      .style("stroke", "#ccc")
      .style("stroke-width", 2)
      .style("width", "80px")
      .style("height", "40px");

    let names = svg
      .append("g")
      .selectAll("text")
      .data(information.descendants());
    names
      .enter()
      .append("text")
      .style("dominant-baseline", "middle") // To align the text
      .style("text-anchor", "middle") // to align the text
      .text(d => d.data.child)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("class", "bigger");
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
};
