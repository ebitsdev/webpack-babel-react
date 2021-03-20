import React, { useRef, useEffect } from 'react';
import { select, min, max } from 'd3';
import useResizeObserver from './useResizeObserver';

function TimeLineChart({ data, hightlight }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = select(svgRef.current);
        if (!dimensions) return;
        
    }, [data, hightlight]);

    return (
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}>
            <svg ref={svgRef}>
                <g className="x-axis"/>
            </svg>
        </div>
    )
}

export default TimeLineChart;