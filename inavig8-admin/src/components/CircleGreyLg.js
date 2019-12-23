import React from 'react';
import { Circle } from 'react-konva';


const CIRC_RADIUS = 7;


const CircleGreyLg = (props) => {
    const handleCircleGreyLgClick = (e) => {
      console.log('large grey circle clicked');
    }
    return <Circle 
            x={props.x} 
            y={props.y} 
            radius={CIRC_RADIUS} 
            name={props.name}
            fill="lightgrey" 
            draggable              
            onDragStart={props.handleDragCircStart}
            onDragEnd={props.handleDragCircEnd}
            onClick={handleCircleGreyLgClick}
            onMouseMove={props.handleMouseMove}
            onMouseOut={props.handleMouseOut}
            shadowBlur={1} />;
  };


  export default CircleGreyLg;
