// import * as d3 from 'd3';
import { useState, useEffect } from 'react';

const CONSTANTS = {
    IDS:{
        LINE_CHART_CONTAINER : "line-chart"
    },
    EVENTS:{
        RESIZE:"resize"
    }
}



const intitialDimension = {width:0, height:0};

export const LineChart = () =>{
    const [svgDimension, setSvgDimension] = useState(intitialDimension);
   
    const setContainerDimension = () =>{
        const container  = document.getElementById(CONSTANTS.IDS.LINE_CHART_CONTAINER);
        setSvgDimension({
            width:container.clientWidth,
            height:container.clientWidth/5
        })
    }

    useEffect(()=>{
        setContainerDimension();
        window.addEventListener(CONSTANTS.EVENTS.RESIZE, setContainerDimension);
        
        return () => {
            window.removeEventListener(CONSTANTS.EVENTS.RESIZE, setContainerDimension);
        };
    },[])

    return (
        <div id={CONSTANTS.IDS.LINE_CHART_CONTAINER}>
            <svg width = {svgDimension.width} height={svgDimension.height}>
                <rect width = {svgDimension.width} height={svgDimension.height}></rect>
            </svg>
        </div>
    )
}