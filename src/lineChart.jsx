import * as d3 from 'd3';
import { useState, useEffect } from 'react';

import { calcInnerDimention } from './utils';

const CONSTANTS = {
    IDS:{
        LINE_CHART_CONTAINER : "line-chart",
        Y_AXIS_GROUP: "y-axis-group",
        X_AXIS_GROUP: "x-axis-group",
    },
    EVENTS:{
        RESIZE:"resize"
    }
}

const intitialSvgDimension = {width:0, height:0};
const margin = {left:80, right:20, top:20, bottom:80};

export const LineChart = () =>{
    const [svgDimension, setSvgDimension] = useState(intitialSvgDimension);
    const [innerDimension, setInnerDimension] = useState(calcInnerDimention(svgDimension, margin));

    const getSVGandInnerDimension = () =>{
        const container = document.getElementById(CONSTANTS.IDS.LINE_CHART_CONTAINER);
        const newSvgDimension = {
            width:container.clientWidth,
            height:container.clientWidth/2.5
        }
        const newInnerDimension = calcInnerDimention(newSvgDimension, margin);
        return{newSvgDimension, newInnerDimension};
    }

    const renderAxis = (newInnerDimention) =>{
        const yAxisGroup = d3.select(`#${CONSTANTS.IDS.Y_AXIS_GROUP}`);
        const yScale = d3.scaleLinear().domain([0, 10]).range([newInnerDimention.height, 0]);
        const yAxis = d3.axisLeft(yScale);
        yAxisGroup.call(yAxis);


        const xAxisGroup = d3.select(`#${CONSTANTS.IDS.X_AXIS_GROUP}`);
        const xScale = d3.scaleLinear().domain([0, 10]).range([0, newInnerDimention.width]);
        const xAxis = d3.axisBottom(xScale);
        xAxisGroup.call(xAxis);
    }

    const renderChart = () =>{
        /*=================================================================================================
            since 
                +setState is asynchronous
                +innerDimension depends on new SVG Dimension
                +graph axis and label depends on new inner Dimension
            hence, 
                +it is necessary to calculate all dimensions at once ie. call getSVGandInnerDimension()
            then,
                +update the state 
                +update DOM using D3
        ====================================================================================================*/
        const { newSvgDimension, newInnerDimension } = getSVGandInnerDimension();
        setSvgDimension(newSvgDimension);
        setInnerDimension(newInnerDimension);
        renderAxis(newInnerDimension);
    }

    useEffect(()=>{
        renderChart();
        window.addEventListener(CONSTANTS.EVENTS.RESIZE, renderChart);
        return () => {
            window.removeEventListener(CONSTANTS.EVENTS.RESIZE, renderChart);
        };
    },[])

    return (
        <div id={CONSTANTS.IDS.LINE_CHART_CONTAINER}>
            <svg 
                width={svgDimension.width} 
                height={svgDimension.height} 
                style={{border:"1px solid black"}}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <g id={CONSTANTS.IDS.Y_AXIS_GROUP}>
                        <text 
                            x={-innerDimension.height/2} 
                            y={-50} 
                            transform={`rotate(-90)`} 
                            fill={'black'}>
                                Y Axis
                        </text>
                    </g>
                    <g id={CONSTANTS.IDS.X_AXIS_GROUP} transform={`translate(${0}, ${innerDimension.height})`}>
                        <text 
                            x={innerDimension.width/2} 
                            y={50} 
                            fill={'black'}>
                                X Axis
                        </text>
                    </g>

                    <rect
                        width={innerDimension.width} 
                        height={innerDimension.height} 
                        rx={"95px"}>
                    </rect>
                </g>
            </svg>
        </div>
    )
}