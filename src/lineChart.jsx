import * as d3 from 'd3';
import { useState, useEffect } from 'react';

import { LabeledYAxis } from './labeledYAxis';
import { LabeledXAxis } from './labeledXAxis';

import { calcInnerDimention } from './utils';
import { CONSTANTS } from './constants';

const intitialSvgDimension = {width:0, height:0};
const margin = {left:80, right:20, top:20, bottom:80};

const inititalTheme = {
    xAxis:{
        labelFill : CONSTANTS.COLOR.BASE_COLOR.TEXT_MAIN,
        labelFontSize: "1.5em",
        labelOffset : 50,
        tickLabelFill: CONSTANTS.COLOR.BASE_COLOR.TEXT_LIGHT,
        tickLabelFont: "1em",
        tickLineStroke: CONSTANTS.COLOR.BASE_COLOR.LINE_GREY_ACCENT,
        domainLineStroke:CONSTANTS.COLOR.BASE_COLOR.LINE_GREY_ACCENT
    },
    yAxis:{
        labelFill : CONSTANTS.COLOR.BASE_COLOR.TEXT_MAIN,
        labelFontSize: "1.5em",
        labelOffset : 50,
        tickLabelFill: CONSTANTS.COLOR.BASE_COLOR.TEXT_LIGHT,
        tickLabelFont: "1em",
        tickLineStroke: CONSTANTS.COLOR.BASE_COLOR.LINE_GREY_ACCENT,
        domainLineStroke: CONSTANTS.COLOR.BASE_COLOR.LINE_GREY_ACCENT
    }
};

export const LineChart = () =>{
    const [svgDimension, setSvgDimension] = useState(intitialSvgDimension);
    const [innerDimension, setInnerDimension] = useState(calcInnerDimention(svgDimension, margin));
    const [theme, _] = useState(inititalTheme);

    const getSVGandInnerDimension = () =>{
        const container = document.getElementById(CONSTANTS.IDS.LINE_CHART_CONTAINER);
        const newSvgDimension = {
            width:container.clientWidth,
            height:container.clientWidth/2.25
        }
        const newInnerDimension = calcInnerDimention(newSvgDimension, margin);
        return{newSvgDimension, newInnerDimension};
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
                    <LabeledXAxis
                        {...theme.xAxis}
                        innerWidth = {innerDimension.width}
                        innerHeight = {innerDimension.height}
                        tickDensity = {70}
                        labelName = {"X Axis"}
                    />
                    <LabeledYAxis
                        {...theme.yAxis}    
                        innerHeight = {innerDimension.height}
                        tickDensity = {70}
                        labelName = {"Y Axis"}
                    />
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