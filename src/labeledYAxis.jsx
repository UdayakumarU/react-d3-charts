import * as d3 from 'd3';
import { useEffect } from 'react';
import { CONSTANTS } from "./constants";

export const LabeledYAxis = (props) => {
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
        innerHeight } = props;

    useEffect(()=>{
        const axisGroup = d3.select(`#${CONSTANTS.IDS.Y_AXIS_GROUP}`);
        const yScale = d3.scaleLinear().domain([0, 10]).range([innerHeight, 0]);
        const yAxis = d3.axisLeft(yScale).ticks(innerHeight/tickDensity);
        
        axisGroup.call(yAxis);
        
        axisGroup.selectAll('.tick text')
            .attr('fill', tickLabelFill)
            .style('font-size', tickLabelFont);

        axisGroup.selectAll('.tick line')
            .attr('stroke', tickLineStroke);
        
        axisGroup.select('.domain')
            .attr('stroke', domainLineStroke);

        axisGroup.select(`#${CONSTANTS.IDS.Y_AXIS_LABEL}`)
            .style('font-size', labelFontSize);
    },[innerHeight])

    return (
        <g id={CONSTANTS.IDS.Y_AXIS_GROUP}>
            <text
                id={CONSTANTS.IDS.Y_AXIS_LABEL}
                x={-innerHeight / 2}
                y={-labelOffset}
                transform={`rotate(-90)`}
                fill={labelFill}>
                    {labelName}
            </text>
        </g>
    )
}