import React, { useRef, useEffect } from 'react';
import { select, arc, pie, interpolate } from 'd3';
import resizeObserver from './useResizeObserver';

function GaugeChart({ data }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = resizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        if(!dimensions) return;

        const arcGenerator = arc()
                                .innerRadius(75)
                                .outerRadius(150);

        const pieGenerator = pie()
                                .startAngle(-0.5 * Math.PI)
                                .endAngle(0.5 * Math.PI)
                                .sort(null);
        const instructions = pieGenerator(data);

        svg
            .selectAll(".slice")
            .data(instructions)
            .join("path")
            .attr("fill", (instruction, index) => (index === 0 ? '#ffcc00': '#eee'))
            .style(
                "transform",
                `translate(${dimensions.width}px, ${dimensions.height}px)`
            )
            .transition()
            .attrTween("d", function(nextInstruction, index) {
                const initialIntruction = pieGenerator([0, 1])[index];
                const interpolator = interpolate(
                    this.lastIntruction || initialIntruction,
                    nextInstruction
                );
                this.lastIntruction = interpolate(1);
                return function(t) {
                    return arcGenerator(interpolator(t));
                };
            });
    }, [data, dimensions]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}>
            <svg ref={svgRef}></svg>
        </div>
    )
}

export default GaugeChart;