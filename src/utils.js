export const calcInnerDimention = (svgDimension, margin) =>{
    const width = svgDimension.width - margin.top - margin.bottom;
    const height = svgDimension.height - margin.left - margin.right;

    return{
        width: width<0 ? 0 : width,
        height: height<0 ? 0 : height
    }
};