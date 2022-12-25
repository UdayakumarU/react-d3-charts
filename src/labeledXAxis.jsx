import * as d3 from 'd3';

import { useEffect } from "react";
import { CONSTANTS } from "./constants";

export const LabeledXAxis = (props) => {
    const { 
        labelName, 
        labelFill,
        labelFontSize, 
        labelOffset,
        tickLabelFill,
        tickLabelFont, 
        tickLineStroke,
        domainLineStroke,
        tickDensity,
        innerWidth, 
        innerHeight 
    } = props;
    
    
    useEffect(()=>{
        const axisGroup = d3.select(`#${CONSTANTS.IDS.X_AXIS_GROUP}`);
        const xScale = d3.scaleLinear().domain([0, 10]).range([0, innerWidth]);
        const xAxis = d3.axisBottom(xScale).ticks(innerWidth/tickDensity);
        
        axisGroup.call(xAxis);

        axisGroup.selectAll('.tick text')
            .attr('fill', tickLabelFill)
            .style('font-size', tickLabelFont);
        
        axisGroup.selectAll('.tick line')
            .attr('stroke', tickLineStroke);
        
        axisGroup.select('.domain')
            .attr('stroke', domainLineStroke);

        axisGroup.select(`#${CONSTANTS.IDS.X_AXIS_LABEL}`)
            .style('font-size', labelFontSize);
    },[innerWidth])

    return (
        <g id={CONSTANTS.IDS.X_AXIS_GROUP} transform={`translate(${0}, ${innerHeight})`}>
            <text 
                id={CONSTANTS.IDS.X_AXIS_LABEL}
                x={innerWidth/2} 
                y={labelOffset} 
                fill={labelFill}>
                    {labelName}
            </text>
        </g>
    )
}